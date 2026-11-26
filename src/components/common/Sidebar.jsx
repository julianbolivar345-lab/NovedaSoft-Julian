import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  History,
  Monitor,
  FileText,
  LayoutGrid,
  LogOut,
  Menu,
  X,
  Layers,
  User
} from 'lucide-react';
import Button from '../Button/Button';
import './Sidebar.css';

const MENU_POR_ROL = {
  instructor: {
    badge: 'Instructor',
    defaultUser: 'Ing. Carlos Mendoza R.',
    defaultRole: 'Instructor ADSO / Redes',
    items: [
      { label: 'Mi Horario', path: '/instructor/horario', icon: Calendar },
      { label: 'Verificar Ambiente', path: '/instructor/verificar-ambiente', icon: CheckCircle2 },
      { label: 'Reportar Novedad', path: '/instructor/reportar-novedad', icon: AlertTriangle },
      { label: 'Historial de Reportes', path: '/instructor/historial', icon: History },
      { label: 'Consulta de Materiales', path: '/instructor/consulta-materiales', icon: Monitor },
    ],
  },
  coordinacion: {
    badge: 'Panel Coordinación',
    defaultUser: 'Coord. María Bustamante',
    defaultRole: 'Coordinación Académica',
    items: [
      { label: 'Autorizaciones Pendientes', path: '/coordinacion/autorizaciones', icon: FileText, count: 4 },
      { label: 'Mapa de Ambientes', path: '/coordinacion/mapa-ambientes', icon: LayoutGrid },
      { label: 'Historial de Decisiones', path: '/coordinacion/historial', icon: History },
    ],
  },
};

export const Sidebar = ({ role = 'instructor', userName, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const config = MENU_POR_ROL[role] || MENU_POR_ROL.instructor;
  const displayUser = userName || config.defaultUser;
  const displayRole = userRole || config.defaultRole;

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    handleNavigation('/login');
  };

  return (
    <>
      <button
        type="button"
        className="mobile-hamburger-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu size={20} color="#0B1C30" />
      </button>

      {isOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`sidebar-container ${isOpen ? 'mobile-visible' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-row">
            <div className="sidebar-logo-icon">
              <Layers size={20} color="#FFFFFF" />
            </div>

            <div className="sidebar-brand-text">
              <span className="brand-name">NovedadSoft</span>
              <span className="brand-sub">SENA CIDE Soacha</span>
            </div>

            <button
              type="button"
              className="mobile-close-trigger"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={20} color="#64748B" />
            </button>
          </div>

          <div className="role-pill">
            <span className="dot-active" />
            <span>{config.badge}</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav">
          <div className="nav-section-label">MENÚ PRINCIPAL</div>

          {config.items.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                type="button"
                className={`nav-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <IconComponent size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.count !== undefined && (
                  <span className={`sidebar-count-pill ${isActive ? 'active' : ''}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-user-card">
          <div className="user-info-wrapper">
            <div className="user-avatar">
              <User size={18} color="#FFFFFF" />
            </div>
            <div className="user-details">
              <span className="user-name">{displayUser}</span>
              <span className="user-role">{displayRole}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-logout"
            onClick={() => {
              setIsOpen(false);
              setShowLogoutModal(true);
            }}
          >
            <LogOut size={14} color="#BA1A1A" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="logout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">
              <LogOut size={24} color="#BA1A1A" />
            </div>

            <h3 className="logout-modal-title">¿Cerrar sesión?</h3>
            <p className="logout-modal-text">
              ¿Estás seguro de que deseas salir de NovedaSoft?
            </p>

            <div className="logout-modal-actions">
              <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleConfirmLogout}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;