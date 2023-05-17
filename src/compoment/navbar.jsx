import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FollowForm from './common/followForm';



class NavBar extends Component {
    
    render() { 
        return (
            <React.Fragment>
                {this.props.user && 

                    <nav className="navbar navbar-expand-lg bg-light px-5">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="/profile">ba4a</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {this.props.user.userName}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><NavLink className="dropdown-item" to="/logout">Logout</NavLink></li>
                                        </ul>
                                    </li>
                                </ul>
                                <FollowForm />
                            </div>
                        </div>
                    </nav>
                }
                {!this.props.user &&

                    <nav className="navbar navbar-expand bg-light px-5">
                        <div className="container-fluid">
                            <a className="navbar-brand" >ba4a</a>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" aria-current="page" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" to="/signup">Sign Up</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                }       
            </React.Fragment>
        );
    }
}

export default NavBar;