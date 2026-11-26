import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Monitor,
  Zap,
  Plus,
  Search,
  Camera,
  X,
  Save,
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext/AlertContext';
import Button from '../../components/Button/Button';
import './ReportarNovedadForm.css';

export const ReportarNovedadForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlert() || {};
  const fileInputRef = useRef(null);

  const [ambiente, setAmbiente] = useState(
    location.state?.ambienteNombre || 'Ambiente 305 - Laboratorio TIDC I'
  );
  const [categoria, setCategoria] = useState('tecnologica');
  const [placaSerial, setPlacaSerial] = useState('');
  const [elementoAfectado, setElementoAfectado] = useState('');
  const [nivelImpacto, setNivelImpacto] = useState('bloqueante');
  const [descripcion, setDescripcion] = useState('');
  const [archivos, setArchivos] = useState([]);

  const agregarArchivos = (listaArchivos) => {
    const validos = Array.from(listaArchivos || []).filter((file) =>
      ['image/png', 'image/jpeg'].includes(file.type)
    );
    if (validos.length > 0) {
      setArchivos((prev) => [...prev, ...validos]);
    }
  };

  const handleFileChange = (e) => {
    agregarArchivos(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    agregarArchivos(e.dataTransfer.files);
  };

  const handleRemoveFile = (indexToRemove) => {
    setArchivos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!elementoAfectado.trim() || !descripcion.trim()) {
      showAlert?.({
        title: 'Campos Incompletos',
        message: 'Indica el elemento afectado y la descripción del fallo antes de guardar.',
        type: 'warning',
      });
      return;
    }

    showAlert?.({
      title: 'Novedad Registrada',
      message: `Reporte guardado en ${ambiente} con estado REGISTRADA.`,
      type: 'success',
    });
    navigate('/instructor/horario');
  };

  const handleCancel = () => {
    navigate('/instructor/verificar-ambiente');
  };

  return (
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
          <span>
            Estado al guardar: <strong>REGISTRADA</strong>
          </span>
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
                <option value="Ambiente 305 - Laboratorio TIDC I">
                  Ambiente 305 - Laboratorio TIDC I
                </option>
                <option value="Ambiente 306 - Laboratorio Software">
                  Ambiente 306 - Laboratorio Software
                </option>
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
                  <Monitor size={18} />
                  <span className="category-btn-text">Tecnológica / Equipos</span>
                </button>

                <button
                  type="button"
                  className={`category-btn ${categoria === 'infraestructura' ? 'selected' : ''}`}
                  onClick={() => setCategoria('infraestructura')}
                >
                  <Zap size={18} />
                  <span className="category-btn-text">Infraestructura</span>
                </button>

                <button
                  type="button"
                  className={`category-btn ${categoria === 'mobiliario' ? 'selected' : ''}`}
                  onClick={() => setCategoria('mobiliario')}
                >
                  <Plus size={18} />
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
                  <Search size={16} color="#94A3B8" />
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
                <span className="badge-required">Requerido</span>
              </div>
              <input
                type="text"
                className="input-text-standard"
                placeholder="Ej. PC Lenovo ThinkCentre M70a / Monitor / Aire Acondicionado"
                value={elementoAfectado}
                onChange={(e) => setElementoAfectado(e.target.value)}
                required
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
                    <div
                      className="impact-title"
                      style={{ color: nivelImpacto === 'bloqueante' ? '#BA1A1A' : '#0B1C30' }}
                    >
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
                    <div
                      className="impact-title"
                      style={{ color: nivelImpacto === 'parcial' ? '#3C627F' : '#0B1C30' }}
                    >
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
                    <div
                      className="impact-title"
                      style={{ color: nivelImpacto === 'menor' ? '#16A34A' : '#0B1C30' }}
                    >
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
                placeholder="Describe qué ocurre con el equipo o recurso, códigos de error, puesto o condición observada..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            {/* Campo 7: Carga de Evidencia Fotográfica */}
            <div className="form-field-group">
              <div className="form-field-header">
                <label className="form-label">7. Carga de Evidencia Fotográfica</label>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                multiple
                style={{ display: 'none' }}
              />

              <div
                className="upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="upload-icon-circle">
                  <Camera size={24} color="#39A900" />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#0B1C30' }}>
                  Haga clic o arrastre fotografías del daño o mensaje de error
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                  Formatos admitidos: JPG, PNG (Hasta 10MB)
                </div>
              </div>

              {archivos.length > 0 && (
                <div className="attached-files-list">
                  {archivos.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="attached-file-item">
                      <span className="file-name">{file.name}</span>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => handleRemoveFile(index)}
                        aria-label={`Quitar ${file.name}`}
                      >
                        <X size={14} />
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
          <Button variant="secondary" onClick={handleCancel}>
            <X size={16} />
            <span>Cancelar y Volver</span>
          </Button>

          <Button variant="primary" type="submit">
            <Save size={16} />
            <span>GUARDAR Y REGISTRAR NOVEDAD</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportarNovedadForm;