import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Translate from './Translate';
import TranslationHistory from './TranslationHistory';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Set up Firebase Auth listener to manage user session state
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unsubscribe; // Cleanup the listener on component unmount
    }, []);

    return (
        <Router>
            <Routes>
                {/* Signup Route */}
                <Route path="/register" element={<Signup />} />

                {/* Login Route */}
                <Route path="/login" element={<Login setUser={setUser} />} />

                {/* Protected Routes for authenticated users only */}
                <Route
                    path="/"
                    element={user ? <Translate userId={user.uid} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/history"
                    element={user ? <TranslationHistory userId={user.uid} /> : <Navigate to="/login" />}
                />

                {/* Redirect unknown routes to the main page or login */}
                <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
