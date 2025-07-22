import { Routes, Route } from 'react-router-dom';
import ChartPage from './components/ChartPage';
import TablePage from './components/TablePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/chart" element={<ChartPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="*" element={<ChartPage />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;