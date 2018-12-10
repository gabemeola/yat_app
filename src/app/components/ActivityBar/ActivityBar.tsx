import React, { useEffect, useState } from 'react';
import socket from 'app/config/socket';
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

  return (
    <div className={styles.wrapper} title={`${currentUsers} additional taskers`}>
      {userDots}
      {currentUsers > colors.length && '+'}
    </div>
  )
}
