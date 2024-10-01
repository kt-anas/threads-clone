// src/store/Providers.tsx

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

/**
 * A React component that wraps its children with the Redux Provider component.
 *
 * @param children The children elements to be wrapped.
 * @returns The children elements wrapped with the Redux Provider component.
 */
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
