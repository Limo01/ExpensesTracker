import { React, useState } from "react";
import { getTodayDate } from "../../utils/dateFunctions";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoAddOutline } from "react-icons/io5";
import "./itemAdder.css";

function ItemAdder({itemsCategories}) {
  const [showModal, setShowModal] = useState(false);

  const initialModalState = {
    date : getTodayDate(),
    category: itemsCategories[0],
    description: "",
    amount: parseFloat(0).toFixed(2)
  };
  
  const [modalDate, setModalDate] = useState(initialModalState.date);
  const [modalCategory, setModalCategory] = useState(initialModalState.category);
  const [modalDescription, setModalDescription] = useState(initialModalState.description);
  const [modalAmount, setModalAmount] = useState(initialModalState.amount);

  function resetToInitialState() {
    setModalDate(initialModalState.date);
    setModalCategory(initialModalState.category);
    setModalDescription(initialModalState.description);
    setModalAmount(initialModalState.amount);
  }
  
  const handleShowModal = () => setShowModal(true);
  
  const handleCloseModal = () => {
    setShowModal(false); 
    resetToInitialState(); 
  }

  return (
    <>
      <div className="itemAdder">
        <button onClick={(e) => {handleShowModal();}}><IoAddOutline/></button>
      </div>
      
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="form.date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={modalDate} onChange={(e) => {setModalDate(e.target.value);}}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="form.category">
              <Form.Label>Category</Form.Label>
              <Form.Select defaultValue={modalCategory} onChange={(e) => {setModalCategory(e.target.value);}}>
                {
                  itemsCategories.map((category, index) => {
                    return <option value={category} key={index}>{category}</option>
                  })
                }
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="form.description">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                value={modalDescription} 
                onChange={(e) => {setModalDescription(e.target.value);}}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="form.amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control 
                type="number"
                step={0.01}
                placeholder={modalAmount}
                onChange={(e) => {setModalAmount(parseFloat(e.target.value).toFixed(2));}}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemAdder;
