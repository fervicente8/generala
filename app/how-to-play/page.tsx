"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Dices,
  ListOrdered,
  Sparkles,
} from "lucide-react";

const combinations = [
  {
    name: "1",
    desc: "Suma de todos los 1",
    pts: "1 × cantidad de 1",
    servida: "",
  },
  {
    name: "2",
    desc: "Suma de todos los 2",
    pts: "2 × cantidad de 2",
    servida: "",
  },
  {
    name: "3",
    desc: "Suma de todos los 3",
    pts: "3 × cantidad de 3",
    servida: "",
  },
  {
    name: "4",
    desc: "Suma de todos los 4",
    pts: "4 × cantidad de 4",
    servida: "",
  },
  {
    name: "5",
    desc: "Suma de todos los 5",
    pts: "5 × cantidad de 5",
    servida: "",
  },
  {
    name: "6",
    desc: "Suma de todos los 6",
    pts: "6 × cantidad de 6",
    servida: "",
  },
  {
    name: "Escalera",
    desc: "1-2-3-4-5, 2-3-4-5-6 o 3-4-5-6-1 (en cualquier orden)",
    pts: "20",
    servida: "25",
  },
  {
    name: "Full",
    desc: "Tres de un número + dos de otro (ej: 4-4-4-2-2)",
    pts: "30",
    servida: "35",
  },
  {
    name: "Poker",
    desc: "Cuatro iguales + uno distinto (ej: 6-6-6-6-2)",
    pts: "40",
    servida: "45",
  },
  {
    name: "Generala",
    desc: "Cinco dados iguales",
    pts: "50",
    servida: "¡Ganás!",
  },
  {
    name: "Doble Generala",
    desc: "Solo si ya anotaste Generala; cinco iguales de nuevo",
    pts: "100",
    servida: "¡Ganás!",
  },
];

const sectionClass =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-inner shadow-black/20 backdrop-blur-sm sm:p-6";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export default function HowToPlay() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-zinc-950 font-quicksand text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(245,158,11,0.12),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(59,130,246,0.06),transparent_45%)]" />

      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl safe-area-top">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <motion.button
            type="button"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-white/10"
            onClick={() => router.back()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft
              className="h-4 w-4 shrink-0 text-amber-300/90"
              aria-hidden
            />
            Volver
          </motion.button>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 sm:justify-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25 sm:h-10 sm:w-10">
              <Dices className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/85 sm:text-xs">
                Guía rápida
              </p>
              <h1 className="truncate font-poppins text-base font-bold tracking-tight text-white sm:text-xl">
                Cómo jugar
              </h1>
            </div>
          </div>
          <div className="w-[72px] shrink-0 sm:w-[88px]" aria-hidden />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px)+1.5rem)] pt-5 sm:px-6 sm:pb-10 sm:pt-8">
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.35 }}
          className={`${sectionClass} mb-5 sm:mb-6`}
        >
          <div className="mb-3 flex items-center gap-2">
            <BookOpen
              className="h-5 w-5 shrink-0 text-amber-300/90"
              aria-hidden
            />
            <h2 className="font-poppins text-base font-semibold text-white sm:text-lg">
              Objetivo
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            Sumar la mayor cantidad de puntos anotando once jugadas con cinco
            dados. Cada jugada va en una categoría distinta; al final gana quien
            tenga más puntos.
          </p>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.35, delay: 0.04 }}
          className={`${sectionClass} mb-5 sm:mb-6`}
        >
          <div className="mb-4 flex items-center gap-2">
            <ListOrdered
              className="h-5 w-5 shrink-0 text-amber-300/90"
              aria-hidden
            />
            <h2 className="font-poppins text-base font-semibold text-white sm:text-lg">
              Un turno en cuatro pasos
            </h2>
          </div>
          <ol className="space-y-3 sm:space-y-4">
            {[
              {
                n: 1,
                title: "Tirar",
                body: "Lanzás los cinco dados (o solo los que no hayas elegido guardar).",
              },
              {
                n: 2,
                title: "Volver a tirar dados (opcional)",
                body: "Tocás los dados que querés volver a tirar. En la siguiente tirada solo se vuelven a tirar los dados seleccionados.",
              },
              {
                n: 3,
                title: "Hasta tres tiradas",
                body: "Podés tirar hasta tres veces en el mismo turno. Después de cada tirada podés seguir guardando o cambiar qué dados guardar.",
              },
              {
                n: 4,
                title: "Anotar",
                body: "Al final del turno anotás en una categoría libre: el puntaje que corresponda o tachar (0) si no hay jugada válida.",
              },
            ].map((step) => (
              <li key={step.n} className="flex gap-3 sm:gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 font-poppins text-sm font-bold text-amber-200 ring-1 ring-amber-400/30 sm:h-9 sm:w-9">
                  {step.n}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="font-poppins text-sm font-semibold text-white sm:text-base">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-400">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-2.5 text-xs leading-relaxed text-amber-100/95 sm:text-sm">
            Si lográs una jugada en la{" "}
            <strong className="font-semibold">primera tirada</strong> del turno
            (sin usar la 2.ª ni la 3.ª), es <em>servida</em> y sumás el bonus de
            la tabla.
          </p>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.35, delay: 0.08 }}
          className={`${sectionClass} mb-5 sm:mb-6`}
        >
          <h2 className="mb-1 font-poppins text-base font-semibold text-white sm:text-lg">
            Jugadas y puntajes
          </h2>
          <p className="mb-4 text-xs text-zinc-500 sm:text-sm">
            En pantallas chicas: tarjetas. En tablet o escritorio: tabla
            completa.
          </p>

          <div className="grid gap-3 md:hidden">
            {combinations.map((row) => (
              <div
                key={row.name}
                className="rounded-xl border border-white/10 bg-zinc-900/40 p-3.5 sm:p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span className="font-poppins text-sm font-semibold text-amber-200 sm:text-base">
                    {row.name}
                  </span>
                  <span className="rounded-lg bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-200/95 ring-1 ring-emerald-400/25">
                    Servida: {row.servida}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {row.desc}
                </p>
                <p className="mt-2 border-t border-white/10 pt-2 text-xs font-medium text-zinc-500">
                  Puntos: <span className="text-zinc-300">{row.pts}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="-mx-1 hidden overflow-x-auto rounded-xl border border-white/10 md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="px-3 py-3 font-poppins font-semibold text-zinc-200 lg:px-4">
                    Jugada
                  </th>
                  <th className="px-3 py-3 font-poppins font-semibold text-zinc-200 lg:px-4">
                    Qué es
                  </th>
                  <th className="px-3 py-3 font-poppins font-semibold text-zinc-200 lg:w-28">
                    Puntos
                  </th>
                  <th className="px-3 py-3 font-poppins font-semibold text-emerald-200/90 lg:w-32">
                    Servida
                  </th>
                </tr>
              </thead>
              <tbody>
                {combinations.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-white/6 transition-colors hover:bg-white/2"
                  >
                    <td className="px-3 py-2.5 font-semibold text-amber-200/95 lg:px-4">
                      {row.name}
                    </td>
                    <td className="px-3 py-2.5 text-zinc-400 lg:px-4">
                      {row.desc}
                    </td>
                    <td className="px-3 py-2.5 text-zinc-300">{row.pts}</td>
                    <td className="px-3 py-2.5 font-medium text-emerald-200/90">
                      {row.servida}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.35, delay: 0.12 }}
          className={`${sectionClass} mb-5 sm:mb-6`}
        >
          <h2 className="mb-3 font-poppins text-base font-semibold text-white sm:text-lg">
            Reglas importantes
          </h2>
          <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-300 sm:text-base">
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/80"
                aria-hidden
              />
              <span>Cada categoría se usa una sola vez por partida.</span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/80"
                aria-hidden
              />
              <span>
                Si no tenés jugada válida, tenés que{" "}
                <strong className="text-zinc-100">tachar</strong> una categoría
                (0 puntos). Conviene tachar las que dan poco, por ejemplo el 1
                (máx. 5).
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/80"
                aria-hidden
              />
              <span>
                La escalera puede ser 1-2-3-4-5, 2-3-4-5-6 o 3-4-5-6-1; el orden
                de los dados no importa.
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/80"
                aria-hidden
              />
              <span>
                Generala servida (cinco iguales en la primera tirada) termina la
                partida y ganás.
              </span>
            </li>
          </ul>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="mb-8 rounded-2xl border border-amber-400/25 bg-linear-to-br from-amber-500/12 to-amber-900/10 p-4 shadow-inner shadow-black/20 sm:mb-10 sm:p-6"
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 shrink-0 text-amber-300" aria-hidden />
            <h2 className="font-poppins text-base font-semibold text-amber-50 sm:text-lg">
              Consejos
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed text-amber-100/90 sm:text-base">
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/90"
                aria-hidden
              />
              <span>
                Priorizá 5 y 6 cuando tengas varios dados iguales; dan más
                puntos.
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/90"
                aria-hidden
              />
              <span>
                No taches Full, Poker o Generala al principio: reservá esas
                filas por si las sacás después.
              </span>
            </li>
            <li className="flex gap-2">
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/90"
                aria-hidden
              />
              <span>
                Para escalera necesitás cinco números distintos; si quedan dos
                repetidos, en la siguiente tirada buscá cambiar uno.
              </span>
            </li>
          </ul>
        </motion.section>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-sm text-zinc-400 sm:text-base">
            ¿Listo para jugar?
          </p>
          <Link
            href="/"
            className="inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-xl border border-amber-400/35 bg-linear-to-br from-amber-500/30 to-amber-800/20 px-6 py-3 font-poppins text-sm font-semibold text-amber-50 shadow-lg shadow-black/25 transition hover:from-amber-500/40 sm:text-base"
          >
            Ir al lobby
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
