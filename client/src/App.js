import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from './pages/Chat'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/chat" />} />
                <Route path="/chat" index element={<Chat/>} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
