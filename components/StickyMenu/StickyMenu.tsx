import Link from 'next/link';
import React from 'react';
import { FaRegWindowRestore, FaPlusSquare, FaUser } from 'react-icons/fa';
import styles from './StickyMenu.module.scss';

const StickyMenu = () => {
  const MENUS = [
    {
      title: 'Channel',
      slug: '/channel/',
      icon: <FaRegWindowRestore />
    },
    {
      title: 'Upload',
      slug: '/channel/upload/',
      icon: <FaPlusSquare />
    },
    {
      title: 'Profile',
      slug: '/account/',
      icon: <FaUser />
    },
  ]

  return (
    <div className={styles.sticky__menu}>
      {MENUS.map(menu =>
        <Link href={menu.slug} key={menu.title}>
          <a title={menu.title}>
            {menu.icon}
          </a>
        </Link>
      )}
    </div>
  )
}

export default StickyMenu;