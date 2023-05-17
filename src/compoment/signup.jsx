import React, { Component } from 'react';
import Input from './common/input';
import {signUp} from '../services/userService';
import Joi from 'joi-browser';


class SignUp extends Component {
    state = { 
        data: { userName: '', password: ''},
        errors:{}
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
            const response = await signUp(this.state.data);
            window.location = '/login';
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
            <div className="card row position-absolute top-50 start-50  translate-middle" style={{ width: '27rem'}}>
                <div className="card-header">
                    <h3>Sign Up</h3>
                    <p>It's quick and easy.</p>
                </div>
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
                        label="Password:" 
                        type="password"
                        placeholder="Enter user password"
                        value={this.state.data.password} 
                        onChange={this.handleChange} 
                        error={this.state.errors['password']}
                    />
                    <div className="d-grid mx-auto col-5 text-center ">
                        <button 
                            type="submit" 
                            className="btn btn-dark"
                        >Sign up</button>
                    </div>
                    
                </form>
                </div>
            </div>
        );
    }
}

export default SignUp;