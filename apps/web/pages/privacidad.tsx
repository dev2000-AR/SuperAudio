import Link from 'next/link';

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-serif">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <Link href="/">
            <div className="text-3xl font-bold text-white hover:text-gray-400 transition-colors">
              <span className="text-indigo-600">Super</span>
              <span className="text-teal-600">Audio</span>
            </div>
          </Link>
          {/* Enlaces */}
          <div className="flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-400 transition-colors">
              Inicio
            </Link>
            <Link href="/leg1" className="text-white hover:text-gray-400 transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/leg1#contactoprov" className="text-white hover:text-gray-400 transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      {/* Body - Contenido de Privacidad */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-gray-300 pb-4">
          Política de Privacidad
        </h1>

        <section className="mb-10">
          <p className="mb-6 text-base leading-relaxed">
            <strong>1. Recopilación de Información</strong><br />
            Recopilamos información cuando usted:
            <br />- Se registra en nuestro sitio
            <br />- Realiza una suscripción
            <br />- Responde a una encuesta
            <br />- Navega por el sitio
            <br />- Utiliza nuestras aplicaciones móviles
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>2. Uso de la Información</strong><br />
            La información que recopilamos se utiliza para:
            <br />- Personalizar su experiencia
            <br />- Mejorar nuestro servicio
            <br />- Procesar transacciones
            <br />- Enviar correos electrónicos periódicos
            <br />- Administrar concursos, promociones y encuestas
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>3. Protección de la Información</strong><br />
            Implementamos diversas medidas de seguridad para mantener la seguridad de su información personal:
            <br />- Encriptación SSL
            <br />- Firewalls
            <br />- Acceso restringido a datos personales
            <br />- Monitoreo continuo de seguridad
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>4. Cookies</strong><br />
            Utilizamos cookies para:
            <br />- Entender y guardar las preferencias del usuario
            <br />- Mantener el seguimiento de anuncios
            <br />- Compilar datos agregados sobre el tráfico del sitio
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>5. Divulgación a Terceros</strong><br />
            No vendemos, intercambiamos ni transferimos de otro modo a terceros su información de identificación personal. Esto no incluye terceros de confianza que nos ayudan a operar nuestro sitio web o realizar nuestro negocio, siempre que dichas partes acuerden mantener esta información confidencial.
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>6. Consentimiento</strong><br />
            Al utilizar nuestro sitio, usted consiente nuestra política de privacidad.
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>7. Cambios en la Política de Privacidad</strong><br />
            Cualquier cambio en nuestra política de privacidad se publicará en esta página.
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>8. Derechos GDPR y CCPA</strong><br />
            Los usuarios tienen derecho a:
            <br />- Acceder a sus datos personales
            <br />- Rectificar sus datos
            <br />- Solicitar la eliminación de sus datos
            <br />- Oponerse al procesamiento de sus datos
            <br />- Solicitar la portabilidad de sus datos
          </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>9. Contacto sobre Privacidad</strong><br />
            Para consultas sobre privacidad, contáctenos en: <span className="text-blue-600">xear.div@yahoo.com</span>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 p-6 mt-12">
        <div className="container mx-auto text-center text-white">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="/" className="text-white hover:text-gray-400 transition-colors">
              Inicio
            </Link>
            <Link href="/leg1" className="text-white hover:text-gray-400 transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/privacidad" className="text-white hover:text-gray-400 transition-colors">
              Política de Privacidad
            </Link>
          </div>
          <p className="text-gray-300 text-sm mt-4">
            © 2025 Grupo Stars Tres Corp. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}