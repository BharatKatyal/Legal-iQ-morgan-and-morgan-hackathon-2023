import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar'
import "./chat.css"

function Chat() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      setFile(e.dataTransfer.files[0]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(message)
      // handle form submission here
    };
  
    return (
      <div id="chatWindow">
        <Sidebar fileSelected={(id) => console.log(id)}/>
        <div id="workspace">
            <div id="workspace-top">
                
            </div>
            <div
                className="drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
            {file ? (
                <div>{file.name}</div>
            ) : (
                <div>Drag and drop a file here, or click to select a file</div>
            )}
            <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
            <Button onClick={() => document.querySelector("input[type=file]").click()}>Select File</Button>
            </div>
            <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" placeholder="Enter message" onChange={(e) => setMessage(e.target.value)}/>
            </Form.Group>
            <Button type="submit">Send</Button>
            </Form>
        </div>
      </div>
    );
};

export default Chat;
