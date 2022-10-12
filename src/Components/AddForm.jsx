import React, { useState } from "react";
import { addTodo, Button_loadding, getTodos } from "../Actions/Index";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const Form = () => {
  const btn_loading = useSelector((state) => state.todoReducers.button_loading);

  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(inputData));
    dispatch(Button_loadding(true));
    setTimeout(() => {
      setInputData({id: '' , first_name: "", last_name: "", email: "" });
      
    }, 1000);
  };

  return (
    <>
      <h1 className="text-center text-bg-secondary m-5">
        <strong>Todo List With Redux + Firebase</strong>
      </h1>

      <h3 className="  mx-5">
        <strong>ADD A TODO...</strong>
      </h3>
      

      <div className="wrapper d-flex justify-content-center  ">
        <form className="row  needs-validation" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              id="validationCustom01"
              value={inputData.first_name}
              onChange={(e) => {
                setInputData({ ...inputData, first_name: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              id="validationCustom02"
              value={inputData.last_name}
              onChange={(e) => {
                setInputData({ ...inputData, last_name: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-md-3">
            <div className="input-group has-validation">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={inputData.email}
                  onChange={(e) => {
                    setInputData({ ...inputData, email: e.target.value });
                  }}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
              <button
                className="btn btn-secondary  btn-md text-bg-success "
                type="submit"
              >
               {btn_loading ? (
              <Spinner />
            ) : '+'  }
              </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
