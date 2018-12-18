import React, { Component } from 'react';
import { Card, Grid, Button, Feed } from 'semantic-ui-react';

class User extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : null
        }
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.userId}`) 
        .then(res=>res.json())
        .then(user => this.setState({user}))
    }

    render(){
        let {user} = this.state
        if (user) {
            return(
                <Grid>
                    <Grid.Row>
                        <Card
                            header={`${user.name} (${user.username})`}
                            meta={user.email}
                            description={`Life in ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}. Work at ${user.company.name}`}
                            extra={user.website + " " + user.phone}
                        ></Card>
                    </Grid.Row>
                </Grid>

            )
        } else {
            return <h1>User not loaded</h1>
        }
        
    }
}

export default User