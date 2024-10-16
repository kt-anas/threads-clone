// src/store/Providers.tsx

'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './store';
import App from 'next/app';
import { fetchUserData } from './reducers/userSlice';
import { setName } from './reducers/signupSlice';


const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
        storeRef.current.dispatch(setName ('anas'))
    }
    return <Provider store={ storeRef.current}>{children}</Provider>;
};

export default Providers;
