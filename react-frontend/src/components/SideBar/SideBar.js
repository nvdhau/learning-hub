
import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import styles from '../../assets/jss/views/sideBar';
import { getTags } from '../../actions/tags';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
    }

    componentDidMount() {
        getTags()
            .then(tags => {
                this.setState({tags: tags})
            }).catch(err => {
                console.log(err)
            })
    }

    render () {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {/* TODO LOAD ALL CATEGORIES, TAGS, Subscriptions from API */}
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1" gutterBottom>
                        Trending tags
                    </Typography>
                    {
                        this.state.tags.length > 0 && (
                            <List component="nav" dense={true} aria-label="secondary">
                                {this.state.tags.map((tag, index) =>
                                    <ListItemLink key={index} href={'/' + this.props.filterType + '/' + tag.name.slice(1)}>
                                        <ListItemText primary={tag.name} className={classes.tag} />
                                    </ListItemLink>
                                )}
                            </List>
                        )
                    }
                    <Divider />
                </Paper>  
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(SideBar);