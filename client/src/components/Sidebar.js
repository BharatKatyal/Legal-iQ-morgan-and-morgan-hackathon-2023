import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FileDropField from './FileDropField';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

function Sidebar({ cases, onCaseSelected }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCaseNumber, setNewCaseNumber] = useState('');
  const [newCaseFiles, setNewCaseFiles] = useState([]);

  const handleCaseClick = (legalCase) => {
    setSelectedCase(legalCase);
    onCaseSelected(legalCase);
  };

  const handleNewCaseModalClick = () => {
    setShowNewCaseModal(true);
  };

  const handleNewCaseModalClose = () => {
    setShowNewCaseModal(false);
  };

  const handleNewCaseNumberChange = (e) => {
    setNewCaseNumber(e.target.value);
  };

  const handleNewCaseFormSubmit = (e) => {
    e.preventDefault();

    // TODO: Perform some action with the new case number and files
    console.log('New case number:', newCaseNumber);
    console.log('New case files:', newCaseFiles);

    // Reset form fields
    setNewCaseNumber('');
    setNewCaseFiles([]);
    setShowNewCaseModal(false);
  };

  return (
    <div className="sidebar">
      <Button id="newCaseButton" onClick={handleNewCaseModalClick}>New Case</Button>
        {cases.map((caseItem) => (
          <div
            className="caseItem"
            key={caseItem.id}
            onClick={() => handleCaseClick(caseItem)}
          >
            {caseItem.title}
          </div>
        ))}
        <Modal show={showNewCaseModal} onHide={handleNewCaseModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Case</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleNewCaseFormSubmit}>
                <Form.Group controlId="formCaseNumber">
                    <Form.Label>Case Number</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter case number"
                    value={newCaseNumber}
                    onChange={handleNewCaseNumberChange}
                    />
                </Form.Group>
                <Form.Group controlId="formCaseFiles">
                    <Form.Label>Files</Form.Label>
                        <FileDropField />
                </Form.Group>
                <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Sidebar;
