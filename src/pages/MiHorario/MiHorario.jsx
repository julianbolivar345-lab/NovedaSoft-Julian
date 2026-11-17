import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useAlert } from '../../context/AlertContext/AlertContext';
import './MiHorario.css';

export const MiHorario = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Estados para Modal de Subir Horario
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [trimestreUpload, setTrimestreUpload] = useState('Trimestre IV - 2026');
  const [uploadedScheduleInfo, setUploadedScheduleInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Datos estructurados de la semana
  const mallaSemanal = [
    {
      dia: 'LUN 19 Oct',
      horasDia: '8h',
      isToday: false,
      sesiones: [
        {
          title: 'Diseño de Arquitecturas de Software',
          fullTitle: 'Diseño de Arquitecturas de Software y Cloud',
          ficha: '289012 - ADSO',
          ambiente: 'Ambiente 305',
          torre: 'Torre A • Piso 3',
          horario: '06:00 AM - 12:00 PM',
          estado: 'Completado'
        }
      ]
    },
    {
      dia: 'MAR 20 Oct',
      horasDia: '8h',
      isToday: false,
      sesiones: [
        {
          title: 'Implantación y Pruebas Continuas (CI/CD)',
          fullTitle: 'Implantación y Pruebas Continuas (CI/CD)',
          ficha: '289012 - ADSO',
          ambiente: 'Ambiente 305',
          torre: 'Torre A • Piso 3',
          horario: '06:00 AM - 12:00 PM',
          estado: 'Completado'
        }
      ]
    },
    {
      dia: 'MIÉ 21 Oct',
      horasDia: '10h',
      isToday: true,
      sesiones: [
        {
          title: 'Desarrollo de Servicios Web y REST APIs',
          fullTitle: 'Desarrollo de Servicios Web y Microservicios REST',
          ficha: '289012 - ADSO',
          horario: '08:00 AM - 12:00 PM',
          ambiente: 'Ambiente 305',
          torre: 'Torre A • Piso 3 (CIDE)',
          asistieron: '30 / 32 Aprendices',
          guia: 'GA-04 Node.js / Express JWT',
          estado: 'En Curso'
        }
      ]
    },
    {
      dia: 'JUE 22 Oct',
      horasDia: '8h',
      isToday: false,
      sesiones: [
        {
          title: 'Taller de Bases de Datos NoSQL y SQL',
          fullTitle: 'Taller de Bases de Datos NoSQL y SQL',
          ficha: '289012 - ADSO',
          horario: '06:00 AM - 12:00 PM',
          ambiente: 'Ambiente 305',
          torre: 'Torre A • Piso 3',
          estado: 'Programado'
        }
      ]
    },
    {
      dia: 'VIE 23 Oct',
      horasDia: '6h',
      isToday: false,
      sesiones: [
        {
          title: 'Infraestructura de Redes y Cableado',
          fullTitle: 'Infraestructura de Redes y Cableado',
          ficha: '290145 - Redes',
          horario: '06:00 AM - 12:00 PM',
          ambiente: 'Lab. Redes 204',
          torre: 'Torre B',
          estado: 'Programado'
        }
      ]
    }
  ];

  // Abrir detalle al hacer clic en una tarjeta de clase
  const handleOpenDetail = (sessionData) => {
    setSelectedSession(sessionData);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedSession(null);
  };

  // =========================================================================
  // ACCIONES OPERATIVAS DEL DRAWER (CONECTADAS AL FLUJO NOVEDADSOFT)
  // =========================================================================
  const handleVerificarAmbiente = () => {
    if (!selectedSession) return;
    handleCloseDrawer();
    navigate('/instructor/verificar-ambiente', {
      state: {
        ambiente: selectedSession.ambiente,
        ficha: selectedSession.ficha,
        competencia: selectedSession.fullTitle || selectedSession.title,
        horario: selectedSession.horario,
      },
    });
  };

  const handleVerInventarioAula = () => {
    if (!selectedSession) return;
    handleCloseDrawer();
    navigate('/instructor/consulta-materiales', {
      state: {
        ambiente: selectedSession.ambiente,
        ficha: selectedSession.ficha,
      },
    });
  };

  const handleReportarNovedadAula = () => {
    if (!selectedSession) return;
    handleCloseDrawer();
    navigate('/instructor/reportar-novedad', {
      state: {
        ambiente: selectedSession.ambiente,
        ficha: selectedSession.ficha,
        competencia: selectedSession.fullTitle || selectedSession.title,
      },
    });
  };

  // =========================================================================
  // EXPORTAR MALLA HORARIA A PDF INSTITUCIONAL
  // =========================================================================
  const handleExportHorarioPDF = () => {
    const printWindow = window.open('', '_blank', 'width=1100,height=800');
    if (!printWindow) {
      showAlert({
        title: 'Ventana bloqueada',
        message: 'Permite las ventanas emergentes en tu navegador para generar el PDF del horario.',
        type: 'warning',
      });
      return;
    }

    const columnasHTML = mallaSemanal
      .map(
        (col) => `
        <div class="day-col">
          <div class="day-head ${col.isToday ? 'today' : ''}">
            <span>${col.dia}</span>
            <span>${col.horasDia}</span>
          </div>
          ${col.sesiones
            .map(
              (s) => `
            <div class="session-box">
              <div class="time">${s.horario}</div>
              <div class="stitle">${s.fullTitle || s.title}</div>
              <div class="meta">
                <span class="ficha">${s.ficha}</span><br/>
                <span>${s.ambiente} (${s.torre})</span>
              </div>
              <div class="status">${s.estado}</div>
            </div>
          `
            )
            .join('')}
        </div>
      `
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Malla Horaria Docente - Ing. Carlos Mendoza R. - NovedadSoft</title>
          <style>
            @page { size: landscape; margin: 16mm; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #0F172A; margin: 0; padding: 20px; }
            .header { border-bottom: 3px solid #39A900; padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 20px; font-weight: 700; color: #0B1C30; margin: 0; }
            .subtitle { font-size: 12px; color: #64748B; margin: 4px 0 0 0; }
            .info-bar { display: flex; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 14px; font-size: 12px; margin-bottom: 18px; }
            .grid-week { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
            .day-col { border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px; background: #FFFFFF; }
            .day-head { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: #475569; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 10px; }
            .day-head.today { color: #065F46; border-bottom-color: #39A900; }
            .session-box { background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: 8px; padding: 10px; }
            .time { font-size: 11px; font-weight: 700; color: #226D00; margin-bottom: 6px; }
            .stitle { font-size: 12px; font-weight: 700; color: #0F172A; margin-bottom: 8px; line-height: 1.35; }
            .meta { font-size: 10px; color: #475569; line-height: 1.4; }
            .ficha { font-weight: 700; color: #1D4ED8; }
            .status { margin-top: 8px; display: inline-block; font-size: 10px; font-weight: 600; background: #E2E8F0; padding: 2px 6px; border-radius: 4px; }
            .footer { margin-top: 24px; font-size: 10px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">SENA CIDE Soacha • Programación Académica Docente</h1>
              <p class="subtitle">Instructor: Ing. Carlos Mendoza R. • Área: ADSO / Redes • Trimestre IV - 2026</p>
            </div>
            <div style="text-align: right; font-size: 11px; color: #475569;">
              <strong>Semana 43:</strong> 19 - 23 Oct 2026<br/>
              <strong>Carga Lectiva:</strong> 32h / semana (100%)
            </div>
          </div>

          <div class="info-bar">
            <span><strong>Centro de Formación:</strong> Centro Industrial y de Desarrollo Empresarial (CIDE) - Regional Cundinamarca</span>
            <span><strong>Validación:</strong> Coordinación Académica • Res. 2026-08</span>
          </div>

          <div class="grid-week">
            ${columnasHTML}
          </div>

          <div class="footer">
            Documento generado por NovedadSoft • Fecha de descarga: ${new Date().toLocaleDateString()}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  // =========================================================================
  // SUBIR ARCHIVO DE HORARIO OFICIAL
  // =========================================================================
  const validateAndSetFile = (file) => {
    if (!file) return;
    const validExtensions = ['pdf', 'xlsx', 'xls', 'csv'];
    const ext = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(ext)) {
      showAlert({
        title: 'Formato no permitido',
        message: 'Por favor selecciona un archivo PDF o Excel (.xlsx, .xls, .csv).',
        type: 'warning',
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const handleDropFile = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleConfirmUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showAlert({
        title: 'Archivo requerido',
        message: 'Selecciona primero el archivo de tu programación académica.',
        type: 'warning',
      });
      return;
    }

    setUploadedScheduleInfo({
      fileName: selectedFile.name,
      trimestre: trimestreUpload,
      fechaCarga: new Date().toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    setIsUploadModalOpen(false);
    setSelectedFile(null);

    showAlert({
      title: 'Horario Sincronizado',
      message: `El archivo "${selectedFile.name}" fue cargado correctamente para ${trimestreUpload}.`,
      type: 'success',
    });
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
          
          {/* BANNER DE CONFIRMACIÓN SI SE SUBIÓ UN ARCHIVO DE HORARIO */}
          {uploadedScheduleInfo && (
            <div className="horario-sync-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="status-green-dot" />
                <span>
                  Archivo cargado: <strong>{uploadedScheduleInfo.fileName}</strong> ({uploadedScheduleInfo.trimestre}) • Actualizado el {uploadedScheduleInfo.fechaCarga}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setUploadedScheduleInfo(null)}
                style={{ background: 'none', border: 'none', color: '#065F46', cursor: 'pointer', fontWeight: '700' }}
              >
                ✕
              </button>
            </div>
          )}

          {/* HEADER PRINCIPAL Y CARGA LECTIVA */}
          <div className="horario-header-card">
            <div>
              <div className="header-title-badge">
                <span className="status-green-dot" />
                <span>Trimestre IV - 2026</span>
              </div>
              <h1 className="horario-main-title">Mi Malla Horaria</h1>
              <p className="horario-main-subtitle">
                Programación académica docente • Sede Soacha
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

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button 
                  type="button"
                  className="btn-outline-action" 
                  onClick={handleExportHorarioPDF}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span>PDF</span>
                </button>

                <button 
                  type="button"
                  className="btn-green-action" 
                  onClick={() => setIsUploadModalOpen(true)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>Subir Horario</span>
                </button>
              </div>
            </div>
          </div>

          {/* BARRA DE FILTROS Y CONTROLES (3 COLUMNAS) */}
          <div className="horario-controls-bar">
            <div className="control-grid-item">
              <select className="select-custom-pill" defaultValue="t4">
                <option value="t4">Trimestre IV - 2026 (Actual)</option>
                <option value="t3">Trimestre III - 2026</option>
              </select>
            </div>

            <div className="control-grid-item">
              <select className="select-custom-pill" defaultValue="todas">
                <option value="todas">Jornada: Todas las franjas</option>
                <option value="manana">Jornada Mañana</option>
                <option value="tarde">Jornada Tarde</option>
              </select>
            </div>

            <div className="control-grid-item">
              <div className="week-navigator-box">
                <button type="button" className="nav-arrow-btn">‹</button>
                <span className="week-navigator-text">
                  Semana 43: 19 - 23 Oct
                </span>
                <button type="button" className="nav-arrow-btn">›</button>
              </div>
            </div>
          </div>

          {/* GRID SEMANAL (5 DÍAS) */}
          <div className="horario-grid-week">
            {mallaSemanal.map((columna, idx) => (
              <div className="day-column-container" key={idx}>
                <div className={`day-header-pill ${columna.isToday ? 'today-highlight' : ''}`}>
                  {columna.isToday ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#065F46' }}>{columna.dia}</span>
                        <span style={{ fontSize: '9px', fontWeight: '700', color: '#FFFFFF', backgroundColor: '#39A900', padding: '2px 6px', borderRadius: '4px' }}>HOY</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '600', color: '#065F46' }}>{columna.horasDia}</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>{columna.dia}</span>
                      <span style={{ fontSize: '11px', color: '#64748B', backgroundColor: '#F8FAFC', padding: '2px 8px', borderRadius: '4px' }}>{columna.horasDia}</span>
                    </>
                  )}
                </div>

                {columna.sesiones.map((sesion, sIdx) => (
                  <div
                    key={sIdx}
                    className={`session-card-clean ${sesion.estado === 'En Curso' ? 'in-progress' : ''}`}
                    onClick={() => handleOpenDetail(sesion)}
                  >
                    {sesion.estado === 'En Curso' && <div className="corner-active-indicator" />}
                    <div>
                      <div className="session-card-footer" style={{ borderTop: 'none', paddingBottom: '8px' }}>
                        <span className={`session-card-time ${sesion.estado === 'En Curso' ? 'active-time' : ''}`}>
                          {sesion.horario.split(' - ')[0]} -<br />{sesion.horario.split(' - ')[1]}
                        </span>
                        {sesion.estado === 'En Curso' && (
                          <span style={{ fontSize: '10px', fontWeight: '700', color: '#065F46', backgroundColor: '#D1FAE5', padding: '2px 6px', borderRadius: '9999px' }}>
                            En Curso
                          </span>
                        )}
                        {sesion.estado === 'Completado' && (
                          <span style={{ fontSize: '10px', color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                            Completado
                          </span>
                        )}
                        {sesion.estado === 'Programado' && (
                          <span style={{ fontSize: '10px', color: '#0369A1', backgroundColor: '#F0F9FF', padding: '2px 6px', borderRadius: '4px' }}>
                            Programado
                          </span>
                        )}
                      </div>
                      <h4 className="session-card-title">{sesion.title}</h4>
                    </div>

                    <div className="session-card-footer">
                      <span className={sesion.estado === 'En Curso' ? 'ficha-tag-green' : 'ficha-tag-blue'}>
                        {sesion.ficha}
                      </span>
                      <span className="location-text" style={sesion.estado === 'En Curso' ? { fontWeight: '600', color: '#475569' } : {}}>
                        {sesion.ambiente}<br />({sesion.torre.split('•')[0].trim()})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
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

      {/* 3. DRAWER LATERAL DESLIZANTE (DETALLE DE SESIÓN CON ACCIONES DE AMBIENTE) */}
      {isDrawerOpen && selectedSession && (
        <div className="session-drawer-overlay" onClick={handleCloseDrawer}>
          <div className="session-drawer-panel" onClick={(e) => e.stopPropagation()}>
            
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#D1FAE5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#39A900' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                    Detalle de Sesión Formativa
                  </h3>
                  <span style={{ fontSize: '10px', color: '#065F46', backgroundColor: '#D1FAE5', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {selectedSession.estado || 'En Curso'}
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
                  {selectedSession.fullTitle || selectedSession.title}
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
                    {selectedSession.asistieron || '30 / 32 Asistieron'}
                  </span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '92%', height: '100%', backgroundColor: '#39A900' }} />
                </div>
              </div>
            </div>

            {/* FOOTER CON 3 BOTONES OPERATIVOS CONECTADOS A NOVEDADSOFT */}
            <div className="drawer-footer-actions">
              <button 
                type="button" 
                className="btn-green-action" 
                style={{ width: '100%', justifyContent: 'center', padding: '10px', fontWeight: '600' }}
                onClick={handleVerificarAmbiente}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                <span>Verificar Ambiente / Checklist</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button 
                  type="button" 
                  className="btn-outline-action" 
                  style={{ justifyContent: 'center', fontWeight: '600' }}
                  onClick={handleVerInventarioAula}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  <span>Inventario Aula</span>
                </button>

                <button 
                  type="button" 
                  className="btn-novedad-drawer"
                  onClick={handleReportarNovedadAula}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>Reportar Novedad</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. MODAL PARA SUBIR HORARIO OFICIAL */}
      {isUploadModalOpen && (
        <div className="upload-modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
          <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                  Cargar Programación Horaria
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Sube el archivo oficial emitido por Coordinación Académica
                </p>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsUploadModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmUpload} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Periodo Académico
                </label>
                <select
                  className="select-custom-pill"
                  value={trimestreUpload}
                  onChange={(e) => setTrimestreUpload(e.target.value)}
                >
                  <option value="Trimestre IV - 2026">Trimestre IV - 2026</option>
                  <option value="Trimestre I - 2027">Trimestre I - 2027</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Archivo de Horario (PDF o Excel)
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                {!selectedFile ? (
                  <div
                    className={`upload-dropzone-area ${isDragging ? 'drag-over' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDropFile}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#39A900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>
                      Haz clic para seleccionar o arrastra tu archivo aquí
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Formatos soportados: PDF, XLSX, XLS, CSV (Máx. 10 MB)
                    </div>
                  </div>
                ) : (
                  <div className="uploaded-file-pill">
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#065F46', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {selectedFile.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#047857' }}>
                        {(selectedFile.size / 1024).toFixed(1)} KB • Listo para sincronizar
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      style={{ background: '#FFFFFF', border: '1px solid #A7F3D0', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: '600', color: '#065F46', cursor: 'pointer' }}
                    >
                      Cambiar
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  className="btn-outline-action"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setSelectedFile(null);
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-green-action">
                  Cargar y Sincronizar Horario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MiHorario;