import React, { createContext, useContext, useState, useEffect } from 'react';
import './AlertModal.css';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success', // 'success' | 'error' | 'warning' | 'info' | 'logout'
    isConfirm: false,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    onConfirm: null,
  });

  const showAlert = ({ title = '¡Operación Exitosa!', message, type = 'success' }) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      isConfirm: false,
      onConfirm: null,
    });
  };

  const showConfirm = ({
    title = '¿Cerrar sesión?',
    message = '¿Estás seguro de que deseas salir de NovedaSoft?.',
    type = 'logout',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
  }) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      isConfirm: true,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (alertState.onConfirm) alertState.onConfirm();
    closeAlert();
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
    <AlertContext.Provider value={{ showAlert, showConfirm, closeAlert }}>
      {children}

      {alertState.isOpen && (
        <div className="ns-alert-overlay" onClick={closeAlert}>
          <div className="ns-alert-card" onClick={(e) => e.stopPropagation()}>
            
            {/* Ícono dinámico según el tipo */}
            <div className={`ns-alert-icon ns-icon-${alertState.type === 'logout' ? 'error' : alertState.type}`}>
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
              {alertState.type === 'logout' && (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline strokeLinecap="round" strokeLinejoin="round" points="16 17 21 12 16 7" />
                  <line strokeLinecap="round" strokeLinejoin="round" x1="21" y1="12" x2="9" y2="12" />
                </svg>
              )}
            </div>

            <h3 className="ns-alert-title">{alertState.title}</h3>
            <p className="ns-alert-message">{alertState.message}</p>

            {alertState.isConfirm ? (
              <div className="ns-alert-actions">
                <button
                  type="button"
                  className="ns-alert-btn ns-btn-cancel"
                  onClick={closeAlert}
                >
                  {alertState.cancelText}
                </button>
                <button
                  type="button"
                  className="ns-alert-btn ns-btn-error"
                  onClick={handleConfirm}
                >
                  {alertState.confirmText}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className={`ns-alert-btn ns-btn-${alertState.type}`}
                onClick={closeAlert}
              >
                Aceptar
              </button>
            )}
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};