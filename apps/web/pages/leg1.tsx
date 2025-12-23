import Link from 'next/link';

export default function Leg1() {
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
            <Link href="/leg1#contactoprov" className="text-white hover:text-gray-400 transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </nav>

      {/* Body - Contenido de las Políticas */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-gray-300 pb-4">
          Políticas de Uso y Términos y Condiciones
        </h1>

        {/* Políticas de Uso */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Políticas de Uso</h2>
          <p className="mb-6 text-base leading-relaxed">
            <strong>1. Aceptación de las Políticas</strong><br />
            Al registrarse y utilizar nuestro servicio de streaming de audio y música en alta definición y calidad estándar, el usuario acepta cumplir con estas políticas de uso. Nos reservamos el derecho de modificar estas políticas en cualquier momento, sin previo aviso ni consentimiento del usuario. El uso continuado del servicio después de dichas modificaciones constituye la aceptación de las mismas.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>2. Cambios en las Políticas</strong><br />
            Podemos modificar, actualizar o eliminar cualquier parte de estas políticas sin notificación previa. Los usuarios son responsables de revisar periódicamente estas políticas para estar al tanto de los cambios. No nos hacemos responsables por cualquier perjuicio derivado de la falta de conocimiento de las modificaciones.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>3. Restricciones de Uso</strong><br />
            - El servicio es exclusivamente para uso personal y no comercial.<br />
            - No está permitido descargar, copiar, distribuir o utilizar los tracks fuera de la plataforma, excepto para la función de reproducción sin conexión proporcionada por el servicio.<br />
            - Cualquier uso no autorizado de los contenidos puede resultar en la suspensión o cancelación de la cuenta.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>4. Excepciones</strong><br />
            Nos reservamos el derecho de aplicar excepciones a estas políticas en casos específicos, sin obligación de justificación o notificación previa.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>5. Requisitos Técnicos</strong><br />
            El usuario es responsable de asegurarse de que su dispositivo cumpla con los requisitos técnicos mínimos para utilizar el servicio. No nos hacemos responsables por problemas de funcionamiento derivados de dispositivos incompatibles o que no cumplan con los requisitos.
          </p>
         <p className="mb-6 text-base leading-relaxed">
          <strong>6. Devoluciones y Reembolsos</strong><br />
          - Esta empresa no ofrece reembolsos bajo ninguna circunstancia. Todas las compras y suscripciones son definitivas y no reembolsables.<br />
          - Al realizar una compra o suscripción, el usuario acepta que no tendrá derecho a solicitar reembolsos, independientemente del motivo. <br /><br />
          *Nota: Asegúrese de revisar todos los detalles de la suscripción antes de completar su compra.&ldquo;*
        </p>

          <p className="mb-6 text-base leading-relaxed">
            <strong>7. Suspensión o Cancelación de Cuentas</strong><br />
            Nos reservamos el derecho de suspender o cancelar cuentas en caso de incumplimiento de estas políticas, fraude en los pagos, o cualquier otra actividad que consideremos inapropiada. No se permitirá el cambio de método de pago en cuentas suspendidas o en proceso de investigación.
          </p>
        </section>

        {/* Términos y Condiciones */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Términos y Condiciones</h2>
          <p className="mb-6 text-base leading-relaxed">
            <strong>1. Registro y Suscripción</strong><br />
            - Para acceder al servicio, el usuario debe registrarse y seleccionar un plan de suscripción mensual o anual.<br />
            - El pago se realizará de manera automática según el ciclo seleccionado, a menos que el usuario cancele su suscripción antes de la fecha de renovación.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>2. Propiedad Intelectual</strong><br />
            - Todos los contenidos disponibles en la plataforma (música, imágenes, textos, etc.) están protegidos por derechos de autor y licencias DDEX.<br />
            - El usuario no adquiere ningún derecho de propiedad sobre los contenidos, solo una licencia limitada para su uso personal dentro de la plataforma.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>3. Modificaciones del Servicio</strong><br />
            Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento, sin previo aviso ni responsabilidad hacia los usuarios.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>4. Limitación de Responsabilidad</strong><br />
            - No nos hacemos responsables por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del servicio.<br />
            - No garantizamos que el servicio esté libre de errores o que funcione de manera ininterrumpida.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>5. Privacidad y Datos Personales</strong><br />
            - Los datos personales de los usuarios serán tratados de acuerdo con nuestra <Link href="/privacidad" className="text-blue-600">Política de Privacidad</Link>.<br />
            - Nos reservamos el derecho de utilizar estos datos para mejorar el servicio, enviar comunicaciones comerciales y cumplir con obligaciones legales. Todos los datos estarán protegidos bajo estándares de seguridad aceptados, y utilizamos encriptación de datos y cumplimiento con normativas internacionales como GDPR y CCPA.
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>6. Resolución de Conflictos</strong><br />
            - Cualquier disputa relacionada con el uso del servicio se resolverá mediante negociación directa.<br />
            - Si no se llega a un acuerdo, el conflicto se someterá a los tribunales competentes en [indicar la jurisdicción correspondiente].
          </p>
          <p className="mb-6 text-base leading-relaxed">
            <strong>7. Renuncia de Garantías</strong><br />
            El servicio se proporciona &ldquo;tal cual&rdquo; y &ldquo;según disponibilidad&rdquo;, sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo pero no limitado a, garantías de comerciabilidad, idoneidad para un propósito particular o no infracción.
          </p>
          <p id="contactoprov" className="mb-6 text-base leading-relaxed">
            <strong>8. Contacto</strong><br />
            Para cualquier consulta o reclamo, el usuario puede contactarnos a través de <span className="text-blue-600">xear.div@yahoo.com</span>.
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
              Políticas de Uso y Términos y Condiciones
            </Link>
             <Link href="/privacidad" className="text-white hover:text-gray-400 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/leg1#contactoprov" className="text-white hover:text-gray-400 transition-colors">
              Contacto
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