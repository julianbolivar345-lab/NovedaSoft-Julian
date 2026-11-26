import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Públicas
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';

// Layout Compartido
import { DashboardLayout } from './components/common/DashboardLayout';

// Instructor
import { MiHorario } from './pages/MiHorario/MiHorario';
import { VerificarAmbiente } from './pages/VerificarAmbiente/VerificarAmbiente';
import { ReportarNovedadForm } from './pages/ReportarNovedadForm/ReportarNovedadForm';
import { HistorialReportes } from './pages/HistorialReportes/HistorialReportes';
import { ConsultaMateriales } from './pages/ConsultaMateriales/ConsultaMateriales';

// Coordinación
import Autorizaciones from './pages/Coordinacion/Autorizaciones/Autorizaciones';
import MapaAmbientes from './pages/Coordinacion/MapaAmbientes/MapaAmbientes';
import HistorialDecisiones from './pages/Coordinacion/HistorialDecisiones/HistorialDecisiones';

// Contexto
import { AlertProvider } from './context/AlertContext/AlertContext';

function App() {
  return (
    <AlertProvider>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Rutas Instructor con Sidebar + Topbar + LogoutModal compartidos */}
        <Route element={<DashboardLayout role="instructor" />}>
          <Route path="/instructor/horario" element={<MiHorario />} />
          <Route path="/instructor/verificar-ambiente" element={<VerificarAmbiente />} />
          <Route path="/instructor/reportar-novedad" element={<ReportarNovedadForm />} />
          <Route path="/instructor/historial" element={<HistorialReportes />} />
          <Route path="/instructor/consulta-materiales" element={<ConsultaMateriales />} />
        </Route>

        {/* Rutas Coordinación con Sidebar + Topbar + LogoutModal compartidos */}
        <Route element={<DashboardLayout role="coordinacion" />}>
          <Route path="/coordinacion/autorizaciones" element={<Autorizaciones />} />
          <Route path="/coordinacion/mapa-ambientes" element={<MapaAmbientes />} />
          <Route path="/coordinacion/historial" element={<HistorialDecisiones />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AlertProvider>
  );
}

export default App;