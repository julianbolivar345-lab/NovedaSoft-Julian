import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = ({ activeMenu, userName = 'Ing. Carlos Mendoza R.', userRole = 'Instructor ADSO / Redes' }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* BOTÓN HAMBURGUESA FLOTANTE (Siempre visible en la esquina superior izquierda en móvil) */}
      <button 
        className="mobile-hamburger-trigger" 
        onClick={toggleSidebar} 
        aria-label="Abrir menú"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B1C30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* OVERLAY OSCURO PARA CERRAR AL HACER CLIC FUERA */}
      {isOpen && <div className="sidebar-mobile-backdrop" onClick={toggleSidebar} />}

      {/* PANEL DEL SIDEBAR */}
      <aside className={`sidebar-container ${isOpen ? 'mobile-visible' : ''}`}>
        
        {/* Cabecera del Sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-brand-row">
            <div className="sidebar-logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>

            <div className="sidebar-brand-text">
              <span className="brand-name">NovedadSoft</span>
              <span className="brand-sub">SENA CIDE Soacha</span>
            </div>

            {/* Botón X para cerrar dentro del menú */}
            <button className="mobile-close-trigger" onClick={toggleSidebar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="role-pill">
            <span className="dot-active" />
            <span>Instructor</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        {/* Menú de Opciones */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">MENÚ PRINCIPAL</div>

          <button 
            className={`nav-item-btn ${activeMenu === 'horario' ? 'active' : ''}`}
            onClick={() => handleNavigation('/instructor/horario')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Mi Horario</span>
          </button>

          <button 
            className={`nav-item-btn ${activeMenu === 'verificar' ? 'active' : ''}`}
            onClick={() => handleNavigation('/instructor/verificar-ambiente')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Verificar Ambiente</span>
          </button>

          <button 
            className={`nav-item-btn ${activeMenu === 'reportar' ? 'active' : ''}`}
            onClick={() => handleNavigation('/instructor/reportar-novedad')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Reportar Novedad</span>
          </button>

          <button 
            className={`nav-item-btn ${activeMenu === 'historial' ? 'active' : ''}`}
            onClick={() => handleNavigation('/instructor/historial')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Historial de Reportes</span>
          </button>

          <button 
            className={`nav-item-btn ${activeMenu === 'consulta' ? 'active' : ''}`}
            onClick={() => handleNavigation('/instructor/consulta-materiales')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span>Consulta de Materiales</span>
          </button>
        </nav>

        {/* Tarjeta de Usuario */}
        <div className="sidebar-user-card">
          <div className="user-info-wrapper">
            <div className="user-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="user-details">
              <span className="user-name">{userName}</span>
              <span className="user-role">{userRole}</span>
            </div>
          </div>

          <button className="btn-logout" onClick={() => handleNavigation('/login')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;