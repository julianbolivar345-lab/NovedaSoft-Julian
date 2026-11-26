import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Download,
  Search,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { useAlert } from '../../../context/AlertContext/AlertContext';
import Button from '../../../components/Button/Button';
import './HistorialDecisiones.css';

const DECISIONES_MOCK = [
  {
    id: 'AUT-2026-016',
    fecha: 'Hoy, 11:20 AM',
    ambiente: 'Amb 305 - Lab TIDC I',
    ficha: 'Ficha 2694115 - ADSO',
    elemento: 'PC Lenovo ThinkCentre',
    placa: 'SENA-89204',
    decision: 'Aprobación de reemplazo técnico por baja definitiva',
    subdetalle: 'Respaldado por Acta Tec. #441',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
  {
    id: 'AUT-2026-012',
    fecha: 'Ayer, 05:00 PM',
    ambiente: 'Amb 204 - Lab Redes',
    ficha: 'Ficha 2712490 - TPS',
    elemento: 'Switch Cisco 2960',
    placa: 'SENA-99014',
    decision: 'Reasignación de ambiente a Amb 202 autorizada',
    subdetalle: 'Nuevo responsable: Ing. Carlos Ruiz',
    estado: 'REASIGNADO',
    categoria: 'reasignaciones',
  },
  {
    id: 'AUT-2026-009',
    fecha: '21/11/2026, 10:15 AM',
    ambiente: 'Amb 301 - Lab Software',
    ficha: 'Ficha 2694118 - ADSO',
    elemento: 'PC HP ProDesk 400 G6',
    placa: 'SENA-44180',
    decision: 'Autorización de sustitución de disco SSD',
    subdetalle: 'SSD 512GB NVMe M.2 provisto',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
  {
    id: 'AUT-2026-005',
    fecha: '18/11/2026, 02:45 PM',
    ambiente: 'Amb 302 - Multimedia',
    ficha: 'Ficha 2618902 - DGM',
    elemento: 'Video Beam Epson',
    placa: 'SENA-66108',
    decision: 'Traslado temporal a Sala de Conferencias Aprobado',
    subdetalle: 'Retorno programado: 25/11/2026',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
  {
    id: 'AUT-2026-002',
    fecha: '15/11/2026, 09:30 AM',
    ambiente: 'Amb 103 - Auditorio Central',
    ficha: 'Ficha 2554109',
    elemento: 'Punto de Acceso Aruba',
    placa: 'SENA-55201',
    decision: 'Solicitud desestimada por soporte in situ resuelto',
    subdetalle: 'Reconfiguración de PoE suficiente',
    estado: 'RECHAZADA',
    categoria: 'rechazadas',
  },
  {
    id: 'AUT-2026-001',
    fecha: '12/11/2026, 04:10 PM',
    ambiente: 'Amb 306 - Lab Base de Datos',
    ficha: 'Ficha 2694115 - ADSO',
    elemento: 'Servidor Dell PowerEdge',
    placa: 'SENA-77310',
    decision: 'Ampliación de memoria RAM a 64GB aprobada',
    subdetalle: 'Respaldado por Acta Tec. #428',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
  {
    id: 'AUT-2025-198',
    fecha: '10/11/2026, 08:45 AM',
    ambiente: 'Amb 201 - Electrónica',
    ficha: 'Ficha 2685910 - Automatización',
    elemento: 'Osciloscopio Tektronix',
    placa: 'SENA-31092',
    decision: 'Reasignación temporal a Amb 202 por calibración',
    subdetalle: 'Nuevo responsable: Ing. Roberto Díaz',
    estado: 'REASIGNADO',
    categoria: 'reasignaciones',
  },
  {
    id: 'AUT-2025-194',
    fecha: '07/11/2026, 03:20 PM',
    ambiente: 'Amb 305 - Lab TIDC I',
    ficha: 'Ficha 2694118 - ADSO',
    elemento: 'Monitor Dell 24"',
    placa: 'SENA-89240',
    decision: 'Reposición por daño en fuente interna',
    subdetalle: 'Respaldado por Acta Tec. #419',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
  {
    id: 'AUT-2025-189',
    fecha: '04/11/2026, 11:00 AM',
    ambiente: 'Amb 302 - Multimedia',
    ficha: 'Ficha 2618902 - DGM',
    elemento: 'Tableta Wacom Intuos Pro',
    placa: 'SENA-66155',
    decision: 'Reasignación de puesto de trabajo autorizada',
    subdetalle: 'Nuevo responsable: Dis. Laura Gómez',
    estado: 'REASIGNADO',
    categoria: 'reasignaciones',
  },
  {
    id: 'AUT-2025-185',
    fecha: '01/11/2026, 09:15 AM',
    ambiente: 'Amb 202 - Telecomunicaciones',
    ficha: 'Ficha 2712490 - TPS',
    elemento: 'Fusionadora de Fibra Óptica',
    placa: 'SENA-99102',
    decision: 'Autorización de mantenimiento preventivo externo',
    subdetalle: 'Orden de servicio #OS-904',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
  {
    id: 'AUT-2025-180',
    fecha: '28/10/2026, 01:50 PM',
    ambiente: 'Amb 301 - Lab Software',
    ficha: 'Ficha 2694115 - ADSO',
    elemento: 'Smartboard 75"',
    placa: 'SENA-44210',
    decision: 'Cambio de módulo táctil infrarrojo aprobado',
    subdetalle: 'Garantía vigente con proveedor',
    estado: 'APROBADA',
    categoria: 'aprobadas',
  },
];

const ITEMS_POR_PAGINA = 4;

export function HistorialDecisiones() {
  const { showAlert } = useAlert() || {};

  const [decisiones] = useState(DECISIONES_MOCK);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [actaSeleccionada, setActaSeleccionada] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && actaSeleccionada) {
        setActaSeleccionada(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actaSeleccionada]);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroEstado, busqueda]);

  const decisionesFiltradas = decisiones.filter((item) => {
    const coincideCategoria = filtroEstado === 'todas' || item.categoria === filtroEstado;
    const termino = busqueda.toLowerCase();
    const coincideTexto =
      item.id.toLowerCase().includes(termino) ||
      item.placa.toLowerCase().includes(termino) ||
      item.elemento.toLowerCase().includes(termino) ||
      item.ambiente.toLowerCase().includes(termino) ||
      item.decision.toLowerCase().includes(termino) ||
      item.subdetalle.toLowerCase().includes(termino);
    return coincideCategoria && coincideTexto;
  });

  const totalPaginas = Math.max(1, Math.ceil(decisionesFiltradas.length / ITEMS_POR_PAGINA));
  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const indiceFin = indiceInicio + ITEMS_POR_PAGINA;
  const decisionesPaginadas = decisionesFiltradas.slice(indiceInicio, indiceFin);

  const conteos = {
    todas: decisiones.length,
    aprobadas: decisiones.filter((d) => d.categoria === 'aprobadas').length,
    reasignaciones: decisiones.filter((d) => d.categoria === 'reasignaciones').length,
    rechazadas: decisiones.filter((d) => d.categoria === 'rechazadas').length,
  };

  const handleExportarPDF = () => {
    const fechaGeneracion = new Date().toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const filasHTML = decisionesFiltradas
      .map(
        (item) => `
        <tr>
          <td><strong>#${item.id}</strong><br/><small>${item.fecha}</small></td>
          <td>${item.ambiente}<br/><small>${item.ficha}</small></td>
          <td>${item.elemento}<br/><span class="placa">${item.placa}</span></td>
          <td>${item.decision}<br/><small>${item.subdetalle}</small></td>
          <td><span class="estado ${item.estado.toLowerCase()}">${item.estado}</span></td>
        </tr>`
      )
      .join('');

    const ventanaPDF = window.open('', '_blank', 'width=1024,height=768');
    if (!ventanaPDF) {
      showAlert?.({
        title: 'Ventana Bloqueada',
        message: 'Por favor permite las ventanas emergentes para generar el PDF.',
        type: 'warning',
      });
      return;
    }

    ventanaPDF.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Bitácora de Decisiones - NovedadSoft</title>
        <style>
          body { font-family: Arial, sans-serif; color: #0f172a; padding: 32px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #39a900; padding-bottom: 14px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 20px; }
          .header p { margin: 4px 0 0; font-size: 12px; color: #475569; }
          .meta { font-size: 11px; color: #475569; text-align: right; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background: #f1f5f9; color: #334155; text-align: left; padding: 10px; border: 1px solid #cbd5e1; font-size: 10px; text-transform: uppercase; }
          td { padding: 10px; border: 1px solid #cbd5e1; vertical-align: top; }
          small { color: #64748b; }
          .placa { font-family: monospace; font-weight: bold; background: #f0fdf4; color: #226d00; padding: 2px 5px; border-radius: 3px; font-size: 11px; }
          .estado { font-weight: bold; font-size: 10px; padding: 3px 7px; border-radius: 10px; }
          .aprobada { background: #dcfce7; color: #166534; }
          .reasignado { background: #e0f2fe; color: #075985; }
          .rechazada { background: #fee2e2; color: #991b1b; }
          .footer { margin-top: 28px; font-size: 11px; color: #64748b; display: flex; justify-content: space-between; }
          @media print { @page { margin: 12mm; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>NovedadSoft — Bitácora Oficial de Decisiones</h1>
            <p>SENA Centro Industrial y de Desarrollo Empresarial (CIDE) • Soacha</p>
          </div>
          <div class="meta">
            <div><strong>Generado:</strong> ${fechaGeneracion}</div>
            <div><strong>Filtro aplicado:</strong> ${filtroEstado.toUpperCase()} (${decisionesFiltradas.length} registros)</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Radicado / Fecha</th>
              <th>Ambiente / Ficha</th>
              <th>Elemento / Placa SENA</th>
              <th>Decisión Emitida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>${filasHTML}</tbody>
        </table>
        <div class="footer">
          <span>Emitido por: Coord. María Bustamante (Coordinación Académica)</span>
          <span>Documento generado desde NovedadSoft</span>
        </div>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    ventanaPDF.document.close();

    showAlert?.({
      title: 'Bitácora Lista',
      message: 'Vista de exportación PDF lista para guardar.',
      type: 'success',
    });
  };

  const handleExportarExcel = () => {
    const encabezados = [
      'Radicado',
      'Fecha',
      'Ambiente',
      'Ficha',
      'Elemento',
      'Placa SENA',
      'Decision',
      'Detalle',
      'Estado',
    ];
    const filas = decisionesFiltradas.map((d) => [
      d.id,
      `"${d.fecha}"`,
      `"${d.ambiente}"`,
      `"${d.ficha}"`,
      `"${d.elemento}"`,
      d.placa,
      `"${d.decision}"`,
      `"${d.subdetalle}"`,
      d.estado,
    ]);

    const csvContenido =
      '\uFEFF' + [encabezados.join(';'), ...filas.map((f) => f.join(';'))].join('\n');
    const blob = new Blob([csvContenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bitacora_Decisiones_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showAlert?.({
      title: 'Descarga Completada',
      message: 'Archivo Excel (.csv) descargado correctamente.',
      type: 'success',
    });
  };

  const handleDescargarActaPDF = (acta) => {
    const ventanaActa = window.open('', '_blank', 'width=800,height=900');
    if (!ventanaActa) return;

    ventanaActa.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Acta ${acta.id} - NovedadSoft</title>
        <style>
          body { font-family: Arial, sans-serif; color: #0f172a; padding: 48px; line-height: 1.6; }
          .top { border-bottom: 3px solid #39a900; padding-bottom: 16px; margin-bottom: 24px; }
          .top h2 { margin: 0; color: #226d00; }
          .box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .firma { margin-top: 64px; border-top: 1px solid #0f172a; width: 280px; padding-top: 8px; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="top">
          <h2>ACTA OFICIAL DE RESOLUCIÓN — #${acta.id}</h2>
          <p>Servicio Nacional de Aprendizaje SENA • CIDE Soacha</p>
        </div>
        <p><strong>Fecha de emisión:</strong> ${acta.fecha}</p>
        <p><strong>Estado de resolución:</strong> ${acta.estado}</p>
        <div class="box">
          <p><strong>Ambiente y Ficha:</strong> ${acta.ambiente} (${acta.ficha})</p>
          <p><strong>Activo / Elemento:</strong> ${acta.elemento} — Placa <strong>${acta.placa}</strong></p>
          <p><strong>Decisión Emitida:</strong> ${acta.decision}</p>
          <p><strong>Soporte Técnico:</strong> ${acta.subdetalle}</p>
        </div>
        <div class="firma">
          <strong>Coord. María Bustamante</strong><br/>
          Coordinación Académica — SENA CIDE Soacha
        </div>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    ventanaActa.document.close();
  };

  return (
    <div className="nsw-container">
      <div className="nsw-page-header">
        <div>
          <div className="nsw-eyebrow-pill">
            <span className="nsw-dot green" />
            <span>COORDINACIÓN ACADÉMICA • CIDE SOACHA</span>
          </div>
          <h2 className="nsw-page-title">Historial de Decisiones</h2>
          <p className="nsw-page-subtitle">
            Consulta las decisiones emitidas y sus actas de respaldo.
          </p>
        </div>

        <div className="nsw-export-group">
          <Button variant="secondary" onClick={handleExportarExcel}>
            <Download size={15} color="#3C627F" />
            <span>Exportar Excel</span>
          </Button>

          <Button variant="primary" onClick={handleExportarPDF}>
            <Download size={15} />
            <span>Exportar PDF</span>
          </Button>
        </div>
      </div>

      <div className="nsw-toolbar">
        <div className="nsw-search-box">
          <Search size={16} className="nsw-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por radicado, instructor, placa o equipo..."
          />
          {busqueda ? (
            <button type="button" className="nsw-clear-btn" onClick={() => setBusqueda('')}>
              <X size={14} />
            </button>
          ) : (
            <kbd className="nsw-kbd hide-mobile">Ctrl + K</kbd>
          )}
        </div>

        <div className="nsw-filter-tabs">
          <button
            type="button"
            className={`nsw-tab ${filtroEstado === 'todas' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('todas')}
          >
            Todas ({conteos.todas})
          </button>
          <button
            type="button"
            className={`nsw-tab ${filtroEstado === 'aprobadas' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('aprobadas')}
          >
            Aprobadas ({conteos.aprobadas})
          </button>
          <button
            type="button"
            className={`nsw-tab ${filtroEstado === 'reasignaciones' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('reasignaciones')}
          >
            Reasignaciones ({conteos.reasignaciones})
          </button>
          <button
            type="button"
            className={`nsw-tab ${filtroEstado === 'rechazadas' ? 'active' : ''}`}
            onClick={() => setFiltroEstado('rechazadas')}
          >
            Rechazadas ({conteos.rechazadas})
          </button>
        </div>
      </div>

      <div className="nsw-card-table">
        <div className="nsw-table-responsive">
          <table className="nsw-table">
            <thead>
              <tr>
                <th>RADICADO / FECHA</th>
                <th>AMBIENTE / FICHA</th>
                <th>ELEMENTO / PLACA SENA</th>
                <th>DECISIÓN EMITIDA</th>
                <th>ESTADO</th>
                <th className="text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {decisionesPaginadas.length > 0 ? (
                decisionesPaginadas.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Radicado / Fecha">
                      <div>
                        <div className="nsw-mono-id">#{item.id}</div>
                        <div className="nsw-date-row">
                          <Clock size={12} />
                          <span>{item.fecha}</span>
                        </div>
                      </div>
                    </td>

                    <td data-label="Ambiente / Ficha">
                      <div>
                        <div className="nsw-amb-title">{item.ambiente}</div>
                        <div className="nsw-amb-sub">{item.ficha}</div>
                      </div>
                    </td>

                    <td data-label="Elemento / Placa">
                      <div>
                        <div className="nsw-item-name">{item.elemento}</div>
                        <span className={`nsw-placa-badge ${item.estado.toLowerCase()}`}>
                          {item.placa}
                        </span>
                      </div>
                    </td>

                    <td data-label="Decisión Emitida">
                      <div>
                        <div className="nsw-decision-text">{item.decision}</div>
                        <div className="nsw-decision-sub">{item.subdetalle}</div>
                      </div>
                    </td>

                    <td data-label="Estado">
                      <span className={`nsw-status-badge ${item.estado.toLowerCase()}`}>
                        <span className="dot" />
                        {item.estado}
                      </span>
                    </td>

                    <td data-label="Acciones" className="text-right">
                      <Button
                        variant="primary"
                        className="nsw-btn-full-mobile"
                        onClick={() => setActaSeleccionada(item)}
                      >
                        <span>Ver Acta</span>
                        <ChevronRight size={14} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="nsw-empty-state">
                    No se encontraron decisiones que coincidan con "{busqueda}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PIE DE PAGINACIÓN FUNCIONAL */}
        <div className="nsw-pagination-footer">
          <p className="nsw-pagination-info">
            Mostrando{' '}
            <strong>
              {decisionesFiltradas.length === 0 ? 0 : indiceInicio + 1} -{' '}
              {Math.min(indiceFin, decisionesFiltradas.length)}
            </strong>{' '}
            de <strong>{decisionesFiltradas.length}</strong> decisiones emitidas
          </p>

          <div className="nsw-pagination-controls">
            <button
              type="button"
              className="nsw-page-btn"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
              aria-label="Página anterior"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={`nsw-page-btn ${paginaActual === num ? 'active' : ''}`}
                onClick={() => setPaginaActual(num)}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              className="nsw-page-btn"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))}
              aria-label="Página siguiente"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE PREVISUALIZACIÓN DE ACTA DE RESPALDO */}
      {actaSeleccionada && (
        <div className="nsw-modal-backdrop" onClick={() => setActaSeleccionada(null)}>
          <div className="nsw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nsw-modal-header">
              <div>
                <span className="nsw-mono-id">#{actaSeleccionada.id}</span>
                <h3>Acta de Respaldo Oficial</h3>
              </div>
              <button
                type="button"
                className="nsw-icon-btn"
                onClick={() => setActaSeleccionada(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="nsw-modal-body">
              <p>
                <strong>Ambiente / Ficha:</strong> {actaSeleccionada.ambiente} (
                {actaSeleccionada.ficha})
              </p>
              <p>
                <strong>Activo Implicado:</strong> {actaSeleccionada.elemento} — Placa{' '}
                <code>{actaSeleccionada.placa}</code>
              </p>
              <p>
                <strong>Resolución:</strong> {actaSeleccionada.decision}
              </p>
              <p>
                <strong>Soporte:</strong> {actaSeleccionada.subdetalle}
              </p>
              <p>
                <strong>Emitido por:</strong> Coord. María Bustamante (Coordinación Académica)
              </p>
            </div>

            <div className="nsw-modal-footer">
              <Button variant="secondary" onClick={() => setActaSeleccionada(null)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={() => handleDescargarActaPDF(actaSeleccionada)}>
                <Download size={14} />
                <span>Descargar PDF Firmado</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistorialDecisiones;