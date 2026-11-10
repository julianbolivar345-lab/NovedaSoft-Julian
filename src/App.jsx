import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importaciones públicas (con llaves)
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';

// Importaciones de módulos NovedadSoft (con llaves)
import { MiHorario } from './pages/MiHorario/MiHorario';
import { VerificarAmbiente } from './pages/VerificarAmbiente/VerificarAmbiente';
import { ReportarNovedadForm } from './pages/ReportarNovedadForm/ReportarNovedadForm';
import { HistorialReportes } from './pages/HistorialReportes/HistorialReportes';
import { ConsultaMateriales } from './pages/ConsultaMateriales/ConsultaMateriales';

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Rutas del Sistema */}
      <Route path="/instructor/horario" element={<MiHorario />} />
      <Route path="/instructor/verificar-ambiente" element={<VerificarAmbiente />} />
      <Route path="/instructor/reportar-novedad" element={<ReportarNovedadForm />} />
      <Route path="/instructor/historial" element={<HistorialReportes />} />
      <Route path="/instructor/consulta-materiales" element={<ConsultaMateriales />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;