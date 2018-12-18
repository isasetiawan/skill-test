import React, { Component } from 'react';
import {Card, Feed} from 'semantic-ui-react'

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
                <Feed>
                    {this.state.albums.map(album=>
                        <Feed.Event>
                            <Feed.Content>
                                <Feed.Summary>
                                    {album.title}
                                </Feed.Summary>
                            </Feed.Content>
                        </Feed.Event>
                    )}
                </Feed>
            </Card.Content>
        </Card>
    )}
}

export default Albums