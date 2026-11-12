import React, { createContext, useContext, useState, useEffect } from 'react';
import './AlertModal.css';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success', // 'success' | 'error' | 'warning' | 'info'
  });

  const showAlert = ({ title = '¡Operación Exitosa!', message, type = 'success' }) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  // Interceptor global: reemplaza los alert() nativos del navegador en toda la app
  useEffect(() => {
    const originalAlert = window.alert;

    window.alert = (msg) => {
      const text = String(msg);
      const isError = /error|falla|incorrecto|inválido|denegado|no se pudo/i.test(text);
      const isWarning = /advertencia|atención|cuidado|falta|obligatorio/i.test(text);

      showAlert({
        title: isError ? 'Atención' : isWarning ? 'Advertencia' : 'NovedadSoft',
        message: text,
        type: isError ? 'error' : isWarning ? 'warning' : 'success',
      });
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}

      {alertState.isOpen && (
        <div className="ns-alert-overlay" onClick={closeAlert}>
          <div className="ns-alert-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Ícono dinámico según el tipo */}
            <div className={`ns-alert-icon ns-icon-${alertState.type}`}>
              {alertState.type === 'success' && (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {alertState.type === 'error' && (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {alertState.type === 'warning' && (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              {alertState.type === 'info' && (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              )}
            </div>

            <h3 className="ns-alert-title">{alertState.title}</h3>
            <p className="ns-alert-message">{alertState.message}</p>

            <button
              type="button"
              className={`ns-alert-btn ns-btn-${alertState.type}`}
              onClick={closeAlert}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};