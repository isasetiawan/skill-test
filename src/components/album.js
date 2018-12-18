import React, { Component } from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';

class Album extends Component {

    constructor(props){
        super(props)
        this.state = {
            photos:[],
        }
    }

    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/albums/${this.props.match.params.albumId}/photos`)
        .then(res=>res.json())
        .then(photos => this.setState({photos}))
    }

    render(){
        let {photos} = this.state
        return(
            <Segment>

                <Grid relaxed columns={5}>
                    {photos.map(photo=>
                        <Grid.Column>
                            <Image 
                            rounded
                            src={photo.thumbnailUrl}
                            href={photo.url}
                            target='_blank'
                            ></Image>
                            <p>{photo.title}</p>
                        </Grid.Column>
                    )}
                </Grid>
            </Segment>
        )
    }
}

export default Album