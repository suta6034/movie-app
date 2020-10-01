import React, {Suspense, useState, useMemo} from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/Auth";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer"
import MovieDetailPage from "./components/views/MovieDetailPage/MovieDetailPage";
import FavoritePage from "./components/views/FavoritePage/FavoritePage";
import {MoviesContext} from "./MoviesContext";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    const [lengthUpdate, setLengthUpdate] = useState(false);
    const providerValue = useMemo(() => ({lengthUpdate,setLengthUpdate})
    ,[lengthUpdate,setLengthUpdate]);

    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            {/*<MoviesContext.Provider value={providerValue}>*/}
            <NavBar />
            <div style={{ minHeight: 'calc(100vh - 80px)' }}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/movie/:movieTitle" component={Auth(MovieDetailPage, null)} />
                    <Route exact path="/favorite" component={Auth(FavoritePage, true)}/>
                </Switch>
            </div>
            {/*</MoviesContext.Provider>*/}
            <Footer />
        </Suspense>
    );
}

export default App;
