import Link from "next/link";

interface SiteNavProps {
  activeLink?: string;
}

export default function SiteNav({ activeLink }: SiteNavProps) {

  return (
    <nav className="site_nav">
      <ul>
        <li className={`site_nav-li site_nav-li${activeLink === 'main' ? '--active' : ''}`}><Link href='/'>Work</Link></li>
        <li className={`site_nav-li site_nav-li${activeLink === 'about' ? '--active' : ''}`}><Link href='#'>About</Link></li>
      </ul>
    </nav>
  );
}