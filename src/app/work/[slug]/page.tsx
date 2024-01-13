import siteContent from "../../siteContent.json";
import SectionTextBlock from "@/app/components/projectPage/SectionTextBlock";
import ExportedImage from "next-image-export-optimizer";
import dynamic from "next/dynamic";

interface Project {
  slug: string;
  title: string;
  hero: DefaultImage;
  image_url: ImageUrl;
  description: string;
  stack: string[];
  long_description: string;
  tools: string[];
  links: string[];
  summary: string;
  summary_color: string;
  main_section: MainSection[];
}

interface ImageUrl {
  defaultImage: DefaultImage;
  imageSource: ImageSource[];
}

interface DefaultImage {
  alt: string;
  img: string;
}

interface ImageSource {
  minWidth: string;
  images: string;
}

interface MainSection {
  title: string;
  body: string;
  list_items: string[];
}

export default function Page({ params }: { params: { slug: string; }; }) {
  const project: Project = siteContent.find((p) => p.slug === params.slug) as unknown as Project;
  const { title, long_description, tools, links, summary, summary_color, main_section, hero } = project;
  const CustomComponent = DynamicComponent();

  function DynamicComponent() {
    switch (params.slug) {
      case ('the-times-pilot'):
        return dynamic(() => import('../../components/projectPage/TimesPilotExtra'));
      case ('circuit-app'):
        return dynamic(() => import('../../components/projectPage/CircuitAppExtra'));
      default:
        return null;
    }
  }

  return (
    <div className="project_page">
      <div className="project_page-header">
        <div className="project_page-header-text">
          <h1 className="project_page-title">{title}</h1>
          <p className="project_page-description">{long_description}</p>
        </div>
        <div className="project_page-hero">
          <ExportedImage
            src={hero.img}
            alt={hero.alt}
            fill
            style={{ objectFit: "contain" }}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAI0lEQVR4nGP8//8/A27AhEeO2tKMDAyMJOhmQeWi+4KmLgcAFNAEFDOciJIAAAAASUVORK5CYII="
            priority
          />
        </div>
      </div>
      <section className="project_page-section tools">
        <h2>Tools:</h2>
        <p>{tools.join(', ')}</p>
      </section>
      <section className="project_page-section links">
        <h2>Links:</h2>
        <ul>
          {links.map((link, index) => (
            <li key={`link-${index}-${link}`}>
              <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            </li>
          ))}
        </ul>
      </section>
      <section
        className="project_page-section summary"
        style={{ backgroundColor: `${summary_color}` }}>
        <h2>Summary:</h2>
        <p>{summary}</p>
      </section>
      <>
        {main_section.map(({ title, list_items, body }, index) => (
          <SectionTextBlock title={title} list_items={list_items} body={body} key={`${index}-main-section`} />
        ))}
      </>
      <div className="rule">
        <hr />
      </div>
      {CustomComponent && <CustomComponent />}
    </div>
  );
}

export async function generateStaticParams() {
  return siteContent.map(({ slug }) => ({ slug }));
}