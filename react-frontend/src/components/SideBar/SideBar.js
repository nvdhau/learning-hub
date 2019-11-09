
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
                        Trending tags
                    </Typography>
                    <List component="nav" dense={true} aria-label="secondary">
                        <ListItemLink href="#simple-list">
                            <ListItemText primary="webserver" className={classes.tag} />
                        </ListItemLink>
                        <ListItemLink href="#simple-list" className={classes.tag}>
                            <ListItemText primary="linux" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list" className={classes.tag}>
                            <ListItemText primary="accounttax" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list" className={classes.tag}>
                            <ListItemText primary="excelmaster" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list">
                            <ListItemText primary="webserver" className={classes.tag} />
                        </ListItemLink>
                        <ListItemLink href="#simple-list" className={classes.tag}>
                            <ListItemText primary="linux" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list" className={classes.tag}>
                            <ListItemText primary="accounttax" />
                        </ListItemLink>
                        <ListItemLink href="#simple-list" className={classes.tag}>
                            <ListItemText primary="excelmaster" />
                        </ListItemLink>
                    </List>
                    <Divider />
                </Paper>  
                {/* LOAD FOLLOWS FROM API */}
                <Paper className={[classes.paper, classes.root]}>
                    
                </Paper>  
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(SideBar);