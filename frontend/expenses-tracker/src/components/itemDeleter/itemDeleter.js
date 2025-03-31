import { React, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MdEdit, MdDelete } from "react-icons/md";
import { deleteExpense } from "../../api/expensesApi";
import { deleteIncome } from "../../api/incomesApi";
import "./itemDeleter.css";

function ItemDeleter({data, onItemDelete, deleterType="expense"}) {
  const [showModal, setShowModal] = useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false); 

  const handleDeleteItemClick = (e, itemId) => {
    console.log(itemId);

    const deleteItem = (itemId) => {
      if (deleterType === "expense") {
        return deleteExpense(itemId);
      } else if (deleterType === "income") {
        return deleteIncome(itemId);
      }
    };
  
    deleteItem(itemId).then(() => {
      onItemDelete();
    });
  }

  return (
    <>
      <div className="itemDeleter">
        <button onClick={(e) => {handleShowModal();}}><MdEdit/></button>
      </div>
      
      <Modal show={showModal} onHide={handleCloseModal} centered scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Items</Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{maxHeight: "35vh", scrollbarWidth: "thin"}}>
        <table className="itemDeleterTable">
          <thead>
            <tr>
              <td>Date</td>
              <td>Description</td>
              <td>Amount</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
          {
            data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.date.substring(0, 10)}</td>
                <td>{item.description === "undefined" ? "" : item.description}</td>
                <td>{item.amount}€</td>
                <td><button className="itemDeleteButton" onClick={(e) => handleDeleteItemClick(e, item._id)}><MdDelete/></button></td>
              </tr>)
            })
          }
          </tbody>
        </table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemDeleter;
