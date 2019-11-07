const generalStyle = theme => ({
  root: {
    flexGrow: 1,
  },
  mainContent: {
    margin: "-10px auto",
    padding: "2px 0px"
  },
  paper: {
    padding: theme.spacing(0),
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  homeImg: {
    margin: '0px auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '50%',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "red",
  },
});

export default generalStyle;