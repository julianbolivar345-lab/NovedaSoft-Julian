import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAlert } from '../../../context/AlertContext/AlertContext';
import Button from '../../../components/Button/Button';
import './Autorizaciones.css';

const SOLICITUDES_INICIALES = [
  {
    id: 1,
    radicado: '#AUT-2026-024',
    fecha: 'Hoy, 09:15 AM',
    ambiente: 'Amb 305 - Lab TIDC I',
    ficha: 'Ficha 2694115 - ADSO',
    elemento: 'PC Lenovo M70a',
    placa: 'SENA-89211',
    categoria: 'reemplazo',
    tituloSolicitud: 'Reemplazo definitivo de equipo',
    resumenMotivo: 'Fallo fatal tarjeta madre diagnosticado por TI. Se requiere baja y reposición.',
    diagnosticoTI:
      'Téc. Mauricio Gómez: Cortocircuito en etapa VRM de placa base tras pruebas en banco. Reparación in situ inviable; se solicita reposición desde Almacén Central.',
    instructorReporta: 'Ing. Carlos Mendoza R.',
    urgencia: 'Alta • Bloqueante Formativo',
  },
  {
    id: 2,
    radicado: '#AUT-2026-022',
    fecha: 'Ayer, 03:40 PM',
    ambiente: 'Amb 204 - Lab Redes',
    ficha: 'Ficha 2712490 - TPS',
    elemento: 'Switch Cisco Catalyst 2960',
    placa: 'SENA-99014',
    categoria: 'ambiente',
    tituloSolicitud: 'Reasignación de ambiente temporal',
    resumenMotivo: 'Traslado provisional a Amb 202 por mantenimiento correctivo de rack.',
    diagnosticoTI:
      'Téc. Mauricio Gómez: Fuente redundante del switch principal en falla intermitente. Se recomienda trasladar la ficha 2712490 al Amb 202 (disponible) durante 48 horas.',
    instructorReporta: 'Ing. Sandra Milena Ortiz',
    urgencia: 'Media • Continuidad Práctica',
  },
  {
    id: 3,
    radicado: '#AUT-2026-020',
    fecha: 'Ayer, 10:05 AM',
    ambiente: 'Amb 301 - Lab Software',
    ficha: 'Ficha 2694118 - ADSO',
    elemento: 'PC HP ProDesk 400 G6',
    placa: 'SENA-44182',
    categoria: 'reemplazo',
    tituloSolicitud: 'Sustitución de unidad de almacenamiento',
    resumenMotivo: 'Actualización a SSD para continuidad de pruebas de bases de datos.',
    diagnosticoTI:
      'Téc. Mauricio Gómez: Disco mecánico con sectores reasignados al 94% (SMART Warning). Se requiere autorización de entrega de unidad SSD NVMe 512GB.',
    instructorReporta: 'Ing. Julián Bolívar',
    urgencia: 'Media • Puesto 12',
  },
  {
    id: 4,
    radicado: '#AUT-2026-018',
    fecha: '22/11/2026, 04:30 PM',
    ambiente: 'Amb 302 - Multimedia',
    ficha: 'Ficha 2618902 - DGM',
    elemento: 'Video Beam Epson PowerLite',
    placa: 'SENA-55219',
    categoria: 'ambiente',
    tituloSolicitud: 'Cambio de aula formativa',
    resumenMotivo: 'Falla crítica en lámpara del sistema de proyección y calibración.',
    diagnosticoTI:
      'Téc. Mauricio Gómez: Lámpara agotada (4.820 horas de uso). Mientras Almacén despacha repuesto, se sugiere reubicar sesión teórica en Amb 301.',
    instructorReporta: 'Dis. Laura Gómez',
    urgencia: 'Baja • Soporte Visual',
  },
];

const ITEMS_POR_PAGINA = 5;

export const Autorizaciones = () => {
  const { showAlert } = useAlert() || {};

  const [solicitudes, setSolicitudes] = useState(SOLICITUDES_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [paginaActual, setPaginaActual] = useState(1);

  // Estados del Drawer de Evaluación
  const [solicitudActiva, setSolicitudActiva] = useState(null);
  const [decision, setDecision] = useState('aprobar');
  const [ambienteDestino, setAmbienteDestino] = useState('Amb 202 - Telecomunicaciones');
  const [observacion, setObservacion] = useState('');

  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && solicitudActiva) {
        setSolicitudActiva(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [solicitudActiva]);

  const contadores = useMemo(
    () => ({
      todas: solicitudes.length,
      reemplazo: solicitudes.filter((s) => s.categoria === 'reemplazo').length,
      ambiente: solicitudes.filter((s) => s.categoria === 'ambiente').length,
    }),
    [solicitudes]
  );

  const solicitudesFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return solicitudes.filter((item) => {
      const coincideCat = filtroCategoria === 'todas' || item.categoria === filtroCategoria;
      const coincideTexto =
        !q ||
        item.radicado.toLowerCase().includes(q) ||
        item.ambiente.toLowerCase().includes(q) ||
        item.ficha.toLowerCase().includes(q) ||
        item.elemento.toLowerCase().includes(q) ||
        item.placa.toLowerCase().includes(q) ||
        item.tituloSolicitud.toLowerCase().includes(q);
      return coincideCat && coincideTexto;
    });
  }, [solicitudes, filtroCategoria, busqueda]);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroCategoria, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(solicitudesFiltradas.length / ITEMS_POR_PAGINA));
  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const indiceFin = indiceInicio + ITEMS_POR_PAGINA;
  const solicitudesPaginadas = solicitudesFiltradas.slice(indiceInicio, indiceFin);

  const abrirEvaluacion = (solicitud) => {
    setSolicitudActiva(solicitud);
    setDecision(solicitud.categoria === 'ambiente' ? 'reasignar' : 'aprobar');
    setObservacion('');
  };

  const handleConfirmarDecision = (e) => {
    e.preventDefault();
    if (!solicitudActiva) return;

    const accionTexto =
      decision === 'aprobar'
        ? 'Reemplazo aprobado y notificado a Almacén'
        : decision === 'reasignar'
        ? `Ambiente reasignado a ${ambienteDestino}`
        : 'Solicitud rechazada con observaciones';

    setSolicitudes((prev) => prev.filter((s) => s.id !== solicitudActiva.id));

    showAlert?.({
      title: 'Decisión Registrada',
      message: `${solicitudActiva.radicado}: ${accionTexto}.`,
      type: decision === 'rechazar' ? 'warning' : 'success',
    });

    setSolicitudActiva(null);
  };

  return (
    <div className="coord-content">
      <div className="page-header">
        <div className="nsw-eyebrow-pill">
          <span className="nsw-dot green" />
          <span>COORDINACIÓN ACADÉMICA • CIDE SOACHA</span>
        </div>
        <h1 className="page-title">Bandeja de Autorizaciones</h1>
        <p className="page-subtitle">
          Revisión y aprobación de solicitudes de reemplazo de equipos y reasignación de ambientes.
        </p>
      </div>

      {/* Buscador y Filtros */}
      <section className="auth-filters-section">
        <div className="search-box-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className="search-input-white"
            placeholder="Buscar por radicado, ambiente o equipo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button type="button" className="clear-search-btn" onClick={() => setBusqueda('')}>
              ✕
            </button>
          )}
          <div className="shortcut-hint-mono hide-mobile">Ctrl + K</div>
        </div>

        <div className="filter-pills-row">
          <button
            type="button"
            className={`filter-pill ${filtroCategoria === 'todas' ? 'active-all' : ''}`}
            onClick={() => setFiltroCategoria('todas')}
          >
            <span>Todas</span>
            <span className="pill-count">{contadores.todas}</span>
          </button>

          <button
            type="button"
            className={`filter-pill ${filtroCategoria === 'reemplazo' ? 'active-status' : ''}`}
            onClick={() => setFiltroCategoria('reemplazo')}
          >
            <span>Por Reemplazo de Equipo</span>
            <span className="pill-count">{contadores.reemplazo}</span>
          </button>

          <button
            type="button"
            className={`filter-pill ${filtroCategoria === 'ambiente' ? 'active-status' : ''}`}
            onClick={() => setFiltroCategoria('ambiente')}
          >
            <span>Por Cambio de Ambiente</span>
            <span className="pill-count">{contadores.ambiente}</span>
          </button>
        </div>
      </section>

      {/* Tabla Responsiva de Autorizaciones */}
      <section className="auth-table-card">
        <div className="table-responsive">
          <table className="auth-table">
            <thead>
              <tr>
                <th>RADICADO / FECHA</th>
                <th>AMBIENTE / FICHA</th>
                <th>ELEMENTO / PLACA SENA</th>
                <th>SOLICITUD / MOTIVO</th>
                <th className="text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesPaginadas.length > 0 ? (
                solicitudesPaginadas.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Radicado / Fecha">
                      <div>
                        <div className="radicado-code">{item.radicado}</div>
                        <div className="fecha-row">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{item.fecha}</span>
                        </div>
                      </div>
                    </td>

                    <td data-label="Ambiente / Ficha">
                      <div>
                        <div className="cell-title">{item.ambiente}</div>
                        <div className="cell-sub">{item.ficha}</div>
                      </div>
                    </td>

                    <td data-label="Elemento / Placa">
                      <div>
                        <div className="cell-element">{item.elemento}</div>
                        <span className="placa-badge">{item.placa}</span>
                      </div>
                    </td>

                    <td data-label="Solicitud / Motivo" className="motivo-cell">
                      <div>
                        <div className="motivo-title">{item.tituloSolicitud}</div>
                        <p className="motivo-desc">{item.resumenMotivo}</p>
                      </div>
                    </td>

                    <td data-label="Acciones" className="text-right">
                      <Button
                        variant="primary"
                        className="btn-evaluar-mobile"
                        onClick={() => abrirEvaluacion(item)}
                      >
                        <span>Evaluar</span>
                        <span>›</span>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table-cell">
                    <p>No hay solicitudes pendientes con los filtros actuales.</p>
                    {(busqueda || filtroCategoria !== 'todas') && (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setBusqueda('');
                          setFiltroCategoria('todas');
                        }}
                      >
                        Mostrar todas las solicitudes
                      </Button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de Paginación */}
        <div className="table-footer">
          <div className="pagination-summary">
            Mostrando{' '}
            <strong>
              {solicitudesFiltradas.length === 0 ? 0 : indiceInicio + 1} -{' '}
              {Math.min(indiceFin, solicitudesFiltradas.length)}
            </strong>{' '}
            de <strong>{solicitudesFiltradas.length}</strong> solicitudes pendientes
          </div>

          <div className="pagination-controls-compact">
            <button
              type="button"
              className="page-arrow-btn"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
              aria-label="Página anterior"
            >
              ‹
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={`page-num-btn ${paginaActual === num ? 'active' : ''}`}
                onClick={() => setPaginaActual(num)}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              className="page-arrow-btn"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
              aria-label="Página siguiente"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* DRAWER LATERAL DESLIZANTE DE EVALUACIÓN */}
      {solicitudActiva && (
        <div className="drawer-overlay" onClick={() => setSolicitudActiva(null)}>
          <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="drawer-radicado">{solicitudActiva.radicado}</span>
                <h3>Evaluación de Solicitud</h3>
                <p>
                  {solicitudActiva.ambiente} • {solicitudActiva.ficha}
                </p>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setSolicitudActiva(null)}
              >
                ✕
              </button>
            </div>

            <form className="drawer-body" onSubmit={handleConfirmarDecision}>
              <div className="drawer-box-info">
                <div className="drawer-info-row">
                  <span>Elemento / Placa:</span>
                  <strong>
                    {solicitudActiva.elemento} ({solicitudActiva.placa})
                  </strong>
                </div>
                <div className="drawer-info-row">
                  <span>Instructor solicitante:</span>
                  <strong>{solicitudActiva.instructorReporta}</strong>
                </div>
                <div className="drawer-info-row">
                  <span>Nivel de impacto:</span>
                  <span className="impact-tag">{solicitudActiva.urgencia}</span>
                </div>

                <div className="drawer-peritaje">
                  <label>DICTAMEN DE SOPORTE TÉCNICO TI</label>
                  <p>{solicitudActiva.diagnosticoTI}</p>
                </div>
              </div>

              <div className="drawer-form-group">
                <label className="group-label">
                  Resolución de Coordinación Académica <span className="req">*</span>
                </label>

                <label className={`decision-option ${decision === 'aprobar' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="decision"
                    value="aprobar"
                    checked={decision === 'aprobar'}
                    onChange={(e) => setDecision(e.target.value)}
                  />
                  <div>
                    <strong>Aprobar Reemplazo de Equipo</strong>
                    <span>Autoriza a Almacén / Cuentadante la reposición del activo.</span>
                  </div>
                </label>

                <label className={`decision-option ${decision === 'reasignar' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="decision"
                    value="reasignar"
                    checked={decision === 'reasignar'}
                    onChange={(e) => setDecision(e.target.value)}
                  />
                  <div>
                    <strong>Reasignar Ambiente Temporal</strong>
                    <span>Traslada la ficha a un aula disponible mientras se repara.</span>
                  </div>
                </label>

                <label className={`decision-option ${decision === 'rechazar' ? 'selected-reject' : ''}`}>
                  <input
                    type="radio"
                    name="decision"
                    value="rechazar"
                    checked={decision === 'rechazar'}
                    onChange={(e) => setDecision(e.target.value)}
                  />
                  <div>
                    <strong>Rechazar / Devolver Solicitud</strong>
                    <span>No procede reemplazo ni traslado; requiere revisión adicional.</span>
                  </div>
                </label>
              </div>

              {decision === 'reasignar' && (
                <div className="drawer-form-group">
                  <label className="group-label">Ambiente Disponible Destino</label>
                  <select
                    className="drawer-select"
                    value={ambienteDestino}
                    onChange={(e) => setAmbienteDestino(e.target.value)}
                  >
                    <option value="Amb 202 - Telecomunicaciones">
                      Amb 202 - Telecomunicaciones (Disponible)
                    </option>
                    <option value="Amb 301 - Lab Software">
                      Amb 301 - Lab Software (Disponible)
                    </option>
                    <option value="Amb 305 - Lab TIDC I">
                      Amb 305 - Lab TIDC I (Disponible)
                    </option>
                  </select>
                </div>
              )}

              <div className="drawer-form-group">
                <label className="group-label">
                  Observación / Acta de Decisión <span className="req">*</span>
                </label>
                <textarea
                  className="drawer-textarea"
                  rows="3"
                  placeholder="Escriba la justificación oficial para el historial de decisiones..."
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  required
                />
              </div>

              <div className="drawer-footer">
                <Button variant="secondary" onClick={() => setSolicitudActiva(null)}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Confirmar Decisión
                </Button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Autorizaciones;