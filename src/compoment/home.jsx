import React, { Component } from 'react';
import Posts from './common/posts';
import {getHomePosts} from '../services/postService';
import {deletePost} from '../services/postService';


class Home extends Component {
    state = { 
        posts:[],
    };

    async componentDidMount(){
        const {data: posts} = await getHomePosts();
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
                        <Posts onDelete={this.handleDelete} state={this.state} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;