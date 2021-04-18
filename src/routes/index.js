import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from 'hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';

function Routes() {
    const { pathname } = useLocation();
    // eslint-disable-next-line no-unused-vars
    const [width, height] = useWindowSize();

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDZmY2Y1NjJmYTEwZTI2OGQwMjU2YTciLCJlbWFpbCI6ImFkbWluQG9uZWNhbGwuY29tIiwiaWF0IjoxNjE4NDEzMTUwLCJleHAiOjE2MTg0MTY3NTB9.ppqAL9-yH1-opTp1DzFyznucnthiD_Irymez62kAIoE'
        );
    }, [pathname]);

    const isUserLoggedIn = true;
    return isUserLoggedIn ? <PrivateSection /> : <PublicRoutes />;
}

export default Routes;
