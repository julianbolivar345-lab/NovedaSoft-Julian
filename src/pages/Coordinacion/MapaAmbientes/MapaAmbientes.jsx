import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAlert } from '../../../context/AlertContext/AlertContext';
import Button from '../../../components/Button/Button';
import './MapaAmbientes.css';

const AMBIENTES_DATA = [
  {
    id: 1,
    codigo: 'Amb 305',
    nombre: 'Lab TIDC I',
    especialidad: 'ADSO - Software',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'disponible',
    disponibilidadTexto: 'Libre todo el día',
    caracteristicas: [
      { tipo: 'pc', texto: '32 Equipos' },
      { tipo: 'lan', texto: 'Red LAN GigE' },
      { tipo: 'ac', texto: 'Aire Climatizado' },
      { tipo: 'proyector', texto: 'Videoproyector' },
    ],
    fichaActual: null,
    capacidadResumen: null,
    cuentadante: 'Ing. Carlos Mendoza R.',
  },
  {
    id: 2,
    codigo: 'Amb 204',
    nombre: 'Lab Redes',
    especialidad: 'TPS - Infraestructura',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'ocupado',
    disponibilidadTexto: 'Libera a las 12:30 PM',
    fichaActual: '2712490 (Jornada Mañana)',
    capacidadLabel: 'Capacidad & Rack:',
    capacidadResumen: '28 Puestos • Rack B Cisco',
    caracteristicas: [
      { tipo: 'pc', texto: '28 Puestos Especializados' },
      { tipo: 'lan', texto: 'Rack B Cisco Catalyst' },
      { tipo: 'ac', texto: 'Climatización de Rack' },
    ],
    cuentadante: 'Ing. Sandra Milena Ortiz',
  },
  {
    id: 3,
    codigo: 'Amb 301',
    nombre: 'Lab Software',
    especialidad: 'ADSO - Desarrollo',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'disponible',
    disponibilidadTexto: 'Disponible todo el turno',
    caracteristicas: [
      { tipo: 'pc', texto: '30 Equipos Core i7' },
      { tipo: 'lan', texto: 'Fibra Óptica' },
      { tipo: 'audio', texto: 'Audio Integrado' },
      { tipo: 'proyector', texto: 'Smartboard 75"' },
    ],
    fichaActual: null,
    capacidadResumen: null,
    cuentadante: 'Ing. Julián Bolívar',
  },
  {
    id: 4,
    codigo: 'Amb 302',
    nombre: 'Multimedia',
    especialidad: 'DGM - Diseño Gráfico',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'disponible',
    disponibilidadTexto: 'Libre hasta 02:00 PM',
    caracteristicas: [
      { tipo: 'pc', texto: '25 Puestos iMac 24"' },
      { tipo: 'pen', texto: 'Tabletas Wacom' },
      { tipo: 'apps', texto: 'Suite Adobe 2024' },
      { tipo: 'light', texto: 'Iluminación CRI 95' },
    ],
    fichaActual: null,
    capacidadResumen: null,
    cuentadante: 'Dis. Laura Gómez',
  },
  {
    id: 5,
    codigo: 'Amb 201',
    nombre: 'Electrónica',
    especialidad: 'Automatización',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'ocupado',
    disponibilidadTexto: 'Libera a las 11:30 AM',
    fichaActual: '2685910 (Mantenimiento Ind.)',
    capacidadLabel: 'Capacidad & Equipos:',
    capacidadResumen: '24 Bancos de Trabajo • Osciloscopios',
    caracteristicas: [
      { tipo: 'tool', texto: '24 Bancos de Trabajo' },
      { tipo: 'wave', texto: 'Osciloscopios Digitales' },
      { tipo: 'ac', texto: 'Extracción de Humos' },
    ],
    cuentadante: 'Ing. Roberto Díaz',
  },
  {
    id: 6,
    codigo: 'Amb 202',
    nombre: 'Telecomunicaciones',
    especialidad: 'Redes Inalámbricas',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'disponible',
    disponibilidadTexto: 'Libre todo el día',
    caracteristicas: [
      { tipo: 'pc', texto: '26 Puestos Especiales' },
      { tipo: 'wifi', texto: 'Antenas Wi-Fi 6E' },
      { tipo: 'lan', texto: 'Kit Fusión Fibra' },
      { tipo: 'proyector', texto: 'Pantalla 65" 4K' },
    ],
    fichaActual: null,
    capacidadResumen: null,
    cuentadante: 'Ing. Andrés Felipe Rojas',
  },
  {
    id: 7,
    codigo: 'Amb 104',
    nombre: 'Taller Electricidad',
    especialidad: 'Instalaciones Residenciales',
    torre: 'Torre B • Piso 1',
    estado: 'mantenimiento',
    disponibilidadTexto: 'Mantenimiento preventivo hasta mañana',
    fichaActual: 'Sin ficha (Intervención Locativa)',
    capacidadLabel: 'Motivo técnico:',
    capacidadResumen: 'Cambio de tableros trifásicos',
    caracteristicas: [
      { tipo: 'tool', texto: '20 Tableros Didácticos' },
      { tipo: 'wave', texto: 'Multímetros Fluke' },
    ],
    cuentadante: 'Téc. Jorge Herrera',
  },
  {
    id: 8,
    codigo: 'Amb 306',
    nombre: 'Lab Base de Datos',
    especialidad: 'ADSO - Analítica',
    torre: 'Torre A • Pisos 2 y 3',
    estado: 'disponible',
    disponibilidadTexto: 'Libre todo el día',
    caracteristicas: [
      { tipo: 'pc', texto: '30 Equipos 32GB RAM' },
      { tipo: 'lan', texto: 'Servidor Local PostgreSQL' },
      { tipo: 'ac', texto: 'Aire Climatizado' },
      { tipo: 'proyector', texto: 'Videoproyector HD' },
    ],
    fichaActual: null,
    capacidadResumen: null,
    cuentadante: 'Ing. Patricia Morales',
  },
];

const ITEMS_POR_PAGINA = 6;

export const MapaAmbientes = () => {
  const { showAlert } = useAlert() || {};

  const [ambientes, setAmbientes] = useState(AMBIENTES_DATA);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const [ambienteDetalle, setAmbienteDetalle] = useState(null);
  const [fichaAsignar, setFichaAsignar] = useState('');

  const searchInputRef = useRef(null);

  const cerrarModal = () => {
    setAmbienteDetalle(null);
    setFichaAsignar('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && ambienteDetalle) {
        cerrarModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ambienteDetalle]);

  const contadores = useMemo(
    () => ({
      todos: ambientes.length,
      disponible: ambientes.filter((a) => a.estado === 'disponible').length,
      ocupado: ambientes.filter((a) => a.estado === 'ocupado').length,
      mantenimiento: ambientes.filter((a) => a.estado === 'mantenimiento').length,
    }),
    [ambientes]
  );

  const ambientesFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    return ambientes.filter((amb) => {
      const coincideEstado = filtroEstado === 'todos' || amb.estado === filtroEstado;
      const coincideTexto =
        !q ||
        amb.codigo.toLowerCase().includes(q) ||
        amb.nombre.toLowerCase().includes(q) ||
        amb.especialidad.toLowerCase().includes(q) ||
        (amb.fichaActual && amb.fichaActual.toLowerCase().includes(q));
      return coincideEstado && coincideTexto;
    });
  }, [ambientes, filtroEstado, busqueda]);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroEstado, busqueda]);

  const totalPaginas = Math.max(1, Math.ceil(ambientesFiltrados.length / ITEMS_POR_PAGINA));
  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const indiceFin = indiceInicio + ITEMS_POR_PAGINA;
  const ambientesPaginados = ambientesFiltrados.slice(indiceInicio, indiceFin);

  const handleAsignarAmbiente = (e) => {
    e.preventDefault();
    if (!ambienteDetalle || !fichaAsignar.trim()) return;

    setAmbientes((prev) =>
      prev.map((amb) =>
        amb.id === ambienteDetalle.id
          ? {
              ...amb,
              estado: 'ocupado',
              fichaActual: `${fichaAsignar.trim()} (Reasignación Coord.)`,
              capacidadLabel: 'Capacidad:',
              capacidadResumen: amb.caracteristicas[0]?.texto || 'Aula Formativa',
              disponibilidadTexto: 'Ocupado por reasignación activa',
            }
          : amb
      )
    );

    showAlert?.({
      title: 'Ambiente Asignado',
      message: `${ambienteDetalle.codigo} asignado temporalmente a la ficha ${fichaAsignar.trim()}.`,
      type: 'success',
    });

    cerrarModal();
  };

  const renderSpecIcon = (tipo) => {
    switch (tipo) {
      case 'pc':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        );
      case 'lan':
      case 'wifi':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        );
      case 'ac':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
          </svg>
        );
      default:
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
    }
  };

  const renderBadgeEstado = (estado) => {
    if (estado === 'disponible') {
      return (
        <span className="mapa-badge badge-disponible">
          <span className="dot dot-green"></span>
          Disponible
        </span>
      );
    }
    if (estado === 'ocupado') {
      return (
        <span className="mapa-badge badge-ocupado">
          <span className="dot dot-blue"></span>
          Ocupado
        </span>
      );
    }
    return (
      <span className="mapa-badge badge-mantenimiento">
        <span className="dot dot-red"></span>
        En Mantenimiento
      </span>
    );
  };

  const tituloBloque =
    ambientesPaginados.length > 0 &&
    ambientesPaginados.every((a) => a.torre === ambientesPaginados[0].torre)
      ? ambientesPaginados[0].torre
      : 'Todos los Bloques y Torres';

  return (
    <div className="coord-content">
      <div className="page-header">
        <div className="nsw-eyebrow-pill">
          <span className="nsw-dot green" />
          <span>COORDINACIÓN ACADÉMICA • CIDE SOACHA</span>
        </div>
        <h1 className="page-title">Mapa de Ambientes</h1>
        <p className="page-subtitle">
          Consulta la disponibilidad y encuentra un ambiente para continuar la formación.
        </p>
      </div>

      {/* Tarjeta de Búsqueda y Filtros */}
      <section className="mapa-filter-card">
        <div className="search-box-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className="search-input-slate"
            placeholder="Buscar por aula (#Amb-...), tipo o especialidad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button type="button" className="clear-search-btn" onClick={() => setBusqueda('')}>
              ✕
            </button>
          )}
          <div className="shortcut-kbd-group hide-mobile">
            <span>Ctrl</span>
            <span>+</span>
            <span>K</span>
          </div>
        </div>

        <div className="filter-pills-row">
          <button
            type="button"
            className={`filter-pill ${filtroEstado === 'todos' ? 'active-all' : ''}`}
            onClick={() => setFiltroEstado('todos')}
          >
            <span>Todos</span>
            <span className="pill-count">{contadores.todos}</span>
          </button>

          <button
            type="button"
            className={`filter-pill ${filtroEstado === 'disponible' ? 'active-status' : ''}`}
            onClick={() => setFiltroEstado('disponible')}
          >
            <span className="dot dot-green-bright"></span>
            <span>Disponibles</span>
            <span className="pill-count">{contadores.disponible}</span>
          </button>

          <button
            type="button"
            className={`filter-pill ${filtroEstado === 'ocupado' ? 'active-status' : ''}`}
            onClick={() => setFiltroEstado('ocupado')}
          >
            <span className="dot dot-blue"></span>
            <span>Ocupados</span>
            <span className="pill-count">{contadores.ocupado}</span>
          </button>

          <button
            type="button"
            className={`filter-pill ${filtroEstado === 'mantenimiento' ? 'active-status' : ''}`}
            onClick={() => setFiltroEstado('mantenimiento')}
          >
            <span className="dot dot-red"></span>
            <span>En Mantenimiento</span>
            <span className="pill-count">{contadores.mantenimiento}</span>
          </button>
        </div>
      </section>

      {/* Encabezado de Bloque */}
      <div className="mapa-tower-bar">
        <div className="tower-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3C627F" strokeWidth="2.2">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="9" y1="22" x2="9" y2="2" />
            <line x1="15" y1="22" x2="15" y2="2" />
          </svg>
          <h2>{tituloBloque}</h2>
        </div>

        <span className="tower-badge-right">
          Total {ambientesPaginados.length} Ambientes mostrados
        </span>
      </div>

      {/* Grid de Tarjetas */}
      {ambientesPaginados.length > 0 ? (
        <div className="mapa-cards-grid">
          {ambientesPaginados.map((amb) => (
            <article key={amb.id} className="mapa-env-card">
              <div className="env-card-body">
                <div className="env-card-top">
                  <div className="env-identity">
                    <div className={`env-icon-box ${amb.estado}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="env-title">
                        {amb.codigo} - {amb.nombre}
                      </h3>
                      <p className="env-spec">Especialidad: {amb.especialidad}</p>
                    </div>
                  </div>
                  {renderBadgeEstado(amb.estado)}
                </div>

                <hr className="env-divider" />

                {amb.estado === 'ocupado' || amb.estado === 'mantenimiento' ? (
                  <div className="env-specs-occupied">
                    <div className="occupied-row">
                      <span className="occ-label">Ficha actual:</span>
                      <span className="occ-val-bold">{amb.fichaActual}</span>
                    </div>
                    <div className="occupied-row">
                      <span className="occ-label">{amb.capacidadLabel}</span>
                      <span className="occ-val">{amb.capacidadResumen}</span>
                    </div>
                  </div>
                ) : (
                  <div className="env-specs-list">
                    {amb.caracteristicas.map((spec, idx) => (
                      <div key={idx} className="spec-line">
                        {renderSpecIcon(spec.tipo)}
                        <span>{spec.texto}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="env-card-footer">
                <div className={`env-time-status ${amb.estado}`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{amb.disponibilidadTexto}</span>
                </div>

                <Button
                  variant={amb.estado === 'disponible' ? 'primary' : 'secondary'}
                  onClick={() => setAmbienteDetalle(amb)}
                >
                  <span>Ver detalle</span>
                  <span>›</span>
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mapa-empty-box">
          <p>No se encontraron ambientes que coincidan con "{busqueda}".</p>
          <Button
            variant="secondary"
            onClick={() => {
              setBusqueda('');
              setFiltroEstado('todos');
            }}
          >
            Restablecer filtros
          </Button>
        </div>
      )}

      {/* Paginación Inferior */}
      <footer className="mapa-pagination-bar">
        <div className="mapa-pag-info">
          <span className="nsw-dot green"></span>
          <span>
            Mostrando{' '}
            <strong>
              {ambientesFiltrados.length === 0 ? 0 : indiceInicio + 1} -{' '}
              {Math.min(indiceFin, ambientesFiltrados.length)}
            </strong>{' '}
            de <strong>{ambientesFiltrados.length}</strong> ambientes auditados
          </span>
        </div>

        <div className="mapa-pag-buttons">
          <button
            type="button"
            className="pag-text-btn"
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
          >
            ‹ Anterior
          </button>

          <div className="pag-num-group">
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
          </div>

          <button
            type="button"
            className="pag-text-btn"
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
          >
            Siguiente ›
          </button>
        </div>
      </footer>

      {/* MODAL DETALLE Y ASIGNACIÓN DE AMBIENTE */}
      {ambienteDetalle && (
        <div className="mapa-modal-backdrop" onClick={cerrarModal}>
          <div className="mapa-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="mapa-modal-header">
              <div>
                <span className="modal-tower-tag">{ambienteDetalle.torre}</span>
                <h3>
                  {ambienteDetalle.codigo} - {ambienteDetalle.nombre}
                </h3>
              </div>
              <button type="button" className="modal-close-x" onClick={cerrarModal}>
                ✕
              </button>
            </div>

            <div className="mapa-modal-body">
              <div className="modal-meta-grid">
                <div>
                  <label>ESTADO ACTUAL</label>
                  <div>{renderBadgeEstado(ambienteDetalle.estado)}</div>
                </div>
                <div>
                  <label>ESPECIALIDAD</label>
                  <p>{ambienteDetalle.especialidad}</p>
                </div>
                <div>
                  <label>CUENTADANTE RESPONSABLE</label>
                  <p>{ambienteDetalle.cuentadante}</p>
                </div>
                <div>
                  <label>DISPONIBILIDAD</label>
                  <p>{ambienteDetalle.disponibilidadTexto}</p>
                </div>
              </div>

              {ambienteDetalle.fichaActual && (
                <div className="modal-occupied-banner">
                  <strong>Ocupación actual:</strong> {ambienteDetalle.fichaActual}
                </div>
              )}

              <div className="modal-specs-section">
                <label>INFRAESTRUCTURA Y DOTACIÓN</label>
                <ul>
                  {ambienteDetalle.caracteristicas.map((c, idx) => (
                    <li key={idx}>{c.texto}</li>
                  ))}
                </ul>
              </div>

              {ambienteDetalle.estado === 'disponible' && (
                <form className="modal-assign-form" onSubmit={handleAsignarAmbiente}>
                  <label htmlFor="fichaInput">
                    Asignación rápida por contingencia (N° de Ficha)
                  </label>
                  <div className="assign-input-row">
                    <input
                      id="fichaInput"
                      type="text"
                      placeholder="Ej: 2694115 - ADSO"
                      value={fichaAsignar}
                      onChange={(e) => setFichaAsignar(e.target.value)}
                      required
                    />
                    <Button variant="primary" type="submit">
                      Asignar Aula
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="mapa-modal-footer">
              <Button variant="secondary" onClick={cerrarModal}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapaAmbientes;