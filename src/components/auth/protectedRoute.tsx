import React, {useCallback} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/config/hooks';
import { useVerifyTokenQuery } from '@/redux/features/auth/auth.service';
import Loading from '../loading';

const ProtectedRoute = () => {
    const authStatus = useAppSelector((state) => state.authReducer.status);
    const accessToken = useAppSelector((state) => state.authReducer.accessToken);
    const { data, error } = useVerifyTokenQuery();

    const determineRedirect = useCallback(() => {
        if(authStatus === "loading") return;
        if (!accessToken) return '/login';
        if (error || data?.code === 401) return '/login';
        if (error) return '/fail';
    }, [accessToken, error, data?.code, authStatus]);

    const redirect = determineRedirect();

    if (redirect) return <Navigate to={redirect} />;

    return <Outlet />;
};

export default ProtectedRoute;
