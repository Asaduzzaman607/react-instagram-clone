import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Components/Post/Post';
import {db, auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './Components/ImageUpload/ImageUpload'
import InstagramEmbed from 'react-instagram-embed'
// mu
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [user, setUser] = React.useState(null);
  const[openSignIn, setOpenSignIn] = React.useState('')
 
  useEffect(() =>{

    const unsubscribe=auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        //user has logged in..

        console.log(authUser)
        setUser(authUser)

      
      } 
      else{
        // user has logged out
        setUser(null)
      }
    })
    return ()=>{
      unsubscribe()
    }
  },[user, username])

  // useEffect runs a piece of code based on a specific condition

  useEffect(()=>{
    
    // every single time a new post added, this code added to fires...
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{

      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      })));
      
    }) 

  },[])
  const signUp =(e) =>{
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));
    setOpen(false);

  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignIn(false)
  }
  
  
 
  return (
    <div className="App">
      <h2 className="lead" style={{borderBorder: '2px solid gray', textAlign: 'center', padding:'20px'}}>Welcome to Asaduzzaman Sajeeb's  cloned instagram app...Have fun!</h2>
      {
        user?.displayName?(
          <ImageUpload username={user.displayName}></ImageUpload>

        ): (
          <h3 style={{textAlign:'center'}}>Sorry you must need to login to upload</h3>
        )
      }
    

      <Modal
        open={open}
        onClose={() => setOpen(false)}
       
      >
       <div style={modalStyle} className={classes.paper}>
         
         <form className="app-signup" >
      <center>
      <img className="app-header-image"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="instagram-logo"></img>
      </center>

      <Input
        placeholder="username"
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <Button type="submit" onClick={signUp}>Sign Up</Button>
      
      
      </form>
          
      
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
       
      >
       <div style={modalStyle} className={classes.paper}>
         <form className="app-signup" >
      <center>
      <img className="app-header-image"
      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="instagram-logo"></img>
      </center>
      <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <Button type="submit" onClick={signIn}>Sign In</Button>
      
      
      </form>
          
      
        </div>
      </Modal>

      
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
        
      {
        user?
        (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        )
      }
      </div>
      <div className="app-posts row">
        <div className="app-post-left col-lg-5 offset-1 col-md-6 col-sm-12 ">
          
      {
        posts.map(({id,post}) =>(<Post key={id} user={user} username={post.username} postId={id} caption={post.caption} imageUrl={post.imageUrl}></Post>))
      }

        </div>

      
      <div className="app-post-right col-lg-5 offset-1 col-md-6 col-sm-12">
      
      <InstagramEmbed
        url='https://www.instagram.com/p/BOCt0mMAC8v/?utm_source=ig_embed&amp;utm_campaign=loading'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}} 
        onFailure={() => {}}
        />

      <InstagramEmbed
        url='https://www.instagram.com/p/B5yDr9ijFlM/?utm_source=ig_embed&amp;utm_campaign=loading'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}} 
        onFailure={() => {}}
        />
        <InstagramEmbed
        url='https://www.instagram.com/p/B3UwH17D7f7/?utm_source=ig_embed&amp;utm_campaign=loading'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}} 
        onFailure={() => {}}
        />
        <InstagramEmbed
        url='https://www.instagram.com/p/BzYxsRTD8je/?utm_source=ig_embed&amp;utm_campaign=loading'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}} 
        onFailure={() => {}}
        />
       
         <InstagramEmbed
        url='https://www.instagram.com/p/CEQc_84luRm/?utm_source=ig_embed&amp;utm_campaign=loading'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}} 
        onFailure={() => {}}
        />
    </div>
    </div> 
    
    

      
      

       {/* Header */}
      {/* posts */}
      {/* posts */}
    </div>
  );
}

export default App;
