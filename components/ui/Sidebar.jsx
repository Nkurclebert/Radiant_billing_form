'use client'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from "@/lib/utils";
import React, { use } from 'react'
import { usePathname } from 'next/navigation';
import { sidebarLinks } from '../../constants';

const Sidebar = (user) => {
    const pathname = usePathname();

  return (
    <section className='sticky top-0 '>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className="mb-12 cursor-pointer flex justify-center items-center gap-2" >
                <Image 
                    src="/icons/logo.png"  
                    width={96}
                    height={96}
                    alt="Radiant logo"
                />
            </Link>

            {sidebarLinks.map((item) => {

                const isActive = item.route === pathname || pathname.startsWith(`${item.route}/`);

                return (
                    <Link href={item.route} key={item.label} className={cn('flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start', {'bg-blue-500 text-white' : isActive})}>
                        <Image 
                            src={item.imgURL}
                            width={20}
                            height={20}
                            alt={item.label}
                            className={cn({ "brightness-[3] invert-0": isActive })}
                        />
                        <p className="text-16 font-semibold max-xl:hidden">
                            {item.label}
                        </p>
                    </Link>
                )
            })}

        </nav>   
    </section>
  )
}

export default Sidebar