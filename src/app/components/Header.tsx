import LinkIcon from "./LinkIcon";
import OutboundLinks from "./OutboundLinks";
import SiteNav from "./SiteNav";

export default function Header() {
  return (
    <header className='main_header'>
      <div className='main_header-name'>
        <h1 className='main_header-hello'><span>Hello! I&apos;m </span>Perry Angelora</h1>
        <sub>Developer / Designer / Programmatic Pixel Pusher</sub>
      </div>
      <OutboundLinks />
      <SiteNav />
    </header>
  );
}