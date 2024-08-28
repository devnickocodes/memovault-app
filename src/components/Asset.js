import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Asset.module.css';

/**
 * Renders a container that can optionally display a loading spinner, an image, and a message.
 */
const Asset = ({
  spinner,
  src,
  message,
  height,
  width,
  borderRadius,
}) => (
  <div className={`${styles.Asset} p-4`}>
    {spinner && <Spinner animation="border" />}
    {src && (
      <img
        src={src}
        alt={message}
        height={height}
        width={width}
        style={{ borderRadius }}
      />
    )}
    {message && <p className="mt-4">{message}</p>}
  </div>
);

export default Asset;
