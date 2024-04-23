import React from "react";
import { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";


function UpdateUsers() {

  const {id} = useParams()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [age, setAge] = useState() 
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/getuser/'+id)
    .then(result => {
      console.log(result) 
      // Reset the values after successful submission
      setName(result.data.name);
      setEmail((result.data.email));
      setAge((result.data.age));
    })
    .catch(err => console.log(err))
  }, [])

  const updateHandler = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/updateUsers/"+id, { name, email, age })
      .then(result => {
        console.log(result)
        navigate('/')
      })
      .catch(err => console.log(err));

  }

    return(
        <>
        <div className="container vh-100 d-flex justify-content-center align-items-center flex-column">
          <form onSubmit={updateHandler}>
        <div className="col-6">
        <label htmlFor="" className="form-label">Name</label>
        <input type="text" className="form-control"  value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
      </div>
        <div className="col-6">
        <label htmlFor="" className="form-label">Email address</label>
        <input type="email" className="form-control"  value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="col-6">
      <label htmlFor="" className="form-label">Age</label>
        <input type="number" className="form-control" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
        <button class="btn btn-primary mt-3" >Update</button>
      </div>
      </form>
      </div>
      </>
    );
}

export default UpdateUsers;