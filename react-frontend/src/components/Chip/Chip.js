import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    boxShadow: 'none !important',
  },
  chip: {
    margin: theme.spacing(0.3),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  
  const chipData = props.tags.split(" ").map((value, index) => {
      return {key: index, label: value}
  });

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        let icon;
        return (
          <Chip
            variant="outlined" color="primary"
            key={data.key}
            icon={icon}
            label={data.label}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}
