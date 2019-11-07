const generalStyle = theme => ({
  root: {
    flexGrow: 1,
  },
  mainContent: {
    margin: "0px auto",
    padding: "2px 0px"
  },
  paper: {
    padding: theme.spacing(0),
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
  },
});

export default generalStyle;