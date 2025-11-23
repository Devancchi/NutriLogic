import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AuthSwitch from './auth';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';

function App() {
    return (
        <div className='w-full overflow-hidden'>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthSwitch />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
        </div>
        
    );
}

export default App;
