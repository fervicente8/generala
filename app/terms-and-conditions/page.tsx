"use client";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <main className='h-full p-6 max-w-4xl mx-auto text-base sm:text-lg space-y-8'>
      <button
        className='fixed top-3 left-3 text-gray-500 hover:text-gray-800 cursor-pointer'
        onClick={() => router.back()}
      >
        ⬅️ Volver
      </button>

      <h1 className='text-3xl font-bold text-center mb-6'>
        📜 Términos y Condiciones de la Generala
      </h1>

      <section>
        <h2 className='text-xl font-semibold mb-2'>🔒 Introducción</h2>
        <p>
          Estos Términos y Condiciones regulan el uso de nuestra plataforma de
          juego "Generala" (en adelante "la aplicación"). Al acceder y utilizar
          la aplicación, aceptas los términos descritos en este documento.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>📝 Registro y Cuenta</h2>
        <p>
          Para utilizar la aplicación, puedes registrarte mediante tu cuenta de
          Google o Facebook. Te comprometés a proporcionar información precisa y
          actualizada durante el registro. Eres responsable de mantener la
          confidencialidad de tu cuenta y contraseña.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>
          📊 Uso de Datos Personales
        </h2>
        <p>
          La aplicación recopila y utiliza ciertos datos personales (como tu
          nombre y correo electrónico) para mejorar la experiencia de usuario y
          para los fines de autenticación. Aseguramos la protección de tus datos
          personales conforme a nuestra Política de Privacidad.
        </p>
        <p>
          Al utilizar la funcionalidad de inicio de sesión con Google o
          Facebook, aceptas las políticas de privacidad de esos servicios,
          además de las nuestras.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>
          💻 Acceso y Uso del Servicio
        </h2>
        <p>
          La aplicación se proporciona "tal cual", y no garantizamos la
          disponibilidad continua del servicio. Te comprometes a utilizar la
          aplicación solo con fines legales y de acuerdo con las reglas del
          juego, respetando a otros usuarios.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>
          🔒 Seguridad y Responsabilidad
        </h2>
        <p>
          La seguridad de tu cuenta es importante para nosotros. Sin embargo, no
          nos hacemos responsables por el acceso no autorizado a tu cuenta o por
          cualquier acción de un tercero que afecte tu experiencia en la
          aplicación.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>⚖️ Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en
          cualquier momento. Las modificaciones serán publicadas en esta página
          y entrarán en vigor al momento de su publicación.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>🚫 Prohibiciones</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>
            No está permitido utilizar la aplicación para realizar actividades
            ilegales.
          </li>
          <li>
            No puedes modificar, distribuir, o vender el contenido de la
            aplicación sin nuestro permiso.
          </li>
          <li>
            No se tolera el comportamiento abusivo o el acoso hacia otros
            jugadores.
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>
          💡 Exoneración de Responsabilidad
        </h2>
        <p>
          La aplicación se proporciona "como está". No nos responsabilizamos por
          daños o pérdidas derivadas del uso o imposibilidad de usar la
          aplicación, incluyendo, pero no limitándose a, fallos técnicos,
          interrupciones del servicio, o problemas con el acceso a tus cuentas.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>📩 Contacto</h2>
        <p>
          Si tienes alguna pregunta o inquietud sobre estos Términos y
          Condiciones.
        </p>
        <p>
          O si tienes alguna idea, sugerencia o quieres formar parte del
          proyecto.
        </p>
        <p>Email: fferminvicente@gmail.com.</p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>🔓 Código Abierto</h2>
        <p>
          La aplicación Generala es un proyecto de código abierto. Puedes
          acceder al código fuente y contribuir en su desarrollo a través de
          nuestro repositorio en GitHub.
        </p>
        <p>
          ¡Nos encantaría contar con tu colaboración! Si tienes sugerencias,
          mejoras o quieres contribuir, no dudes en visitar el repositorio y
          abrir un pull request.
        </p>
        <p>
          Repositorio de GitHub:{" "}
          <a
            href='https://github.com/fervicente8/generala'
            className='text-blue-500 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            https://github.com/fervicente8/generala
          </a>
        </p>
      </section>

      <section className='border-t pt-6 mt-6 text-center'>
        <h2 className='text-2xl font-bold text-blue-600'>
          ✨ ¡Disfruta de la Generala!
        </h2>
        <p className='mt-2 text-lg'>
          ¡Recuerda que este es un juego para divertirse y compartir momentos
          con amigos! 😄
        </p>
      </section>
    </main>
  );
}
