import './globals.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage';
import PRsPage from './pages/PRsPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/prs' element={<PRsPage />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
