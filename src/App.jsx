import React, { useState ,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button_loadding,getTodos,Loading, deleteTodo, editTodo } from "./Actions/Index";
import Form from "./Components/Form";
import Spinner from "./Components/Spinner";
import Spinner2 from "./Components/Spinner2";

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

  return (
    <div className="container  mt-5">
      <div 
        className="modal fade " 
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Todo
              </h1>
  
            </div>
            <form onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(editTodo(editNewTodo ))
                  dispatch(Button_loadding(true));
                  // console.log(editNewTodo)
                }}>
            <div className="modal-body">
              <label >First Name</label>
              <input
                type="text " className="form-control"
                value={editNewTodo.first_name}
                onChange={(e) => {
                  seteditNewTodo({
                    ...editNewTodo,
                    first_name: e.target.value,
                    
                  });
                }}
              required/><br/>
              <label >Last Name</label>
              <input
                type="text " className="form-control"
                value={editNewTodo.last_name}
                onChange={(e) => {
                  seteditNewTodo({
                    ...editNewTodo,
                    last_name: e.target.value,
                  
                  });
                }}
              required/><br/>
              <label >Email</label>
              <input
                type="email" className="form-control"
                value={editNewTodo.email}
                onChange={(e) => {
                  seteditNewTodo({
                    ...editNewTodo,
                    email: e.target.value,
                  });
                }}
              required /><br/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              
              
              <button
                type="submit"
                className="btn btn-sm btn-success"
                 
              >
               {btn_loading ? <Spinner2/> :  "Save Changes"}
              </button>
             

            </div>
            </form>
            

            
          </div>
        </div>
      </div>
      <Form />
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
                  <button
                    type="button"
                    className="btn btn-sm btn-warning mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>{ seteditNewTodo(elem)}}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table> }

      
        
       
        
    </div>
  );
};

export default App;
