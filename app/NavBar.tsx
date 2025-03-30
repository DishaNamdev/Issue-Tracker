'use client';
import Link from "next/link";
import React from "react";
import { HiRefresh } from "react-icons/hi";
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import classNames from "classnames";// this is hte library to maintain the classes because write the classes becomes tough.

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();
  
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <IoBugSharp />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            // className={`${currentPath === link.href ? 'text-zinc-900': 'text-zinc-500'} hover:text-zinc-800 transition-colors` }
            href={link.href}
            className={
                classNames({
                    'text-zinc-900': link.href === currentPath, //this classname will once render if the right part is true.
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true,
                })
            }
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
