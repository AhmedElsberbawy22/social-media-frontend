import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import NavBar from './compoment/navbar';
import Profile from './compoment/profile';
import Home from './compoment/home';
import Follow from './compoment/follow';
import NotFound from './compoment/not-found';
import Comments from './compoment/comments';
import EditPost from './compoment/editPost';
import LogIn from './compoment/login';
import SignUp from './compoment/signup';
import LogOut from './compoment/logout';
import ProtectedRoute from './compoment/common/protectedRoute';
import auth from './services/authService';

class App extends Component {
  state = {  }
  
  componentDidMount(){
    // with this try catch all pages of app will threw error when it does not have token
    try{
      const user = auth.getCurrentUser();
      this.setState({user});
    }catch(ex){}
  }
  
  render() { 
    const {user} = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className='container'>
          <Switch>
            <ProtectedRoute path='/profile' component={Profile} />
            <ProtectedRoute path='/' exact component={Home}/>
            <ProtectedRoute path='/comments/:id' component={Comments}/>
            <ProtectedRoute path='/post/:id' component={EditPost}/>
            <ProtectedRoute path='/follow' component={Follow}/>
            <Route path='/login' component={LogIn}/>
            <ProtectedRoute path='/logout' component={LogOut}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/not-found' component={NotFound}/>
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}


export default App;
