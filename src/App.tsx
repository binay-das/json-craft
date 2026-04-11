import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import { Layout } from './components/Layout';
import { ToolLayout } from './components/ToolLayout';
import { ROUTES } from './config/routes';
import JsonFormatter from './pages/JsonFormatter';
import CsvToJson from './pages/CsvToJson';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.PATTERNS.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.PATTERNS.TOOLS} element={<Tools />} />
        <Route path="tool" element={<ToolLayout />}>
          <Route path="json-formatter" element={<JsonFormatter />} />
          <Route path="csv-to-json" element={<CsvToJson />} />
          <Route path=":name" element={<ToolDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
