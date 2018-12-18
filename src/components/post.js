import React, { Component } from 'react';
import { Card, Comment } from 'semantic-ui-react';

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            post:null,
            comments:[]
        }
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.postId}`) 
        .then(res=>res.json())
        .then(post => this.setState({post}))

        fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.postId}/comments`) 
        .then(res=>res.json())
        .then(comments => this.setState({comments}))
    }

    render(){
        let {post, comments} = this.state
        if (post){
            return(
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{post.title}</Card.Header>
                        <Card.Description>{post.body}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Comment.Group>
                            {comments.map(comment=>
                                <Comment>
                                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                    <Comment.Content>
                                        <Comment.Author>{comment.name}</Comment.Author>
                                        <Comment.Metadata>{comment.email}</Comment.Metadata>
                                        <Comment.Text>{comment.body}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                                )}
                        </Comment.Group>
                    </Card.Content>
                </Card>
            )
        } else {
            return <h1>post not loaded</h1>
        }
    }

}

export default Post