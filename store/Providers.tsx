// src/store/Providers.tsx

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
