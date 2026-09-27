import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

Object.defineProperty(window.navigator, 'userAgent', {
  value: 'node.js',
  configurable: true
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});
