import React, { Component } from 'react';

class Follow extends Component {
    state = { 
        group: { groupID: '', groupName: ''}
    }

    handleSumbit = (e) =>{
        e.preventDefault(); // prevent full page reload when submitting form
    }
    handleChange = (e) => {
        const group = {...this.state.group};
        group.groupID = e.currentTarget.value;
        this.setState({ group });
    }  
    render() { 
        return (
            <div>
                <div className="contariner mt-5">
                    <div className="card">
                        <h5 className="card-header bg-secondary py-3 text-white">Follow new people</h5>
                        <div className="card-body">
                            <form onSubmit={this.handleSumbit}>
                                <div className="form-group">
                                    <label htmlFor="groupid" style={{fontSize:20}}><strong>User name</strong></label>
                                    <input
                                        value={this.state.group.groupID}
                                        onChange={this.handleChange}
                                        type="text" 
                                        className="form-control my-3" 
                                        id="groupid" 
                                        placeholder="Enter user name" />
                                </div>
                                <div className="d-grid col-5 mx-auto text-center">
                                    <button type="submit" className="btn btn-secondary">Follow</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="contariner mt-5">
                    <div className="card">
                        <h5 className="card-header bg-secondary py-3 text-white">Unfollow</h5>
                        <div className="card-body">
                            <form onSubmit={this.handleSumbit}>
                                <div className="form-group">
                                    <label htmlFor="groupid" style={{fontSize:20}}><strong>User name</strong></label>
                                    <input
                                        value={this.state.group.groupID}
                                        onChange={this.handleChange}
                                        type="text" 
                                        className="form-control my-3" 
                                        id="groupid" 
                                        placeholder="Enter user name" />
                                </div>
                                <div className="d-grid col-5 mx-auto text-center">
                                    <button type="submit" className="btn btn-secondary">Unfollow</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Follow;