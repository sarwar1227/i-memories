import React,{useState,useEffect} from 'react';
import useStyles from './styles.js';
import {Typography,Paper,TextField,Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import FileBase from 'react-file-base64';
import {createPost,updatePost} from '../../actions/posts';
import {useSelector} from 'react-redux';

const Form = ({currentId,setCurrentId}) =>{
  const[postData,setPostData] = useState({
     title:'',message:'',tags:[],selectedFile:''
  });
   
  const post = useSelector((state) => currentId ? state.posts.find((p)=>p._id===currentId) : null);

  const classes = useStyles();
  const dispatch = useDispatch();
   
  const user = JSON.parse(localStorage.getItem('profile'));
  
  useEffect(()=>{
      if(post){
        setPostData(post);
      }      
  },[post])

  const handleSubmit = (e) => {
     e.preventDefault();
     
     if(currentId){
       dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
     }
     else{
       dispatch(createPost({...postData,name:user?.result?.name}));
     }

     clear();
  }

  const clear = () =>{
    setCurrentId(null);    
    setPostData({
          title:'',message:'',tags:[],selectedFile:''
       });
  }

  if(!user?.result?.name){
    return(
      <>
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please Sign In To Create Your Memories Or Like Someone's Else Memories.
          </Typography>
        </Paper>
      </>
    )
  }

  return(
        <>
          <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6" fullWidth>{currentId ? `Editing` : `Creating`} A Memory</Typography>
          
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=> setPostData({...postData,title:e.target.value})} />
          
          <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=> setPostData({...postData,message:e.target.value})} />
          
          <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData,tags:e.target.value.split(",")})} />
          
          <div className={classes.fileInput}>
             <FileBase 
                  type="file" 
                  multiple={false} 
                  onDone={({base64})=>
                      setPostData(
                        {...postData,selectedFile:base64}
                      )
                    }
              />
          </div>

          <Button className={classes.buttonSubmit} fullWidth variant="contained" color="primary" size="large" type="submit"  >Submit</Button>
          <Button fullWidth size="small" variant="contained" className={classes.buttonClear} color="secondary" onClick={clear}>Clear</Button>
          </form>
          </Paper>
        </>
    )
}

export default Form;