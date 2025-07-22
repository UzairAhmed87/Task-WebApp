import { Routes, Route } from 'react-router-dom';
import ChartPage from './components/ChartPage';
import TablePage from './components/TablePage';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
         <Route path="/" element={<Navigate to="/chart" replace />} />
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="*" element={<ChartPage />} /> Default route
      </Routes>
    </div>
  );
}

export default App;