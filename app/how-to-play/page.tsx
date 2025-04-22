"use client";
import { useRouter } from "next/navigation";

export default function HowToPlay() {
  const router = useRouter();

  return (
    <main className='h-full p-6 max-w-4xl mx-auto text-base sm:text-lg space-y-8 bg-gradient-to-r from-[var(--color-beige)]/60 to-[#fffaf0]'>
      <button
        className='fixed top-3 left-3 text-gray-500 hover:text-gray-800 cursor-pointer'
        onClick={() => router.back()}
      >
        ⬅️ Volver
      </button>

      <h1 className='text-3xl font-bold text-center mb-6'>
        🎲 Cómo Jugar a la Generala
      </h1>

      <section>
        <h2 className='text-xl font-semibold mb-2'>📌 Objetivo del Juego</h2>
        <p>
          El objetivo es sumar la mayor cantidad de puntos posibles completando
          combinaciones con 5 dados a lo largo de la partida.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>🎮 Turnos y Tiradas</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>En cada turno lanzás 5 dados.</li>
          <li>Podés tirar hasta 3 veces por turno.</li>
          <li>
            Después de cada tirada, podés elegir qué dados guardar y volver a
            lanzar los restantes.
          </li>
          <li>
            Al final del turno, debés anotar una jugada (aunque sea con 0 puntos
            si no tenés ninguna válida).
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>🏅 Jugadas y Puntajes</h2>
        <div className='space-y-4'>
          <div>
            <h3 className='font-semibold'>🔢 Números (del 1 al 6)</h3>
            <p>Sumás la cantidad de dados que coincidan con ese número.</p>
            <p className='italic'>
              Ejemplo: dados 🎲 2 - 2 - 4 - 2 - 6 → si anotás en el “2”, sumás 6
              puntos porque hay 3 dados con ese número (el “2” ya no podrá ser
              usado para otra jugada).
            </p>
          </div>

          <div>
            <h3 className='font-semibold'>📈 Escalera (20 puntos)</h3>
            <p>Conseguí una secuencia de cinco números seguidos.</p>
            <p className='italic'>
              Ejemplos válidos: 🎲 1 - 2 - 3 - 4 - 5 🎲 2 - 3 - 4 - 5 - 6 🎲 3 -
              4 - 5 - 6 - 1
            </p>
            <p>Si la lográs en la primera tirada (servida), sumás 25 puntos.</p>
          </div>

          <div>
            <h3 className='font-semibold'>🏠 Full (30 puntos)</h3>
            <p>Tres dados del mismo valor + dos dados de otro valor.</p>
            <p className='italic'>Ejemplo: 🎲 4 - 4 - 4 - 2 - 2</p>
            <p>Full servido: 35 puntos.</p>
          </div>

          <div>
            <h3 className='font-semibold'>🃏 Poker (40 puntos)</h3>
            <p>Cuatro dados iguales + uno distinto.</p>
            <p className='italic'>Ejemplo: 🎲 6 - 6 - 6 - 6 - 2</p>
            <p>Poker servido: 45 puntos.</p>
          </div>

          <div>
            <h3 className='font-semibold'>💣 Generala (50 puntos)</h3>
            <p>Cinco dados iguales. La jugada más difícil y valiosa.</p>
            <p className='italic'>Ejemplo: 🎲 3 - 3 - 3 - 3 - 3</p>
            <p>Generala servida: Ganaste el juego.</p>
          </div>

          <div>
            <h3 className='font-semibold'>🔥 Doble Generala (100 puntos)</h3>
            <p>
              Solo se puede anotar si ya hiciste una Generala antes. ¡Muy rara!
            </p>
            <p className='italic'>Doble Generala servida: Ganaste el juego.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>✅ Reglas adicionales</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>
            Si no podés o no querés anotar una jugada válida, debés tachar
            alguna categoría (anotar 0), pero no se te sumarán puntos, siempre
            se recomienda tachar categorias que no puedan sumar mucho, ejemplo
            el "1", ya que el maximo puntaje que se puede sacar del "1" es 5.
          </li>
          <li>
            El bonus de <strong>jugada servida</strong> (+5 puntos) se aplica si
            hacés la jugada en la primera tirada del turno.
          </li>
          <li>
            Gana el jugador con más puntos al completar todas las categorías.
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>🎯 Consejos</h2>
        <ul className='list-disc list-inside space-y-2'>
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

      <section className='border-t pt-6 mt-6 text-center'>
        <h2 className='text-2xl font-bold text-blue-600'>✨ ¡Importante!</h2>
        <p className='mt-2 text-lg'>
          No te olvides de{" "}
          <span className='font-semibold text-green-600'>divertirte</span> 😄.
          ¡La Generala es para pasarla bien con amigos y reírse mucho!
        </p>
      </section>
    </main>
  );
}
