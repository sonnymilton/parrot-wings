import React from 'react';
import {Admin, Resource, fetchUtils, ListGuesser, ShowGuesser} from 'react-admin';
import {Route} from 'react-router-dom';
import Login from "./login";
import jsonServerProvider from 'ra-data-json-server'
import authProvider from './authProvider';
import Register from './register'
import {transactionList, transactionShow, transactionCreate} from "./transaction";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }

    const {token} = JSON.parse(localStorage.getItem('user'));
    options.headers.set('X-AUTH-TOKEN', token);

    return fetchUtils.fetchJson(url, options);
};

const App = () => (
    <Admin
        authProvider={authProvider}
        loginPage={Login}
        dataProvider={jsonServerProvider(process.env.REACT_APP_API_URL, httpClient)}
        customRoutes={[
            <Route exact path="/register" component={Register} noLayout/>
        ]}
    >
        <Resource name='transaction' create={transactionCreate} show={transactionShow} list={transactionList}/>
        <Resource name='user'/>
    </Admin>
);

export default App;
