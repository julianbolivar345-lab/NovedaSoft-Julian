import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import './VerificarAmbiente.css';

export const VerificarAmbiente = () => {
  const navigate = useNavigate();

  const handleConfirmar = () => {
    alert('¡Jornada confirmada e iniciada exitosamente!');
    navigate('/instructor/horario');
  };

  const handleReportarNovedad = () => {
    navigate('/instructor/reportar-novedad');
  };

  return (
    <div className="verificar-layout-wrapper">
      
      {/* 1. SIDEBAR INTEGRADO */}
      <Sidebar 
        activeMenu="verificar" 
        userName="Ing. Carlos Mendoza R." 
        userRole="Instructor ADSO / Redes" 
      />

      {/* 2. ÁREA DE CONTENIDO */}
      <main className="verificar-main-content">
        
        {/* Topbar Superior */}
        <header className="verificar-topbar">
          <div className="verificar-breadcrumb">
            <span>Portal CIDE</span>
            <span>›</span>
            <span>Instructor</span>
            <span>›</span>
            <span className="verificar-breadcrumb-active">Verificar Ambiente</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: '#F0FDF4', color: '#095223', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="dot-status-green" />
              <span>Servidor Activo</span>
            </div>

            <div style={{ backgroundColor: '#F1F5F9', color: '#3C627F', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '500' }}>
              SENA CIDE Soacha - Regional Cundinamarca
            </div>
          </div>
        </header>

        {/* Cuerpos del módulo */}
        <div className="verificar-body-container">
          
          {/* Card 1: Información de la Sesión y Aula */}
          <div className="verificar-info-card">
            <div className="verificar-card-header">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="session-pill">
                  <span className="dot-status-green" />
                  <span>Sesión en Curso</span>
                </div>
                <h1 className="verificar-title">Ambiente 305 - Laboratorio TIDC I</h1>
              </div>
              <div className="jornada-badge">Jornada Mañana</div>
            </div>

            {/* Grid de Metadatos de Aula */}
            <div className="verificar-meta-grid">
              <div className="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <div className="meta-label">Ubicación</div>
                  <div className="meta-value">Torre A - Piso 3</div>
                </div>
              </div>

              <div className="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <div>
                  <div className="meta-label">Programa</div>
                  <div className="meta-value">ADSO - Ficha 289012</div>
                </div>
              </div>

              <div className="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <div className="meta-label">Horario</div>
                  <div className="meta-value">06:00 AM - 12:00 PM</div>
                </div>
              </div>

              <div className="meta-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <div>
                  <div className="meta-label">Instructor</div>
                  <div className="meta-value">Ing. Carlos Mendoza R.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recursos Asignados */}
          <div className="verificar-recursos-section">
            <div className="recursos-header">
              <span className="recursos-title">RECURSOS ASIGNADOS AL AMBIENTE</span>
              <span className="recursos-count">Total 4 ítems verificables</span>
            </div>

            <div className="recursos-grid">
              <div className="recurso-card">
                <div className="recurso-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <div className="recurso-num">25</div>
                  <div className="recurso-name">Computadores All-In-One</div>
                </div>
              </div>

              <div className="recurso-card">
                <div className="recurso-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                    <polyline points="17 2 12 7 7 2"/>
                  </svg>
                </div>
                <div>
                  <div className="recurso-num">1</div>
                  <div className="recurso-name">Smart TV 65"</div>
                </div>
              </div>

              <div className="recurso-card">
                <div className="recurso-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18M3 12h18"/>
                  </svg>
                </div>
                <div>
                  <div className="recurso-num">1</div>
                  <div className="recurso-name">Sistema de A/C</div>
                </div>
              </div>

              <div className="recurso-card">
                <div className="recurso-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                </div>
                <div>
                  <div className="recurso-num">32</div>
                  <div className="recurso-name">Puestos de Trabajo</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Acciones (Ambiente Conforme vs Reportar Novedad) */}
          <div className="verificar-actions-grid">
            
            {/* Opción Conforme */}
            <div className="action-card action-card-conforme">
              <div className="action-card-content">
                <div className="action-icon-wrapper conforme-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#39A900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="action-title">Ambiente Conforme</h2>
                <p className="action-desc">
                  Los equipos, la conectividad y el mobiliario del aula se encuentran completos y en condiciones óptimas para la formación.
                </p>
              </div>

              <button className="btn-action-conforme" onClick={handleConfirmar}>
                <span>Confirmar e Iniciar Jornada</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

            {/* Opción Reportar Falla */}
            <div className="action-card action-card-falla">
              <div className="action-card-content">
                <div className="action-icon-wrapper falla-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h2 className="action-title">Reportar Novedad o Falla</h2>
                <p className="action-desc">
                  Se detectó una falla técnica, un daño en la infraestructura o un elemento faltante en el aula.
                </p>
              </div>

              <button className="btn-action-falla" onClick={handleReportarNovedad}>
                <span>Ir a Formulario de Reporte</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};

export default VerificarAmbiente;