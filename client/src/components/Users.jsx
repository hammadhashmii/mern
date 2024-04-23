import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';


function Users() {
    
    const [users, setUsers] = useState([])
    // const navigate = useNavigate()

    useEffect(() => {
      axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
    }, [])

    // const deleteHandler = (id) => {
    //   const confirmDelete = window.confirm("Please confirm to delete!");
    
    //   if (confirmDelete) {
    //     axios.delete("http://localhost:3001/deleteusers/" + id)
    //       .then(result => {
    //         console.log(result);
    //         // navigate('/fdfdf');
    //         window.location.reload();
    //       })
    //       .catch(err => console.log(err));
    //   }
    // }

    

const deleteHandler = (id) => {
  Swal.fire({
    title: 'Please confirm to delete!',
    text: 'Are you sure you want to delete this item?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete("http://localhost:3001/deleteusers/" + id)
        .then(result => {
          console.log(result);
          // navigate('/fdfdf');
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  });
}

 

    return(
        <>
        <div className="container vh-100 d-flex justify-content-center align-items-center">
        
        <table className="table">
        <thead>
        <Link to='createuser' className="btn btn-primary">Add User</Link>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
  {
    users.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
        <td><Link to={`/updateuser/${user._id}`} className="btn btn-primary">Edit</Link>
        <button className="btn btn-danger" onClick={(e) => deleteHandler(user._id)}>Delete</button></td>
       
      </tr>
    ))
  }
</tbody>
      </table>
      </div>
      </>
    );
}

export default Users;