import React from "react";
import "../dashboard.css"
import "../style.css";

function Modal(){


    return(
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Delete User</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
		<p>&nbsp;</p>
        <p>Are you sure you want delete this user?</p>
		<p>&nbsp;</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary">Delete</button>
      </div>
    </div>
  </div>
</div>
    );
}

export default Modal;

