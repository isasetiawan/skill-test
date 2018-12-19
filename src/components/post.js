import React, { Component } from 'react';
import { Card, Comment, Button, Modal } from 'semantic-ui-react';
import CreateUpdatePost from './create-update-post';
import CreateUpdateComment from './create-update-comment';

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            modal_is_open:false,
            post:null,
            is_editting:false,
            comments:[],
            in_edit_comment:0,
            modal_message:'',
            comment_id_want_to_delete:0
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.deleteConfirm = this.deleteConfirm.bind(this)
        this.doDelete = this.doDelete.bind(this)
        this.doDeleteComment = this.doDeleteComment.bind(this)
    }

    toggleEdit(){
        this.setState({is_editting:!this.state.is_editting})
    }

    deleteConfirm(modal_message, comment_id){
        this.setState({modal_is_open:true, modal_message, comment_id_want_to_delete:comment_id})
    }

    doDelete(){
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.state.post.id}`, {
                method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>{
            if (res.status >= 200) {
                this.setState({modal_is_open:false})
                this.props.history.goBack()
            }
            return res
        })
    }

    doDeleteComment(){
        fetch(`https://jsonplaceholder.typicode.com/comments/${this.state.comment_id_want_to_delete}`, {
                method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>{
            if (res.status >= 200) {
                this.setState({modal_is_open:false})
                window.location.reload()
            }
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
        let {post, comments, is_editting, in_edit_comment} = this.state
        if (post){
            return(
                <div>
                    {is_editting ? <CreateUpdatePost {...this.props} post={this.state.post} ></CreateUpdatePost> : null}
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{post.title}</Card.Header>
                            <Card.Description>{post.body}</Card.Description>
                            <Button floated="right" icon="trash" size="tiny" onClick={() => this.deleteConfirm("post")} color="red"  ></Button>
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
                                                <Comment.Actions>
                                                    <Comment.Action onClick={()=>this.setState({in_edit_comment:comment.id})} >Edit</Comment.Action>
                                                    <Comment.Action onClick={()=>this.deleteConfirm('comment', comment.id)} >Delete</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                            {comment.id !== in_edit_comment ? null
                                                :
                                                <CreateUpdateComment {...this.props} comment={comment} />
                                            }
                                    </Comment>
                                    )}
                                    <CreateUpdateComment {...this.props} />
                            </Comment.Group>
                        </Card.Content>
                    </Card>
                    
                    {/* modal to confirm deletion of the post */}
                    <Modal size='mini' open={this.state.modal_is_open} onClose={() => this.setState({modal_is_open:false})}>
                        <Modal.Header>Do you want to delete this {this.state.modal_message} ?</Modal.Header>
                        <Modal.Actions>
                            <Button negative onClick={() => this.setState({modal_is_open:false})}>No</Button>
                            <Button positive onClick={this.state.modal_message === "post" ? this.doDelete : () => this.doDeleteComment()} icon='checkmark' labelPosition='right' content='Yes' />
                        </Modal.Actions>
                    </Modal>
                </div>
            )
        } else {
            return <h1>Loading post...</h1>
        }
    }

}

export default Post