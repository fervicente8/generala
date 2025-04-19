import React from "react";
import { X } from "lucide-react";
import CustomLoadingSpinner from "../ui/CustomLoadingSpinner";
import { useSession } from "next-auth/react";

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
  // Session
  if (!isOpen) return null;
  const { data: session } = useSession();

  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer'
        >
          <X />
        </button>

        {stats?.userId && (
          <h2 className='text-2xl font-bold text-center mb-4 text-blue-600'>
            📊{" "}
            {stats.userId === session?.user.id
              ? "Tus Estadísticas"
              : "Estadísticas"}
          </h2>
        )}

        {statsLoading ? (
          <CustomLoadingSpinner
            size='md'
            text='Cargando estadísticas'
            textColor='black'
          />
        ) : (
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <Stat label='Partidas jugadas' value={stats?.gamesPlayed} />
            <Stat label='Ganadas' value={stats?.gamesWon} />
            <Stat label='Perdidas' value={stats?.gamesLost} />
            <Stat label='Win Rate' value={`${stats?.winRate}%`} />
            <Stat label='Promedio' value={stats?.averageScore} />
            <Stat label='Máximo puntaje' value={stats?.highestScore} />
            <Stat label='Fulls' value={stats?.fullHouses} />
            <Stat label='Pokers' value={stats?.pokers} />
            <Stat label='Escaleras' value={stats?.straights} />
            <Stat label='Generalas' value={stats?.generalas} />
            <Stat label='Generala Servida' value={stats?.generalaServed} />
            <Stat label='ELO actual' value={stats?.elo} />
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className='bg-blue-50 rounded-xl px-3 py-2 text-blue-800 shadow-sm'>
    <span className='block text-xs font-medium'>{label}</span>
    <span className='text-lg font-semibold'>{value}</span>
  </div>
);
