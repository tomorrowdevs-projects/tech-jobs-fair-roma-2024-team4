import React from 'react';

import { Navigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;