'use client';
import { useState } from "react";
import { usePathname } from 'next/navigation';
import OutboundLinks from "./OutboundLinks";

import SiteNav from "./SiteNav";

interface HeaderProps {
  children: React.ReactNode;
}


export default function Header({ children }: HeaderProps) {
  const path = usePathname();
  const pathArray = path.split('/').filter(Boolean);

  /**
   * We're taking the path which updates on every route change and passing it to
   * the siteNav to activate toggle --active on link
   */
  const currentPath = (() => {
    if (pathArray.length > 0) {
      return pathArray[0];
    }
    return 'main';
  })();


  return (
    <div className="app_wrap">
      <header className={`main_header ${currentPath !== 'main' ? 'main_header--active' : ''}`}>
        <div className='main_header-name'>
          <div className="main_header-name-headline">
            <h1 className="greeting">Hello! I&apos;m </h1>
            <h1 className="name">Perry Angelora</h1>
          </div>
          <sub>Developer / Designer / Programmatic Pixel Pusher</sub>
        </div>
        <OutboundLinks />
        <SiteNav activeLink={currentPath} />
      </header>
      {children}
    </div>
  );
}