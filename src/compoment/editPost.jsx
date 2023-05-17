import React, { Component } from 'react';
import {getPost} from '../services/postService';
import {editPost} from '../services/postService';



class EditPost extends Component {
    state = { 
        post:[],
    };

    async componentDidMount(){
        const {data: post} = await getPost(this.props.match.params.id);
        if(!post) return this.props.history.replace('/not-found');
        this.setState({post});
    };

    handleChange = ({ currentTarget: input }) => {
        const post = { ...this.state.post };
        post[input.name] = input.value;
        this.setState({ post });

    };

    handleSubmit = async () =>{
        try{
            await editPost(this.state.post);
            window.location = '/profile';
        }catch(ex){
            alert(ex);
        }
    }

    render() { 
        return (
            <div className="card m-5">
                <div className="card-body text-black ">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h5 className='mx-5 mt-2'>{this.state.post.userName}</h5>
                        </div>
                    </div>
                    <div className='mx-2'>
                        <p>{this.state.post.body}</p>
                    </div>
                </div>
                <div className='card-footer'>
                <form 
                        className="input-group mb-3" 
                        onSubmit={() => {
                            this.handleSubmit();
                        }}>
                        <input 
                            name='body'
                            value={this.state.post.body}
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            id='editpost'
                            />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="submit"
                                >Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default EditPost;