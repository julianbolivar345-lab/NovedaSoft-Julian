import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importación del logo SENA
import senaLogo from '../../assets/Sena.png';

import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpiar errores previos

    // 1. Validación de Dominio Institucional SENA
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@sena.edu.co')) {
      setErrorMessage('El correo debe pertenecer al dominio oficial @sena.edu.co');
      return;
    }

    // 2. Validación de Longitud Mínima de Contraseña
    if (password.length < 8) {
      setErrorMessage('La contraseña debe tener una longitud mínima de 8 caracteres.');
      return;
    }

    // Redirección al panel del instructor con menú desplegable/sidebar
    navigate('/instructor/horario');
  };

  return (
    <div className="login-wrapper">
      <div className="login-main-container">
        
        {/* 1. PANEL IZQUIERDO - BRANDING INSTITUCIONAL */}
        <div className="login-left-panel">
          <div className="blur-light-1" />
          <div className="blur-light-2" />

          <div className="tag-cide-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V12m0 0h-2m2 0h2" />
            </svg>
            Centro Industrial y de Desarrollo Empresarial • CIDE Soacha
          </div>

          <div className="left-content-center">
            <div className="brand-login-header">
              <div className="brand-icon-box" style={{ background: 'transparent', padding: 0 }}>
                <img 
                  src={senaLogo} 
                  alt="Logo SENA" 
                  style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
                />
              </div>
              <div>
                <div className="brand-title-group">
                  <span className="brand-title-white">Novedad</span>
                  <span className="brand-title-green">Soft</span>
                  <span className="badge-cide-tag"></span>
                </div>
                <div className="brand-subtitle-tech">GESTIÓN ACADÉMICA • SENA SOACHA</div>
              </div>
            </div>

            <h1 className="login-hero-title">
              Sistema de Gestión de<br />
              Novedades y Seguimiento<br />
              Académico
            </h1>

            <p className="login-hero-desc">
              Bienvenido a NovedadSoft. Plataforma oficial del SENA CIDE Soacha para el registro oportuno, control unificado, trazabilidad de novedades formativas y administración con los más altos estándares de calidad institucional.
            </p>

            <div className="glass-features-grid">
              <div className="glass-item">
                <div className="glass-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="glass-item-title">100% En Línea</div>
                  <div className="glass-item-desc">Gestión ágil 24/7</div>
                </div>
              </div>

              <div className="glass-item">
                <div className="glass-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="glass-item-title">Validación Directa</div>
                  <div className="glass-item-desc">Sincronizado SOFIA Plus</div>
                </div>
              </div>

              <div className="glass-item">
                <div className="glass-icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="glass-item-title">Seguridad </div>
                  <div className="glass-item-desc">Credenciales oficiales</div>
                </div>
              </div>
            </div>
          </div>

          <div className="left-panel-footer">
            <span>NovedadSoft v2.4</span>
            <span>•</span>
            <span>Servicio Nacional de Aprendizaje SENA • Todos los derechos reservados</span>
          </div>
        </div>

        {/* 2. PANEL DERECHO - FORMULARIO DE ACCESO */}
        <div className="login-right-panel">
          <form className="form-container-card" onSubmit={handleSubmit}>
            <div>
              <span className="brand-subtitle-tech" style={{ color: '#475569' }}>Acceso Institucional</span>
              <h2 className="form-header-title">Iniciar Sesión
                 </h2>
            </div>

            {/* Alerta de Error de Validación */}
            {errorMessage && (
              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500'
              }}>
                {errorMessage}
              </div>
            )}

            {/* Campo 1: Correo */}
            <div className="form-group">
              <div className="form-label">
                Correo Institucional <span className="required-star">*</span>
              </div>
              <div className="input-icon-wrapper">
                <span className="input-icon-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="input-custom"
                  placeholder="usuario@sena.edu.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campo 2: Contraseña */}
            <div className="form-group">
              <div className="form-label-row">
                <span className="form-label">
                  Contraseña <span className="required-star">*</span>
                </span>
                <span className="forgot-link" onClick={() => navigate('/forgot-password')}>
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
              <div className="input-icon-wrapper">
                <span className="input-icon-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  className="input-custom"
                  placeholder="Mínimo 8 caracteres"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Checkbox Recordar */}
            <div className="checkbox-row">
              <input
                type="checkbox"
                id="remember"
                className="checkbox-custom"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="checkbox-label">Recordar esta sesión en este equipo</label>
            </div>

            {/* Botón Iniciar Sesión */}
            <button type="submit" className="btn-submit-login">
              <span>Iniciar Sesión </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
              Protección de Datos Personales • Ley 1581 de 2012 • Habeas Data SENA • <a href="#privacy" style={{ color: '#475569', textDecoration: 'underline' }}>Políticas de Privacidad</a>
            </div>
          </form>
        </div>

      </div>

      {/* 3. BARRA INFERIOR DE PIE */}
      <footer className="login-bottom-bar">
        <div>Servicio Nacional de Aprendizaje SENA • CIDE Soacha</div>
        <div>NovedadSoft © 2026 • Sistema Integrado de Novedades</div>
      </footer>
    </div>
  );
};

export default Login;