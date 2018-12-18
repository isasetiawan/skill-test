import React, { Component } from 'react';
import { Card, Comment, Button, Modal } from 'semantic-ui-react';
import CreateUpdatePost from './create-update-post';

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            modal_is_open:false,
            post:null,
            is_editting:false,
            comments:[]
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.deleteConfirm = this.deleteConfirm.bind(this)
        this.doDelete = this.doDelete.bind(this)
    }

    toggleEdit(){
        this.setState({is_editting:!this.state.is_editting})
    }

    deleteConfirm(){
        this.setState({modal_is_open:true})
    }

    doDelete(){
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.state.post.id}`, {
                method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>{
            if (res.status >= 200) this.setState({modal_is_open:false})
            return res
        })
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
                            <Button floated="right" icon="trash" size="tiny" onClick={this.deleteConfirm} color="red"  ></Button>
                            <Button floated="right" icon="edit" size="tiny" onClick={this.toggleEdit} ></Button>

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
                    
                    {/* modal to confirm deletion of the post */}
                    <Modal size='mini' open={this.state.modal_is_open} onClose={() => this.setState({modal_is_open:false})}>
                        <Modal.Header>Delete Your Account</Modal.Header>
                        <Modal.Content>
                            <p>Are you sure you want to delete your account</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={() => this.setState({modal_is_open:false})}>No</Button>
                            <Button positive onClick={this.doDelete} icon='checkmark' labelPosition='right' content='Yes' />
                        </Modal.Actions>
                    </Modal>
                </div>
            )
        } else {
            return <h1>post not loaded</h1>
        }
    }

}

export default Post