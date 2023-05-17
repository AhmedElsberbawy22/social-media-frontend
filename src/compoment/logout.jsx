import React, { Component } from 'react';

class Logout extends Component {
    componentDidMount(){
        localStorage.removeItem('token');
        window.location = '/login';
    }
    state = {  } 
    render() { 
        return null;
    }
}
 
export default Logout;