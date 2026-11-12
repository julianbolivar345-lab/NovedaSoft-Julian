import React, { useState } from 'react';
import { Sidebar } from '../../components/common/Sidebar';
import './MiHorario.css';

export const MiHorario = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Abrir detalle al hacer clic en una tarjeta de clase
  const handleOpenDetail = (sessionData) => {
    setSelectedSession(sessionData);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSession(null);
  };

  return (
    <div className="horario-layout-wrapper">
      
      {/* 1. SIDEBAR INTEGRADO */}
      <Sidebar 
        activeMenu="horario" 
        userName="Ing. Carlos Mendoza R." 
        userRole="Instructor ADSO / Redes" 
      />

      {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="horario-main-content">
        
        {/* TOPBAR FLOTANTE */}
        <header className="horario-topbar">
          <div className="topbar-breadcrumb-group">
            <span>Portal CIDE</span>
            <span>›</span>
            <span>Instructor</span>
            <span>›</span>
            <span className="topbar-breadcrumb-active">Mi Horario</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="topbar-badge-sede">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3C627F" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V12m0 0h-2m2 0h2" />
              </svg>
              <span>SENA CIDE Soacha - Regional Cundinamarca</span>
            </div>

            <div className="topbar-status-active">
              <span className="status-green-dot" />
              <span>Servidor Activo</span>
            </div>
          </div>
        </header>

        {/* CONTENEDOR DE LA MALLA */}
        <div className="horario-body-container">
          
          {/* HEADER PRINCIPAL Y CARGA LECTIVA */}
          <div className="horario-header-card">
            <div>
              <div className="header-title-badge">
                <span className="status-green-dot" />
                <span>Trimestre IV - 2026</span>
              </div>
              <h1 className="horario-main-title">Mi Malla Horaria</h1>
              <p className="horario-main-subtitle">
                Programación académica docente • Sede  Soacha
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="carga-lectiva-box">
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A' }}>32h</span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>/ semana</span>
                <div style={{ width: '1px', height: '16px', backgroundColor: '#E2E8F0' }} />
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                  100% Carga Cumplida
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-outline-action"> PDF</button>
                <button className="btn-green-action">
                  <span> Subir Horario</span>
                </button>
              </div>
            </div>
          </div>

     {/* BARRA DE FILTROS Y CONTROLES (3 COLUMNAS) */}
          <div className="horario-controls-bar">
            
            {/* Columna 1: Trimestre */}
            <div className="control-grid-item">
              <select className="select-custom-pill" defaultValue="t4">
                <option value="t4">Trimestre IV - 2026 (Actual)</option>
                <option value="t3">Trimestre III - 2026</option>
              </select>
            </div>

            {/* Columna 2: Jornada */}
            <div className="control-grid-item">
              <select className="select-custom-pill" defaultValue="todas">
                <option value="todas">Jornada: Todas las franjas</option>
                <option value="manana">Jornada Mañana</option>
                <option value="tarde">Jornada Tarde</option>
              </select>
            </div>

            {/* Columna 3: Semana */}
            <div className="control-grid-item">
              <div className="week-navigator-box">
                <button className="nav-arrow-btn">‹</button>
                <span className="week-navigator-text">
                  Semana 43: 19 - 23 Oct
                </span>
                <button className="nav-arrow-btn">›</button>
              </div>
            </div>

          </div>

          {/* GRID SEMANAL (5 DÍAS) */}
          <div className="horario-grid-week">
            
            {/* LUNES 19 */}
            <div className="day-column-container">
              <div className="day-header-pill">
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>LUN 19 Oct</span>
                <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F8FAFC', padding: '2px 8px', borderRadius: '4px' }}>8h</span>
              </div>

              <div className="session-card-clean" onClick={() => handleOpenDetail({
                title: "Diseño de Arquitecturas de Software y Cloud",
                ficha: "289012 - ADSO",
                horario: "06:00 AM - 12:00 PM",
                ambiente: "Ambiente 305",
                torre: "Torre A • Piso 3",
                estado: "Completado"
              })}>
                <div>
                  <div className="session-card-footer" style={{ borderTop: 'none', paddingBottom: '8px' }}>
                    <span className="session-card-time">06:00 AM -<br />12:00 PM</span>
                    <span style={{ fontSize: '10px', color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>Completado</span>
                  </div>
                  <h4 className="session-card-title">Diseño de Arquitecturas de Software</h4>
                </div>
                <div className="session-card-footer">
                  <span className="ficha-tag-blue">289012 - ADSO</span>
                  <span className="location-text">Amb. 305<br />(Torre A)</span>
                </div>
              </div>
            </div>

            {/* MARTES 20 */}
            <div className="day-column-container">
              <div className="day-header-pill">
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>MAR 20 Oct</span>
                <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F8FAFC', padding: '2px 8px', borderRadius: '4px' }}>8h</span>
              </div>

              <div className="session-card-clean" onClick={() => handleOpenDetail({
                title: "Implantación y Pruebas Continuas (CI/CD)",
                ficha: "289012 - ADSO",
                horario: "06:00 AM - 12:00 PM",
                ambiente: "Ambiente 305",
                torre: "Torre A • Piso 3",
                estado: "Completado"
              })}>
                <div>
                  <div className="session-card-footer" style={{ borderTop: 'none', paddingBottom: '8px' }}>
                    <span className="session-card-time">06:00 AM -<br />12:00 PM</span>
                    <span style={{ fontSize: '10px', color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>Completado</span>
                  </div>
                  <h4 className="session-card-title">Implantación y Pruebas Continuas (CI/CD)</h4>
                </div>
                <div className="session-card-footer">
                  <span className="ficha-tag-blue">289012 - ADSO</span>
                  <span className="location-text">Amb. 305<br />(Torre A)</span>
                </div>
              </div>
            </div>

            {/* MIÉRCOLES 21 (HOY - EN CURSO) */}
            <div className="day-column-container">
              <div className="day-header-pill today-highlight">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#065F46' }}>MIÉ 21 Oct</span>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: '#FFFFFF', backgroundColor: '#39A900', padding: '2px 6px', borderRadius: '4px' }}>HOY</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#065F46' }}>10h</span>
              </div>

              <div className="session-card-clean in-progress" onClick={() => handleOpenDetail({
                title: "Desarrollo de Servicios Web y Microservicios REST",
                ficha: "Ficha 289012 - ADSO",
                horario: "08:00 AM - 12:00 PM",
                ambiente: "Ambiente 305",
                torre: "Torre A • Piso 3 (CIDE)",
                asistieron: "30 / 32 Aprendices",
                guia: "GA-04 Node.js / Express JWT",
                estado: "En Curso"
              })}>
                <div className="corner-active-indicator" />
                <div>
                  <div className="session-card-footer" style={{ borderTop: 'none', paddingBottom: '8px' }}>
                    <span className="session-card-time active-time">08:00 AM -<br />12:00 PM</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#065F46', backgroundColor: '#D1FAE5', padding: '2px 6px', borderRadius: '9999px' }}>
                      En Curso
                    </span>
                  </div>
                  <h4 className="session-card-title">Desarrollo de Servicios Web y REST APIs</h4>
                </div>
                <div className="session-card-footer">
                  <span className="ficha-tag-green">289012 - ADSO</span>
                  <span className="location-text" style={{ fontWeight: '600', color: '#475569' }}>Amb. 305<br />(Torre A)</span>
                </div>
              </div>
            </div>

            {/* JUEVES 22 */}
            <div className="day-column-container">
              <div className="day-header-pill">
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>JUE 22 Oct</span>
                <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F8FAFC', padding: '2px 8px', borderRadius: '4px' }}>8h</span>
              </div>

              <div className="session-card-clean" onClick={() => handleOpenDetail({
                title: "Taller de Bases de Datos NoSQL y SQL",
                ficha: "289012 - ADSO",
                horario: "06:00 AM - 12:00 PM",
                ambiente: "Ambiente 305",
                torre: "Torre A • Piso 3",
                estado: "Programado"
              })}>
                <div>
                  <div className="session-card-footer" style={{ borderTop: 'none', paddingBottom: '8px' }}>
                    <span className="session-card-time">06:00 AM -<br />12:00 PM</span>
                    <span style={{ fontSize: '10px', color: '#0369A1', backgroundColor: '#F0F9FF', padding: '2px 6px', borderRadius: '4px' }}>Programado</span>
                  </div>
                  <h4 className="session-card-title">Taller de Bases de Datos NoSQL y SQL</h4>
                </div>
                <div className="session-card-footer">
                  <span className="ficha-tag-blue">289012 - ADSO</span>
                  <span className="location-text">Amb. 305<br />(Torre A)</span>
                </div>
              </div>
            </div>

            {/* VIERNES 23 */}
            <div className="day-column-container">
              <div className="day-header-pill">
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>VIE 23 Oct</span>
                <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F8FAFC', padding: '2px 8px', borderRadius: '4px' }}>6h</span>
              </div>

              <div className="session-card-clean" onClick={() => handleOpenDetail({
                title: "Infraestructura de Redes y Cableado",
                ficha: "290145 - Redes",
                horario: "06:00 AM - 12:00 PM",
                ambiente: "Lab. Redes 204",
                torre: "Torre B",
                estado: "Programado"
              })}>
                <div>
                  <div className="session-card-footer" style={{ borderTop: 'none', paddingBottom: '8px' }}>
                    <span className="session-card-time">06:00 AM -<br />12:00 PM</span>
                    <span style={{ fontSize: '10px', color: '#0369A1', backgroundColor: '#F0F9FF', padding: '2px 6px', borderRadius: '4px' }}>Programado</span>
                  </div>
                  <h4 className="session-card-title">Infraestructura de Redes y Cableado</h4>
                </div>
                <div className="session-card-footer">
                  <span className="ficha-tag-blue">290145 - Redes</span>
                  <span className="location-text">Lab. Redes<br />204</span>
                </div>
              </div>
            </div>

          </div>

          {/* LEYENDA Y FOOTER DE ESTADOS */}
          <div className="legend-footer-banner">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#94A3B8' }}>ESTADOS:</span>
              <div className="legend-item">
                <span className="status-green-dot" />
                <span>En Curso</span>
              </div>
              <div className="legend-item">
                <span style={{ width: '8px', height: '8px', backgroundColor: '#0EA5E9', borderRadius: '50%' }} />
                <span>Programado</span>
              </div>
              <div className="legend-item">
                <span style={{ width: '8px', height: '8px', backgroundColor: '#CBD5E1', borderRadius: '50%' }} />
                <span>Completado</span>
              </div>
            </div>

            <div style={{ fontSize: '11px', color: '#94A3B8' }}>
              Validado por Coordinación CIDE • Res. 2026-08
            </div>
          </div>

        </div>
      </main>

      {/* 3. DRAWER LATERAL DESLIZANTE (DETALLE DE SESIÓN DE 420px) */}
      {isDrawerOpen && selectedSession && (
        <div className="session-drawer-overlay" onClick={handleCloseDrawer}>
          <div className="session-drawer-panel" onClick={(e) => e.stopPropagation()}>
            
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#D1FAE5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#39A900' }}>
                  
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                    Detalle de Sesión Formativa
                  </h3>
                  <span style={{ fontSize: '10px', color: '#065F46', backgroundColor: '#D1FAE5', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {selectedSession.estado || "En Curso"}
                  </span>
                </div>
              </div>

              <button className="drawer-close-btn" onClick={handleCloseDrawer}>✕</button>
            </div>

            <div className="drawer-body">
              <div>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>
                  COMPETENCIA / MÓDULO
                </span>
                <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: '4px 0 8px 0' }}>
                  {selectedSession.title}
                </h2>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="ficha-tag-green">{selectedSession.ficha}</span>
                  <span style={{ fontSize: '12px', color: '#475569' }}>Tecnólogo ADSO</span>
                </div>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.80)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>Horario de Asignación</span>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', margin: '2px 0 0 0' }}>
                    {selectedSession.horario}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>Ambiente / Sede</span>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', margin: '2px 0 0 0' }}>
                    {selectedSession.ambiente}
                  </p>
                  <span style={{ fontSize: '10px', color: '#64748B' }}>{selectedSession.torre}</span>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.80)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1E293B' }}>Aprendices Convocados</span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                    {selectedSession.asistieron || "30 / 32 Asistieron"}
                  </span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', backgroundColor: '#39A900' }} />
                </div>
              </div>
            </div>

            <div className="drawer-footer-actions">
              <button className="btn-green-action" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                 Llamar Lista / Registrar Asistencia
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button className="btn-outline-action" style={{ justifyContent: 'center' }}>⚠️ Novedad de Aula</button>
                <button className="btn-outline-action" style={{ justifyContent: 'center' }}>🌐 SofiaPlus LMS</button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
export default MiHorario;