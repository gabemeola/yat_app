import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.less';

type Props = {
  lists: string[],
  createList: (listName: string) => any,
}

let index = 0;
export default function Nav({ lists, createList }: Props) {
  return (
    <nav className={styles.nav}>
      {lists.map((link) => {
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
      <button
        className={styles.addBtn}
        type="button"
        onClick={() => createList(`List-${++index}`)}
      >
        +
      </button>
    </nav>
  )
}
