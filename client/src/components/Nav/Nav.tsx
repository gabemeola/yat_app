import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const links = [
  'Personal',
  'Chores',
  'Zelzen',
]

export default function Nav() {
  return (
    <nav className={styles.nav}>
      {links.map((link) => {
        return (
          <NavLink
            to={`/${link.toLocaleLowerCase()}`}
            key={link}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            {link}
          </NavLink>
        )
      })}
      <button className={styles.addBtn}>+</button>
    </nav>
  )
}
