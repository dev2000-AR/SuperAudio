// search2.tsx
import React from 'react';
import Head from 'next/head';

const Search2 = () => {
  const currentDateTime = "2025-03-06 20:30:37";
  const currentUser = "xeardiv";

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>UI Search Examples</title>
      </Head>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Nota sutil */}
        <div className="text-gray-400 text-sm mb-8 bg-black/40 p-3 rounded-lg border border-gray-800">
          ℹ️ Ejemplos de interfaces de búsqueda
        </div>

        {/* Demo 1 */}
        <div className="mb-8">
          <div className="text-gray-300 text-xs uppercase tracking-wider mb-2">Ejemplo 1</div>
          <a 
            href="https://dashboard.algolia.com/interface-demos/7126948a-1a27-4ede-8c02-a92b588badb0"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-95 transition-opacity"
          >
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-white mb-2">Interfaz de Búsqueda Básica</div>
              <div className="text-gray-400 text-sm">
                Vista previa del diseño de búsqueda estándar
              </div>
            </div>
          </a>
        </div>

        {/* Demo 2 */}
        <div className="mb-8">
          <div className="text-gray-300 text-xs uppercase tracking-wider mb-2">Ejemplo 2</div>
          <a 
            href="https://dashboard.algolia.com/interface-demos/ce3ac0e9-aec4-42a6-a612-872b702611db"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-95 transition-opacity"
          >
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="text-white mb-2">Interfaz de Búsqueda Avanzada</div>
              <div className="text-gray-400 text-sm">
                Vista previa del diseño con funcionalidades extendidas
              </div>
            </div>
          </a>
        </div>

        {/* Metadata (sutil) */}
        <div className="text-gray-600 text-xs fixed bottom-4 right-4">
          <div>UTC: {currentDateTime}</div>
          <div>User: {currentUser}</div>
        </div>
      </div>
    </div>
  );
};

export default Search2;