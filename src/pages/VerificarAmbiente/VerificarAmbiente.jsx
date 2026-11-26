import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  BookOpen,
  Clock,
  User,
  Monitor,
  Tv,
  Wind,
  Users,
  Check,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext/AlertContext';
import Button from '../../components/Button/Button';
import './VerificarAmbiente.css';

const AMBIENTE_ACTUAL = {
  id: 305,
  nombre: 'Ambiente 305 - Laboratorio TIDC I',
  jornada: 'Jornada Mañana',
  ubicacion: 'Torre A - Piso 3',
  programa: 'ADSO - Ficha 289012',
  horario: '06:00 AM - 12:00 PM',
  instructor: 'Ing. Carlos Mendoza R.',
};

const RECURSOS_AMBIENTE = [
  { cantidad: 25, nombre: 'Computadores All-In-One', icon: Monitor },
  { cantidad: 1, nombre: 'Smart TV 65"', icon: Tv },
  { cantidad: 1, nombre: 'Sistema de A/C', icon: Wind },
  { cantidad: 32, nombre: 'Puestos de Trabajo', icon: Users },
];

export const VerificarAmbiente = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert() || {};

  const handleConfirmar = () => {
    showAlert?.({
      title: 'Jornada Confirmada',
      message: `${AMBIENTE_ACTUAL.nombre} verificado e iniciado exitosamente.`,
      type: 'success',
    });
    navigate('/instructor/horario');
  };

  const handleReportarNovedad = () => {
    navigate('/instructor/reportar-novedad', {
      state: {
        ambienteId: AMBIENTE_ACTUAL.id,
        ambienteNombre: AMBIENTE_ACTUAL.nombre,
      },
    });
  };

  return (
    <div className="verificar-body-container">
      {/* Card 1: Información de la Sesión y Aula */}
      <div className="verificar-info-card">
        <div className="verificar-card-header">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className="session-pill">
              <span className="dot-status-green" />
              <span>Sesión en Curso</span>
            </div>
            <h1 className="verificar-title">{AMBIENTE_ACTUAL.nombre}</h1>
          </div>
          <div className="jornada-badge">{AMBIENTE_ACTUAL.jornada}</div>
        </div>

        {/* Grid de Metadatos de Aula */}
        <div className="verificar-meta-grid">
          <div className="meta-item">
            <MapPin size={18} color="#94A3B8" />
            <div>
              <div className="meta-label">Ubicación</div>
              <div className="meta-value">{AMBIENTE_ACTUAL.ubicacion}</div>
            </div>
          </div>

          <div className="meta-item">
            <BookOpen size={18} color="#94A3B8" />
            <div>
              <div className="meta-label">Programa</div>
              <div className="meta-value">{AMBIENTE_ACTUAL.programa}</div>
            </div>
          </div>

          <div className="meta-item">
            <Clock size={18} color="#94A3B8" />
            <div>
              <div className="meta-label">Horario</div>
              <div className="meta-value">{AMBIENTE_ACTUAL.horario}</div>
            </div>
          </div>

          <div className="meta-item">
            <User size={18} color="#94A3B8" />
            <div>
              <div className="meta-label">Instructor</div>
              <div className="meta-value">{AMBIENTE_ACTUAL.instructor}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Recursos Asignados */}
      <div className="verificar-recursos-section">
        <div className="recursos-header">
          <span className="recursos-title">RECURSOS ASIGNADOS AL AMBIENTE</span>
          <span className="recursos-count">Total {RECURSOS_AMBIENTE.length} ítems verificables</span>
        </div>

        <div className="recursos-grid">
          {RECURSOS_AMBIENTE.map((recurso, index) => {
            const IconComponent = recurso.icon;
            return (
              <div key={index} className="recurso-card">
                <div className="recurso-icon-box">
                  <IconComponent size={20} color="#475569" />
                </div>
                <div>
                  <div className="recurso-num">{recurso.cantidad}</div>
                  <div className="recurso-name">{recurso.nombre}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 3: Acciones (Ambiente Conforme vs Reportar Novedad) */}
      <div className="verificar-actions-grid">
        <div className="action-card action-card-conforme">
          <div className="action-card-content">
            <div className="action-icon-wrapper conforme-icon">
              <Check size={36} color="#39A900" strokeWidth={2.5} />
            </div>
            <h2 className="action-title">Ambiente Conforme</h2>
            <p className="action-desc">
              Los equipos, la conectividad y el mobiliario del aula se encuentran completos y en condiciones óptimas para la formación.
            </p>
          </div>

          <Button
            variant="primary"
            className="btn-action-conforme"
            onClick={handleConfirmar}
          >
            <span>Confirmar e Iniciar Jornada</span>
            <ChevronRight size={18} />
          </Button>
        </div>

        <div className="action-card action-card-falla">
          <div className="action-card-content">
            <div className="action-icon-wrapper falla-icon">
              <AlertTriangle size={36} color="#DC2626" strokeWidth={2.5} />
            </div>
            <h2 className="action-title">Reportar Novedad o Falla</h2>
            <p className="action-desc">
              Se detectó una falla técnica, un daño en la infraestructura o un elemento faltante en el aula.
            </p>
          </div>

          <Button
            variant="danger"
            className="btn-action-falla"
            onClick={handleReportarNovedad}
          >
            <span>Ir a Formulario de Reporte</span>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificarAmbiente;