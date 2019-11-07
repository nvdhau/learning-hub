import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Trending" icon={<WhatshotIcon />} />
        <Tab label="News" icon={<FiberNewIcon />} />
        <Tab label="Follows" icon={<SubscriptionsIcon />} />
      </Tabs>
    </Paper>
  );
}
