import { React, useEffect, useRef, useState } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '../components/LoadingDots';
import 'bootstrap/dist/css/bootstrap.min.css';
import './chat.css'

function Chat() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messageState, setMessageState] = useState({
        messages: [{
            message: "Hi, what would you like to learn about this legal case?",
            type: "apiMessage",
        }],
        pending: "",
        history: [],
        pendingSourceDocs: []
    })

    const { messages, history } = messageState;
    const messageListRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        setError(null);

        if (!query) {
            alert('Please input a question');
            return;
        }

        const question = query.trim();

        setMessageState((state) => ({
            ...state,
            messages: [
                ...state.messages,
                {
                    type: 'userMessage',
                    message: question,
                }
            ],
        }));

        setLoading(true);
        setQuery('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question, history }),
            });

            const data = await response.json();
            console.log('data', data);

            if (data.error) setError(data.error);
            else {
                setMessageState((state) => ({
                    ...state,
                    messages: [
                        ...state.messages,
                        {
                            type: 'apiMessage',
                            message: data.text,
                            sourceDocs: data.sourceDocuments,
                        },
                    ],
                    history: [...state.history, [question, data.text]],
                }));
            }
            console.log('messageState', messageState);

            setLoading(false);

            messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
        } catch (error) {
            setLoading(false);
            setError('An error occured while fetching the data. Please try again.');
            console.log('error', error);
        }
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter' && query) handleSubmit(e);
        else if (e.key == 'Enter') e.preventDefault();
    }

    return (
        <>
            <h1 className='header'>Legal Document Analysis Bot</h1>
            <div ref={messageListRef} className="messageList">
                {messages.map((message, index) => {
                    let icon;
                    let className;
                    if (message.type === 'apiMessage') {
                        icon = (
                        <img
                            key={index}
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
                                key={index}
                                src="/usericon.svg"
                                alt="Me"
                                width="30"
                                height="30"
                                className="usericon"
                                priority
                            />
                            );
                            className =
                                loading && index === messages.length - 1 ?
                                "usermessagewaiting" : "usermessage";
                    }
                    return (
                        <>
                            <div key={`chatMessage-${index}`} className={className}>
                                {icon}
                                <div className={"markdownanswer"}>
                                    <ReactMarkdown linkTarget="_blank">
                                        {message.message}
                                    </ReactMarkdown>
                                </div>
                                {message.sourceDocs && (
                                    <div key={`sourceDocsAccordion-${index}`}>
                                        <Accordion alwaysOpen>
                                            {message.sourceDocs.map((doc, index) => (
                                                <div key={`messageSourceDocs-${index}`}>
                                                    <Accordion.Item eventKey={`item-${index}`}>
                                                        <Accordion.Header>
                                                            <h3>Source {index + 1}</h3>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <ReactMarkdown linkTarget="_blank">
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
                        </>
                    );
                })};
            </div>
            <div className='center'>
                <div className="cloudform">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                type="textarea"
                                disabled={loading}
                                onKeyDown={handleEnter}
                                ref={textAreaRef}
                                autoFocus={false}
                                maxLength={512}
                                id="userInput"
                                placeholder={
                                    loading
                                        ? 'Waiting for response...'
                                        : 'What is this legal case about?'
                                }
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="textarea"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" disabled={loading} className="generatebutton">
                                {loading ? (
                                    <div className="loadingWheel">
                                        <LoadingDots color="#000" />
                                    </div>
                                ) : (
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="svgicon"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                    </svg>
                                )}
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            { error && (
                <div className="errorcontainer">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
        </>
    )
}
export default Chat;
