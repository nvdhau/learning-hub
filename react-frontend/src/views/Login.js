import React from 'react';
import { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../assets/jss/views/login';
import { doSignInWithEmailAndPassword, getCurrentUserAuth, doSignOut } from '../actions/authenticate';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        getCurrentUserAuth()
            .then(user => {
                if (user) {
                    console.log("USER SIGNED IN, SO REDIRECT TO HOME PAGE");
                    this.props.history.push('/');
                } else {
                    console.log("USER SIGNED OUT");
                    this.props.history.push('/login');
                }
            })
    }

    handleLogin (e) {
        const email = e.target.email.value;
        const password = e.target.password.value;
        doSignInWithEmailAndPassword(email, password);
        e.preventDefault();
    }

    render () {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container className={classes.gridContainer}>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login);