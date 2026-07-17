import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./auth/AuthStore";
import ForgeLanding from "./pages/forge/ForgeLanding";

const ForgeDashboard = lazy(() => import("./pages/forge/ForgeDashboard"));
const ForgeSubmit = lazy(() => import("./pages/forge/ForgeSubmit"));
const ForgePartners = lazy(() => import("./pages/forge/ForgePartners"));
const ForgePoints = lazy(() => import("./pages/forge/ForgePoints"));
const ForgeBadge = lazy(() => import("./pages/forge/ForgeBadge"));
const ForgePricing = lazy(() => import("./pages/forge/ForgePricing"));

function PageLoader() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ color: "var(--g)", fontSize: 14, fontWeight: 700 }}>Loading...</div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/forge" replace />} />
            <Route path="/forge" element={<ForgeLanding />} />
            <Route path="/forge/dashboard" element={<ForgeDashboard />} />
            <Route path="/forge/submit" element={<ForgeSubmit />} />
            <Route path="/forge/partners" element={<ForgePartners />} />
            <Route path="/forge/points" element={<ForgePoints />} />
            <Route path="/forge/badge" element={<ForgeBadge />} />
            <Route path="/forge/pricing" element={<ForgePricing />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
