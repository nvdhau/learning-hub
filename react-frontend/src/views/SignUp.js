import React from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../assets/jss/views/signup';
import { accountSignUp } from '../actions/authenticate';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer } from 'react-toastify';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            fullname: ''
        }

        this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.auth_message.success !== this.props.auth_message.success) {
            this.props.history.push('/login');
        }
    }

    handleCreateAccount (e) {
        const fullName = [e.target.firstName.value, e.target.lastName.value].join(' ');
        const bodyData = {
            email: e.target.email.value,
            password: e.target.password.value,
            fullName: fullName,
            username: fullName.replace(/\s/g, '').toLowerCase()
        }
        
        this.props.signUp(bodyData);
        e.preventDefault();
    }

    render () {
        const { classes } = this.props;
        return (
            <React.Fragment>
                { this.props.auth_processing && <LinearProgress color="secondary" /> }
                <Container component="main" maxWidth="xs">
                <ToastContainer />   
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleCreateAccount}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration and updates via email."
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end" className={classes.gridContainer}>
                            <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth_processing: state.auth.auth_processing,
        auth_message: state.auth.auth_message
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        signUp: payload => dispatch(accountSignUp(payload))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)((withStyles(styles)(SignUp)));