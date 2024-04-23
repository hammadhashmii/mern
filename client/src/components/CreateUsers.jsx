import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateUsers=()=> {
    
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [age, setAge] = useState()
  const navigate = useNavigate()


  const SubmitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createUsers", { name, email, age })
      .then(result => {
        console.log(result)
        navigate('/');
        // Reset the values after successful submission
        setName('');
        setEmail('');
        setAge('');
      })
      .catch(err => console.log(err));
  }

    return(
        <>
        <div className="container vh-100 d-flex justify-content-center align-items-center flex-column">
          <form onSubmit={SubmitHandler}> 
        <div className="col-6">
        <label htmlFor="" className="form-label">Name</label>
        <input type="text" className="form-control"  placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
        <div className="col-6">
        <label htmlFor="" className="form-label">Email address</label>
        <input type="email" className="form-control"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="col-6">
      <label htmlFor="" className="form-label">Age</label>
        <input type="number" className="form-control"  placeholder="Age"  value={age} onChange={(e) => setAge(e.target.value)}/>
        
      </div>
      <button className="btn btn-primary mt-3">Create</button>
      </form>
      </div>
      </>
    );
}

export default CreateUsers;