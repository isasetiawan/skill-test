import React, { Component } from 'react';
import {Card, Feed} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import CreateUpdatePost from './create-update-post';

class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.userId}/posts`)
        .then(res=>res.json())
        .then(posts => this.setState({posts}))
    }

    render(){return(
        <div>
            <CreateUpdatePost {...this.props} ></CreateUpdatePost>
            <Card fluid>
                <Card.Content>
                    <Card.Header>Posts</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                        {this.state.posts.map(post=>
                            <Feed.Event>
                                <Feed.Content>
                                    <h3><Link to={this.props.match.url+'/'+post.id}>{post.title}</Link></h3>
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
        </div>
    )}
}

export default Posts