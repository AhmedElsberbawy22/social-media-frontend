import React, { Component } from 'react';
import { savePost } from '../../services/postService';




class AddPost extends Component {
    state = { 
        post: { body: '' },
    };
    handleChange = ({ currentTarget: input }) => {
        const post = { ...this.state.post };
        post[input.name] = input.value;
        this.setState({ post });

    };
    handleSubmit = async (post) =>{
        try{
            await savePost(post);
            window.location = '/profile';

        }catch(ex){
            alert(ex);
        }
    }

    render() { 
        return (
            <div className='card bg-light'>
                <div className="card-body text-muted pt-4 px-3">
                    <form 
                        className="input-group mb-3" 
                        onSubmit={(event) => {
                            event.preventDefault();
                            this.handleSubmit(this.state.post);
                        }}>
                        <input 
                            name='body'
                            value={this.state.post.body}
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            placeholder="Create a new post" 
                            id='createpost'
                            />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="submit"
                                >Post</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddPost;