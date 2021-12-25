import React, { useState, Fragment } from 'react';
import './App.scss';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Search from "./components/search/Search";
import Alert from "./components/layout/Alert";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profiles/Profile";
import citiesSweden from '../src/citiesSweden'

function App() {
    const [alert, setAlert] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [profiler, setProfiler] = useState({});
    const [countryName, setCountryName] = useState({})

    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=bfbc4a6b5ce64f489ec7d7073fcca80e&lang=de', {
        method: 'GET'
      })
      .then(function(response) { return response.json(); })
      .then(function(json) {
        // use the json
        setCountryName(json.country_name);
        console.log('country', countryName);
      });

    const searchRegion = async (codeList, region, setAlert) => {
        if (citiesSweden.includes(region) || region === '') {
            // const res = await axios.get(`https://api.github.com/search/users?q=language:${langList && frameList ? `${langList}+${frameList}` : langList ? `${langList}` : frameList ? `${frameList}` : `${langList}+${frameList}`}+location:${region ? region : 'sweden'}&client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`)
            const res = await axios.get(`https://api.github.com/search/users?q=language:${codeList ? codeList : ''}+location:${region ? region : countryName}&client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`)
            if (res.data.items < 1) {
                showAlert('Inga profiler hittades baserat på dina val');
            } else {
                setProfiles(res.data.items);
            }
        }
    }

    const getProfile = async (login) => {
        const res = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`)
        setProfiler(res.data);
    }

    const showAlert = (msg) => {
        setAlert({ msg });
        setTimeout(() => [setAlert(null)], 5000);

    }

    const closeAlert = () => {
        setAlert(null);
    }

    return (
        <Router>
            <div className="App" >
                <Navbar />
                <Alert alert={alert} closeAlert={closeAlert} />
                <Switch>
                    <Route exact path='/' render={() => (
                        <Fragment>
                            <Search searchRegion={searchRegion} showAlert={showAlert} profile={profiles} />
                        </Fragment>
                    )} />
                    <Route exact path='/profiles' render={props => (
                        <Profiles {...props} profiles={profiles} />
                    )} />
                    <Route exact path='/profile/:login' render={props => (
                        <Profile {...props} getProfile={getProfile} profiler={profiler} />
                    )} />
                </Switch>
            </div >
        </Router>
    );
}

export default App;
