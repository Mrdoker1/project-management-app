import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);
