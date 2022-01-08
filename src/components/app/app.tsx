import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeRoute } from '../../routes/home.route';
import { MainAppRoute } from '../../routes/main-app.route';
import './app.css';
import routes from '../../routes/route-constants';
import PrivateRoute from '../../routes/private.route';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '../../hooks/store/use-app-dispatch.hook';
import { restoreLogin } from '../../store/slices/user.slice';
import { selectUser } from '../../store/selectors';
import CustomizedSnackbar from '../ui/snackbar/snackbar';
import { useAppSelector } from '../../hooks/store/use-app-selector.hook';

function App() {
    const { uid } = useAppSelector(selectUser);
    const auth = getAuth();
    const dispatch = useAppDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user && !uid) {
            dispatch(restoreLogin());
        }
    });

    return (
        <div className="App">
            <CustomizedSnackbar />
            <Router>
                <Switch>
                    <Route exact path={routes.HOME}>
                        <HomeRoute />
                    </Route>
                    <Route exact path={routes.SIGN_UP}>
                        <HomeRoute />
                    </Route>
                    <PrivateRoute exact={false} component={MainAppRoute} path={routes.AUTHENTICATED_AREA} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
