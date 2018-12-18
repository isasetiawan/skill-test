import React, { Component } from 'react';
import {Card, Feed} from 'semantic-ui-react'

class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
        this.selectPost = this.selectPost.bind(this)
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.userId}/posts`)
        .then(res=>res.json())
        .then(posts => this.setState({posts}))
    }

    selectPost(id){
        this.props.history.push(this.props.match.url+'/'+id)
    }

    render(){return(
        <Card fluid>
            <Card.Content>
                <Card.Header>Posts</Card.Header>
            </Card.Content>
            <Card.Content>
                <Feed>
                    {this.state.posts.map(post=>
                        <Feed.Event onClick={()=>this.selectPost(post.id)}>
                            <Feed.Content>
                                <h3>{post.title}</h3>
                                <Feed.Summary>
                                    {post.body}
                                </Feed.Summary>
                                <br></br>
                            </Feed.Content>
                        </Feed.Event>
                    )}
                </Feed>
            </Card.Content>
        </Card>
    )}
}

export default Posts