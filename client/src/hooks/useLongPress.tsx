import React, { useEffect } from 'react';

export default function useLongPress(onLongPress: (ev: React.TouchEvent) => any, touchDuration: number = 500) {
  let timer: NodeJS.Timeout;

  const startTimer = (ev: React.TouchEvent) => {
    // Re-assigning event so we can keep a ref if react cleans up
    // (https://reactjs.org/docs/events.html#event-pooling)
    const event = ev;
    timer = setTimeout(() => onLongPress(event), touchDuration); 
  }
  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  }

  useEffect(() => {
    // Clear timeout on component unmount
    return clearTimer;
  }, [])

  const style: React.CSSProperties = {
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none'
  }

  return {
    // Prevent Content Menus
    onContextMenu: (ev: React.MouseEvent) => ev.preventDefault(),
    onTouchStart: startTimer,
    onTouchEnd: clearTimer,
    onTouchMove: clearTimer,
    style,
  };
}
