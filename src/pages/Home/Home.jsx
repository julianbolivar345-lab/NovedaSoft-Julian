import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Importación de la imagen del Hero desde assets
import estudiantesImg from '../../assets/Estudiantes.jpg';

export const Home = () => {
  const navigate = useNavigate();

  // Función para redirigir al formulario de Login
  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-wrapper">
      
      {/* 1. NAVBAR SUPERIOR */}
      <header className="home-header">
        <div className="home-nav-container">
          <div className="brand-box">
            <div className="brand-icon-logo">N</div>
            <div>
              <div className="brand-title-text">NovedadSoft</div>
              <div className="brand-sub-text">SENA · CIDE Soacha</div>
            </div>
            <span className="badge-regional">Regional Cundinamarca</span>
          </div>

          <button className="btn-cta-green" onClick={handleGoToLogin}>
            Ingresar al Sistema →
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-container">
        <div className="hero-grid-layout">
          
          {/* Lado Izquierdo - Información */}
          <div>
            <div className="hero-tag">
              <span className="tag-pulse-dot" />
              PLATAFORMA OFICIAL DE CORRESPONSABILIDAD Y AMBIENTES
            </div>

            <h1 className="main-hero-title">
              BIENVENIDO.<br />
              <span className="text-green-highlight">TU AMBIENTE</span> IMPORTA.
            </h1>

            <p className="main-hero-desc">
              Reporta novedades, consulta disponibilidad de ambientes, realiza seguimiento técnico y mantén el control estricto de tu entorno formativo en tiempo real con respaldo institucional.
            </p>

            <button className="btn-cta-green btn-cta-large" onClick={handleGoToLogin}>
              INGRESAR AL PORTAL
            </button>

            {/* Ficha 3 Columnas */}
            <div className="features-three-card">
              <div className="feature-col-item">
                <h5>100% En Línea</h5>
                <p>Monitoreo continuo de ambientes y equipos</p>
              </div>
              <div className="feature-col-item">
                <h5>Trazabilidad</h5>
                <p>Historial auditado y radicación oportuna</p>
              </div>
              <div className="feature-col-item">
                <h5>Seguridad CIDE</h5>
                <p>Credenciales oficiales SENA protegidas</p>
              </div>
            </div>
          </div>

          {/* Lado Derecho - Tarjeta CIDE con la imagen de assets */}
          <div className="hero-card-wrapper">
            <div className="cide-outer-card">
              <div className="cide-inner-box">
                <div className="cide-card-badge">
                  Centro Industrial y de Desarrollo Empresarial
                </div>

                <img 
                  src={estudiantesImg} 
                  alt="Estudiantes SENA CIDE" 
                  className="cide-hero-img"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SERVICIOS INTEGRADOS */}
      <section className="services-container">
        <div className="services-title-group">
          <span className="services-tag-text">
            ARQUITECTURA DE SERVICIOS DIGITALES
          </span>
          <h2 className="services-main-title">
            Servicios Integrados para la Formación Profesional Integral
          </h2>
          <p className="main-hero-desc services-desc-center">
            Soluciones robustas diseñadas para salvaguardar la infraestructura tecnológica del CIDE Soacha.
          </p>
        </div>

        <div className="services-grid-list">
          {/* Card 1 */}
          <div className="service-card-box">
            <div className="service-icon-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="service-card-title">
              Gestión de Novedades
            </h3>
            <p className="main-hero-desc service-card-desc">
              Atención rápida y oportuna de fallas técnicas, conectividad de red, licenciamiento de software y mantenimiento locativo preventivo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="service-card-box">
            <div className="service-icon-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="service-card-title">
              Corresponsabilidad de Ambientes
            </h3>
            <p className="main-hero-desc service-card-desc">
              Verificación protocolaria al inicio y cierre de cada jornada formativa, conciliación de inventario físico y custodia de activos.
            </p>
          </div>

          {/* Card 3 */}
          <div className="service-card-box">
            <div className="service-icon-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="service-card-title">
              Malla Horaria y Disponibilidad
            </h3>
            <p className="main-hero-desc service-card-desc">
              Visualización en tiempo real de franjas horarias libres, auditoría de espacios ocupados y asignación transparente de programas.
            </p>
          </div>
        </div>
      </section>

      {/* 4. BANNER DE INDICADORES (KPIs) */}
      <section className="services-container">
        <div className="kpi-banner-box">
          <div className="kpi-header-group">
            <div className="kpi-circle-badge">94%</div>
            <div>
              <h4 className="kpi-title">
                Índice de Resolución Efectiva de Ambientes
              </h4>
              <p className="main-hero-desc kpi-subdesc">
                Garantizamos la continuidad operativa de los 38 laboratorios y talleres del Complejo CIDE Soacha.
              </p>
            </div>
          </div>

          <div className="kpi-metrics-group">
            <div>
              <p className="kpi-metric-number">3,420+</p>
              <p className="kpi-metric-label">APRENDICES ACTIVOS</p>
            </div>
            <div className="kpi-divider" />
            <div>
              <p className="kpi-metric-number kpi-metric-green">128</p>
              <p className="kpi-metric-label">INSTRUCTORES CONECTADOS</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER INSTITUCIONAL */}
      <footer className="footer-wrapper">
        <div className="footer-content-inner">
          <div>
            <strong className="footer-brand">NovedadSoft v2.4 LTS</strong>
            <p className="footer-text">Plataforma Institucional del Centro Industrial y de Desarrollo Empresarial (CIDE) - SENA Regional Cundinamarca, Soacha.</p>
          </div>
          <div>
            <p className="footer-copyright">© 2026 Servicio Nacional de Aprendizaje SENA · Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};