import React from 'react';

type Props = {
  size?: number,
  icon: string,
  alt: string,
}

export default function Icon({ size = 25, icon, alt }: Props) {
  return (
    <img
      src={icon}
      alt={alt}
      style={{
        width: size,
        height: size,
      }}
    />
  )
};
