import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ForgeLanding from './pages/forge/ForgeLanding';
import ForgeDashboard from './pages/forge/ForgeDashboard';
import ForgeSubmit from './pages/forge/ForgeSubmit';
import ForgePartners from './pages/forge/ForgePartners';
import ForgePoints from './pages/forge/ForgePoints';
import ForgePricing from './pages/forge/ForgePricing';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/forge" replace />} />
        <Route path="/forge" element={<ForgeLanding />} />
        <Route path="/forge/dashboard" element={<ForgeDashboard />} />
        <Route path="/forge/submit" element={<ForgeSubmit />} />
        <Route path="/forge/partners" element={<ForgePartners />} />
        <Route path="/forge/points" element={<ForgePoints />} />
        <Route path="/forge/pricing" element={<ForgePricing />} />
      </Routes>
    </BrowserRouter>
  );
}