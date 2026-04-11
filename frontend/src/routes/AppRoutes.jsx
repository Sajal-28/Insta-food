import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import { getSessionRole, isFoodPartnerSession, isUserSession } from '../utils/session';

const UserAppLayout = ({ children }) => (
    <>
        {children}
        <BottomNav />
    </>
);

const UserRoute = ({ children }) => {
    if (isUserSession()) {
        return children;
    }

    if (isFoodPartnerSession()) {
        return children;
    }

    return <Navigate to="/user/login" replace />;
};

const FoodPartnerRoute = ({ children }) => {
    const role = getSessionRole();

    if (role === 'foodPartner') {
        return children;
    }

    if (role === 'user') {
        return <Navigate to="/" replace />;
    }

    return <Navigate to="/food-partner/login" replace />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<ChooseRegister />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                <Route path="/" element={<UserRoute><UserAppLayout><Home /></UserAppLayout></UserRoute>} />
                <Route path="/saved" element={<UserRoute><UserAppLayout><Saved /></UserAppLayout></UserRoute>} />
                <Route path="/create-food" element={<FoodPartnerRoute><CreateFood /></FoodPartnerRoute>} />
                <Route path="/food-partner/:id" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes
