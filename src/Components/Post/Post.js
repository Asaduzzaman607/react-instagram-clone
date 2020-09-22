import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {db, storage} from '../../firebase';
import firebase from 'firebase';


const Post = ({user,postId,username, caption, imageUrl}) => {

    const[comments, setComments] =useState([])
    const [comment,setComment] = useState('');
    useEffect(()=>{
        let unsubscribe;
    if(postId){
        unsubscribe =db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            setComments(snapshot.docs.map((doc)=>doc.data()));
        })
    }
    return ()=>{
        unsubscribe();
    }
    },[postId])
    const postComment = (event) =>{
        event.preventDefault();
        db.collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
            text: comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
        
    }

    

    return (
        <div style={{justifyContent: 'center'}} className="post  ">
              
            {/* header -> avatar+ username */}
            <div className="post__header">
            <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg">
              </Avatar>
            <h3>{username}</h3>
        
            </div>
         

            {/* image */}
            <img className='post__image' src={imageUrl} alt=""/>

            {/* username+caption */}
                <h4 className='post__text'><strong id='post__username'>{username}</strong>{caption}</h4>
                <div className="post-comments">
                { comments.map((comment) =>(
                     <p>
                        <strong>{comment.username}</strong> {comment.text}
                     </p>
                ))
                 
                } 

                </div>
                { user && (
                    <form className="post-comment-box" >
                        <input
                        className="post-input"
                        type="text"
                        placeholder="add a comment"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                        />
                        <button
                        disabled={!comment}
                        className="post-button"
                        type="submit"
                        onClick={postComment}
                        >
                        Post
                        </button>
            </form>

                )}

               
        </div>
    );
};

export default Post;