import ColorScheme, { ColorSwatchType } from "@/app/components/projectPage/ColorScheme";
import { SvgFonts } from "@/app/components/projectPage/SvgFonts";
import SectionTextBlock from "./SectionTextBlock";
import ExportedImage from "next-image-export-optimizer";
import flowchart from "../../../../public/images/nyt_pilot_img/nyt_pilot_flowchart.webp";
import Lightbox, { GalleryImage } from "./Lightbox";
import LightboxTwo from "./LightboxTwo";

export default function TimesPilotExtra() {
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
  // const flowchart = [
  //   {
  //     thumbImg: [
  //       {
  //         minWidth: null,
  //         maxWidth: 760,
  //         images: '/images/nyt_pilot_proj_img/timesFlow-Small_2x.webp 2x, /images/nyt_pilot_proj_img/timesFlow-Small_3x.webp 3x'
  //       },
  //       {
  //         minWidth: 761,
  //         maxWidth: 990,
  //         images: '/images/nyt_pilot_proj_img/timesFlow-Medium_2x.webp 2x, /images/nyt_pilot_proj_img/timesFlow-Medium_3x.webp 3x'
  //       },
  //       {
  //         minWidth: 991,
  //         maxWidth: null,
  //         images: '/images/nyt_pilot_proj_img/timesFlow-Large_2x.webp 2x, /images/nyt_pilot_proj_img/timesFlow-Large_3x.webp 3x'
  //       }],
  //     alt: 'High-Level Site Structure Flowchart',
  //     defaultImg: '/images/nyt_pilot_proj_img/timesFlow-Large_2x.webp 2x'
  //   }
  // ];

  const bookmarkImages = [
    {
      defaultImg: '/images/nyt_pilot_bookmark/nyt_mobile_bkmrk_2x.png 2x',
      minWidth: null,
      maxWidth: null,
      thumbImgs: '/images/nyt_pilot_bookmark/nyt_mobile_bkmrk_2x.png 2x, /images/nyt_pilot_bookmark/nyt_mobile_bkmrk_3x.png 3x'
    }
  ];

  const testImages: GalleryImage[] = [
    {
      smallUrl: '/images/test/test_landscape_1.jpg',
      largeUrl: '/images/test/test_landscape_1.jpg',
      alt: 'test image 1',
      ratio: { paddingBottom: '73.5%', width: '100%' },
      description: 'Thumbs up/thumbs down'
    },
    {
      smallUrl: '/images/test/test_portrait_1.jpg',
      largeUrl: '/images/test/test_portrait_1.jpg',
      alt: 'test image 2',
      ratio: { paddingBottom: '100%', width: '70%' }
    },
    // {
    //   smallUrl: '/images/test/test_landscape_2.jpg',
    //   largeUrl: '/images/test/test_landscape_2.jpg',
    //   alt: 'test image 3'
    // },
    // {
    //   smallUrl: '/images/test/test_portrait_2.jpg',
    //   largeUrl: '/images/test/test_portrait_2.jpg',
    //   alt: 'test image 4'
    // },
  ];
  // require('../../../../public
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
      <div className="project_page-flowchart">
        <SectionTextBlock title="High-Level Site Structure:" />
        <div className="project_page-flowchart-image">
          <ExportedImage
            src="/images/nyt_pilot_img/nyt_pilot_flowchart.webp"
            alt="High-Level Site Structure Flowchart"
            fill
            style={{ objectFit: "contain" }}
            blurDataURL="data:image/png;base64,|DR:HG~qj[00~qM{M{-;t79F%MM{IUxuM{t7oft7%MWBWBWBM{ofWBoft7xuWB%MRjofxuIUt7WB?bM{M{?bIUWB%MIURj?bM{IU?bIURj-;IUayxuM{xut7M{xuM{ofof_3M{xuofRjxuRjj[Rj?bRjxuofj[ayj[WBM{"
          />
        </div>
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
      <LightboxTwo imageArray={testImages} baseCssClass='nyt_extra'/>
      {/* <Lightbox baseCssClass='nyt_extra' imageArray={testImages} /> */}
    </>
  );
}
