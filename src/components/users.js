import React, { Component } from 'react';
import {Grid, Card} from 'semantic-ui-react'

class Users extends Component{
    constructor(props){
        super(props)
        this.selectUser = this.selectUser.bind(this)
        this.state = {
            users:[]
        };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({users}))
    }

    selectUser(id){
        this.props.history.push('/'+id)
    }

    render(){
        const { users } = this.state
        return (
            <div>    
                <Grid stackable columns={5}>
                    {users.map(user=><Grid.Column><Card 
                    key={user.id}
                    onClick={() => this.selectUser(user.id)}
                    header={user.name} 
                    meta={user.email}
                    ></Card></Grid.Column>)}
                </Grid>
            </div>
        )
    }
}

export default Users