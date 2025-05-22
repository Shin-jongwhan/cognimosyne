// /src/App.tsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PolicyPage from './pages/PolicyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/policy" element={<PolicyPage />} />
    </Routes>
  );
}

export default App;
