import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import { Layout } from './components/Layout';
import { ToolLayout } from './components/ToolLayout';
import { ROUTES } from './config/routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.PATTERNS.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.PATTERNS.TOOLS} element={<Tools />} />
        <Route path={ROUTES.PATTERNS.TOOL_DETAIL} element={<ToolLayout />}>
          <Route index element={<ToolDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
