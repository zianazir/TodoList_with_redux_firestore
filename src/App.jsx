import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button_loadding , getTodos,Loading, deleteTodo, editTodo } from "./Actions/Index";
import AddForm from "./Components/AddForm";
import Spinner from "./Components/Spinner";
import Spinner2 from "./Components/Spinner2";
import {Button, Form ,Modal} from 'react-bootstrap';

const App = () => {

  const [editNewTodo, seteditNewTodo] = useState({
    id : '',
    first_name: "",
    last_name: "",
    email: "",
  });

  const list = useSelector((state) => state.todoReducers.list);
  const loading = useSelector((state) => state.todoReducers.loading);
  const btn_loading = useSelector((state) => state.todoReducers.button_loading);


  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos())
    if(list.length === 0 ){
      dispatch(Loading(false))
 }else{
   dispatch(Loading(true))
 }
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleClose = () => setShow(false) 

  const handleShow = (elem) => {
    setShow(true) 
     seteditNewTodo(elem)
    };

  const handleSubmit = (editNewTodo) =>{
    return new Promise((resolve)=>{
      setShowLoading(true)
      dispatch(Button_loadding(true))
      setTimeout(() => {
        dispatch(Button_loadding(false))
        setShowLoading(false)
        setShow(false)
      }, 1000)
      dispatch(editTodo(editNewTodo))
      resolve()
    })
  
  }
  return (
    <>
   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>{e.preventDefault() , handleSubmit(editNewTodo)}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
              value = {editNewTodo.first_name}
              onChange={(e) => {
                seteditNewTodo({
                  ...editNewTodo,
                  first_name: e.target.value,
                  
                })}}
                type="text"
                autoFocus
                required
              />
               <Form.Label>Last Name</Form.Label>
              <Form.Control
               value = {editNewTodo.last_name}
               onChange={(e) => {
                 seteditNewTodo({
                   ...editNewTodo,
                   last_name: e.target.value,
                 })}}
                type="text"
                autoFocus
                required
              />
               <Form.Label>Email</Form.Label>
              <Form.Control
                value = {editNewTodo.email}
                onChange={(e) => {
                  seteditNewTodo({
                    ...editNewTodo,
                    email: e.target.value,
                  })}}
                type="email"
                autoFocus
                required 
              />
            </Form.Group>
         
        {showLoading ? <Spinner2/> :  <Button variant="warning" className="btn btn-sm" type='submit'>
            Save Changes
          </Button>}
            
          </Form>
        </Modal.Body>
      </Modal>
    
    <AddForm />
      {loading ? <Spinner/> :<table className="table text-center m-5 text-bg-light">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {list.map((elem) => {
          return (
            <tbody key={elem.id}>
              <tr >
                <td>{elem.first_name}</td>
                <td>{elem.last_name}</td>
                <td>{elem.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.preventDefault(), dispatch(deleteTodo(elem.id));
                    }}
                  >
                    Done
                  </button>
                  <Button variant="warning mx-1 sm" className="btn btn-sm" onClick={()=>handleShow(elem)}> Edit  </Button>
              
                    
                  
                </td>
              </tr>
            </tbody>
          );
        })}
      </table> }
      </>
  );
};

export default App;
