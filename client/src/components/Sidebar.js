import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FileDropField from './FileDropField';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css';

function Sidebar({ cases, onCaseSelected, setCases }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCaseName, setNewCaseName] = useState('');
  const [newCaseFiles, setNewCaseFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCaseClick = (legalCase) => {
    setSelectedCase(legalCase);
    onCaseSelected(legalCase);
  };

  const handleNewCaseModalClick = () => {
    setShowNewCaseModal(true);
    setIsLoading(false);
  };

  const handleNewCaseModalClose = () => {
    setShowNewCaseModal(false);
  };

  const handleNewCaseNameChange = (e) => {
    setNewCaseName(e.target.value);
  };

  const handleNewCaseFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    if (newCaseFiles.length === 0) return;

    const formData = new FormData();
    for (const file of newCaseFiles) {
        formData.append('files', file);
    }

    // TODO: Perform some action with the new case number and files
    const response = await fetch(`/api/upload/${newCaseName}`, {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    console.log(result);

    setCases([ ...cases, { title: result.directoryName }]);

    const dbResponse = await fetch(`api/db/${result.directoryName}`, {
        method: "POST",
    });
    const dbResult = await dbResponse.json();
    console.log(dbResult);

    // Reset form fields
    setNewCaseName('');
    setNewCaseFiles([]);
    setShowNewCaseModal(false);
  };

  const dragDropFiles = (files) => {
    setNewCaseFiles(files);
  }

  return (
    <div className="sidebar">
      <Button id="newCaseButton" onClick={handleNewCaseModalClick}>+  New Case</Button>
        {cases.map((caseItem) => (
          <div
            className="caseItem"
            key={Math.random()}
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
                {/* Update the content of the modal based on the loading status */}
          {isLoading ? (  
            <div className="loadingBar"><img class = "loader" src='/loading.gif' alt='Loading Bar'></img></div>
          ) : (
            <Form onSubmit={handleNewCaseFormSubmit}>
              <Form.Group controlId="formCaseName">
                <Form.Label>Case Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter case number"
                  value={newCaseName}
                  onChange={handleNewCaseNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formCaseFiles">
                <Form.Label>Files</Form.Label>
                <FileDropField setFiles={dragDropFiles} />
              </Form.Group>
              <Button type="submit" className="modalButton">
                Create
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}


export default Sidebar;
