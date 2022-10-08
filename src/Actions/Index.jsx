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

export const addTodo = (data) => async (dispatch) => {
  await addDoc(collection(db, "todolist-firebase-redux"), {
    id: new Date().getTime().toString(),
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
  });

  dispatch({
    type: "Add_Todo",
    payload: data,
  });
};

export const deleteTodo = (id) => async (dispatch) => {
  const todo = query(collection(db, "todolist-firebase-redux"));
  const newTodo = await getDocs(todo);
  for (var snap of newTodo.docs) {
    const data = snap.data();
    if (data.id === id) {
      await deleteDoc(doc(db, "todolist-firebase-redux", snap.id));
    }
  }

  dispatch({
    type: "Delete_Todo",
    payload: id,
  });
};

export const getTodos = () => async (dispatch) => {
  //  onSnapshot(collection(db ,"todolist-firebase-redux" ), (snapshot)=>{
  //   if(snapshot.docs.length > 0 ){
  //       const todoArray = [];
  //           for (var snap of snapshot.docs) {
  //             const data = snap.data();
  //             todoArray.push(data);
  //           }
  //           dispatch({
  //             type: "Get_Todos",
  //             payload: todoArray,
  //           });
  //   }
  // })
  const todo = query(collection(db, "todolist-firebase-redux"));
  const newTodo = await getDocs(todo);
  if (newTodo.docs.length > 0) {
    const todoArray = [];
    for (var snap of newTodo.docs) {
      const data = snap.data();
      todoArray.push(data);
    }
    dispatch({
      type: "Get_Todos",
      payload: todoArray,
    });
  }
};

export const editTodo = (payload) => async (dispatch) => {
  const todo = query(collection(db, "todolist-firebase-redux"));
  const newTodo = await getDocs(todo);
  for (var snap of newTodo.docs) {
    const data = snap.data();
    if (data.id === payload.id) {
      const update = doc(db, "todolist-firebase-redux", snap.id);
      await updateDoc(update, {
        id: payload.id,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
      });
      dispatch({
        type: "Edit_Todo",
        payload,
      });
    }
  }
};
