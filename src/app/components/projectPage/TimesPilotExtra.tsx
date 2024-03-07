import ColorScheme, { ColorSwatchType } from "@/app/components/projectPage/ColorScheme";
import { SvgFonts } from "@/app/components/projectPage/SvgFonts";
import SectionTextBlock from "./SectionTextBlock";
import Lightbox, { GalleryImage } from "./Lightbox";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import SvgCards from "./SvgCards";


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

  const flowchart: GalleryImage[] = [
    {
      smallUrl: '/images/nyt_pilot_img/timespilot_flowchart.png',
      largeUrl: '/images/nyt_pilot_img/timespilot_flowchart.png',
      alt: "High-Level Site Structure Flowchart",
      imageSize: { width: 5326, height: 2659 },
      blurData: "data:image/png;base64,|DR:HG~qj[00~qM{M{-;t79F%MM{IUxuM{t7oft7%MWBWBWBM{ofWBoft7xuWB%MRjofxuIUt7WB?bM{M{?bIUWB%MIURj?bM{IU?bIURj-;IUayxuM{xut7M{xuM{ofof_3M{xuofRjxuRjj[Rj?bRjxuofj[ayj[WBM{"
    }
  ];

  const testImages: GalleryImage[] = [
    {
      smallUrl: '/images/test/test_landscape_1.jpg',
      largeUrl: '/images/test/test_landscape_1.jpg',
      alt: 'test image 1',
      imageSize: { width: 1100, height: 809 },
      description: 'Thumbs up/thumbs down'
    },
    {
      smallUrl: '/images/test/test_portrait_1.jpg',
      largeUrl: '/images/test/test_portrait_1.jpg',
      alt: 'test image 2',
      imageSize: { width: 1365, height: 2048 },
      description: 'HELLO'
    },
    {
      smallUrl: '/images/test/test_landscape_1.jpg',
      largeUrl: '/images/test/test_landscape_1.jpg',
      alt: 'test image 1a',
      imageSize: { width: 1100, height: 809 },
      description: 'Second thumbs up/thumbs down'
    },
  ];
  const nyt_signup_images: GalleryImage[] = [
    {
      smallUrl: '/images/nyt_login/nyt_login_1.png',
      largeUrl: '/images/nyt_login/nyt_login_1.png',
      alt: 'login1',
      imageSize: { width: 1000, height: 2048 },
    },
    {
      smallUrl: '/images/nyt_login/nyt_login_2.png',
      largeUrl: '/images/nyt_login/nyt_login_2.png',
      alt: 'login2',
      imageSize: { width: 1000, height: 2048 },
    },
    {
      smallUrl: '/images/nyt_login/nyt_login_3.png',
      largeUrl: '/images/nyt_login/nyt_login_3.png',
      alt: 'login3',
      imageSize: { width: 1000, height: 2048 },
    },
    {
      smallUrl: '/images/nyt_login/nyt_login_4.png',
      largeUrl: '/images/nyt_login/nyt_login_4.png',
      alt: 'login4',
      imageSize: { width: 1000, height: 2048 },
    },
    {
      smallUrl: '/images/nyt_login/nyt_login_5.png',
      largeUrl: '/images/nyt_login/nyt_login_5.png',
      alt: 'login1',
      imageSize: { width: 1000, height: 2048 },
    },
  ];

  return (
    <>
      <SectionTextBlock
        title="Design Considerations:"
        list_items={[
          "Highly Visible: High contrast ratios and system-relative font sizes are chosen to cater to users with suboptimal eyesight while maintaining a pleasing aesthetic.",
          "Unencumbered Navigation: Ability to navigate around the site without being logged in/having an account; blocking access to member features.",
          "User-Account Autonomy: Users have complete control of their accounts. They are able to modify all informational aspects, devoid of dark patterns.",
          "No Spamming: Only send emails when there is intersection between the topics the user wants to see and the top stories of the day. ",
        ]}
      />
      <section className="section-nyt_style">
        <h3>Style Guide:</h3>
        <ColorScheme colorSet={colors} />
        <div className="project_page-fonts_section project_page-subsection">
          <h4>Font Selection:</h4>
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
        </div>
      </section>
      <SectionTextBlock title="Deliverables:"
        list_items={[
          "Designed and developed a server-side-rendered site composed of extensible components using Figma, Next.js/React, TypeScript, The New York Times - Top Stories API, Storybook.js, SCSS, Firebase Auth, and Firestore NoSQL.",
          "Implemented a daily email digest using GCP Cloud Functions, GCP Cloud Scheduler, and Twilio Sendgrid."
        ]} />
      <section className="section-high_level_site_structure">
        <h3>High-Level Site Structure:</h3>
        <Lightbox imageArray={flowchart} baseCssClass="nyt-flowchart" />
      </section>
      <div className="rule" />
      <SectionTextBlock title="Challenges:"
        list_items={[
          "Creating article-card interactions that utilize the inherent attributes of the screen; be it mobile or tablet/desktop.",
          "When displaying article-cards on a tablet or desktop environment there are occasions where we have a full row preceding a row with one article—and the remaining space is empty and unutilized. This was a hamper on usability and aesthetics, and needed to be rectified.",
          "Developing a new account sign-up flow that expeditiously guides the user through the several steps of account creation—while also being tolerant to stalled sign-ups and premature exits from the sign-up flow."
        ]}
      />
      <SectionTextBlock
        isSubsection
        title="Desktop Article Card versus Mobile Article Card"
        body="Because interaction with mobile is done with fingers (not a pointer) and space is at a premium, the mobile implementation of bookmarks uses modified placement of the bookmark flag, and a slide-to-reveal interaction. A common and, now, natural interaction on mobile devices."
      >

        <div className="desktop_mobile_mock-wrap">
          <h4 className="not_bookmarked">Not Bookmarked</h4>
          <h4 className="bookmarked">Bookmarked</h4>
          <h5 className="mobile">Mobile</h5>
          <h5 className="desktop">Tablet / Desktop</h5>

          <div className="desktop_mobile_mock-cell closed">
            <SvgCards.Closed />
          </div>
          <div className="desktop_mobile_mock-cell closed-bk">
            <SvgCards.ClosedBk />
          </div>
          <div className="desktop_mobile_mock-cell open">
            <SvgCards.OpenAdd />
          </div>
          <div className="desktop_mobile_mock-cell open-bk">
            <SvgCards.OpenRemove />
          </div>
          <div className="desktop_mobile_mock-cell desktop">
            <SvgCards.Desktop />
          </div>
          <div className="desktop_mobile_mock-cell desktop-bk">
            <SvgCards.DesktopBk />
          </div>
        </div>
      </SectionTextBlock>
      <SectionTextBlock
        isSubsection
        title="Optimizing Article Layout"
        body="While arranging article summaries we strived for a uniform and balanced presentation—one that does not editorialize. This is done despite varying lengths and numbers of articles in each section, which invariably lead to gaps in the layout. To overcome this we devised a simple  solution: Use all available space by filling in the gaps. This was achieved by calculating the combined length of headline and description. We then tracked the five longest summaries. In instances where the layout had excess space, we allocated additional space to these summaries, starting with the longest. This adaptive approach not only created a more visually appealing layout but also significantly improved readability, making the content more engaging for the user."
      >
        <div className="optimized_diagram-wrapper">
          <div className="optimized_diagram-left">
            <h4>Un-optimized</h4>
            <div className="example_holder">
              {Array.apply(null, Array(7)).map((_, index) => (
                <div key={`left-${index}`} className="box" />
              ))}
            </div>
            <div className="svg_holder">
              <FaCircleXmark />
            </div>
          </div>
          <div className="optimized_diagram-right">
            <h4>Optimized</h4>
            <div className="example_holder">
              {Array.apply(null, Array(7)).map((_, index) => (
                <div key={`right-${index}`} className="box" />
              ))}
            </div>
            <div className="svg_holder">
              <FaCircleCheck />
            </div>
          </div>
        </div>
      </SectionTextBlock>
      <SectionTextBlock
        isSubsection
        title="New User Sign-up Flow"
        body="Once a user enters a username, email, and password—they will have an account; whether or not they go through each sign-up step or if they get to the end of the flow."
      >
        {/* <div className="nyt_signup_flow-wrapper"> */}
        <Lightbox
          imageArray={nyt_signup_images}
          baseCssClass="nyt_signup_flow"
        >
          <>
            <li className="nyt_signup_flow-text1">
              <h5>The user enters their username, email, and password</h5>
              <p>Contact database and check that email isn&apos;t in use. If it&apos;s a new email, we create a unique uid (user id) within the auth database. We then allocate space on the NoSQL database for the new user under their uid.</p>
            </li>
            <li className="nyt_signup_flow-text2">
              <h5>User chooses which sections are exposed to them</h5>
              <p>If we exit from this point, the user will have default settings applied.</p>
            </li>
            <li className="nyt_signup_flow-text3">
              <h5>The user can <i>Select All</i> sections via button click</h5>
            </li>
            <li className="nyt_signup_flow-text4">
              <h5>Further personalize with an avatar</h5>
            </li>
            <li className="nyt_signup_flow-text5">
              <h5>If the user reaches the end, they are shown a confirmation of account creation</h5>
            </li>
          </>
        </Lightbox>
      </SectionTextBlock>
    </>
  );
}
