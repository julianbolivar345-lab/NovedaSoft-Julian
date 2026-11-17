import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaLogo from '../../assets/Sena.png';
import './ForgotPassword.css';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  // Control de pasos: 1 = Correo | 2 = Código OTP | 3 = Nueva Contraseña | 4 = Completado
  const [step, setStep] = useState(1);

  // Paso 1: Correo
  const [email, setEmail] = useState('');

  // Paso 2: Código OTP de 6 dígitos
  const [generatedCode, setGeneratedCode] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);

  // Paso 3: Nueva Contraseña
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Mensajes de estado
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Temporizador para reenvío de código
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Generador de código de 6 dígitos
  const generateNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setOtpDigits(['', '', '', '', '', '']);
    setResendTimer(60);
    return code;
  };

  // =========================================================================
  // HANDLER PASO 1: VALIDAR CORREO Y ENVIAR CÓDIGO
  // =========================================================================
  const handleSendCode = (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@sena.edu.co') && !cleanEmail.endsWith('@misena.edu.co')) {
      setStatusMessage({
        type: 'error',
        text: 'El correo ingresado debe pertenecer al dominio oficial @sena.edu.co o @misena.edu.co'
      });
      return;
    }

    generateNewOtp();
    setStep(2);
    setStatusMessage({
      type: 'success',
      text: `Hemos enviado un código de verificación de 6 dígitos a ${cleanEmail}.`
    });

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  // =========================================================================
  // HANDLERS PASO 2: CASILLAS OTP
  // =========================================================================
  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = cleanVal;
    setOtpDigits(updated);

    if (cleanVal && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const updated = ['', '', '', '', '', ''];
    pasted.split('').forEach((char, idx) => {
      updated[idx] = char;
    });
    setOtpDigits(updated);

    const nextIndex = Math.min(pasted.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    const enteredCode = otpDigits.join('');
    if (enteredCode.length < 6) {
      setStatusMessage({
        type: 'error',
        text: 'Ingresa los 6 dígitos del código enviado a tu correo.'
      });
      return;
    }

    if (enteredCode !== generatedCode) {
      setStatusMessage({
        type: 'error',
        text: 'El código ingresado no es válido o ha expirado. Verifica e intenta nuevamente.'
      });
      return;
    }

    setStep(3);
    setStatusMessage({
      type: 'success',
      text: 'Identidad verificada correctamente. Ahora define tu nueva contraseña.'
    });
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;
    generateNewOtp();
    setStatusMessage({
      type: 'success',
      text: `Se ha enviado un nuevo código de seguridad a ${email.trim().toLowerCase()}.`
    });
    otpRefs.current[0]?.focus();
  };

  // =========================================================================
  // HANDLER PASO 3: VALIDAR Y GUARDAR NUEVA CONTRASEÑA
  // =========================================================================
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(newPassword);
  const isPasswordStrong = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

  const handleResetPassword = (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!isPasswordStrong) {
      setStatusMessage({
        type: 'error',
        text: 'La nueva contraseña debe cumplir con todos los requisitos mínimos de seguridad.'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({
        type: 'error',
        text: 'Las contraseñas ingresadas no coinciden. Verifica ambos campos.'
      });
      return;
    }

    setStep(4);
    setStatusMessage({
      type: 'success',
      text: '¡Contraseña actualizada exitosamente! Ya puedes ingresar con tus nuevas credenciales.'
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

          <div className="forgot-cide-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8AFD5D" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V12m0 0h-2m2 0h2" />
            </svg>
            <span>CENTRO INDUSTRIAL Y DE DESARROLLO EMPRESARIAL • CIDE SOACHA</span>
          </div>

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
            COLUMNA DERECHA: FLUJO DE RECUPERACIÓN EN 3 PASOS
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
            {/* Indicador de pasos */}
            <div className="recovery-steps-bar">
              <div className={`step-dot ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
                <span className="step-circle">{step > 1 ? '✓' : '1'}</span>
                <span>Correo</span>
              </div>
              <div className={`step-connector ${step > 1 ? 'completed' : ''}`} />
              <div className={`step-dot ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
                <span className="step-circle">{step > 2 ? '✓' : '2'}</span>
                <span>Código</span>
              </div>
              <div className={`step-connector ${step > 2 ? 'completed' : ''}`} />
              <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>
                <span className="step-circle">{step === 4 ? '✓' : '3'}</span>
                <span>Clave</span>
              </div>
            </div>

            {/* Cabecera dinámica según paso */}
            <div className="forgot-header-group">
              <div className="forgot-icon-header-box">
                {step === 1 && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                )}
                {step === 2 && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {step === 3 && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                {step === 4 && (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <h2 className="forgot-form-title">
                {step === 1 && 'Recuperar Contraseña'}
                {step === 2 && 'Verificar Código'}
                {step === 3 && 'Nueva Contraseña'}
                {step === 4 && '¡Clave Restablecida!'}
              </h2>

              <p className="forgot-form-subtitle">
                {step === 1 && 'Ingresa tu correo institucional registrado para enviarte un código de verificación seguro.'}
                {step === 2 && `Digita el código de 6 dígitos enviado a ${email}`}
                {step === 3 && 'Crea una contraseña segura para proteger tu cuenta institucional.'}
                {step === 4 && 'Tu contraseña ha sido actualizada correctamente en el sistema.'}
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
                fontWeight: '500',
                lineHeight: '1.4'
              }}>
                {statusMessage.text}
              </div>
            )}

            {/* ==============================================================
                PASO 1: INGRESAR CORREO INSTITUCIONAL
               ============================================================== */}
            {step === 1 && (
              <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                  <span>Enviar Código de Verificación</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}

            {/* ==============================================================
                PASO 2: VERIFICAR CÓDIGO OTP DE 6 DÍGITOS
               ============================================================== */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Aviso visual del código generado para pruebas */}
                <div className="demo-code-toast">
                  <span>Código enviado (Vista previa): <strong style={{ fontFamily: 'monospace', fontSize: '14px' }}>{generatedCode}</strong></span>
                  <button
                    type="button"
                    className="btn-link-inline"
                    style={{ color: '#1D4ED8' }}
                    onClick={() => setOtpDigits(generatedCode.split(''))}
                  >
                    Autocompletar
                  </button>
                </div>

                <div className="forgot-field-group">
                  <label className="forgot-field-label">
                    Código de Seguridad (6 dígitos) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div className="otp-inputs-container" onPaste={handleOtpPaste}>
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="otp-digit-input"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>
                </div>

                <div className="otp-resend-row">
                  <button
                    type="button"
                    className="btn-link-inline"
                    onClick={() => {
                      setStep(1);
                      setStatusMessage({ type: '', text: '' });
                    }}
                  >
                    ← Cambiar correo
                  </button>

                  <button
                    type="button"
                    className="btn-link-inline"
                    disabled={resendTimer > 0}
                    onClick={handleResendCode}
                  >
                    {resendTimer > 0 ? `Reenviar código en ${resendTimer}s` : 'Reenviar código'}
                  </button>
                </div>

                <button type="submit" className="btn-send-recovery">
                  <span>Verificar Código</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            )}

            {/* ==============================================================
                PASO 3: DEFINIR NUEVA CONTRASEÑA
               ============================================================== */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="forgot-field-group">
                  <label className="forgot-field-label">
                    Nueva Contraseña <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div className="forgot-input-wrapper">
                    <span className="forgot-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      className="forgot-input"
                      style={{ paddingRight: '42px' }}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowNewPass((prev) => !prev)}
                    >
                      {showNewPass ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </div>

                {/* Indicadores de seguridad */}
                <div className="password-rules-box">
                  <div className={`rule-item ${hasMinLength ? 'valid' : ''}`}>
                    <span>{hasMinLength ? '✓' : '○'}</span>
                    <span>Mínimo 8 caracteres</span>
                  </div>
                  <div className={`rule-item ${hasUpperCase ? 'valid' : ''}`}>
                    <span>{hasUpperCase ? '✓' : '○'}</span>
                    <span>Una letra mayúscula</span>
                  </div>
                  <div className={`rule-item ${hasNumber ? 'valid' : ''}`}>
                    <span>{hasNumber ? '✓' : '○'}</span>
                    <span>Al menos un número</span>
                  </div>
                  <div className={`rule-item ${hasSpecialChar ? 'valid' : ''}`}>
                    <span>{hasSpecialChar ? '✓' : '○'}</span>
                    <span>Un símbolo (!@#$%)</span>
                  </div>
                </div>

                <div className="forgot-field-group">
                  <label className="forgot-field-label">
                    Confirmar Nueva Contraseña <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div className="forgot-input-wrapper">
                    <span className="forgot-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      className="forgot-input"
                      style={{ paddingRight: '42px' }}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPass((prev) => !prev)}
                    >
                      {showConfirmPass ? 'Ocultar' : 'Ver'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-send-recovery">
                  <span>Guardar Nueva Contraseña</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </form>
            )}

            {/* ==============================================================
                PASO 4: CONFIRMACIÓN FINAL
               ============================================================== */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button type="button" className="btn-send-recovery" onClick={handleBackToLogin}>
                  <span>Ir a Iniciar Sesión</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Banner Informativo en Paso 1 */}
            {step === 1 && (
              <div className="forgot-info-banner">
                <span className="forgot-info-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div className="forgot-info-text">
                  Si el correo ingresado está registrado en el sistema, recibirás el código de validación en tu bandeja de entrada en menos de 5 minutos.
                </div>
              </div>
            )}

            {/* Botón Volver al Login */}
            {step < 4 && (
              <div className="back-to-login-container">
                <button type="button" className="back-to-login-btn" onClick={handleBackToLogin}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Volver al Inicio de Sesión</span>
                </button>
              </div>
            )}
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