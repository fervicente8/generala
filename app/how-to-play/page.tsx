"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HowToPlay() {
  const router = useRouter();

  return (
    <main className='min-h-screen p-6 text-base sm:text-lg space-y-8 bg-gradient-to-br from-[#1A1A1A] to-[#2E2E2E] text-[#1A1A1A] font-quicksand'>
      <motion.button
        className='fixed top-3 left-3 z-50 bg-[#A91D2F] text-[#F5F5F5] px-4 py-2 rounded-full shadow-md border-2 border-[#D4A017] flex items-center hover:bg-[#DC2626]'
        onClick={() => router.back()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⬅️ Volver
      </motion.button>

      <h1 className='text-4xl font-bold text-center text-[#F5F5F5] font-poppins mb-6 drop-shadow-[0_2px_2px_rgba(212,160,23,0.5)]'>
        🎲 Cómo Jugar a la Generala
      </h1>

      <div className='max-w-4xl mx-auto flex flex-col gap-8'>
        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            📌 Objetivo del Juego
          </h2>
          <p>
            El objetivo es sumar la mayor cantidad de puntos posibles
            completando combinaciones con 5 dados a lo largo de la partida.
          </p>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🎮 Turnos y Tiradas
          </h2>
          <ul className='list-disc list-inside space-y-2 text-[gray]'>
            <li>En cada turno lanzás 5 dados.</li>
            <li>Podés tirar hasta 3 veces por turno.</li>
            <li>
              Después de cada tirada, podés elegir qué dados guardar y volver a
              lanzar los restantes.
            </li>
            <li>
              Al final del turno, debés anotar una jugada (aunque sea con 0
              puntos si no tenés ninguna válida).
            </li>
          </ul>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🏅 Jugadas y Puntajes
          </h2>
          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold text-[#1A1A1A] font-poppins'>
                🔢 Números (del 1 al 6)
              </h3>
              <p>Sumás la cantidad de dados que coincidan con ese número.</p>
              <p className='italic text-[gray]'>
                Ejemplo: dados 🎲 2 - 2 - 4 - 2 - 6 → si anotás en el “2”, sumás
                6 puntos porque hay 3 dados con ese número (el “2” ya no podrá
                ser usado para otra jugada).
              </p>
            </div>

            <div>
              <h3 className='font-semibold text-[#1A1A1A] font-poppins'>
                📈 Escalera (20 puntos)
              </h3>
              <p>Conseguí una secuencia de cinco números seguidos.</p>
              <p className='italic text-[gray]'>
                Ejemplos válidos: 🎲 1 - 2 - 3 - 4 - 5 🎲 2 - 3 - 4 - 5 - 6 🎲 3
                - 4 - 5 - 6 - 1
              </p>
              <p>
                Si la lográs en la primera tirada (servida), sumás 25 puntos.
              </p>
            </div>

            <div>
              <h3 className='font-semibold text-[#1A1A1A] font-poppins'>
                🏠 Full (30 puntos)
              </h3>
              <p>Tres dados del mismo valor + dos dados de otro valor.</p>
              <p className='italic text-[gray]'>
                Ejemplo: 🎲 4 - 4 - 4 - 2 - 2
              </p>
              <p>Full servido: 35 puntos.</p>
            </div>

            <div>
              <h3 className='font-semibold text-[#1A1A1A] font-poppins'>
                🃏 Poker (40 puntos)
              </h3>
              <p>Cuatro dados iguales + uno distinto.</p>
              <p className='italic text-[gray]'>
                Ejemplo: 🎲 6 - 6 - 6 - 6 - 2
              </p>
              <p>Poker servido: 45 puntos.</p>
            </div>

            <div>
              <h3 className='font-semibold text-[#1A1A1A] font-poppins'>
                💣 Generala (50 puntos)
              </h3>
              <p>Cinco dados iguales. La jugada más difícil y valiosa.</p>
              <p className='italic text-[gray]'>
                Ejemplo: 🎲 3 - 3 - 3 - 3 - 3
              </p>
              <p>Generala servida: Ganaste el juego.</p>
            </div>

            <div>
              <h3 className='font-semibold text-[#1A1A1A] font-poppins'>
                🔥 Doble Generala (100 puntos)
              </h3>
              <p>
                Solo se puede anotar si ya hiciste una Generala antes. ¡Muy
                rara!
              </p>
              <p className='italic text-[gray]'>
                Doble Generala servida: Ganaste el juego.
              </p>
            </div>
          </div>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            ✅ Reglas adicionales
          </h2>
          <ul className='list-disc list-inside space-y-2 text-[gray]'>
            <li>
              Si no podés o no querés anotar una jugada válida, debés tachar
              alguna categoría (anotar 0), pero no se te sumarán puntos, siempre
              se recomienda tachar categorías que no puedan sumar mucho, ejemplo
              el "1", ya que el máximo puntaje que se puede sacar del "1" es 5.
            </li>
            <li>
              El bonus de <strong>jugada servida</strong> (+5 puntos) se aplica
              si hacés la jugada en la primera tirada del turno.
            </li>
            <li>
              Gana el jugador con más puntos al completar todas las categorías.
            </li>
          </ul>
        </section>

        <section className='p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]'>
          <h2 className='text-xl font-semibold text-[#F5F5F5] bg-[#2E4A3D] p-3 rounded-t-lg font-poppins mb-2'>
            🎯 Consejos
          </h2>
          <ul className='list-disc list-inside space-y-2 text-[gray]'>
            <li>
              Intentá anotar los números altos (5 y 6) cuando tengas varias
              repeticiones.
            </li>
            <li>
              No taches combinaciones valiosas al principio: puede que las
              consigas más adelante.
            </li>
            <li>Recordá que el turno cambia al completar una jugada.</li>
          </ul>
        </section>

        <section className='border-t-2 border-[#D4A017] pt-6 mt-6 text-center'>
          <h2 className='text-2xl font-bold text-[#F5F5F5] font-poppins'>
            ✨ ¡Importante!
          </h2>
          <p className='mt-2 text-lg text-[gray]'>
            No te olvides de{" "}
            <span className='font-semibold text-[#1A6642]'>divertirte</span> 😄.
            ¡La Generala es para pasarla bien con amigos y reírse mucho!
          </p>
        </section>
      </div>
    </main>
  );
}
