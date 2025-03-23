import { Route, Routes, BrowserRouter,Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle.js';
import { WebSocketProvider } from './context/WebSocketContext.jsx'; 
import './App.css';

// pages
import Main from './pages/main.jsx';
import Intro from './pages/intro.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <GlobalStyle />
      <WebSocketProvider> {/* ✅ 모든 라우팅을 감싸기 */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/main" element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </WebSocketProvider>
    </>
  );
}

export default App;
