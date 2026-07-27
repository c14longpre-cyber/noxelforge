import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
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

// Keeps <link rel="canonical"> in sync with the actual route. Without this,
// index.html's static canonical (hardcoded to "/") applied to every page,
// including /forge — telling Google that /forge wasn't the preferred URL
// and diluting its ranking credit.
function CanonicalUpdater() {
  const location = useLocation();

  useEffect(() => {
    const canonicalUrl = `https://noxelforge.com${location.pathname === "/" ? "" : location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CanonicalUpdater />
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
