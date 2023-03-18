import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db,auth } from "../../config/myFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormType {
  title: string;
  description: string;
}

export const NewForm = () => {

  const [user] = useAuthState(auth); //getting the name of logged in user as username specified in the posts collection in firebase
  const navigate = useNavigate(); 
  const schema = yup.object().shape({
    title: yup.string().required("Title required"),
    description: yup.string().required("Description required"),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormType>({ resolver: yupResolver(schema) });
  
  const postRef = collection(db,"posts"); //connecting to firebase database to the collection named "posts"
  async function onCreateSubmit (data: CreateFormType)  {
    await addDoc(postRef,{
       ...data,
        username : user?.displayName,
        id : user?.uid
    });
    navigate("/"); 
  }


  
  return (
    <form className="myForm" onSubmit={handleSubmit(onCreateSubmit)}>
      <input placeholder="title.." {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <br />

      <br />
      <br />
      <textarea placeholder="description.." {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <br />
      <br />
      <br />
      <input className="btn" type="submit" />

    </form>
  );
};
