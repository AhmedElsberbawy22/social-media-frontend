import React, { Component } from 'react';
import { likes, likesNum } from '../../services/likeService';




class Like extends Component {
    state = {
        like: {noOfLikes: 0 },
    }

    async componentDidMount(){
        const {data: like}  = await likesNum(this.props.postId);
        this.setState({like});
        this.setState({isLiked: this.props.liked});
    }
    
    doLike = async () =>{
        try{
            await likes(this.props.postId);
            let like = {...this.state.like}
            const {data: noOfLikes}  = await likesNum(this.props.postId);
            like.noOfLikes = noOfLikes;
            const lik = like.noOfLikes;
            this.setState({like: lik});

        }catch(ex){
            alert(ex);
        }
    }
    render() { 
        return (
            <div>
                <i 
                onClick={() => this.doLike()} 
                className="fa fa-heart-o"
                aria-hidden="true" 
                style={{fontSize: 25, cursor: "pointer"}}>


                </i>
                <p className=" card px-2">
                    {this.state.like.noOfLikes}
                </p>
            </div>
        );
    }
}


export default Like;