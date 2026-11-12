import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import './ReportarNovedadForm.css';

export const ReportarNovedadForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Estados del Formulario
  const [ambiente, setAmbiente] = useState('Ambiente 305 - Laboratorio TIDC I');
  const [categoria, setCategoria] = useState('tecnologica'); // tecnologica | infraestructura | mobiliario
  const [placaSerial, setPlacaSerial] = useState('SENA-89211');
  const [elementoAfectado, setElementoAfectado] = useState('PC Lenovo ThinkCentre M70a');
  const [nivelImpacto, setNivelImpacto] = useState('bloqueante'); // bloqueante | parcial | menor
  const [descripcion, setDescripcion] = useState(
    'El equipo de cómputo en el puesto 08 no enciende tras conectar el cable a la toma regulada. Emite 3 beeps continuos y la pantalla permanece en negro sin señal de video.'
  );

  // Estado para las imágenes adjuntas
  const [archivos, setArchivos] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setArchivos((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleDropzoneClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (indexToRemove) => {
    setArchivos(archivos.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Novedad registrada exitosamente en el sistema NovedadSoft!');
    navigate('/instructor/horario');
  };

  const handleCancel = () => {
    navigate('/instructor/verificar-ambiente');
  };

  return (
    <div className="report-form-layout">
      {/* 1. SIDEBAR INSTITUCIONAL */}
      <Sidebar 
        activeMenu="reportar" 
        userName="Ing. Carlos Mendoza R." 
        userRole="Instructor ADSO / Redes" 
      />
    

      {/* 2. ÁREA PRINCIPAL */}
      <main className="report-form-main">
        {/* Topbar Superior */}
        <header className="report-topbar">
          <div className="report-breadcrumb">
            <span>Portal CIDE</span>
            <span>›</span>
            <span>Instructor</span>
            <span>›</span>
            <span className="report-breadcrumb-active">Reportar Novedad</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: '#F0FDF4', color: '#095223', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="dot-green-icon" />
              <span>Servidor Activo</span>
            </div>

            <div style={{ backgroundColor: '#F1F5F9', color: '#3C627F', padding: '4px 12px', borderRadius: '9999px', fontSize: '11px', fontWeight: '500' }}>
              SENA CIDE Soacha - Regional Cundinamarca
            </div>
          </div>
        </header>

        {/* Cuerpo del Formulario */}
        <div className="report-body-wrapper">
          {/* Header de Título y Estado */}
          <div className="report-header-row">
            <div>
              <h1 className="report-title-main">Registrar Novedad en Ambiente</h1>
              <p className="report-title-sub">
                Formulario oficial para el reporte de fallas tecnológicas o locativas en los ambientes de formación del CIDE.
              </p>
            </div>

            <div className="status-tag-registrada">
              <span className="dot-green-icon" />
              <span>Estado al guardar: <strong>REGISTRADA</strong></span>
            </div>
          </div>

          {/* Formulario Principal */}
          <form className="report-card-container" onSubmit={handleSubmit}>
            <div className="form-two-columns">
              {/* COLUMNA IZQUIERDA */}
              <div className="form-column">
                {/* Campo 1: Ambiente */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">1. Ambiente de Formación</label>
                    <span className="badge-required">Requerido</span>
                  </div>
                  <select 
                    className="select-standard"
                    value={ambiente}
                    onChange={(e) => setAmbiente(e.target.value)}
                  >
                    <option value="Ambiente 305 - Laboratorio TIDC I">Ambiente 305 - Laboratorio TIDC I</option>
                    <option value="Ambiente 306 - Laboratorio Software">Ambiente 306 - Laboratorio Software</option>
                    <option value="Lab. Redes 204">Lab. Redes 204</option>
                  </select>
                </div>

                {/* Campo 2: Categoría */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">2. Tipo de Novedad / Categoría</label>
                  </div>
                  
                  <div className="category-buttons-grid">
                    <button
                      type="button"
                      className={`category-btn ${categoria === 'tecnologica' ? 'selected' : ''}`}
                      onClick={() => setCategoria('tecnologica')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/>
                        <line x1="12" y1="17" x2="12" y2="21"/>
                      </svg>
                      <span className="category-btn-text">Tecnológica / Equipos</span>
                    </button>

                    <button
                      type="button"
                      className={`category-btn ${categoria === 'infraestructura' ? 'selected' : ''}`}
                      onClick={() => setCategoria('infraestructura')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                      <span className="category-btn-text">Infraestructura</span>
                    </button>

                    <button
                      type="button"
                      className={`category-btn ${categoria === 'mobiliario' ? 'selected' : ''}`}
                      onClick={() => setCategoria('mobiliario')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3v18M3 12h18"/>
                      </svg>
                      <span className="category-btn-text">Mobiliario</span>
                    </button>
                  </div>
                </div>

                {/* Campo 3: Placa SENA / Serial */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">3. Placa del Bien SENA / Serial del Equipo</label>
                    <span className="badge-optional">Opcional / Búsqueda</span>
                  </div>
                  <div className="input-with-icon-box">
                    <span className="input-icon-left">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="input-text-standard input-with-icon"
                      placeholder="Ej. SENA-89211"
                      value={placaSerial}
                      onChange={(e) => setPlacaSerial(e.target.value)}
                    />
                  </div>
                </div>

                {/* Campo 4: Elemento Afectado */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">4. Elemento Afectado</label>
                  </div>
                  <input
                    type="text"
                    className="input-text-standard"
                    placeholder="Ej. Monitor / Aire Acondicionado / Silla"
                    value={elementoAfectado}
                    onChange={(e) => setElementoAfectado(e.target.value)}
                  />
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="form-column">
                {/* Campo 5: Nivel de Impacto */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">5. Nivel de Impacto en la Clase</label>
                  </div>

                  <div className="impact-buttons-grid">
                    <button
                      type="button"
                      className={`impact-btn ${nivelImpacto === 'bloqueante' ? 'selected-bloqueante' : ''}`}
                      onClick={() => setNivelImpacto('bloqueante')}
                    >
                      <span className="impact-dot" style={{ backgroundColor: '#BA1A1A' }} />
                      <div>
                        <div className="impact-title" style={{ color: nivelImpacto === 'bloqueante' ? '#BA1A1A' : '#0B1C30' }}>
                          Bloqueante
                        </div>
                        <div className="impact-desc">No apto clase</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`impact-btn ${nivelImpacto === 'parcial' ? 'selected-parcial' : ''}`}
                      onClick={() => setNivelImpacto('parcial')}
                    >
                      <span className="impact-dot" style={{ backgroundColor: '#3C627F' }} />
                      <div>
                        <div className="impact-title" style={{ color: nivelImpacto === 'parcial' ? '#3C627F' : '#0B1C30' }}>
                          Parcial
                        </div>
                        <div className="impact-desc">Requiere ajuste</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`impact-btn ${nivelImpacto === 'menor' ? 'selected-menor' : ''}`}
                      onClick={() => setNivelImpacto('menor')}
                    >
                      <span className="impact-dot" style={{ backgroundColor: '#16A34A' }} />
                      <div>
                        <div className="impact-title" style={{ color: nivelImpacto === 'menor' ? '#16A34A' : '#0B1C30' }}>
                          Menor
                        </div>
                        <div className="impact-desc">Informativo</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Campo 6: Descripción Detallada */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">6. Descripción Detallada del Fallo</label>
                    <span className="badge-optional">Máx. 1000 caracteres</span>
                  </div>
                  <textarea
                    className="textarea-description"
                    maxLength={1000}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>

                {/* Campo 7: Carga de Evidencia Fotográfica */}
                <div className="form-field-group">
                  <div className="form-field-header">
                    <label className="form-label">7. Carga de Evidencia Fotográfica</label>
                  </div>

                  {/* Input de archivo oculto */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/png, image/jpeg" 
                    multiple 
                    style={{ display: 'none' }} 
                  />

                  <div className="upload-dropzone" onClick={handleDropzoneClick}>
                    <div className="upload-icon-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#39A900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#0B1C30' }}>
                      Haga clic o arrastre fotografías del daño o mensaje de error
                    </div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                      Formatos admitidos: JPG, PNG (Hasta 10MB)
                    </div>
                  </div>

                  {/* Lista de archivos adjuntos */}
                  {archivos.length > 0 && (
                    <div className="attached-files-list">
                      {archivos.map((file, index) => (
                        <div key={index} className="attached-file-item">
                          <span className="file-name">{file.name}</span>
                          <button 
                            type="button" 
                            className="remove-file-btn" 
                            onClick={() => handleRemoveFile(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN FOOTER */}
            <div className="form-footer-actions">
              <button type="button" className="btn-cancel-return" onClick={handleCancel}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                <span>Cancelar y Volver</span>
              </button>

              <button type="submit" className="btn-submit-novedad">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <span>GUARDAR Y REGISTRAR NOVEDAD</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ReportarNovedadForm;