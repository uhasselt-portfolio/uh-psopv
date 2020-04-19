import React, {Component} from 'react';
import {Paper, Grid} from '@material-ui/core';
import UserDatatInterface from '../../interfaces/UserDataInterface';


interface IProps {
    postName: string,
    items: string[],
    users: UserDatatInterface[]
}

class Post extends Component<IProps> {

    render() {

        return(
            <Paper>
                <Grid container direction="row" justify="space-evenly">
                    <Grid item>
                        postnaam
                    </Grid>
                    <Grid item>
                        dropdown vrijwilligers
                    </Grid>
                    <Grid item>
                        dropdown items
                    </Grid>
                    <Grid item>
                        dropdown changebutton?
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Post;