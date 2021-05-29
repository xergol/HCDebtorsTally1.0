import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

// import Navbar from './components/Navbar';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import { store } from './index'
import PrivateRoute from './components/routing/PrivateRoute'



import Form from './components/Form';
import Search from './components/Search';
import Reports from './components/Reports';
import Details from './components/Details';
import Transaction from './components/Transaction';
import Delete from './components/Delete';
import Edit from './components/Edit';


import './App.css';


function App() {

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);

  return (
    <div>
      <Router history={history}>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/form" component={Form} />
              <PrivateRoute path="/search" component={Search} />
              <PrivateRoute path="/reports" component={Reports} />
              <PrivateRoute path="/details/:id" component={Details} />
              <PrivateRoute path="/transaction/:id" component={Transaction} />
              <PrivateRoute path="/delete/:id" component={Delete} />
              <PrivateRoute path="/edit/:id" component={Edit} />
            </Switch>
          </section>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
