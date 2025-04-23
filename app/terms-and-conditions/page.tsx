"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <main className='min-h-screen p-6 mx-auto text-base sm:text-lg space-y-8 bg-gradient-to-br from-[#1A1A1A] to-[#2E2E2E] text-[#1A1A1A] font-quicksand'>
      <motion.button
        className='fixed top-3 left-3 z-50 bg-[#A91D2F] text-[#F5F5F5] px-4 py-2 rounded-full shadow-md border-2 border-[#D4A017] flex items-center hover:bg-[#DC2626]'
        onClick={() => router.back()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⬅️ Volver
      </motion.button>

      <h1 className='text-4xl font-bold text-center text-[#F5F5F5] font-poppins mb-6 drop-shadow-[0_2px_2px_rgba(212,160,23,0.5)]'>
        📜 Términos y Condiciones de la Generala
      </h1>

      <div className='max-w-4xl mx-auto flex flex-col gap-8'>
        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🔒 Introducción
          </h2>
          <p>
            Estos Términos y Condiciones regulan el uso de nuestra plataforma de
            juego "Generala" (en adelante "la aplicación"). Al acceder y
            utilizar la aplicación, aceptas los términos descritos en este
            documento.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            📝 Registro y Cuenta
          </h2>
          <p>
            Para utilizar la aplicación, puedes registrarte mediante tu cuenta
            de Google o Facebook. Te comprometés a proporcionar información
            precisa y actualizada durante el registro. Eres responsable de
            mantener la confidencialidad de tu cuenta y contraseña.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            📊 Uso de Datos Personales
          </h2>
          <p>
            La aplicación recopila y utiliza ciertos datos personales (como tu
            nombre y correo electrónico) para mejorar la experiencia de usuario
            y para los fines de autenticación. Aseguramos la protección de tus
            datos personales conforme a nuestra Política de Privacidad.
          </p>
          <p className='mt-2'>
            Al utilizar la funcionalidad de inicio de sesión con Google o
            Facebook, aceptas las políticas de privacidad de esos servicios,
            además de las nuestras.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            💻 Acceso y Uso del Servicio
          </h2>
          <p>
            La aplicación se proporciona "tal cual", y no garantizamos la
            disponibilidad continua del servicio. Te comprometes a utilizar la
            aplicación solo con fines legales y de acuerdo con las reglas del
            juego, respetando a otros usuarios.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🔒 Seguridad y Responsabilidad
          </h2>
          <p>
            La seguridad de tu cuenta es importante para nosotros. Sin embargo,
            no nos hacemos responsables por el acceso no autorizado a tu cuenta
            o por cualquier acción de un tercero que afecte tu experiencia en la
            aplicación.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            ⚖️ Modificaciones
          </h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones
            en cualquier momento. Las modificaciones serán publicadas en esta
            página y entrarán en vigor al momento de su publicación.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🚫 Prohibiciones
          </h2>
          <ul className='list-disc list-inside space-y-2 text-[#B0B0B0]'>
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

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            💡 Exoneración de Responsabilidad
          </h2>
          <p>
            La aplicación se proporciona "como está". No nos responsabilizamos
            por daños o pérdidas derivadas del uso o imposibilidad de usar la
            aplicación, incluyendo, pero no limitándose a, fallos técnicos,
            interrupciones del servicio, o problemas con el acceso a tus
            cuentas.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            📩 Contacto
          </h2>
          <p>
            Si tienes alguna pregunta o inquietud sobre estos Términos y
            Condiciones.
          </p>
          <p className='mt-2'>
            O si tienes alguna idea, sugerencia o quieres formar parte del
            proyecto.
          </p>
          <p>
            Email:{" "}
            <a
              href='mailto:fferminvicente@gmail.com'
              className='text-[#1E3A8A] hover:text-[#3B82F6]'
            >
              fferminvicente@gmail.com
            </a>
            .
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🔓 Código Abierto
          </h2>
          <p>
            La aplicación Generala es un proyecto de código abierto. Puedes
            acceder al código fuente y contribuir en su desarrollo a través de
            nuestro repositorio en GitHub.
          </p>
          <p className='mt-2'>
            ¡Nos encantaría contar con tu colaboración! Si tienes sugerencias,
            mejoras o quieres contribuir, no dudes en visitar el repositorio y
            abrir un pull request.
          </p>
          <p>
            Repositorio de GitHub:{" "}
            <a
              href='https://github.com/fervicente8/generala'
              className='text-[#1E3A8A] hover:text-[#3B82F6]'
              target='_blank'
              rel='noopener noreferrer'
            >
              https://github.com/fervicente8/generala
            </a>
          </p>
        </section>

        <section className='border-t-2 border-[#D4A017] pt-6 mt-6 text-center'>
          <h2 className='text-2xl font-bold text-[#F5F5F5] font-poppins'>
            ✨ ¡Disfruta de la Generala!
          </h2>
          <p className='mt-2 text-lg text-[#B0B0B0]'>
            ¡Recuerda que este es un juego para divertirse y compartir momentos
            con amigos! 😄
          </p>
        </section>
      </div>
    </main>
  );
}
