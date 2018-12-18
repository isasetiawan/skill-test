import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import {Route} from 'react-router-dom'
import Posts from './posts';
import Post from './post';
import Albums from './albums';
import Album from './album';

class User extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : null
        }
        this.viewSomething = this.viewSomething.bind(this)
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.userId}`) 
        .then(res=>res.json())
        .then(user => this.setState({user}))
    }

    viewSomething(path){
        // console.log(this.props.match.url+'/'+path)
        this.props.history.push(this.props.match.url+'/'+path)
    }

    render(){
        let {user} = this.state
        if (user) {
            return(
                <Grid columns='equal'>
                    <Grid.Column width={5}>
                        <Card
                            fluid
                            image='https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
                            header={`${user.name} (${user.username})`}
                            meta={user.email}
                            description={`Life in ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}. Work at ${user.company.name}`}
                            extra={user.website + " " + user.phone}
                        ></Card>
                        <Button content="Posts" onClick={()=>this.viewSomething('posts')}></Button>
                        <Button content="Albums" onClick={()=>this.viewSomething('albums')}></Button>

                    </Grid.Column>
                    <Grid.Column>
                        <Route path="/:userId/posts/" exact component={Posts} ></Route>
                        <Route path="/:userId/posts/:postId" component={Post} ></Route>

                        <Route path="/:userId/albums/" exact component={Albums} ></Route>
                        <Route path="/:userId/albums/:albumId" component={Album} ></Route>
                    </Grid.Column>

                </Grid>
            )
        } else {
            return <h1>Loading User...</h1>
        }
        
    }
}

export default User