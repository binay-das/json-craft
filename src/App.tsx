import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import { Layout } from './components/Layout';
import { ToolLayout } from './components/ToolLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools" element={<Tools />} />
        <Route path="tool/:name" element={<ToolLayout />}>
          <Route index element={<ToolDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
