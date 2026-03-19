import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import LandingApp    from "../App";
import Login         from "../pages/auth/Login";
import Cadastro      from "../pages/auth/Cadastro";
import PortalLayout  from "../components/portal/PortalLayout";
import Dashboard     from "../pages/portal/Dashboard";
import Agendar       from "../pages/portal/Agendar";
import Historico     from "../pages/portal/Historico";
import Planos        from "../pages/portal/Planos";
import Perfil        from "../pages/portal/Perfil";

function Protegida({ children }) {
  const { cliente, carregando } = useAuth();
  if (carregando) return null;
  return cliente ? children : <Navigate to="/entrar" replace />;
}

function Publica({ children }) {
  const { cliente, carregando } = useAuth();
  if (carregando) return null;
  return !cliente ? children : <Navigate to="/portal" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<LandingApp />} />
        <Route path="/entrar"   element={<Publica><Login /></Publica>} />
        <Route path="/cadastro" element={<Publica><Cadastro /></Publica>} />

        <Route path="/portal" element={<Protegida><PortalLayout /></Protegida>}>
          <Route index              element={<Dashboard />} />
          <Route path="agendar"    element={<Agendar />} />
          <Route path="historico"  element={<Historico />} />
          <Route path="planos"     element={<Planos />} />
          <Route path="perfil"     element={<Perfil />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
