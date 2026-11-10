import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importación del Logo SENA
import senaLogo from '../../assets/Sena.png';

import './ForgotPassword.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    const cleanEmail = email.trim().toLowerCase();

    // Validación de dominio Sena/Misena
    if (!cleanEmail.endsWith('@sena.edu.co') && !cleanEmail.endsWith('@misena.edu.co')) {
      setStatusMessage({
        type: 'error',
        text: 'El correo ingresado debe pertenecer al dominio oficial @sena.edu.co o @misena.edu.co'
      });
      return;
    }

    // Simulación de envío exitoso
    setStatusMessage({
      type: 'success',
      text: '¡Enlace enviado! Revisa tu bandeja de entrada o spam para continuar con el restablecimiento.'
    });
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="forgot-page-wrapper">
      <div className="forgot-main-container">
        
        {/* ==================================================================
            COLUMNA IZQUIERDA: BRANDING INSTITUCIONAL SENA CIDE
           ================================================================== */}
        <section className="forgot-left-panel">
          <div className="glow-blur-top" />
          <div className="glow-blur-bottom" />

          {/* Pill Superior */}
          <div className="forgot-cide-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8AFD5D" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V12m0 0h-2m2 0h2" />
            </svg>
            <span>CENTRO INDUSTRIAL Y DE DESARROLLO EMPRESARIAL • CIDE SOACHA</span>
          </div>

          {/* Hero Content */}
          <div className="forgot-hero-content">
            <div className="forgot-brand-header">
              <img src={senaLogo} alt="Logo SENA" className="forgot-logo-img" />
              <div>
                <div className="forgot-brand-title-row">
                  <span className="forgot-title-main">NovedaSoft</span>
                  <span className="forgot-cide-badge">CIDE</span>
                </div>
                <div className="forgot-subtitle-tag">GESTIÓN ACADÉMICA • SENA SOACHA</div>
              </div>
            </div>

            <h1 className="forgot-main-heading">
              Sistema de Gestión de<br />
              Novedades y Seguimiento<br />
              Académico
            </h1>

            <p className="forgot-main-desc">
              Bienvenido a NovedadSoft. Plataforma oficial del SENA CIDE Soacha para el registro oportuno, control unificado, trazabilidad de novedades formativas y administración de aprendices e instructores con los más altos estándares de calidad institucional.
            </p>

            {/* Fichas Glassmorphism de 3 Columnas */}
            <div className="forgot-glass-grid">
              <div className="forgot-glass-card">
                <div className="forgot-glass-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="forgot-glass-card-title">100% En Línea</div>
                <div className="forgot-glass-card-desc">Gestión ágil 24/7</div>
              </div>

              <div className="forgot-glass-card">
                <div className="forgot-glass-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="forgot-glass-card-title">Validación Directa</div>
                <div className="forgot-glass-card-desc">Sincronizado SOFIA Plus</div>
              </div>

              <div className="forgot-glass-card">
                <div className="forgot-glass-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="forgot-glass-card-title">Seguridad CIDE</div>
                <div className="forgot-glass-card-desc">Credenciales oficiales</div>
              </div>
            </div>
          </div>

          <div className="forgot-left-footer">
            NovedadSoft v2.4 • Servicio Nacional de Aprendizaje SENA • Todos los derechos reservados
          </div>
        </section>

        {/* ==================================================================
            COLUMNA DERECHA: FORMULARIO DE RECUPERACIÓN
           ================================================================== */}
        <section className="forgot-right-panel">
          <div className="forgot-top-badge-row">
            <div className="security-access-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#226D00" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Seguridad y Acceso Institucional</span>
            </div>
          </div>

          <div className="forgot-form-card">
            <div className="forgot-header-group">
              <div className="forgot-icon-header-box">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="forgot-form-title">Recuperar Contraseña</h2>
              <p className="forgot-form-subtitle">
                Ingresa tu correo institucional registrado para enviarte un código de restablecimiento seguro.
              </p>
            </div>

            {/* Mensajes de Alerta */}
            {statusMessage.text && (
              <div style={{
                backgroundColor: statusMessage.type === 'error' ? '#FEF2F2' : '#F0FDF4',
                border: `1px solid ${statusMessage.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
                color: statusMessage.type === 'error' ? '#991B1B' : '#166534',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {statusMessage.type === 'error' }
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="forgot-field-group">
                <label className="forgot-field-label">
                  Correo Institucional <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div className="forgot-input-wrapper">
                  <span className="forgot-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="ejemplo@sena.edu.co"
                    className="forgot-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="forgot-field-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Verifica que el dominio corresponda a tu cuenta activa en el CIDE Soacha.</span>
                </div>
              </div>

              <button type="submit" className="btn-send-recovery">
                <span>Enviar Codigo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {/* Banner Informativo */}
            <div className="forgot-info-banner">
              <span className="forgot-info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <div className="forgot-info-text">
                Si el correo ingresado está registrado en el sistema, recibirás las instrucciones en tu bandeja de entrada en menos de 5 minutos.
              </div>
            </div>

            {/* Botón Volver */}
            <div className="back-to-login-container">
              <button type="button" className="back-to-login-btn" onClick={handleBackToLogin}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Volver al Inicio de Sesión</span>
              </button>
            </div>
          </div>

          <div className="forgot-privacy-footer">
            Protección de Datos Personales • Ley 1581 de 2012 • Habeas Data SENA • Políticas de Privacidad
          </div>
        </section>

      </div>

      {/* FOOTER INFERIOR BANNER */}
      <footer className="forgot-bottom-bar">
        <div style={{ fontSize: '12px', color: '#3F4A38' }}>
          Servicio Nacional de Aprendizaje SENA • CIDE Soacha
        </div>
        <div style={{ fontSize: '12px', color: '#3F4A38' }}>
          NovedadSoft © 2026 • Sistema Integrado de Novedades
        </div>
      </footer>
    </div>
  );
};
export default ForgotPassword;