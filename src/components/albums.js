import React, { Component } from 'react';
import {Card, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Albums extends Component {

    constructor(props){
        super(props)
        this.state = {
            albums : []
        }
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.userId}/albums`)
        .then(res=>res.json())
        .then(albums => this.setState({albums}))
    }

    render(){return(
        <Card fluid>
            <Card.Content>
                <Card.Header>Albums</Card.Header>
            </Card.Content>
            <Card.Content>
                <List>
                    {this.state.albums.map(album=>
                    <List.Item>
                        <List.Content>
                            <List.Header>
                                <Link to={`${this.props.match.url}/${album.id}`}>{album.title}</Link>
                            </List.Header>
                        </List.Content>
                    </List.Item>
                    )}
                </List>
            </Card.Content>
        </Card>
    )}
}

export default Albums