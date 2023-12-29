import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="site_nav">
      <ul>
        <li><Link href='#'>Work</Link></li>
        <li><Link href='#'>About</Link></li>
      </ul>
    </nav>
  );
}