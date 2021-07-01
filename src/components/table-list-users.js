import React, {useState} from "react";
import axios from "axios"
import "../dashboard.css"
import {Link} from "react-router-dom";
import {Modal, Button} from "react-bootstrap";

function TableDisplayUsers({users}){


    // Modal Logic
   const [show, setShow] = useState(false);
   const [id, setId] = useState(null);

    const handleClose= () => {
        setShow(false);
        setId(null);
    }

    const handleShow = (id) => {
        setShow(true);
        setId(id)
    };

    // Handling deletion of user
    //   DELETE request to API 
    const deleteUser = async () => {
        
        var api_link = "http://localhost:5000/delete/" + id
        const response = await axios.delete(api_link);
        if (response.status !== 200) {
        throw new Error(`Server Error: ${response.status}`); 
        }
    }

// Dealing with form submission to update the record
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
        // Request to the API
      await deleteUser();

    //   Closing the Modal
      handleClose();

      alert('Deletion of user was successful !');
    
    } catch (e) {
      alert(`Deletion failed! ${e.message}`);
    }
  }

  const dotStyleActive = {
        height: "12px",
        width: "12px",
        backgroundColor: "green",
        borderRadius: "50%",
        display: "inline-block",
        marginRight : "5px"
  }

  const dotStyleNotActive = {
        height: "12px",
        width: "12px",
        backgroundColor: "red",
        borderRadius: "50%",
        display: "inline-block",
        marginRight : "5px"
  }


    return(
        <div>
                <table className="table table-striped table-class" id="table-id">
                            <thead>
                                <tr>
                                    <th style={{width: "7%"}}>UserID</th>
                                    <th style={{width: "12%"}}>Name</th>
                                    <th style={{width: "15%"}}>Email</th>
                                    <th style={{width: "10%"}}>Phone</th>
                                    <th style={{width: "10%"}}>Address</th>
                                    <th style={{width: "15%"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                            {/* Inserting new table rows from the api data */}
                                {users.map(item => {
                                    return (
                                            <tr>
                                            <td>{item.userid}</td>
                                                <td>{
                                                    item.activityStatus === "Yes" ? 
                                                        <p><span className = "dot" style = {dotStyleActive}></span>{item.name}</p>:  
                                                        <p><span className = "dot" style = {dotStyleNotActive}></span>{item.name}</p>
                                                }</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    
                                                <Link to = {{
                                                    pathname :"update-user",
                                                    data : item
                                                }}>
                                                     <button type = "button" className = "action_btn"
                                                        style = {{marginRight : "3px"}}
                                                     >Edit</button>
                                                </Link>
                                                                            
                                                <button type="button" className="action_btn" onClick={() => handleShow(item.userid)}>Delete</button>
                                                   
                                                   
                                                </td>
                                                </tr>
                                    )
                                })}
                               
                                
                            </tbody>
                        </table>
                       {/* Modal Code */}
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                        <Modal.Title>Delete User</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>Are you sure you want to delete the id - {id}?</Modal.Body>
                                                        <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="danger" onClick={onSubmit}>
                                                            Delete
                                                        </Button>
                                                        </Modal.Footer>
                                                    </Modal>  
        </div>
    );
}

export default TableDisplayUsers;

