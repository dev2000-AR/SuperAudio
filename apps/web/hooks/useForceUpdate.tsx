import { useEffect } from 'react';

const useForceUpdate = () => {
  useEffect(() => {
    const checkForUpdate = async () => {
      const response = await fetch('/api/vs'); // Endpoint que devuelve la versión actual
      const data = await response.json();
      if (data.version !== localStorage.getItem('appVersion')) {
        localStorage.setItem('appVersion', data.version);
        window.location.reload(); // Elimina el argumento `true`
      }
    };

    checkForUpdate();
  }, []);
};

export default useForceUpdate;