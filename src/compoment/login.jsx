import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from './common/input';
import {login} from '../services/authService';
import Joi from 'joi-browser';


class LogIn extends Component {
    state = { 
        data: { userName: '', password: ''},
        errors: {}
    };

    schema = {
        userName: Joi.string().required().min(5).label('Username'),
        password: Joi.string().required().min(10).label('Password')
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly:false});
        if(!result.error) return null;
        const errors = {};
        for(let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
      };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
    

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
    };
    handleSubmit = e =>{
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.doSubmit();
    }

    doSubmit = async () => {
        try{
            const {data} = this.state;
            const {data: jwt} = await login(data.userName, data.password);
            localStorage.setItem("token", jwt);
            // this.props.history.push('/'); give delay in updating navbar
            window.location = '/'; // this will give a full reload

        }catch(ex){
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.userName = ex.response.data;
                this.setState({errors: errors || {}});
                console.log(errors)
            }
        }
    };

    render() { 
        return (
            <div className="row mt-5">
                <div className="col">
                    <h1 className="card-title">ba4a</h1>
                    <p style={{fontSize: 22}} className="card-text">ba4a helps you connect and share with the people in your life.</p>

                </div>
                <div className="col-sm-7">
                    <div className="card">
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <Input 
                                name="userName" 
                                type="text"
                                label="Username:" 
                                placeholder="Enter user name"
                                value={this.state.data.userName} 
                                onChange={this.handleChange} 
                                error={this.state.errors['userName']}
                            />
                            
                            <Input 
                                name="password" 
                                type="password"
                                label="Password:" 
                                placeholder="Enter user password"
                                value={this.state.data.password} 
                                onChange={this.handleChange} 
                                error={this.state.errors['password']}
                            />
                            


                            <div className="d-grid mx-auto text-center mb-5">
                                <button type="submit" className="btn btn-secondary">Log in</button>
                            </div>
                            <div className="card-footer">
                                <div className="d-grid mx-auto text-center">
                                    <Link to='/signup' className="btn btn-dark">Create new account</Link>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;