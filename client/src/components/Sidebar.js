import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./sidebar.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

const Sidebar = ({ fileSelected }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch all files from the API on component mount
    // axios.get('/api/files').then((response) => {
    //   setFiles(response.data);
    // });
    const data = [{
        _id: "72345b2134dab754",
        filename: "test.txt",
        contentType: "text/plain",
        data: new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]),
        text: "Hello World!",
    }]
    setFiles(data);
  }, []);

  const handleFileClick = (fileId) => {
    // Fetch the details of the selected file and call the fileSelected callback
    // axios.get(`/api/file/${fileId}`).then((response) => {
    //   fileSelected(response.data);
    // });
    fileSelected(fileId);

  };

  return (
    <div id="sidebar">
      <Button id="newFileButton"><BsPlus id="newPlus"/>New File</Button>
        {files.map((file) => (
          <div key={file._id} className="sideCase" onClick={() => handleFileClick(file._id)}>
            {file.filename}
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
