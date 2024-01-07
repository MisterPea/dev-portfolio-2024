import siteContent from "../../siteContent.json";
import SectionTextBlock from "@/app/components/projectPage/SectionTextBlock";
import { SvgFonts } from "@/app/components/projectPage/SvgFonts";
import ColorScheme, { ColorSwatchType } from "@/app/components/projectPage/ColorScheme";
import ImageViewer from "@/app/components/projectPage/ImageViewer";

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

function TimesPilotExtra() {
  const colors: ColorSwatchType[] = [
    { label: 'Darkest', hex: '#262626', cr: 13.51 },
    { label: 'Error Red', hex: '#dc0105', cr: 5.18 },
    { label: 'Main Dark', hex: '#3d3d3d', cr: 9.7 },
    { label: 'Warn Orange', hex: '#f58f00', cr: 2.18 },
    { label: 'Lightest Text', hex: '#767676', cr: 4.54 },
    { label: 'Back Green', hex: '#368433', cr: 4.66 },
    { label: 'Background', hex: '#f3f2ef', cr: 1 },
    { label: 'Accent Yellow', hex: '#ccff00', cr: 9.24 },
  ];
  const flowchart = [
    {
      thumbImg: [
        {
          minWidth: null,
          maxWidth: 760,
          images: '/images/nyt_pilot_proj_img/timesFlow-Small_2x.webp 2x, /images/nyt_pilot_proj_img/timesFlow-Small_3x.webp 3x'
        },
        {
          minWidth: 761,
          maxWidth: 990,
          images: '/images/nyt_pilot_proj_img/timesFlow-Medium_2x.webp 2x, /images/nyt_pilot_proj_img/timesFlow-Medium_3x.webp 3x'
        },
        {
          minWidth: 991,
          maxWidth: null,
          images: '/images/nyt_pilot_proj_img/timesFlow-Large_2x.webp 2x, /images/nyt_pilot_proj_img/timesFlow-Large_3x.webp 3x'
        }],
      alt: 'High-Level Site Structure Flowchart',
      defaultImg: '/images/nyt_pilot_proj_img/timesFlow-Large_2x.webp 2x'
    }
  ];

  const bookmarkImages = [
    {
      defaultImg: '/images/nyt_pilot_bookmark/nyt_mobile_bkmrk_2x.png 2x',
      minWidth: null,
      maxWidth: null,
      thumbImgs: '/images/nyt_pilot_bookmark/nyt_mobile_bkmrk_2x.png 2x, /images/nyt_pilot_bookmark/nyt_mobile_bkmrk_3x.png 3x'
    }
  ];


  return (
    <>
      <SectionTextBlock
        title="Design Considerations:"
        list_items={[
          "High contrast ratios and system-relative font sizes are chosen to cater to users with suboptimal eyesight while maintaining a pleasing aesthetic.",
          "Ability to navigate around the site without being logged in/having an account; blocking access to member features.",
          "Users have complete control of their accounts. They are able to modify all informational aspects, devoid of dark patterns.",
          "Only send emails when there is intersection between: the topics they want to see and the top stories of the day."
        ]}
      />
      <ColorScheme colorSet={colors} />
      <section className="project_page-section project_page-fonts_section">
        <h2>Font Selection:</h2>
        <div className="font_group">
          <p>Topic Headline:</p>
          <div className="font_group-svg_wrap size_1">
            <SvgFonts.timesPilot_1 />
          </div>
        </div>
        <div className="font_group">
          <p>Site Title:</p>
          <div className="font_group-svg_wrap size_2">
            <SvgFonts.timesPilot_2 />
          </div>
        </div>
        <div className="font_group">
          <p>Body Text:</p>
          <div className="font_group-svg_wrap size_3">
            <SvgFonts.timesPilot_3 />
          </div>
        </div>
      </section>
      <SectionTextBlock title="Deliverables:"
        list_items={[
          "Designed and developed a server-side-rendered site composed of extensible components using Figma, Next.js/React, TypeScript, The New York Times - Top Stories API, Storybook.js, SCSS, Firebase Auth, and Firestore NoSQL.",
          "Implemented a daily email digest using GCP Cloud Functions, GCP Cloud Scheduler, and Twilio Sendgrid."
        ]} />
      <div>

      </div>
      <div className="rule">
        <hr />
      </div>
      <SectionTextBlock title="Challenges:"
        list_items={[
          "Creating a mobile-specific layout that feels like a continuation of the desktop version, and the other way around. Where layout and functionality are tailored to the platform.",
          "Handling new account sign-up flow interruption; handling occasions where the user account was created, but the database isn't fully populated.",
          "When displaying article cards on a tablet or desktop environment there are occasions where we have a full row preceding a row with one article and the rest is blank space. I wanted to not have that be the case."
        ]}
      />
      <div className="rule">
        <hr />
      </div>
      <SectionTextBlock title="Desktop Article Card versus Mobile Article Card:"
        body="Because interaction with mobile is done with fingers (not a pointer) and space is at a premium, the mobile implementation of bookmarks uses modified placement of the bookmark flag, and a slide-to-reveal interaction. A common and, now, natural interaction on mobile devices."
      />
    </>
  );
}

export default function Page({ params }: { params: { slug: string; }; }) {
  const project: Project = siteContent.find((p) => p.slug === params.slug) as unknown as Project;
  const { title, long_description, tools, links, summary, summary_color, main_section } = project;

  return (
    <div className="project_page">
      <div className="project_page-header">
        <div className="project_page-header-text">
          <h1 className="project_page-title">{title}</h1>
          <p className="project_page-description">{long_description}</p>
        </div>
        <div className="project_page-header-image_outer" >
          <div className="project_page-header-image_inner"></div>
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
      <TimesPilotExtra />
    </div>
  );
}

export async function generateStaticParams() {
  return siteContent.map(({ slug }) => ({ slug }));
}