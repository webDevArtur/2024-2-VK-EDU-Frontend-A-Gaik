import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/history" element={<HistoryPage />} />
  </Routes>
);

export default App;
