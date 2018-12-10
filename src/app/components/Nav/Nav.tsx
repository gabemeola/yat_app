import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'app/components/Icon/Icon';
import PlusIcon from 'app/assets/plus-circle.svg';
import styles from './Nav.module.less';

type Props = {
  lists: string[],
}

export default function Nav({ lists }: Props) {
  return (
    <nav className={styles.nav}>
      {lists.map((link) => {
        return (
          <NavLink
            to={`/list/${link.toLocaleLowerCase()}`}
            title={`${link} list`}
            key={link}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            {link}
          </NavLink>
        )
      })}
      <NavLink
        className={styles.addBtn}
        activeClassName={styles.hidden}
        title="Create new list"
        to="/create"
      >
        <Icon icon={PlusIcon} alt="Create new list" />
      </NavLink>
    </nav>
  )
}
