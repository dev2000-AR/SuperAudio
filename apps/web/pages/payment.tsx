import React from 'react';

const Payment: React.FC = () => {
  return (
    <div>
      <div>
        {/* Ventana flotante con iframe */}
        <div style={styles.chatWindow}>
          <iframe
            src="http://98.84.42.211:3000/list.html"
            style={styles.iframe}
            title="SuperChat"
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatWindow: {
    position: 'fixed' as const, // Posicionamiento flotante
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '400px',
    backgroundColor: 'black',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    zIndex: 9999, // Asegura que el chat esté encima de otros elementos
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '8px',
  },
};

export default Payment;
