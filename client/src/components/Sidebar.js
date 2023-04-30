import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import FileDropField from './FileDropField';

function Sidebar({ cases, onCaseSelected }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCaseNumber, setNewCaseNumber] = useState('');
  const [newCaseFiles, setNewCaseFiles] = useState([]);

  const handleCaseClick = (caseId) => {
    setSelectedCase(caseId);
    onCaseSelected(caseId);
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

  const handleNewCaseFilesDrop = (item) => {
    setNewCaseFiles([...newCaseFiles, item]);
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
      <button onClick={handleNewCaseModalClick}>New Case</button>
      <ul>
        {cases.map((caseItem) => (
          <li
            key={caseItem.id}
            onClick={() => handleCaseClick(caseItem.id)}
            className={selectedCase === caseItem.id ? 'selected' : ''}
          >
            {caseItem.title}
          </li>
        ))}
      </ul>
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
                <button type="submit">Create</button>
                </Form>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Sidebar;
