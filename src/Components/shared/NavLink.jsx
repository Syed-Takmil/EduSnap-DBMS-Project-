import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';



const NavLink = ({href,children}) => {
    const currentPath=usePathname();
    const active=href==currentPath;
    return (
       <Link className={`${active?"border-b border-b-blue-400  text-blue-400":""}`} href={href}>{children}</Link>
    );
};

export default NavLink;