'use client'

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { sidebarLinks } from '../../constants';
import cn from 'clsx';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <section >
        <nav className=
        'flex items-center justify-between p-4 bg-white border-b border-gray-300'
        >
        <Link href="/" className="flex items-center">
            <Image
            src="/icons/logo.png"
            width={64}
            height={64}
            alt="Radiant logo"
            />
        </Link>

        {sidebarLinks.map((item) => {
            const isActive = item.route === pathname || pathname.startsWith(`${item.route}/`);

            return (
            <Link
                href={item.route}
                key={item.label}
                className={cn(
                'flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-start hover:bg-sky-500 hover:text-white',
                { 'bg-sky-400 text-white': isActive }
                )}
            >
                <p className="text-16 font-normal">{item.label}</p>
            </Link>
            );
        })}
        </nav>
    </section>
  );
};

export default Navbar;