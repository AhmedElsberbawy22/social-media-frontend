import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddPost from './addPost';
import Like from './like';
import auth from '../../services/authService';

class Posts extends Component {
    
    render() { 
        const {state} = this.props;
        const {userName} = auth.getCurrentUser();
        return (
            <div id='posts' className="card-body">
                <AddPost />
                {state.posts.map(post => (
                    <div key={post._id}>
                        <div className="card mx-5 my-4 bg-light">
                            <div className="card-body text-black ">

                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <h5 className='mx-5 mt-2'>{post.userName}</h5>
                                    </div>
                                </div>
                                <div className='mx-2'>
                                    <p>{post.body}</p>
                                </div>
                            </div>

                            <div className="card-footer  d-flex justify-content-between px-5">
                                
                                <Like postId={post._id} />


                                {/* comment */}
                                <Link 
                                    className="fa fa-comment-o text-dark"  
                                    to={`/comments/${post._id}`}
                                    aria-hidden="true" 
                                    style={{fontSize: 30, cursor: "pointer", textDecoration: 'none'}}
                                ></Link>
                                {userName === post.userName &&
                                    <React.Fragment>
                                        {/* edit */}
                                        <Link 
                                            className="fa fa-wrench text-dark" 
                                            to={`/post/${post._id}`} 
                                            style={{fontSize: 30, cursor: "pointer", textDecoration: 'none'}}
                                        ></Link>


                                        {/* delete */}
                                        <i 
                                            onClick={() => this.props.onDelete(post)}
                                            className="fa fa-trash-o"  
                                            aria-hidden="true" 
                                            style={{fontSize: 30, cursor: "pointer"}}
                                        ></i>
                                    </React.Fragment>
                                    }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;