import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul>
      <li><Link to="/form">Debtors Form</Link></li>
      <li><Link to="/search">Debtors List</Link></li>
      <li><Link to="/reports">Reports</Link></li>
      <li><a onClick={logout} href="#!"><i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">Logout</span></a>
      </li>
    </ul>
  )
  const guestlinks = (
    <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> HC Debtors Tally</Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestlinks}</Fragment>)}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
