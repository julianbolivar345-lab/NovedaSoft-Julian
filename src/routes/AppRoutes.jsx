import React, { useState } from 'react';
import Login from '../pages/Login/Login';
import HorarioAmbiente from '../pages/HorarioAmbiente/HorarioAmbiente';
import VerificacionRecursos from '../pages/VerificacionRecursos/VerificacionRecursos';
import ReporteNovedad from '../pages/ReporteNovedad/ReporteNovedad';
import HistorialNovedades from '../pages/HistorialNovedades/HistorialNovedades';

export function AppRoutes() {
  // Pantallas: 'login', 'horarios', 'verificacion', 'reporte', 'historial'
  const [pantallaActual, setPantallaActual] = useState('login');
  const [usuario, setUsuario] = useState(null);

  const handleLoginExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
    setPantallaActual('horarios');
  };

  const handleCerrarSesion = () => {
    setUsuario(null);
    setPantallaActual('login');
  };

  return (
    <div className="app-main-container">
      {/* 1. Login */}
      {pantallaActual === 'login' && (
        <Login onLoginExitoso={handleLoginExitoso} />
      )}

      {/* 2. Horario por Ambiente */}
      {pantallaActual === 'horarios' && (
        <HorarioAmbiente 
          usuario={usuario} 
          onCerrarSesion={handleCerrarSesion}
          onIrAReporte={() => setPantallaActual('verificacion')}
          onIrAHistorial={() => setPantallaActual('historial')}
        />
      )}

      {/* 3. Verificación de Recursos */}
      {pantallaActual === 'verificacion' && (
        <VerificacionRecursos 
          onVolver={() => setPantallaActual('horarios')}
          onContinuarFormulario={() => setPantallaActual('reporte')}
        />
      )}

      {/* 4. Formulario de Reporte de Novedad */}
      {pantallaActual === 'reporte' && (
        <ReporteNovedad 
          onVolver={() => setPantallaActual('verificacion')}
          onEnviarExitoso={() => setPantallaActual('historial')}
        />
      )}

      {/* 5. Historial de Novedades */}
      {pantallaActual === 'historial' && (
        <HistorialNovedades 
          onVolver={() => setPantallaActual('horarios')}
          onReportarNuevaNovedad={() => setPantallaActual('verificacion')}
        />
      )}
    </div>
  );
}

export default AppRoutes;