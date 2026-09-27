import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Example from './components/Example';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Example />
  </StrictMode>
);
