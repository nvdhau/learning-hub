import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  smallAvatar: {
    margin: 10,
    width: 35,
    height: 35,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export default function LetterAvatars(props) {
  const classes = useStyles();
  const avatarShortName = props.author.split(" ").reduce((acc, value) => {
    return acc + value.charAt(0);
  }, "");
  let avatarClass = props.sizeAvatar || 'avatar';
  
  return (
    <Grid container justify="flex-start" alignItems="center">
        {
          avatarClass === 'avatar' ?
          (
            <Avatar className={classes.avatar}>{avatarShortName}</Avatar>
          ) : (
            <Avatar className={classes.smallAvatar}>{avatarShortName}</Avatar>
          )
        }
        
    </Grid>
  );
}
