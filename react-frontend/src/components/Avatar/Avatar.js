import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 55,
    height: 55,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  smallAvatar: {
    margin: 10,
    width: 45,
    height: 45,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  xsAvatar: {
    margin: 10,
    width: 35,
    height: 35,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
});

export default function LetterAvatars(props) {
  const classes = useStyles();
  const avatarShortName = props.author.split(" ").reduce((acc, value) => {
    return acc + value.charAt(0);
  }, "");
  let avatarClass = props.sizeAvatar || 'avatar';
  
  return (
    <Grid key={Math.random()} container justify="flex-start" alignItems="center">
        {
          avatarClass === 'avatar' ?
          (
            <Avatar key={Math.random()} className={classes.avatar}>{avatarShortName}</Avatar>
          ) : [
            ( avatarClass === 'smallAvatar' ?
              <Avatar key={Math.random()} className={classes.smallAvatar}>{avatarShortName}</Avatar>
            : 
              <Avatar key={Math.random()} className={classes.xsAvatar}>{avatarShortName}</Avatar>
            )
          ]
        }
        
    </Grid>
  );
}
