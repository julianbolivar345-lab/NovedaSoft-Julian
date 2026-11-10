import React from 'react';
import './Header.css';

/**
 * Componente Header
 * @param {Function} onToggleMenu - Función para abrir/cerrar el menú hamburguesa
 * @param {Object} usuario - Datos del usuario autenticado (opcional)
 */
export default function Header({ onToggleMenu, usuario }) {
  // Determina qué rol mostrar en pantalla
  const rolMostrar = usuario ? usuario.rol : 'Invitado';

  return (
    <header className="sena-header">
      {/* Sección Izquierda: Menú + Marca */}
      <div className="header-left">
        <button 
          className="hamburger-btn" 
          onClick={onToggleMenu}
          aria-label="Abrir menú de navegación"
        >
          ☰
        </button>
        
        <div className="brand-container">
          <span className="brand-title">SENA | CIDE Soacha</span>
          <span className="brand-subtitle">Corresponsabilidad de Ambiente</span>
        </div>
      </div>

      {/* Sección Derecha: Estado de Usuario */}
      <div className="header-right">
        <span className="user-badge">{rolMostrar}</span>
      </div>
    </header>
  );
}