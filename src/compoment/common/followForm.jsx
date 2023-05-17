import React, { Component } from 'react';
import Joi from 'joi-browser';
import {follow} from '../../services/followService';



class FollowForm extends Component {
    state = { 
        data: { userName: '' },
        errors: {}
    };
    
    schema = {
        userName: Joi.string().required().min(5).label('Username'),
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
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.doSubmit();
        const data = {userName: ''};
        this.setState({data});
    }
    
    doSubmit = async () => {
        try{
            await follow(this.state.data);
            window.location = '/';
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
        const error = this.state.errors['userName'];
        return (
            <React.Fragment>
                {error && <p className="mt-3 mx-3 text-danger">{error}</p>}
                <form className="d-flex" role="search" onSubmit={this.handleSubmit}>
                    <input
                        name="userName" 
                        value={this.state.data.userName}
                        onChange={this.handleChange}
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Follow new people" 
                        aria-label="Follow"/>
                        
                    <button className="btn btn-outline-dark" type="submit">Follow</button>
                </form>
                
            </React.Fragment>
        );
    }
}
 
export default FollowForm;