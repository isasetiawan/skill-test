import React, { Component } from 'react';
import {Grid, Card} from 'semantic-ui-react'

class Users extends Component{
    constructor(props){
        super(props)

        this.state = {
            users:[]
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({users}))
    }


    render(){
        const { users } = this.state
        return (
            <Grid stackable columns={5}>
                {users.map(user=><Grid.Column><Card 
                header={user.name} 
                meta={user.email}
                ></Card></Grid.Column>)}
            </Grid>
        )
    }
}

export default Users