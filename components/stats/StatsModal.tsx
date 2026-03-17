import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Flame, Trophy, X } from "lucide-react";
import CustomLoadingSpinner from "../ui/CustomLoadingSpinner";
import { useSession } from "next-auth/react";

export interface GameHistoryEntry {
  gameId: string;
  createdAt: string;
  players: { userId: string; name: string; totalScore: number }[];
  winnerId: string | null;
  myScore: number;
  position: number;
}

interface HeadToHead {
  gamesAgainst: number;
  myWins: number;
  theirWins: number;
}

interface Stats {
  averageScore: number;
  elo: number;
  eloChange: number;
  fullHouses: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  generalaServed: number;
  generalas: number;
  highestScore: number;
  pokers: number;
  straights: number;
  totalTimePlayed: number;
  winRate: number;
  userId: string;
  headToHead?: HeadToHead | null;
  streak?: number;
}

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: Stats;
  statsLoading?: boolean;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  statsLoading,
}) => {
  const { data: session } = useSession();
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !stats?.userId) {
      setGameHistory([]);
      return;
    }
    setHistoryLoading(true);
    fetch(`/api/users/game-history/${stats.userId}?limit=10`)
      .then((res) => res.json())
      .then((data) => setGameHistory(Array.isArray(data) ? data : []))
      .catch(() => setGameHistory([]))
      .finally(() => setHistoryLoading(false));
  }, [isOpen, stats?.userId]);

  if (!isOpen) return null;

  const streak = stats?.streak ?? 0;
  const hasStreak = streak >= 3;
  const streakLevel =
    streak >= 7 ? "high" : streak >= 5 ? "medium" : streak >= 3 ? "low" : null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] flex flex-col shadow-xl relative transition-all ${
          streakLevel === "high"
            ? "ring-4 ring-amber-400 shadow-amber-200/50"
            : streakLevel === "medium"
              ? "ring-2 ring-amber-300 shadow-amber-100/40"
              : streakLevel === "low"
                ? "ring-2 ring-amber-200"
                : ""
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 shrink-0 rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="overflow-y-auto min-h-0 pr-8">

        {stats?.userId && (
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-500">
              📊{" "}
              {stats.userId === session?.user.id
                ? "Tus Estadísticas"
                : "Estadísticas"}
            </h2>
            {hasStreak && (
              <div
                className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full font-semibold text-sm ${
                  streakLevel === "high"
                    ? "bg-amber-400 text-amber-950"
                    : streakLevel === "medium"
                      ? "bg-amber-300 text-amber-900"
                      : "bg-amber-100 text-amber-800"
                }`}
              >
                <Flame className="h-4 w-4" />
                Racha: {streak} {streak === 1 ? "victoria" : "victorias"}
              </div>
            )}
          </div>
        )}

        {statsLoading ? (
          <CustomLoadingSpinner
            size="md"
            text="Cargando estadísticas"
            textColor="black"
          />
        ) : (
          <>
            {stats?.headToHead && stats.userId !== session?.user?.id && (
              <div className="mb-4 p-3 bg-slate-100 rounded-xl">
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Partidas que jugaron juntos
                </p>
                {stats.headToHead.gamesAgainst === 0 ? (
                  <p className="text-sm text-slate-600">
                    Aún no jugaron partidas juntos.
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-slate-800">
                      Partidas jugadas: {stats.headToHead.gamesAgainst}
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-1">
                      Cómo salieron: Vos ganaste {stats.headToHead.myWins}{" "}
                      {stats.headToHead.myWins === 1 ? "partida" : "partidas"} — Él/ella ganó{" "}
                      {stats.headToHead.theirWins}{" "}
                      {stats.headToHead.theirWins === 1 ? "partida" : "partidas"}.
                    </p>
                  </>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Partidas jugadas" value={stats?.gamesPlayed} />
              <Stat label="Ganadas" value={stats?.gamesWon} />
              <Stat label="Perdidas" value={stats?.gamesLost} />
              <Stat label="Win Rate" value={`${stats?.winRate}%`} />
              <Stat label="Promedio" value={stats?.averageScore} />
              <Stat label="Máximo puntaje" value={stats?.highestScore} />
              <Stat label="Fulls" value={stats?.fullHouses} />
              <Stat label="Pokers" value={stats?.pokers} />
              <Stat label="Escaleras" value={stats?.straights} />
              <Stat label="Generalas" value={stats?.generalas} />
              <Stat label="Generala Servida" value={stats?.generalaServed} />
              <Stat label="ELO actual" value={stats?.elo} />
            </div>

            {stats?.userId && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  Últimas partidas
                </p>
                {historyLoading ? (
                  <CustomLoadingSpinner size="sm" showText={false} />
                ) : gameHistory.length === 0 ? (
                  <p className="text-sm text-slate-500">Sin partidas aún.</p>
                ) : (
                  <ul className="space-y-2 max-h-40 overflow-y-auto">
                    {gameHistory.map((entry) => (
                      <li
                        key={entry.gameId}
                        className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm p-2 rounded-lg bg-slate-50 text-slate-700"
                      >
                        <span>
                          <span className="font-medium">
                            {new Date(entry.createdAt).toLocaleDateString("es-AR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          {" — "}
                          {entry.position === 1 ? (
                            <span className="text-amber-600 font-semibold">1º</span>
                          ) : (
                            <span>{entry.position}º</span>
                          )}
                          {" "}
                          ({entry.myScore} pts)
                          {entry.players.length > 1 && (
                            <span className="text-slate-500">
                              {" "}
                              vs {entry.players.filter((p) => p.userId !== stats.userId).map((p) => p.name).join(", ")}
                            </span>
                          )}
                        </span>
                        <Link
                          href={`/game/${entry.gameId}`}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-200 px-2 py-1 text-slate-600 hover:bg-slate-300 hover:text-slate-800 transition-colors shrink-0"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Ver partida
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className='bg-blue-50 rounded-xl px-3 py-2 text-blue-500 shadow-sm'>
    <span className='block text-xs font-medium'>{label}</span>
    <span className='text-lg font-semibold'>{value}</span>
  </div>
);
