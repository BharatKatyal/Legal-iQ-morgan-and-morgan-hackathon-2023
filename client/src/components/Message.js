import React from "react";
import ReactMarkdown from "react-markdown";
import Accordion from "react-bootstrap/Accordion";
import "./message.css";

function Message({ message, type, loading }) {
  let icon;
  let className;
  if (type === "apiMessage") {
    icon = (
      <img
        src="/bot-image.png"
        alt="AI"
        width="40"
        height="40"
        className="boticon"
        priority
      />
    );
    className = "apimessage";
  } else {
    icon = (
      <img
        src="/usericon.svg"
        alt="Me"
        width="30"
        height="30"
        className="usericon"
        priority
      />
    );
    className =
      loading && type === "user" ? "usermessagewaiting" : "usermessage";
  }
  return (
    <div className={className}>
      {icon}
      <div className={"markdownanswer"}>
        <ReactMarkdown linkTarget="_blank">{message.message}</ReactMarkdown>
      </div>
      {message.sourceDocs && (
        <div>
          <Accordion alwaysOpen>
            {message.sourceDocs.map((doc, index) => (
              <div key={`messageSourceDocs-${index}`}>
                <Accordion.Item eventKey={`item-${index}`}>
                  <Accordion.Header>
                    <h3>Source {index + 1}</h3>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ReactMarkdown className="markdown" linkTarget="_blank">
                      {doc.pageContent}
                    </ReactMarkdown>
                    <p className="mt-2">
                      <b>Source:</b> {doc.metadata.source}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default Message;
