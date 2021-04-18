import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';
import LocationsComponent from 'screens/locations/LocationsComponent';
import ServiceCategoriesComponent from 'screens/serviceCategories/ServiceCategoriesScreen';
import UsersComponent from 'screens/users/UsersComponent';
import OrdersComponent from 'screens/OrderComponent/OrdersComponent';
import ServicesComponent from 'screens/services/ServicesComponent';

const DashboardComponent = lazy(() => import('../screens/dashboard'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.overviewTwo} render={() => <div>overviewTwo</div>} />
                <Route exact path={SLUGS.locations} component={LocationsComponent} />
                <Route
                    exact
                    path={SLUGS.serviceCategories}
                    component={ServiceCategoriesComponent}
                />
                <Route exact path={SLUGS.users} component={UsersComponent} />
                <Route exact path={SLUGS.orders} component={OrdersComponent} />
                <Route exact path={SLUGS.services} component={ServicesComponent} />

                <Route exact path={SLUGS.overviewThree} render={() => <div>overviewThree</div>} />
                <Route exact path={SLUGS.overview} render={() => <div>overview</div>} />

                <Route exact path={SLUGS.maintainsTwo} render={() => <div>maintainsTwo</div>} />
                <Route exact path={SLUGS.maintainsThree} render={() => <div>maintainsThree</div>} />
                <Route exact path={SLUGS.maintains} render={() => <div>maintains</div>} />
                <Route exact path={SLUGS.contacts} render={() => <div>contacts</div>} />
                <Route exact path={SLUGS.admins} render={() => <div>admins</div>} />
                <Route exact path={SLUGS.feedbacks} render={() => <div>feedbacks</div>} />
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Route exact path={SLUGS.subscription} render={() => <div>subscription</div>} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
