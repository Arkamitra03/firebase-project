import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/myFirebase";
import { postType } from "./Home";

interface Props {
  post: postType;
}

// postType interface e sob data r type specify kora ache tai postType ta import kore ekhane just interface baniye bola holo ki Props interface r structure hobe postType r moto


export const Post = (props: Props) => {
  const[like,setLike] = useState<number | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes"); //connectiong the like count to the database
   
  const likeDoc = query(likesRef,where("postId","==",post.id)); //where post id equals
  async function likeCount() {
    const like =await getDocs(likeDoc);
    setLike( like.docs.length);
  }
  
  //button e click hole like akta barbe seta database e giye add hobe
  async function getLike() {
    await addDoc(likesRef,{userId :user?.uid ,postId : post.id});
  }
  useEffect (()=>{
    likeCount();
  },[]);
  return (
    <div>
      <div className="postStyle">
        <h1 style={{color:"green"}}>{post.title}</h1>
        <p>{post.description}</p>
        <div>
          <footer>
            
            <p>post created by: {post.username}</p>
            <p>user id : {post.id}</p>
            <button className="btn" onClick={getLike}>&#128077;</button>
        </footer>
          {like?(<p>likes : {like}</p>):""}
        </div>
      </div>
    </div>
  );
};
