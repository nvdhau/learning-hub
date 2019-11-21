
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

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class SideBar extends Component {

    render () {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {
                    this.props.tags.length > 0 && (
                        <Paper className={classes.paper}>
                            <Typography variant="subtitle1" gutterBottom>
                                Trending tags
                            </Typography>
                            <List component="nav" dense={true} aria-label="secondary">
                                {this.props.tags.map((tag, index) =>
                                    <ListItemLink key={index} href={'/' + this.props.filterType + '/' + tag.name.slice(1)}>
                                        <ListItemText primary={tag.name} className={classes.tag} />
                                    </ListItemLink>
                                )}
                            </List>
                            <Divider />
                        </Paper> 
                    )
                }
                 
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(SideBar);