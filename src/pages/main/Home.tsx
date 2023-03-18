import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/myFirebase";
import { useState, useEffect } from "react";
import { Post } from "./post-structure";

export interface postType {
  id: string;
  title: string;
  description: string;
  username: string;
}

export const Home = () => {
  const [post, setPost] = useState<postType[] | null>(null);
  const postRef = collection(db, "posts"); //accessing the posts to show on the home page

  async function getPost() {
    const dataPost = await getDocs(postRef);
    setPost(
      dataPost.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      })) as postType[]
    );
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {post?.map((item) => (
        <Post post={item}/>
      ))}

    </div>
  );
};
