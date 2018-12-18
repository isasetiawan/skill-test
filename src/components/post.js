import React, { Component } from 'react';
import { Card, Comment, Button } from 'semantic-ui-react';
import CreateUpdatePost from './create-update-post';

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            post:null,
            is_editting:false,
            comments:[]
        }

        this.toggleEdit = this.toggleEdit.bind(this)
    }

    toggleEdit(){
        this.setState({is_editting:!this.state.is_editting})
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
        let {post, comments, is_editting} = this.state
        if (post){
            return(
                <div>
                    {is_editting ? <CreateUpdatePost {...this.props} post={this.state.post} ></CreateUpdatePost> : null}
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{post.title}</Card.Header>
                            <Card.Description>{post.body}</Card.Description>
                            <Button floated="right" onClick={this.toggleEdit}>Update</Button>
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
                </div>
            )
        } else {
            return <h1>post not loaded</h1>
        }
    }

}

export default Post