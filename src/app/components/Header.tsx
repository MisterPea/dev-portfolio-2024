import LinkIcon from "./LinkIcon";
import Link from "next/link";

export default function Header() {
  return (
    <header className='main_header'>
      <div className='main_header-name'>
        <h1 className='main_header-hello'><span>Hello! I&apos;m </span>Perry Angelora</h1>
        <sub>Developer / Designer / Programmatic Pixel Pusher</sub>
        <ul className='main_header-outbound_links'>
          <li>
            <a href='#'><LinkIcon icon='github' /></a>
          </li>
          <li className='link_circle'>
            <a href='#'><LinkIcon icon='linkedIn' /></a>
          </li>
          <li>
            <a href='#'><LinkIcon icon='mail' /></a>
          </li>
        </ul>
      </div>

      <nav>
        <ul>
          <li><Link href='#'>Projects</Link></li>
          <li><Link href='#'>About</Link></li>
        </ul>
      </nav>
    </header>
  );
}