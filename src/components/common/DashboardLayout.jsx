import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Bell, Building2, UserCheck } from 'lucide-react';
import Sidebar from './Sidebar';

const TITULOS_RUTA = {
  '/instructor/horario': { modulo: 'Instructor', titulo: 'Mi Horario' },
  '/instructor/verificar-ambiente': { modulo: 'Instructor', titulo: 'Verificar Ambiente' },
  '/instructor/reportar-novedad': { modulo: 'Instructor', titulo: 'Reportar Novedad' },
  '/instructor/historial': { modulo: 'Instructor', titulo: 'Historial de Reportes' },
  '/instructor/consulta-materiales': { modulo: 'Instructor', titulo: 'Consulta de Materiales' },
  '/coordinacion/autorizaciones': { modulo: 'Coordinación', titulo: 'Autorizaciones Pendientes' },
  '/coordinacion/mapa-ambientes': { modulo: 'Coordinación', titulo: 'Mapa de Ambientes' },
  '/coordinacion/historial': { modulo: 'Coordinación', titulo: 'Historial de Decisiones' },
};

export const DashboardLayout = ({ role = 'instructor' }) => {
  const location = useLocation();
  const infoRuta = TITULOS_RUTA[location.pathname] || {
    modulo: role === 'coordinacion' ? 'Coordinación' : 'Instructor',
    titulo: 'Panel Principal',
  };

  return (
    <div className="nsw-shell">
      <Sidebar role={role} />

      <div className="nsw-shell-main">
        <header className="nsw-topbar">
          <div className="nsw-topbar-left">
            <nav className="nsw-breadcrumb">
              <span className="hide-mobile">Portal CIDE</span>
              <span className="sep hide-mobile">›</span>
              <span className="hide-mobile">{infoRuta.modulo}</span>
              <span className="sep hide-mobile">›</span>
              <span className="current">{infoRuta.titulo}</span>
            </nav>
          </div>

          <div className="nsw-topbar-right">
            <div className="nsw-status-badge online hide-mobile">
              <span className="nsw-dot green" />
              <span>Servidor Activo</span>
            </div>

            <div className="nsw-status-badge hide-mobile">
              <Building2 size={14} color="#3C627F" />
              <span>SENA CIDE Soacha - Regional Cundinamarca</span>
            </div>

            <button type="button" className="nsw-btn nsw-btn-secondary" style={{ padding: '8px' }} aria-label="Notificaciones">
              <Bell size={16} />
            </button>

            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#3C627F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title={infoRuta.modulo}
            >
              <UserCheck size={15} color="#FFFFFF" />
            </div>
          </div>
        </header>

        <main className="nsw-shell-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;