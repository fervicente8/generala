"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HowToPlay() {
  const router = useRouter();

  const combinations = [
    { name: "1", desc: "Suma de todos los 1", pts: "1 × cantidad de 1", servida: "5" },
    { name: "2", desc: "Suma de todos los 2", pts: "2 × cantidad de 2", servida: "10" },
    { name: "3", desc: "Suma de todos los 3", pts: "3 × cantidad de 3", servida: "15" },
    { name: "4", desc: "Suma de todos los 4", pts: "4 × cantidad de 4", servida: "20" },
    { name: "5", desc: "Suma de todos los 5", pts: "5 × cantidad de 5", servida: "25" },
    { name: "6", desc: "Suma de todos los 6", pts: "6 × cantidad de 6", servida: "30" },
    { name: "Escalera", desc: "1-2-3-4-5 o 2-3-4-5-6 (en cualquier orden)", pts: "20", servida: "25" },
    { name: "Full", desc: "Tres de un número + dos de otro (ej: 4-4-4-2-2)", pts: "30", servida: "35" },
    { name: "Poker", desc: "Cuatro iguales + uno distinto (ej: 6-6-6-6-2)", pts: "40", servida: "45" },
    { name: "Generala", desc: "Cinco dados iguales", pts: "50", servida: "¡Ganás!" },
    { name: "Doble Generala", desc: "Solo si ya anotaste Generala; cinco iguales de nuevo", pts: "100", servida: "¡Ganás!" },
  ];

  return (
    <main className='min-h-screen p-6 pb-12 text-[#1A1A1A] bg-gradient-to-br from-[#1A1A1A] to-[#2E2E2E] font-quicksand'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center justify-between mb-8'
        >
          <motion.button
            className='bg-[#A91D2F] text-[#F5F5F5] px-4 py-2 rounded-full shadow-md border-2 border-[#D4A017] hover:bg-[#DC2626] flex items-center gap-2'
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Volver
          </motion.button>
          <h1 className='text-2xl sm:text-3xl font-bold text-[#F5F5F5] font-poppins drop-shadow-[0_2px_2px_rgba(212,160,23,0.5)]'>
            🎲 Cómo jugar
          </h1>
          <div className='w-20' />
        </motion.header>

        {/* Objetivo */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className='p-5 sm:p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017] mb-6'
        >
          <h2 className='text-lg font-bold text-[#2E4A3D] font-poppins mb-2'>
            Objetivo
          </h2>
          <p className='text-[#1A1A1A]'>
            Sumar la mayor cantidad de puntos anotando once jugadas con 5 dados. Cada jugada se anota en una categoría distinta; al final gana quien tenga más puntos.
          </p>
        </motion.section>

        {/* Un turno en 4 pasos */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='p-5 sm:p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017] mb-6'
        >
          <h2 className='text-lg font-bold text-[#2E4A3D] font-poppins mb-3'>
            Un turno en 4 pasos
          </h2>
          <ol className='list-decimal list-inside space-y-2 text-[#1A1A1A]'>
            <li><strong>Tirar.</strong> Lanzás los 5 dados (o solo los que no hayas elegido guardar).</li>
            <li><strong>Guardar dados (opcional).</strong> Tocás los dados que querés conservar; en la siguiente tirada solo se vuelven a tirar los demás.</li>
            <li><strong>Repetir hasta 3 tiradas.</strong> Podés tirar hasta 3 veces en el mismo turno. Después de cada tirada podés seguir guardando o cambiando qué dados guardar.</li>
            <li><strong>Anotar.</strong> Al final del turno tenés que anotar en una categoría que todavía no usaste: el puntaje que corresponda o tachar (0 puntos) si no hay jugada válida.</li>
          </ol>
          <p className='mt-3 text-sm text-[#666]'>
            Si lográs una jugada en la <strong>primera tirada</strong> del turno (sin usar la 2.ª ni la 3.ª), es <em>servida</em> y sumás el bonus indicado en la tabla.
          </p>
        </motion.section>

        {/* Tabla de jugadas */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className='p-5 sm:p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017] mb-6 overflow-x-auto'
        >
          <h2 className='text-lg font-bold text-[#2E4A3D] font-poppins mb-3'>
            Jugadas y puntajes
          </h2>
          <table className='w-full text-sm sm:text-base border-collapse'>
            <thead>
              <tr className='border-b-2 border-[#D4A017]'>
                <th className='text-left py-2 px-2 font-poppins font-semibold text-[#1A1A1A]'>Jugada</th>
                <th className='text-left py-2 px-2 font-poppins font-semibold text-[#1A1A1A]'>Qué es</th>
                <th className='text-left py-2 px-2 font-poppins font-semibold text-[#1A1A1A]'>Puntos</th>
                <th className='text-left py-2 px-2 font-poppins font-semibold text-[#1A1A1A]'>Servida</th>
              </tr>
            </thead>
            <tbody>
              {combinations.map((row, i) => (
                <tr key={row.name} className='border-b border-[#E5E5E5]'>
                  <td className='py-2 px-2 font-semibold text-[#2E4A3D]'>{row.name}</td>
                  <td className='py-2 px-2 text-[#444]'>{row.desc}</td>
                  <td className='py-2 px-2'>{row.pts}</td>
                  <td className='py-2 px-2 font-semibold text-[#1A6642]'>{row.servida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.section>

        {/* Reglas importantes */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='p-5 sm:p-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017] mb-6'
        >
          <h2 className='text-lg font-bold text-[#2E4A3D] font-poppins mb-3'>
            Reglas importantes
          </h2>
          <ul className='space-y-2 text-[#1A1A1A] list-disc list-inside'>
            <li>Cada categoría se usa una sola vez por partida.</li>
            <li>Si no tenés ninguna jugada válida, tenés que <strong>tachar</strong> una categoría (anotar 0). Conviene tachar las que dan poco, por ejemplo el 1 (máximo 5 puntos).</li>
            <li>La escalera puede ser 1-2-3-4-5 o 2-3-4-5-6; el orden de los dados no importa.</li>
            <li>Generala servida (cinco iguales en la primera tirada) termina la partida y ganás. Doble Generala servida también gana al instante.</li>
          </ul>
        </motion.section>

        {/* Consejos */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className='p-5 sm:p-6 bg-[#F0E9D6] rounded-xl shadow-md border-2 border-[#D4A017] mb-6'
        >
          <h2 className='text-lg font-bold text-[#2E4A3D] font-poppins mb-3'>
            Consejos
          </h2>
          <ul className='space-y-2 text-[#1A1A1A] list-disc list-inside'>
            <li>Priorizá anotar 5 y 6 cuando tengas varios dados iguales; dan más puntos.</li>
            <li>No taches Full, Poker o Generala al principio: es mejor guardar esas categorías por si las sacás después.</li>
            <li>Para la escalera necesitás 5 números distintos; si te quedan dos repetidos, en la siguiente tirada buscá cambiar uno.</li>
          </ul>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='text-center pt-4'
        >
          <p className='text-[#E2D8BA] mb-4'>
            ¿Listo para jugar?
          </p>
          <Link
            href='/'
            className='inline-block bg-[#2E4A3D] text-[#F5F5F5] font-poppins font-semibold py-3 px-6 rounded-xl shadow-md border-2 border-[#D4A017] hover:bg-[#2E4A3D]/90'
          >
            Ir al lobby
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
