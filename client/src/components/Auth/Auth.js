import React, { useState } from 'react'
import { Avatar, Button, Grid, Typography, Paper, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Input from './Input';
import Icon from './icon';
import { signIn,signUp } from '../../actions/auth.js';

const initialState={
    firstName:'', lastName:'', email:'', password:'', confirmPassword:''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    
    const [formData,setFormData] = useState(initialState);
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
          dispatch(signUp(formData,history));
        }
        else{
          dispatch(signIn(formData,history));
        } 
        
    }

    const handleChange = (e) => {
          setFormData({...formData,[e.target.name]:e.target.value});
    }
    
    const handleShowPassword = () => setShowPassword((prev) => !prev)

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
        setShowPassword(false);
    }

    const googleSuccess = async(res) => {
           const result = res?.profileObj;
           const token = res?.tokenId;
           try{
                dispatch({type:"AUTH",data:{result,token}});
                history.push("/");
           }catch(err){
               console.log(err);
           }

    }
    const googleFailure = (err) => {
          console.log(err);
          console.log("Google Sign In Failed ! TRY AGAIN Later");
    }
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevatoin={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <>
                                    <Input name="firstName" label={"First Name"} type="text" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label={"Last Name"} type="text" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label={"Email Address"} type="email" handleChange={handleChange} />
                            <Input name="password" label={"Password"} type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                            {
                                isSignUp && <Input name="confirmPassword" label={"Repeat Password"} type="password" handleChange={handleChange} />
                            }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> {isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                        <GoogleLogin
                            clientId="524246046661-3opijtusivnm8aet4f9artp4daftion2.apps.googleusercontent.com"
                            render={(renderProps) => (
                          <Button 
                            className={classes.googleButton}      
                            variant="contained"
                            fullWidth
                            color="primary" 
                            onClick={renderProps.onClick}
                            startIcon={ <Icon/> }
                            disabled={renderProps.disabled}
                         >Sign In With Google</Button>)}
                           onSuccess={googleSuccess}
                           onFailure={googleFailure}
                           cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>{isSignUp ? 'Already Have An Account ? Sign In' : "Don't Have an account ? Sign Up"}</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Auth;
