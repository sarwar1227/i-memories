import React,{useState,useEffect} from 'react';
import { AppBar, Typography, Toolbar, Button , Avatar} from '@material-ui/core';
import camera from '../../images/camera.png';
import useStyles from './styles';
import decode from 'jwt-decode';
import {Link,useHistory,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location=useLocation();

    const logout=()=>{
       dispatch({type:'LOGOUT'});
       history.push("/");  
       setUser(null);
    }  

    useEffect(() =>{
        const token = user?.token;
  
        if(token){
           const decodedToken = decode(token);
           if(decodedToken.exp*1000 < new Date().getTime) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
      },[location])
  
    return (
        <>
            <AppBar color="inherit" position="static" className={classes.appBar}>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" variant="h5" align="center" className={classes.heading}>i-Memories</Typography>
                    <img src={camera} alt="camera" height="60" className={classes.image} />
                </div>
                <Toolbar className={classes.toolbar}>
                     { 
                         user ? (
                             <div className={classes.profile}>
                                   <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                   <Typography className={classes.usernName} variant="h6">{user.result.name}</Typography>
                                   <Button variant="contained" style={{background: 'linear-gradient(to right, #4776E6, #8E54E9)'}} className={classes.logout} color="secondary" onClick={logout}>
                                      Log Out
                                    </Button>
                             </div>
                         ) : (
                             <Button variant="contained" component={Link} to="/auth" color="primary">Sign In</Button> 
                         ) 
                     }
                 </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;