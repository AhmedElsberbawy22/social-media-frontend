import React, { Component } from 'react';
import Posts from './common/posts';
import {getProfilePosts} from '../services/postService';
import auth from '../services/authService';
import {deletePost} from '../services/postService';


class Profile extends Component {
    state = { 
        posts:[],
    };

    async componentDidMount(){
        const {userName} = auth.getCurrentUser();
        const {data: posts} = await getProfilePosts(userName);
        this.setState({posts});
    }
    handleDelete = async post => {
        try {
            await deletePost(post._id);
        } catch (error) {
            return alert(error);
        }
        const originalPosts = this.state.posts;
        const posts = originalPosts.filter(p => p._id !== post._id);
        this.setState({posts})
    }
    
    render() { 
        return (
            <div id="viewport">
                <div id="content">
                    <div className="card mt-4 ">
                        <div className="card-header text-center ">
                            <h4>My posts</h4>
                        </div>
                        
                        <div id='posts' className="card-body">
                            
                            <Posts onDelete={this.handleDelete} state={this.state} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;