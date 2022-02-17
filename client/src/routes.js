import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import {UserPage} from './pages/UserPage';
import {RegPage} from './pages/RegPage';
import {NewMessage} from './pages/NewMessage';
import {SendMessages} from './pages/SendMessages';


export const useRoutes = isAuthenticated => {
    
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/messages" caseSensitive={false} element={<UserPage/>} />
                <Route path="/newmessage" caseSensitive={false} element={<NewMessage/>} />
                <Route path="/sendmessages" caseSensitive={false} element={<SendMessages/>} />
                <Route path="*" element={<Navigate to ="/messages"/>} />
            </Routes>
        );
    }

    return (
        <Routes>
                <Route path="/auth" caseSensitive={false} element={<AuthPage/>} />
                <Route path="/register" caseSensitive={false} element={<RegPage/>} />
                <Route path="/login" caseSensitive={false} element={<AuthPage/>} />
                <Route path="*" element={<Navigate to ="/auth"/>} />
        </Routes>
    )
};