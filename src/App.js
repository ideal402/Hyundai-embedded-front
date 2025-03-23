import { Route, Routes, BrowserRouter,Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle.js';
import { WebSocketProvider } from './context/WebSocketContext.jsx'; 
import './App.css';

// pages
import Main from './pages/main.jsx';
import Intro from './pages/intro.jsx';

function App() {
  return (
    <>
      <GlobalStyle />
        <BrowserRouter>
          <WebSocketProvider>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/main" element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </WebSocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
