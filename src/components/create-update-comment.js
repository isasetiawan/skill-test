import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class CreateUpdateComment extends Component {

    constructor(props){
        super(props)

        this.state={
            ...props.comment,
            is_loading : false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitComment = this.submitComment.bind(this)
    }

    submitComment(){
        let {name, email, body, id} = this.state;
        let postId = this.props.match.params.postId
        
        this.setState({is_loading:true})

        fetch(`https://jsonplaceholder.typicode.com/comments/${id?id:''}`, {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify({name, email, body, postId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>{
            if (res.status >= 200){
                // window.location.reload()
                if(this.props.reload) this.props.reload()
            }
            this.setState({is_loading:false})
            return res
        })
        .then(response => response.json())
        .then(json => console.log(json))
    }

    handleInputChange(event){
        const target = event.target
        const name = target.name
        this.setState({
            [name]:target.value
        })
    }

    render(){
        let {name, email, body, is_loading } = this.state;
        return (
            <Form reply onSubmit={this.submitComment}>
                <Form.Input  onChange={this.handleInputChange} name="name" value={name}  placeholder="Name"></Form.Input>
                <Form.Input  onChange={this.handleInputChange} name="email" value={email}  placeholder="E-mail" type="email"></Form.Input>
                <Form.TextArea  onChange={this.handleInputChange} name="body" value={body}  placeholder="write your comment here" />
                <Button loading={is_loading} content='Submit Comment' labelPosition='left' icon='edit' primary />
            </Form>
        )
    }
}

export default CreateUpdateComment