import React, { useEffect, useState } from 'react';
import loaderIcon from 'app/assets/loader.svg';
import styles from './Loading.module.less';


type Props = {
  delay?: number
}

export default function Loading({ delay = 300 }: Props) {
  const [isHidden, setHidden] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(() => false)
    }, delay)

    // Clear timer
    return () => {
      clearTimeout(timer)
    }
  })

  return (
    <div className={`${styles.wrapper} ${isHidden ? styles.hidden : ''}`}>
      <img src={loaderIcon} alt="Loading" className={styles.icon} />
    </div>
  )
}
