import React, {useState, useEffect} from 'react'
import { addTodo , getTodos } from "../Actions/Index";
import { useDispatch } from "react-redux";


const Form = () => {

    
  const [inputData, setInputData] = useState({id : ' ' , first_name : " " , last_name : ' ' , email: ' '});
    const dispatch = useDispatch();

const handleSubmit =  (e)=> {
    e.preventDefault();
        dispatch(addTodo(inputData))
        setInputData({id : ' ' , first_name : " " , last_name : ' ' , email: ' '})

}

useEffect(() => {
  dispatch(getTodos())
}, [dispatch]);
      
        


  return (
    <>
    <h1 className='text-center text-bg-secondary m-5'><strong>Todo List With Redux + Firebase</strong></h1>
    <form className="row g-3 mx-5 px-5 needs-validation"  onSubmit={handleSubmit}>
  <div className="col-md-3">
    <label htmlFor="validationCustom01 needs-validation"  className="form-label">First name</label>
    <input type="text" className="form-control" placeholder="First Name" id="validationCustom01" value={inputData.first_name} onChange={(e)=>{setInputData({...inputData ,first_name : e.target.value})}} required />
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-3">
    <label htmlFor="validationCustom02" className="form-label">Last name</label>
    <input type="text" className="form-control" placeholder="Last Name" id="validationCustom02" value={inputData.last_name} onChange={(e)=>{setInputData({...inputData  , last_name : e.target.value})}} required/>
    
  </div>
  <div className="col-md-3">
    <div className="input-group has-validation">
      <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={inputData.email} onChange={(e)=>{setInputData({...inputData  , email : e.target.value})}} required/>
</div>
    </div>
  </div>
  <div className="col-12 mx-5">
    <button  className="btn btn-secondary btn-sm text-bg-secondary "   type="submit" >Add Todo</button>
  </div>
</form>
      
    </>
  )
}

export default Form
