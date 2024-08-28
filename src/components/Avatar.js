import React from 'react';
import styles from '../styles/Avatar.module.css';

/**
 * Renders an avatar image with optional text and adjustable height and width
 */
const Avatar = ({ src, height = 45, text }) => (
  <span>
    <img
      className={styles.Avatar}
      src={src}
      height={height}
      width={height}
      alt="avatar"
    />
    {text}
  </span>
);

export default Avatar;
