import Button from './components/ui/Button';
import Badge from './components/ui/Badge';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Escrows from './pages/Escrows';
import Settings from './pages/Settings';
import Workspace from './pages/Workspace';
import VerifyWork from "./pages/VerifyWork";
import SubmitWork from "./pages/SubmitWork";
import BlockchainExplorer from "./pages/BlockchainExplorer";
import AppLayout from './components/layout/AppLayout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/escrows" element={<Escrows />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/projects/:projectId/submit" element={<SubmitWork />} />
         <Route path="/workspace/:projectId" element={<Workspace />} />
          <Route path="/verify-work" element={<VerifyWork />} />
          <Route
            path="/blockchain"
            element={<BlockchainExplorer />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

