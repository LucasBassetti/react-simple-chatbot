import React from 'react';
import LoadingStep from './LoadingStep';

const Loading = () => (
  <span
    className="rsc-loading"
    role="status"
    aria-label="Typing"
    style={{
      alignItems: 'center',
      display: 'inline-flex',
      gap: 4,
      height: '1lh',
      minHeight: '1.45em',
      verticalAlign: 'top'
    }}
  >
    <LoadingStep $delay="0s" />
    <LoadingStep $delay=".15s" />
    <LoadingStep $delay=".3s" />
  </span>
);

export default Loading;
