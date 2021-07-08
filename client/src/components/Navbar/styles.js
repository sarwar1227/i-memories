import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 5,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: 28,
  },
  image: {
    marginLeft: '15px',
    width: '40px',
    height: '40px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      borderRadius: 5,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'column',
    },
    image: {
      marginLeft: '10px',
      width: '30px',
      height: '30px'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'center',
      width: '320px',
      padding: '10px 20px',
    },
  }
}));
