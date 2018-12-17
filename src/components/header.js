import React, { Component } from 'react';
import {Grid, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Header extends Component {
    render(){
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Link to='/'>Home</Link>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Link to='/users'>Users</Link>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Header;