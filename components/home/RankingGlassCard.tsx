"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";

type UserRef = { id: string; name: string; image: string | null };

type WinsRow = {
  rank: number;
  user: UserRef;
  gamesWon: number;
  totalPoints: number;
};

type HighScoreRow = {
  rank: number;
  user: UserRef;
  highestScore: number;
  gamesPlayed?: number;
};

interface RankingGlassCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: "gold" | "violet" | "emerald" | "sky";
  loading: boolean;
  emptyMessage: string;
  variant: "wins" | "highScore";
  winsRows?: WinsRow[];
  highScoreRows?: HighScoreRow[];
}

const accentRing = {
  gold: "from-amber-400/25 to-amber-600/10 ring-amber-400/20",
  violet: "from-violet-400/20 to-fuchsia-500/10 ring-violet-400/15",
  emerald: "from-emerald-400/20 to-teal-600/10 ring-emerald-400/15",
  sky: "from-sky-400/20 to-cyan-600/10 ring-sky-400/15",
} as const;

const accentIcon = {
  gold: "text-amber-300",
  violet: "text-violet-300",
  emerald: "text-emerald-300",
  sky: "text-sky-300",
} as const;

export function RankingGlassCard({
  title,
  subtitle,
  icon: Icon,
  accent,
  loading,
  emptyMessage,
  variant,
  winsRows = [],
  highScoreRows = [],
}: RankingGlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${accentRing[accent]} p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] ring-1 backdrop-blur-md`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl"
        aria-hidden
      />
      <div className="relative mb-3 flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/35 ${accentIcon[accent]}`}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-poppins text-sm font-semibold tracking-tight text-white sm:text-base">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 sm:text-sm">{subtitle}</p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <CustomLoadingSpinner size="sm" showText={false} color="#e4e4e7" />
        </div>
      ) : (variant === "wins" ? winsRows : highScoreRows).length === 0 ? (
        <p className="py-6 text-center text-sm text-zinc-500">{emptyMessage}</p>
      ) : (
        <ul className="max-h-52 space-y-1 overflow-y-auto pr-1 scrollbar-none sm:max-h-56">
          {variant === "wins"
            ? winsRows.map((item) => (
                <li
                  key={item.user.id}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm transition hover:bg-white/5"
                >
                  <span className="w-7 shrink-0 text-center font-poppins text-xs font-bold text-amber-400/90">
                    {item.rank}º
                  </span>
                  <Image
                    src={item.user.image || "/default-avatar.png"}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 shrink-0 rounded-full ring-1 ring-white/10"
                    unoptimized
                  />
                  <span className="min-w-0 flex-1 truncate font-quicksand text-zinc-100">
                    {item.user.name}
                  </span>
                  <span className="shrink-0 text-right text-xs font-medium text-zinc-400">
                    <span className="text-zinc-200">{item.gamesWon}</span>{" "}
                    <span className="hidden sm:inline">
                      {item.gamesWon === 1 ? "victoria" : "victorias"}
                    </span>
                    <span className="text-zinc-500"> · </span>
                    {item.totalPoints} pts
                  </span>
                </li>
              ))
            : highScoreRows.map((item) => (
                <li
                  key={item.user.id}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm transition hover:bg-white/5"
                >
                  <span className="w-7 shrink-0 text-center font-poppins text-xs font-bold text-violet-300/90">
                    {item.rank}º
                  </span>
                  <Image
                    src={item.user.image || "/default-avatar.png"}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 shrink-0 rounded-full ring-1 ring-white/10"
                    unoptimized
                  />
                  <span className="min-w-0 flex-1 truncate font-quicksand text-zinc-100">
                    {item.user.name}
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="font-poppins text-sm font-semibold tabular-nums text-white">
                      {item.highestScore}
                    </span>
                    <span className="ml-1 text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-xs">
                      pts
                    </span>
                  </span>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}
