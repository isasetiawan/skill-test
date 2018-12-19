import React, { Component } from 'react';
import {Segment, Form} from 'semantic-ui-react'

class CreateUpdatePost extends Component {

    constructor(props){
        super(props)

        this.state = {
            ...props.post,
            userId:this.props.match.params.userId,
            is_loading:false,
            is_success:false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event){
        const target = event.target
        const name = target.name
        this.setState({
            [name]:target.value
        })
    }

    handleSubmit(event){
        this.setState({is_loading:true})
        this.setState({is_success:false})

        let {title, body, userId, id} = this.state;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id?id:''}`, {
                method: id ? 'PUT' : 'POST',
                body: JSON.stringify({title, body, userId}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>{
            if (res.status >= 200) {
                this.setState({is_success:true})
                if(this.props.reload) this.props.reload()
            }
            return res
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(()=>this.setState({is_loading:false}))
        event.preventDefault();
    }


    render(){
        return(
            <Segment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input value={this.state.title} onChange={this.handleInputChange} name="title" label="Title" placeholder="Title"></Form.Input>
                    <Form.TextArea value={this.state.body} onChange={this.handleInputChange} name="body" label='Post' placeholder='Post about what you think here' />
                    <Form.Button primary loading={this.state.is_loading}>Submit</Form.Button>
                    {this.state.is_success ? <p>Post Submitted</p> : <p></p>}
                </Form>
            </Segment>
        )
    }
}

export default CreateUpdatePost