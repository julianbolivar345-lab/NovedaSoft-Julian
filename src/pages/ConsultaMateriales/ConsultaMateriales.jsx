import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import './ConsultaMateriales.css';

export const ConsultaMateriales = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('puesto');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Mock de Inventario de Bienes con campo 'categoria' asignado
  const inventarioMock = [
    {
      id: 'AST-305-08',
      categoria: 'computo',
      nombre: 'PC Lenovo ThinkCentre M70a',
      desc: 'All-In-One Core i7 16GB RAM',
      placa: '98564215421',
      serial: 'S/N: LNV-2024-8891',
      puesto: 'Puesto Aprendiz 08',
      estado: 'Operativo',
      cuentadante: 'Ing. Carlos Mendoza R. (C.C. 80.234.120)',
      ram: '16 GB DDR4 (2x8GB)',
      almacenamiento: 'SSD NVMe 512 GB',
      procesador: 'Intel Core i7-10700',
      red: 'Gigabit LAN + Wi-Fi 6',
      observaciones: 'Mantenimiento preventivo ejecutado en el trimestre anterior. Pasta térmica renovada y limpieza de periféricos al día.'
    },
    {
      id: 'AST-305-TV',
      categoria: 'audiovisual',
      nombre: 'Smart TV 65" LG UHD 4K',
      desc: 'Pantalla interactiva montaje en pared',
      placa: 'SENA-77341',
      serial: 'S/N: LG-90124-TV',
      puesto: 'Muro Principal Frontal',
      estado: 'Operativo',
      cuentadante: 'Ing. Carlos Mendoza R.',
      ram: 'N/A',
      almacenamiento: '32 GB eMMC',
      procesador: 'Quad Core Processor 4K',
      red: 'Wi-Fi 5 + RJ45',
      observaciones: 'Funcionando adecuadamente con HDMI 2 activo.'
    },
    {
      id: 'AST-305-SW',
      categoria: 'redes',
      nombre: 'Switch Cisco Catalyst 2960 24P',
      desc: 'Switch administrable rack principal',
      placa: 'SENA-99014',
      serial: 'S/N: CSC-24P-8810',
      puesto: 'Rack Gabinete Torre A',
      estado: 'En Mantenimiento',
      cuentadante: 'Mesa TI CIDE',
      ram: '512 MB',
      almacenamiento: '128 MB Flash',
      procesador: 'Cisco Networking SoC',
      red: '24 Puertos Ethernet 10/100/1000',
      observaciones: 'Reportada falla en módulo PoE. En revisión por laboratorio.'
    },
    {
      id: 'AST-305-09',
      categoria: 'computo',
      nombre: 'PC Lenovo ThinkCentre M70a',
      desc: 'All-In-One Core i7 16GB RAM',
      placa: 'SENA-89212',
      serial: 'S/N: LNV-2024-8892',
      puesto: 'Puesto Aprendiz 09',
      estado: 'Operativo',
      cuentadante: 'Ing. Carlos Mendoza R.',
      ram: '16 GB DDR4',
      almacenamiento: 'SSD NVMe 512 GB',
      procesador: 'Intel Core i7-10700',
      red: 'Gigabit LAN',
      observaciones: 'Operativo en perfecta conformidad.'
    },
    {
      id: 'AST-305-AC',
      categoria: 'mobiliario',
      nombre: 'Sistema Aire York 24000 BTU',
      desc: 'Unidad minisplit inverter',
      placa: 'SENA-55219',
      serial: 'S/N: YRK-AC-1102',
      puesto: 'Pared Lateral Sur',
      estado: 'En Revisión',
      cuentadante: 'Mantenimiento Locativo',
      ram: 'N/A',
      almacenamiento: 'N/A',
      procesador: 'Inverter Board',
      red: 'N/A',
      observaciones: 'Programada revisión por drenaje de condensado.'
    },
    {
      id: 'AST-305-VB',
      categoria: 'audiovisual',
      nombre: 'Video Beam Epson PowerLite Pro',
      desc: 'Proyector HDMI / Techo',
      placa: 'SENA-66108',
      serial: 'S/N: EPS-VB-4421',
      puesto: 'Soporte Techo Centro',
      estado: 'Operativo',
      cuentadante: 'Ing. Carlos Mendoza R.',
      ram: 'N/A',
      almacenamiento: 'N/A',
      procesador: '3LCD Engine',
      red: 'HDMI / VGA / USB',
      observaciones: 'Lámpara con 420 horas de uso (Vida útil 4000h).'
    },
    {
      id: 'AST-305-10',
      categoria: 'computo',
      nombre: 'PC HP ProDesk 400 G6',
      desc: 'Torre Slim Core i5 8GB RAM',
      placa: 'SENA-33104',
      serial: 'S/N: HP-2024-9901',
      puesto: 'Puesto Aprendiz 10',
      estado: 'Operativo',
      cuentadante: 'Ing. Carlos Mendoza R.',
      ram: '8 GB DDR4',
      almacenamiento: 'SSD 256 GB',
      procesador: 'Intel Core i5-10500',
      red: 'Gigabit LAN',
      observaciones: 'Equipo asignado temporalmente.'
    },
    {
      id: 'AST-305-AP',
      categoria: 'redes',
      nombre: 'Access Point Aruba AP-505',
      desc: 'Punto de acceso Wi-Fi 6 empresarial',
      placa: 'SENA-44102',
      serial: 'S/N: ARB-WIFI-9902',
      puesto: 'Techo Sector B',
      estado: 'Operativo',
      cuentadante: 'Mesa TI CIDE',
      ram: '256 MB',
      almacenamiento: '64 MB',
      procesador: 'Aruba Networking Dual Core',
      red: 'Wi-Fi 6 Dual Band + PoE',
      observaciones: 'Funcionamiento óptimo cobertura aula 305.'
    }
  ];

  // Estado del activo seleccionado en la Ficha Técnica
  const [selectedEquipo, setSelectedEquipo] = useState(inventarioMock[0]);
  const [estadoEdit, setEstadoEdit] = useState(inventarioMock[0].estado);
  const [obsEdit, setObsEdit] = useState(inventarioMock[0].observaciones);

  // Contadores dinámicos por categoría
  const countTodos = inventarioMock.length;
  const countComputo = inventarioMock.filter((item) => item.categoria === 'computo').length;
  const countAudiovisual = inventarioMock.filter((item) => item.categoria === 'audiovisual').length;
  const countRedes = inventarioMock.filter((item) => item.categoria === 'redes').length;
  const countMobiliario = inventarioMock.filter((item) => item.categoria === 'mobiliario').length;

  // Lógica de Filtrado y Ordenamiento
  const inventarioFiltrado = useMemo(() => {
    let result = inventarioMock.filter((item) => {
      const matchCat = activeCategory === 'todos' || item.categoria === activeCategory;
      const term = searchTerm.toLowerCase();
      const matchSearch =
        item.nombre.toLowerCase().includes(term) ||
        item.placa.toLowerCase().includes(term) ||
        item.serial.toLowerCase().includes(term) ||
        item.puesto.toLowerCase().includes(term);

      return matchCat && matchSearch;
    });

    if (sortOrder === 'puesto') {
      result.sort((a, b) => a.puesto.localeCompare(b.puesto));
    } else if (sortOrder === 'placa') {
      result.sort((a, b) => a.placa.localeCompare(b.placa));
    } else if (sortOrder === 'estado') {
      result.sort((a, b) => a.estado.localeCompare(b.estado));
    }

    return result;
  }, [activeCategory, searchTerm, sortOrder]);

  // Paginación
  const totalPages = Math.ceil(inventarioFiltrado.length / itemsPerPage) || 1;

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return inventarioFiltrado.slice(startIndex, startIndex + itemsPerPage);
  }, [inventarioFiltrado, currentPage]);

  // Handlers
  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectEquipo = (equipo) => {
    setSelectedEquipo(equipo);
    setEstadoEdit(equipo.estado);
    setObsEdit(equipo.observaciones);
  };

  const handleGuardarCambios = () => {
    alert(`¡Cambios guardados en base de datos para el activo ${selectedEquipo.id}!`);
  };

  const handleReportarNovedad = () => {
    navigate('/instructor/reportar-novedad');
  };

  return (
    <div className="consulta-layout-wrapper">
      {/* 1. SIDEBAR INTEGRADO */}
      <Sidebar 
        activeMenu="consulta" 
        userName="Ing. Carlos Mendoza R." 
        userRole="Instructor ADSO / Redes" 
      />

      {/* 2. ÁREA DE CONTENIDO */}
      <main className="consulta-main-content">
        {/* Topbar Superior */}
        <header className="consulta-topbar">
          <div className="consulta-breadcrumb">
            <span>Portal CIDE</span>
            <span>›</span>
            <span>Instructor</span>
            <span>›</span>
            <span className="consulta-breadcrumb-active">Consulta de Materiales</span>
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
        <div className="consulta-body-container">
          {/* Header del Módulo */}
          <div className="consulta-header-row">
            <div>
              <div className="custodia-pill">
                <span className="dot-status-green" />
                <span>GESTIÓN DE ACTIVOS Y CUSTODIA • CIDE SOACHA</span>
              </div>
              <h1 className="consulta-title">Consulta de Materiales y Bienes de Ambiente</h1>
              <p className="consulta-subtitle">
                Verificación en tiempo real del inventario físico, estado operativo y gestión de datos de los recursos pedagógicos.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
              <div className="ambient-selector-box">
                <div style={{ width: '32px', height: '32px', backgroundColor: '#F1F5F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3C627F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>Ambiente Seleccionado</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Ambiente 305 - Laboratorio TIDC I</div>
                </div>
              </div>

              <button className="btn-export-excel" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Exportar Inventario (Excel / PDF)</span>
              </button>
            </div>
          </div>

          {/* Filtros y Buscador */}
          <div className="search-filter-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div className="search-input-box">
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', display: 'flex' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="search-input-field"
                  placeholder="Filtrar por Placa SENA (Ej: SENA-89211), serial o nombre del equipo..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>Ordenar por:</span>
                <select 
                  style={{ padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="puesto">Puesto de Aula (Ascendente)</option>
                  <option value="placa">Placa SENA</option>
                  <option value="estado">Estado Operativo</option>
                </select>
              </div>
            </div>

            {/* Pestañas de Categorías con Contadores Reales */}
            <div className="category-tabs-wrapper">
              <button 
                className={`cat-tab-btn ${activeCategory === 'todos' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('todos')}
              >
                <span>Todos los Materiales</span>
                <span className="cat-badge-count">{countTodos}</span>
              </button>

              <button 
                className={`cat-tab-btn ${activeCategory === 'computo' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('computo')}
              >
                <span>Cómputo / Laptops</span>
                <span className="cat-badge-count">{countComputo}</span>
              </button>

              <button 
                className={`cat-tab-btn ${activeCategory === 'audiovisual' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('audiovisual')}
              >
                <span>Audiovisual / Pantallas</span>
                <span className="cat-badge-count">{countAudiovisual}</span>
              </button>

              <button 
                className={`cat-tab-btn ${activeCategory === 'redes' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('redes')}
              >
                <span>Conectividad / Redes</span>
                <span className="cat-badge-count">{countRedes}</span>
              </button>

              <button 
                className={`cat-tab-btn ${activeCategory === 'mobiliario' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('mobiliario')}
              >
                <span>Climatización / Mobiliario</span>
                <span className="cat-badge-count">{countMobiliario}</span>
              </button>
            </div>
          </div>

          {/* GRID DE 2 COLUMNAS (TABLA + FICHA TÉCNICA) */}
          <div className="inventory-grid-container">
            
            {/* COLUMNA IZQUIERDA: TABLA DE INVENTARIO */}
            <div className="inventory-table-card">
              <div className="inventory-table-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#0F172A' }}>Inventario Físico de Ambiente</span>
                  <span style={{ backgroundColor: '#E5EEFF', color: '#0B1C30', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px' }}>
                    {inventarioFiltrado.length} Activos
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                  Actualizado hace 15 minutos
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="inventario-table">
                  <thead>
                    <tr>
                      <th>ELEMENTO / DESCRIPCIÓN</th>
                      <th>PLACA SENA / SERIAL</th>
                      <th>UBICACIÓN / PUESTO</th>
                      <th>ESTADO OPERATIVO</th>
                      <th style={{ textAlign: 'right' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => (
                        <tr 
                          key={item.id} 
                          className={selectedEquipo.id === item.id ? 'selected-row' : ''}
                        >
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '36px', height: '36px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3C627F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                  <line x1="8" y1="21" x2="16" y2="21"/>
                                  <line x1="12" y1="17" x2="12" y2="21"/>
                                </svg>
                              </div>
                              <div>
                                <div style={{ fontWeight: '600', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span>{item.nombre}</span>
                                  {selectedEquipo.id === item.id && <span className="dot-status-green" />}
                                </div>
                                <div style={{ fontSize: '12px', color: '#475569' }}>{item.desc}</div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div style={{ fontFamily: 'monospace', fontWeight: '700', color: '#226D00' }}>
                              {item.placa}
                            </div>
                            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#94A3B8' }}>
                              {item.serial}
                            </div>
                          </td>

                          <td>
                            <div style={{ fontWeight: '600', color: '#0F172A' }}>
                              {item.puesto}
                            </div>
                          </td>

                          <td>
                            {item.estado === 'Operativo' && (
                              <span className="badge-operativo">
                                <span className="dot-status-green" />
                                Operativo
                              </span>
                            )}
                            {item.estado === 'En Mantenimiento' && (
                              <span className="badge-mantenimiento">
                                <span className="dot-status-red" />
                                En Mantenimiento
                              </span>
                            )}
                            {item.estado === 'En Revisión' && (
                              <span className="badge-revision">
                                <span className="dot-status-blue" />
                                En Revisión
                              </span>
                            )}
                          </td>

                          <td style={{ textAlign: 'right' }}>
                            <button 
                              className={`btn-ver-ficha ${selectedEquipo.id === item.id ? 'active-ficha' : ''}`}
                              onClick={() => handleSelectEquipo(item)}
                            >
                              Ver Ficha
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>
                          No se encontraron materiales con los filtros aplicados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación Interactiva */}
              <div style={{ padding: '16px 24px', backgroundColor: 'rgba(241, 245, 249, 0.50)', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#475569' }}>
                <div>
                  Mostrando <strong>{inventarioFiltrado.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, inventarioFiltrado.length)}</strong> de <strong>{inventarioFiltrado.length}</strong> bienes inventariados
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: pageNum === currentPage ? 'none' : '1px solid #E2E8F0',
                        background: pageNum === currentPage ? '#39A900' : '#FFFFFF',
                        color: pageNum === currentPage ? '#FFFFFF' : '#475569',
                        fontWeight: pageNum === currentPage ? '600' : '400',
                        cursor: 'pointer'
                      }}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button 
                    style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: FICHA TÉCNICA DEL ACTIVO */}
            <div className="ficha-tecnica-card">
              
              {/* Header Ficha */}
              <div style={{ paddingBottom: '12px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#F0FDF4', color: '#095223', fontSize: '11px', fontWeight: '600', padding: '2px 10px', borderRadius: '9999px' }}>
                  FICHA ACTIVA EN CUSTODIA • ID: {selectedEquipo.id}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
                  Solo Lectura
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: 0 }}>Gestión de Ficha Técnica</h3>
                <p style={{ fontSize: '12px', color: '#475569', margin: '2px 0 0 0' }}>
                  Registro de Activo en Base de Datos Institucional
                </p>
              </div>

              {/* Caja de Metadatos Protegidos */}
              <div className="meta-protected-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#475569', letterSpacing: '0.55px' }}>
                    METADATOS PROTEGIDOS • ALMACÉN CENTRAL
                  </span>
                  <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94A3B8' }}>AUDIT-OK</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Placa SENA</div>
                    <div style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: '700', color: '#226D00' }}>{selectedEquipo.placa}</div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Serial Fabricante</div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.serial}</div>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Marca y Modelo</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.nombre}</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>Cuentadante / Responsable Asignado</div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.cuentadante}</div>
                </div>
              </div>

              {/* Campos Actualizables */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>Campos Actualizables en Aula</span>
                  <span style={{ fontSize: '11px', color: '#095223', backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: '9999px', fontWeight: '500' }}>Habilitado</span>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Estado Operativo del Bien *
                  </label>
                  <select 
                    style={{ width: '100%', height: '44px', padding: '0 12px', backgroundColor: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', color: '#0F172A' }}
                    value={estadoEdit}
                    onChange={(e) => setEstadoEdit(e.target.value)}
                  >
                    <option value="Operativo">Operativo</option>
                    <option value="En Mantenimiento">En Mantenimiento</option>
                    <option value="En Revisión">En Revisión</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Observaciones / Historial Técnico
                  </label>
                  <textarea
                    style={{ width: '100%', height: '80px', padding: '10px 12px', backgroundColor: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', color: '#0F172A', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
                    value={obsEdit}
                    onChange={(e) => setObsEdit(e.target.value)}
                  />
                </div>
              </div>

              {/* Especificaciones de Hardware */}
              <div className="meta-protected-box" style={{ backgroundColor: '#F1F5F9' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#94A3B8', letterSpacing: '0.55px' }}>
                  ESPECIFICACIONES DE HARDWARE
                </span>

                <div className="spec-grid-box">
                  <div className="spec-row-item">
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Memoria RAM</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.ram}</span>
                  </div>
                  <div className="spec-row-item">
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Almacenamiento</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.almacenamiento}</span>
                  </div>
                  <div className="spec-row-item">
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Procesador</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.procesador}</span>
                  </div>
                  <div className="spec-row-item">
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Chipset / Red</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{selectedEquipo.red}</span>
                  </div>
                </div>
              </div>

              {/* Botones de Guardar / Reportar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="btn-guardar-registro" onClick={handleGuardarCambios} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  <span>Guardar Cambios en Registro</span>
                </button>

                <button className="btn-reportar-novedad-equipo" onClick={handleReportarNovedad} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <span>Reportar Novedad sobre este Equipo</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
};

export default ConsultaMateriales;