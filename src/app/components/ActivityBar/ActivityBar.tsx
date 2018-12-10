import React, { useEffect, useState } from 'react';
import socket from 'app/config/socket';
import moreUsersIcon from 'app/assets/user-plus.svg';
import usersIcon from 'app/assets/users.svg';
import Icon from 'app/components/Icon/Icon';
import styles from './ActivityBar.module.less';


const colors = [
  'red',
  'green',
  'blue',
  'pink',
  'brown',
]

export default function ActivityBar() {
  const [currentUsers, setCurrentUsers] = useState(0)

  useEffect(() => {
    socket.emit('checkusers', (users: number) => {
      setCurrentUsers(() => users - 1)
    })

    socket.on('users', (users: number) => {
      // User besides current client
      setCurrentUsers(() => users - 1)
    })

    return () => {
      socket.off('users')
    }
  }, [])


  const userDots = [];
  for (let i = 0; i < currentUsers && i < colors.length; i++) {
    userDots.push(
      <div
        key={i}
        className={styles.dot}
        style={{ backgroundColor: colors[i] }}
      />
    )
  }

  const altText = `${currentUsers} additional tasker${currentUsers > 1 ? 's' : ''}`;
  return (
    <div className={styles.wrapper} title={altText}>
      {userDots}
      {currentUsers > 0 && (
        currentUsers > colors.length
          ? <Icon icon={moreUsersIcon} alt={altText} size={20} />
          : <Icon icon={usersIcon} alt={altText} size={20} />
      )}    
    </div>
  )
}
