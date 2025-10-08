import './globals.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import PRsPage from './pages/PRsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/prs' element={<PRsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
