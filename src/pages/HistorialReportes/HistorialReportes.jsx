import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { useAlert } from '../../context/AlertContext/AlertContext';
import './HistorialReportes.css';

export const HistorialReportes = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [activeTab, setActiveTab] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedNovedad, setSelectedNovedad] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Estados para Añadir Nota por cada radicado
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notasPorRadicado, setNotasPorRadicado] = useState({});

  // Lista Completa de Radicados de Novedades
  const reportesMock = [
    {
      radicado: '#NOV-2026-089',
      fecha: '21/10/2026, 06:15 AM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'PC Lenovo M70a',
      placa: 'SENA-89211',
      falla: 'No enciende (3 beeps)',
      impacto: 'Bloqueante',
      estado: 'EN_REPARACION',
      tecnico: 'Mauricio Gómez',
      diagnostico: 'Falla en slot DIMM 1 detectada; se sustituye módulo DDR4 8GB Kingston por repuesto de stock CIDE y se realiza stress test.',
      sla: '1h 45m'
    },
    {
      radicado: '#NOV-2026-084',
      fecha: '18/10/2026, 08:30 AM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Cableado Red Puesto 14',
      placa: 'S/N-RED-305',
      falla: 'RJ45 sin enlace LAN',
      impacto: 'Parcial',
      estado: 'RESUELTO',
      tecnico: 'Diana Torres',
      diagnostico: 'Re-ponchado de conector RJ45 e inspección de puerto en patch panel.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-078',
      fecha: '14/10/2026, 07:10 AM',
      ambiente: 'Amb 302',
      ficha: '271544 (TPS)',
      elemento: 'Smart TV 65" LG UHD',
      placa: 'SENA-77341',
      falla: 'Entrada HDMI 1 rota',
      impacto: 'Parcial',
      estado: 'RESUELTO',
      tecnico: 'Mesa TI CIDE',
      diagnostico: 'Se habilita puerto HDMI 2 secundario y se etiqueta puerto dañado.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-092',
      fecha: '24/10/2026, 06:05 AM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Sistema Aire Acond.',
      placa: 'SENA-55219',
      falla: 'Fuga de condensado',
      impacto: 'Menor',
      estado: 'EN_EVALUACION',
      tecnico: 'Mantenimiento Locativo',
      diagnostico: 'Limpieza de manguera de drenaje programada.',
      sla: '4h 00m'
    },
    {
      radicado: '#NOV-2026-095',
      fecha: 'Hoy, 06:20 AM',
      ambiente: 'Amb 301',
      ficha: '289012 (ADSO)',
      elemento: 'Switch Cisco 24P',
      placa: 'SENA-99014',
      falla: 'Fallo en módulo PoE',
      impacto: 'Bloqueante',
      estado: 'REGISTRADA',
      tecnico: 'Pendiente asignación',
      diagnostico: 'Radicado ingresado en cola prioritaria.',
      sla: '2h 00m'
    },
    {
      radicado: '#NOV-2026-096',
      fecha: '01/11/2026, 09:10 AM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Video Beam Epson',
      placa: 'SENA-66108',
      falla: 'Lámpara sin brillo',
      impacto: 'Parcial',
      estado: 'EN_EVALUACION',
      tecnico: 'Mesa TI CIDE',
      diagnostico: 'Evaluación de horas de uso de lámpara en laboratorio.',
      sla: '3h 30m'
    },
    {
      radicado: '#NOV-2026-097',
      fecha: '02/11/2026, 10:00 AM',
      ambiente: 'Amb 306',
      ficha: '289012 (ADSO)',
      elemento: 'Teclado Lenovo USB',
      placa: 'SENA-12344',
      falla: 'Teclas no responden',
      impacto: 'Menor',
      estado: 'REGISTRADA',
      tecnico: 'Pendiente asignación',
      diagnostico: 'Pendiente por revisión física.',
      sla: '5h 00m'
    },
    {
      radicado: '#NOV-2026-098',
      fecha: '03/11/2026, 02:15 PM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Silla Ergonómica',
      placa: 'SENA-33211',
      falla: 'Base pistón rota',
      impacto: 'Menor',
      estado: 'RESUELTO',
      tecnico: 'Mantenimiento Locativo',
      diagnostico: 'Sustitución de componente hidráulico.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-099',
      fecha: '04/11/2026, 04:30 PM',
      ambiente: 'Amb 302',
      ficha: '271544 (TPS)',
      elemento: 'PC HP ProDesk',
      placa: 'SENA-77112',
      falla: 'Disco duro sectores dañados',
      impacto: 'Bloqueante',
      estado: 'RESUELTO',
      tecnico: 'Mauricio Gómez',
      diagnostico: 'Clonación e instalación de SSD NVMe 512GB.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-100',
      fecha: '05/11/2026, 07:45 AM',
      ambiente: 'Amb 301',
      ficha: '289012 (ADSO)',
      elemento: 'Proyector Pared',
      placa: 'SENA-55441',
      falla: 'Cable HDMI sulfatado',
      impacto: 'Parcial',
      estado: 'RESUELTO',
      tecnico: 'Diana Torres',
      diagnostico: 'Sustitución de cableado de video canalizado.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-101',
      fecha: '06/11/2026, 11:20 AM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Toma Eléctrica Regulada',
      placa: 'S/N-ELE-305',
      falla: 'Sin voltaje',
      impacto: 'Bloqueante',
      estado: 'RESUELTO',
      tecnico: 'Mantenimiento Eléctrico',
      diagnostico: 'Reconexión de breaker de protección en tablero B.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-102',
      fecha: '07/11/2026, 01:10 PM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Mouse Óptico Lenovo',
      placa: 'SENA-99411',
      falla: 'Cable cortado',
      impacto: 'Menor',
      estado: 'RESUELTO',
      tecnico: 'Mesa TI CIDE',
      diagnostico: 'Entrega de periférico nuevo del stock.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-103',
      fecha: '08/11/2026, 08:00 AM',
      ambiente: 'Amb 306',
      ficha: '289012 (ADSO)',
      elemento: 'Monitor 24" Dell',
      placa: 'SENA-88123',
      falla: 'Parpadeo continuo',
      impacto: 'Parcial',
      estado: 'RESUELTO',
      tecnico: 'Mauricio Gómez',
      diagnostico: 'Reemplazo de adaptador de energía de 19V.',
      sla: 'Resuelto'
    },
    {
      radicado: '#NOV-2026-104',
      fecha: '09/11/2026, 10:40 AM',
      ambiente: 'Amb 305',
      ficha: '289012 (ADSO)',
      elemento: 'Access Point Aruba',
      placa: 'SENA-44102',
      falla: 'Caída de red Wi-Fi',
      impacto: 'Bloqueante',
      estado: 'REGISTRADA',
      tecnico: 'Redes CIDE',
      diagnostico: 'Revisión de POE en switch central.',
      sla: '1h 20m'
    }
  ];

  // FILTRADO DINÁMICO
  const reportesFiltrados = useMemo(() => {
    return reportesMock.filter((item) => {
      const matchTab = activeTab === 'TODOS' || item.estado === activeTab;
      const term = searchTerm.toLowerCase();
      const matchSearch =
        item.radicado.toLowerCase().includes(term) ||
        item.elemento.toLowerCase().includes(term) ||
        item.placa.toLowerCase().includes(term) ||
        item.ambiente.toLowerCase().includes(term);

      return matchTab && matchSearch;
    });
  }, [activeTab, searchTerm]);

  // PAGINACIÓN DINÁMICA
  const totalPages = Math.ceil(reportesFiltrados.length / itemsPerPage) || 1;

  const currentReportes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return reportesFiltrados.slice(startIndex, startIndex + itemsPerPage);
  }, [reportesFiltrados, currentPage]);

  // CONTADORES REALES
  const countTodos = reportesMock.length;
  const countRegistradas = reportesMock.filter((r) => r.estado === 'REGISTRADA').length;
  const countEvaluacion = reportesMock.filter((r) => r.estado === 'EN_EVALUACION').length;
  const countReparacion = reportesMock.filter((r) => r.estado === 'EN_REPARACION').length;
  const countResueltos = reportesMock.filter((r) => r.estado === 'RESUELTO').length;

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenDetail = (novedad) => {
    setSelectedNovedad(novedad);
    setIsAddingNote(false);
    setNoteText('');
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedNovedad(null);
    setIsAddingNote(false);
    setNoteText('');
  };

  const handleRadicarNueva = () => {
    navigate('/instructor/verificar-ambiente');
  };

  // GUARDAR NOTA DE SEGUIMIENTO
  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) {
      showAlert({
        title: 'Campo vacío',
        message: 'Escribe una observación antes de guardar la nota.',
        type: 'warning',
      });
      return;
    }

    const radicadoId = selectedNovedad.radicado;
    const nuevaNota = {
      id: Date.now(),
      autor: 'Ing. Carlos Mendoza R.',
      fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      texto: noteText.trim(),
    };

    setNotasPorRadicado((prev) => ({
      ...prev,
      [radicadoId]: [...(prev[radicadoId] || []), nuevaNota],
    }));

    setNoteText('');
    setIsAddingNote(false);

    showAlert({
      title: 'Nota Registrada',
      message: `Observación añadida correctamente al radicado ${radicadoId}.`,
      type: 'success',
    });
  };

  // EXPORTAR FICHA PDF DE LA INCIDENCIA
  const handleExportFichaPDF = () => {
    if (!selectedNovedad) return;

    const notasActuales = notasPorRadicado[selectedNovedad.radicado] || [];
    const notasHTML = notasActuales.length > 0
      ? notasActuales.map((n) => `<li><strong>[${n.fecha}] ${n.autor}:</strong> ${n.texto}</li>`).join('')
      : '<li>Sin notas adicionales registradas por el instructor.</li>';

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) {
      showAlert({
        title: 'Ventana bloqueada',
        message: 'Permite las ventanas emergentes en tu navegador para generar la Ficha PDF.',
        type: 'warning',
      });
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ficha Técnica ${selectedNovedad.radicado} - NovedadSoft</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #0F172A; margin: 0; }
            .header { border-bottom: 3px solid #39A900; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 20px; font-weight: 700; color: #0B1C30; margin: 0; }
            .subtitle { font-size: 12px; color: #64748B; margin: 4px 0 0 0; }
            .badge { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 6px 12px; border-radius: 6px; font-weight: 700; font-size: 13px; font-family: monospace; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #F8FAFC; padding: 18px; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 24px; }
            .label { font-size: 10px; color: #64748B; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
            .value { font-size: 14px; font-weight: 600; color: #0F172A; margin-top: 4px; }
            .section-title { font-size: 12px; font-weight: 700; color: #3C627F; text-transform: uppercase; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-top: 22px; margin-bottom: 10px; }
            .box { background: #F8FAFC; border-left: 4px solid #3C627F; padding: 12px 16px; font-size: 13px; color: #1E293B; }
            ul { padding-left: 18px; font-size: 13px; line-height: 1.6; color: #334155; }
            .footer { margin-top: 50px; font-size: 11px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">SENA CIDE Soacha • NovedadSoft</h1>
              <p class="subtitle">Ficha Oficial de Trazabilidad e Incidencia Técnica</p>
            </div>
            <span class="badge">${selectedNovedad.radicado}</span>
          </div>

          <div class="grid">
            <div>
              <div class="label">Elemento / Activo</div>
              <div class="value">${selectedNovedad.elemento}</div>
            </div>
            <div>
              <div class="label">Placa Inventario SENA</div>
              <div class="value">${selectedNovedad.placa}</div>
            </div>
            <div>
              <div class="label">Ambiente / Ficha</div>
              <div class="value">${selectedNovedad.ambiente} • Ficha ${selectedNovedad.ficha}</div>
            </div>
            <div>
              <div class="label">Fecha y Hora de Radicación</div>
              <div class="value">${selectedNovedad.fecha}</div>
            </div>
            <div>
              <div class="label">Falla Reportada</div>
              <div class="value">${selectedNovedad.falla}</div>
            </div>
            <div>
              <div class="label">Estado / Impacto</div>
              <div class="value">${selectedNovedad.estado} (${selectedNovedad.impacto})</div>
            </div>
          </div>

          <div class="section-title">Diagnóstico Mesa de Ayuda CIDE TI</div>
          <div class="box">
            <p style="margin: 0 0 6px 0; font-style: italic;">"${selectedNovedad.diagnostico}"</p>
            <div style="font-size: 12px; color: #64748B;">Técnico responsable: <strong>${selectedNovedad.tecnico}</strong> • SLA: ${selectedNovedad.sla}</div>
          </div>

          <div class="section-title">Notas y Seguimiento del Instructor</div>
          <ul>${notasHTML}</ul>

          <div class="footer">
            Documento generado por NovedadSoft • Centro Industrial y de Desarrollo Empresarial (CIDE) Soacha - Regional Cundinamarca
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

  const notasDeNovedadActual = selectedNovedad ? (notasPorRadicado[selectedNovedad.radicado] || []) : [];

  return (
    <div className="historial-layout-wrapper">
      {/* 1. SIDEBAR INTEGRADO */}
      <Sidebar 
        activeMenu="historial" 
        userName="Ing. Carlos Mendoza R." 
        userRole="Instructor ADSO / Redes" 
      />

      {/* 2. ÁREA DE CONTENIDO */}
      <main className="historial-main-content">
        {/* Topbar Superior */}
        <header className="historial-topbar">
          <div className="historial-breadcrumb">
            <span>Portal CIDE</span>
            <span>›</span>
            <span>Instructor</span>
            <span>›</span>
            <span className="historial-breadcrumb-active">Historial de Reportes</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: '#F0FDF4', color: '#095223', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#16A34A', borderRadius: '50%' }} />
              <span>Servidor Activo</span>
            </div>

            <div style={{ backgroundColor: '#F1F5F9', color: '#3C627F', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '500' }}>
              SENA CIDE Soacha - Regional Cundinamarca
            </div>
          </div>
        </header>

        {/* Contenedor de la vista */}
        <div className="historial-body-container">
          {/* Header de la Página */}
          <div className="historial-header-row">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="mesa-ayuda-pill">MESA DE AYUDA • CIDE SOACHA</span>
                <span style={{ color: '#94A3B8', fontSize: '11px' }}>Vigencia 2026</span>
              </div>
              <h1 className="historial-title">Historial de Reportes y Novedades</h1>
              <p className="historial-subtitle">
                Consulta la trazabilidad institucional y el estado actual de los incidentes radicados en ambientes de formación técnica y tecnológica.
              </p>
            </div>

            <div className="action-buttons-group">
              <button className="btn-export">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Exportar Historial (PDF / Excel)</span>
              </button>

              <button className="btn-radicar-nueva" onClick={handleRadicarNueva}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Radicar Nueva</span>
              </button>
            </div>
          </div>

          {/* 1. TARJETAS DE MÉTRICAS KPI */}
          <div className="kpi-cards-grid">
            <div className="kpi-card">
              <div>
                <div className="kpi-title">TOTAL REPORTADOS</div>
                <div className="kpi-value" style={{ color: '#0B1C30' }}>{countTodos}</div>
                <div className="kpi-foot-text">
                  <span style={{ color: '#16A34A', fontWeight: '600' }}>+2</span> en este trimestre
                </div>
              </div>
              <div className="kpi-icon-box" style={{ backgroundColor: '#E5EEFF', color: '#3C627F' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">EN ATENCIÓN ACTIVA</div>
                <div className="kpi-value" style={{ color: '#3C627F' }}>{countEvaluacion + countReparacion + countRegistradas}</div>
                <div className="kpi-foot-text">{countEvaluacion} en evaluación • {countReparacion} reparación</div>
              </div>
              <div className="kpi-icon-box" style={{ backgroundColor: '#B5DCFE', color: '#3B617E' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">CASOS RESUELTOS</div>
                <div className="kpi-value" style={{ color: '#226D00' }}>{countResueltos}</div>
                <div className="kpi-foot-text">78.5% tasa de resolución</div>
              </div>
              <div className="kpi-icon-box" style={{ backgroundColor: '#F0FDF4', color: '#39A900' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 2. FILTROS Y BUSCADOR */}
          <div className="filters-container-card">
            <div className="filters-top-row">
              <div className="search-input-wrapper">
                <svg className="search-icon-pos" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar por número de radicado, placa SENA o ambiente..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <select className="select-filter-pill" defaultValue="amb305">
                  <option value="amb305">Amb 305 - Lab TIDC I</option>
                  <option value="todos">Todos los Ambientes</option>
                </select>

                <select className="select-filter-pill" defaultValue="mes">
                  <option value="mes">Mes Actual</option>
                  <option value="trimestre">Trimestre IV</option>
                </select>
              </div>
            </div>

            {/* Pestañas por Estado */}
            <div className="status-tabs-row">
              <button 
                className={`tab-pill ${activeTab === 'TODOS' ? 'active' : ''}`}
                onClick={() => handleTabClick('TODOS')}
              >
                <span>Todos</span>
                <span className="tab-count-badge">{countTodos}</span>
              </button>

              <button 
                className={`tab-pill ${activeTab === 'REGISTRADA' ? 'active' : ''}`}
                onClick={() => handleTabClick('REGISTRADA')}
              >
                <span style={{ width: '8px', height: '8px', backgroundColor: '#3C627F', borderRadius: '50%' }} />
                <span>REGISTRADA</span>
                <span className="tab-count-badge">{countRegistradas}</span>
              </button>

              <button 
                className={`tab-pill ${activeTab === 'EN_EVALUACION' ? 'active' : ''}`}
                onClick={() => handleTabClick('EN_EVALUACION')}
              >
                <span style={{ width: '8px', height: '8px', backgroundColor: '#B5DCFE', borderRadius: '50%' }} />
                <span>EN_EVALUACION</span>
                <span className="tab-count-badge">{countEvaluacion}</span>
              </button>

              <button 
                className={`tab-pill ${activeTab === 'EN_REPARACION' ? 'active' : ''}`}
                onClick={() => handleTabClick('EN_REPARACION')}
              >
                <span style={{ width: '8px', height: '8px', backgroundColor: '#213145', borderRadius: '50%' }} />
                <span>EN_REPARACION</span>
                <span className="tab-count-badge">{countReparacion}</span>
              </button>

              <button 
                className={`tab-pill ${activeTab === 'RESUELTO' ? 'active' : ''}`}
                onClick={() => handleTabClick('RESUELTO')}
              >
                <span style={{ width: '8px', height: '8px', backgroundColor: '#39A900', borderRadius: '50%' }} />
                <span>RESUELTO</span>
                <span className="tab-count-badge">{countResueltos}</span>
              </button>
            </div>
          </div>

          {/* 3. TABLA DE REPORTES */}
          <div className="table-card-container">
            <div className="table-responsive">
              <table className="novedades-table">
                <thead>
                  <tr>
                    <th>RADICADO / FECHA</th>
                    <th>AMBIENTE / FICHA</th>
                    <th>ELEMENTO / PLACA</th>
                    <th>FALLA / IMPACTO</th>
                    <th>ESTADO ACTUAL</th>
                    <th style={{ textAlign: 'right' }}>ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReportes.length > 0 ? (
                    currentReportes.map((item, index) => (
                      <tr key={index} className={selectedNovedad?.radicado === item.radicado ? 'selected-row' : ''}>
                        <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>
                          <div>{item.radicado}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'sans-serif', fontWeight: '400' }}>
                            {item.fecha}
                          </div>
                        </td>

                        <td>
                          <div style={{ fontWeight: '600' }}>{item.ambiente}</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>Ficha {item.ficha}</div>
                        </td>

                        <td>
                          <div style={{ fontWeight: '600' }}>{item.elemento}</div>
                          <span style={{ fontSize: '10px', backgroundColor: '#F1F5F9', color: '#3C627F', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                            {item.placa}
                          </span>
                        </td>

                        <td>
                          <div>{item.falla}</div>
                          <span className={item.impacto === 'Bloqueante' ? 'badge-impacto-bloqueante' : 'badge-impacto-parcial'}>
                            {item.impacto}
                          </span>
                        </td>

                        <td>
                          <span className={`badge-status ${
                            item.estado === 'EN_REPARACION' ? 'status-reparacion' :
                            item.estado === 'RESUELTO' ? 'status-resuelto' :
                            item.estado === 'EN_EVALUACION' ? 'status-evaluacion' : 'status-registrada'
                          }`}>
                            {item.estado}
                          </span>
                        </td>

                        <td style={{ textAlign: 'right' }}>
                          <button 
                            className={`btn-table-action ${selectedNovedad?.radicado === item.radicado ? 'active-btn' : ''}`}
                            onClick={() => handleOpenDetail(item)}
                          >
                            <span>Detalle</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>
                        No se encontraron reportes radicados con los filtros seleccionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación Funcional */}
            <div className="pagination-footer">
              <div>
                Mostrando <strong>{reportesFiltrados.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, reportesFiltrados.length)}</strong> de <strong>{reportesFiltrados.length}</strong> radicados institucionales
              </div>

              <div className="pagination-pages">
                <button 
                  className="page-num-btn"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button 
                  className="page-num-btn"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. DRAWER LATERAL DE TRAZABILIDAD (400px) */}
      {isDrawerOpen && selectedNovedad && (
        <div className="trazabilidad-drawer-overlay" onClick={handleCloseDrawer}>
          <div className="trazabilidad-drawer-panel" onClick={(e) => e.stopPropagation()}>
            
            {/* Header del Panel */}
            <div style={{ padding: '20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: '700', color: '#3C627F', backgroundColor: '#DCE9FF', padding: '2px 8px', borderRadius: '4px' }}>
                    {selectedNovedad.radicado}
                  </span>
                  <span className="badge-impacto-bloqueante">
                    Impacto {selectedNovedad.impacto}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0B1C30', margin: 0 }}>
                  Detalle de Incidencia Técnica
                </h3>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                  Radicado por: <strong>Ing. Carlos Mendoza R.</strong>
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                  {selectedNovedad.fecha} • Sede CIDE Soacha
                </div>
              </div>

              <button onClick={handleCloseDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Cuerpo de Trazabilidad */}
            <div className="trazabilidad-body">
              {/* Tarjeta resumida del equipo */}
              <div style={{ padding: '12px', backgroundColor: '#F1F5F9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#0B1C30' }}>{selectedNovedad.elemento}</div>
                  <div style={{ fontSize: '11px', color: '#3C627F', fontFamily: 'monospace' }}>Placa: {selectedNovedad.placa}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'right' }}>
                  {selectedNovedad.ambiente}
                </div>
              </div>

              {/* TIMELINE DE ESTADOS */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '12px' }}>
                  TRAZABILIDAD DE LA NOVEDAD
                </div>

                <div className="timeline-container">
                  <div className="timeline-line" />

                  {/* Paso 1: Registrada */}
                  <div className="timeline-item">
                    <div className="timeline-dot done">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#0B1C30' }}>
                      <span>1. REGISTRADA</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>{selectedNovedad.fecha}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '2px 0 0 0' }}>
                      Radicación exitosa por instructor en aula de formación ADSO.
                    </p>
                  </div>

                  {/* Paso 2: En Evaluación */}
                  <div className="timeline-item">
                    <div className="timeline-dot done">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#0B1C30' }}>
                      <span>2. EN EVALUACIÓN</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>21/10 07:40 AM</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '2px 0 0 0' }}>
                      Asignado a Mesa de Ayuda TI: <strong>Téc. Mauricio Gómez</strong>.
                    </p>
                  </div>

                  {/* Paso 3: En Reparación */}
                  <div className="timeline-item">
                    <div className="timeline-dot current">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    </div>
                    <div style={{ backgroundColor: 'rgba(220, 233, 255, 0.60)', padding: '10px', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#3C627F' }}>
                        <span>3. EN REPARACIÓN (ACTUAL)</span>
                        <span style={{ fontSize: '11px' }}>21/10 10:15 AM</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#3B617E', margin: '4px 0 0 0' }}>
                        Reemplazo de módulo RAM y prueba de fuente en laboratorio TI CIDE.
                      </p>
                    </div>
                  </div>

                  {/* Paso 4: Resuelto */}
                  <div className="timeline-item" style={{ opacity: 0.6 }}>
                    <div className="timeline-dot pending">
                      <svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '500', color: '#475569' }}>
                      <span>4. RESUELTO</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>Pendiente</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                      Validación de encendido en aula 305 y firma de conformidad.
                    </p>
                  </div>
                </div>
              </div>

              {/* DIAGNÓSTICO TÉCNICO */}
              <div className="diagnostic-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#3C627F' }}>DIAGNÓSTICO CIDE TI</span>
                  <span style={{ fontSize: '11px', color: '#095223', backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    SLA Restante: {selectedNovedad.sla}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#0B1C30', fontStyle: 'italic', margin: 0 }}>
                  "{selectedNovedad.diagnostico}"
                </p>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                  Técnico responsable: <strong>{selectedNovedad.tecnico}</strong>
                </div>
              </div>

              {/* LISTADO DE NOTAS AÑADIDAS POR EL INSTRUCTOR */}
              {notasDeNovedadActual.length > 0 && (
                <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#3C627F', marginBottom: '8px', textTransform: 'uppercase' }}>
                    NOTAS DE SEGUIMIENTO ({notasDeNovedadActual.length})
                  </div>
                  {notasDeNovedadActual.map((nota) => (
                    <div key={nota.id} style={{ fontSize: '12px', color: '#1E293B', paddingBottom: '8px', marginBottom: '8px', borderBottom: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600' }}>
                        {nota.autor} • {nota.fecha}
                      </div>
                      <div style={{ marginTop: '2px' }}>{nota.texto}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* FORMULARIO DESPLEGABLE PARA AÑADIR NOTA */}
              {isAddingNote && (
                <form onSubmit={handleSaveNote} style={{ padding: '12px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#065F46', display: 'block', marginBottom: '6px' }}>
                    Nueva nota para {selectedNovedad.radicado}:
                  </label>
                  <textarea
                    rows="3"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Escribe una observación o actualización del caso..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      boxSizing: 'border-box',
                      resize: 'none',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNote(false);
                        setNoteText('');
                      }}
                      style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#334155', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', background: '#39A900', color: '#FFFFFF', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Guardar Nota
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer del Drawer */}
            <div style={{ padding: '20px', borderTop: '1px solid #F1F5F9', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button 
                type="button"
                className="btn-export" 
                style={{ justifyContent: 'center', gap: '6px' }}
                onClick={handleExportFichaPDF}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Ficha PDF</span>
              </button>

              <button 
                type="button"
                className="btn-radicar-nueva" 
                style={{ justifyContent: 'center', gap: '6px' }}
                onClick={() => setIsAddingNote((prev) => !prev)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                <span>Añadir Nota</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialReportes;