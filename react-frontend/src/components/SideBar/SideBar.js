
import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import styles from '../../assets/jss/views/sideBar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class SideBar extends Component {
    
    render () {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {/* TODO LOAD ALL CATEGORIES, TAGS, Subscriptions from API */}
                <Paper className={[classes.paper, classes.root]}>
                    <Typography variant="subtitle1" gutterBottom>
                        Categories
                    </Typography>
                    <List component="nav" dense={true} aria-label="secondary mailbox folders">
                        <ListItemLink href="#simple-list">
                            <ListItemText primary="Accountant" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list">
                            <ListItemText primary="CSIS" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list">
                            <ListItemText primary="Supply Chain Management" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list">
                            <ListItemText primary="Commerce" />
                        </ListItemLink>
                    </List>
                </Paper>  
                {/* LOAD FOLLOWS FROM API */}
                <Paper className={[classes.paper, classes.root]}>
                    <Typography variant="subtitle1" gutterBottom>
                        Follows
                    </Typography>
                    <List dense className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <BeachAccessIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                    </List>
                </Paper>  
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(SideBar);