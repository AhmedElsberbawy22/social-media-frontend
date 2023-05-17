import React, { Component } from 'react';
import {deleteComment} from '../services/commentService';
import {getPost} from '../services/postService';
import {addComment} from '../services/commentService';



class Comments extends Component {
    state = { 
        post:[],
        comments:[],
        comment:{body: ''}
    };

    async componentDidMount(){
        const {data: post} = await getPost(this.props.match.params.id);
        if(!post) return this.props.history.replace('/not-found');
        const {comments} = post;
        this.setState({post, comments});
    };

    handleChange = ({ currentTarget: input }) => {
        const comment = { ...this.state.comment };
        comment[input.name] = input.value;
        this.setState({ comment });

    };

    handleSubmit = async (comment) =>{
        try{
            await addComment(this.props.match.params.id, comment);
            const comments = [...this.state.comments, comment];
            this.setState({ comments });

        }catch(ex){
            alert(ex);
        }
    }
    // state ={
    //     comments: this.props.comments,
    // }

    // handelDelete = async (comment) => {
    //     const originalComments = this.state.comments;
    //     const comments = originalComments.filter(c => c._id !== comment._id);
    //     this.setState({comments});
    //     await deleteComment(comment);
    // }


    render() { 
        return (
            <div class="card m-5">
                <div className="card-body  text-black ">
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
                        onSubmit={(event) => {
                            this.handleSubmit(this.state.comment);
                        }}>
                        <input 
                            name='body'
                            value={this.state.comment.body}
                            onChange={this.handleChange}
                            type="text" 
                            className="form-control" 
                            placeholder="Create a new comment" 
                            id='createcomment'
                            />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="submit"
                                >comment</button>
                        </div>
                    </form>
                    {this.state.comments && this.state.comments.map( c => ( 
                        <div className='border bg-white p-2 mx-5 my-2'>
                            <h5  className='mx-3'>{c.userName}</h5>
                            <p>{c.body}</p>
                        </div>))}
                    
                </div>
            </div>
        );
    }
}

export default Comments