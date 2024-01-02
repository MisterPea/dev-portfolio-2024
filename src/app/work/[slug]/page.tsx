import siteContent from "../../siteContent.json";

interface Project {
  slug: string;
  title: string;
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
  const project:Project = siteContent.find((p) => p.slug === params.slug) as Project;
  const {title, long_description, tools, links, summary, summary_color} = project;

  

  return (
    <div>
      <h1>{title}</h1>
      <p>{long_description}</p>
      <p>{tools.join(', ')}</p>
      <ul>
        {links.map((link, index) => (
          <li  key={`link-${index}-${link}`}>{link}</li>
        ))}
      </ul>
      <div className="summary">
        <h2>Summary</h2>
        {/* <p>{summary}</p> */}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return siteContent.map(({ slug }) => ({ slug }));
}