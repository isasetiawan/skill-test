import React, { Component } from 'react';
import {Grid, Card, Header, Segment} from 'semantic-ui-react'

class Users extends Component{
    constructor(props){
        super(props)
        this.selectUser = this.selectUser.bind(this)
        this.selectPost = this.selectPost.bind(this)
        this.state = {
            users:[],
            posts:[]
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({users}))

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=> response.json())
        .then(posts => this.setState({posts}))
    }

    selectUser(id){
        this.props.history.push('/'+id+'/posts')
    }

    selectPost(userId,postId){
        this.props.history.push(`/${userId}/posts/${postId}`)
    }

    render(){
        const { users, posts } = this.state
        return (
            <div> 
                <Segment>

                    <Header as="h2">Friends</Header>   
                    <Grid stackable columns={5}>
                        {users.map(user=><Grid.Column><Card 
                        key={user.id}
                        onClick={() => this.selectUser(user.id)}
                        header={user.name} 
                        meta={user.email}
                        ></Card></Grid.Column>)}
                    </Grid>
                </Segment>
                <Segment>

                    <Header as="h2">Time Line</Header>   
                    <Grid stackable columns={5}>
                        {posts.map(post=><Grid.Column><Card 
                        key={post.id}
                        onClick={() => this.selectPost(post.userId, post.id)}
                        header={post.title} 
                        description={post.body}
                        ></Card></Grid.Column>)}
                    </Grid>
                </Segment>
            </div>
        )
    }
}

export default Users