import { db } from "../firebase_config";

import {
  addDoc,
  collection,
  query,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "@firebase/firestore";


export const addTodo = (newData) => async (dispatch) => {
  try {
    await addDoc(collection(db, "todolist-firebase-redux"), {
      first_name: newData.first_name,
      last_name: newData.last_name,
      email: newData.email,
    });
  
    dispatch({
      type: "Add_Todo",
      payload: newData,
    });
    
  } catch (error) {
    console.error(error)
    
  }
};

export const deleteTodo = (id) => async (dispatch) => {

  try {
    const userDoc = doc(db , "todolist-firebase-redux", id)
      await deleteDoc(userDoc)
  
    dispatch({
      type: "Delete_Todo",
      payload: id,
    });
    
  } catch (error) {
    console.error(error)
    
  }
};

export const getTodos = () => async (dispatch) => {

  try {
    const data = await getDocs(collection(db ,"todolist-firebase-redux" ))
    const todoArray = data.docs.map((doc)=>({  id:doc.id,   ...doc.data()}))
    
    dispatch({
      type: "Get_Todos",
      payload: todoArray,
    });
    
  } catch (error) {
    console.error(error)
    
  }
};




export const editTodo = (updatedDoc) => async (dispatch) => {

  try {
    const userDoc = doc(db , "todolist-firebase-redux", updatedDoc.id)
    const newFields = {email : updatedDoc.email , first_name: updatedDoc.first_name , last_name : updatedDoc.last_name}
    await updateDoc(userDoc , newFields)
  
    dispatch({
              type: "Edit_Todo",
              updatedDoc,
            });
  }catch(err){
    alert(err)
    console.error(err)
  }
   
  

}


export function Loading(status){
  return {
    type : 'loading',
    payload : status

  }
};

export function Button_loadding(status){
  return {
    type : 'button_loading',
    payload : status

  }
};
