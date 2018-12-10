import React from 'react';

type Props = {
  size?: number,
  title?: string,
  icon: string,
  alt: string,
}

export default function Icon({ size = 25, icon, alt, title }: Props) {
  return (
    <img
      src={icon}
      alt={alt}
      title={title}
      style={{
        width: size,
        height: size,
      }}
    />
  )
};
