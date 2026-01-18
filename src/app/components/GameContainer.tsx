import { useState } from 'react';
import { motion } from 'motion/react';
import { Room1Mirror } from '@/app/components/rooms/Room1Mirror';
import { Room2Silent } from '@/app/components/rooms/Room2Silent';
import { Room3Timer } from '@/app/components/rooms/Room3Timer';
import { Room4Shifted } from '@/app/components/rooms/Room4Shifted';
import { Room5Memory } from '@/app/components/rooms/Room5Memory';
import { Room6Final } from '@/app/components/rooms/Room6Final';
import { VictoryScreen } from '@/app/components/VictoryScreen';
import { Check, Lock } from 'lucide-react';

interface GameContainerProps {
  username: string;
}

interface RoomAnswers {
  [key: number]: string;
}

export function GameContainer({ username }: GameContainerProps) {
  const [currentRoom, setCurrentRoom] = useState(1);
  const [solvedRooms, setSolvedRooms] = useState<number[]>([]);
  const [answers, setAnswers] = useState<RoomAnswers>({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleRoomSolved = (roomNumber: number, answer: string) => {
    if (!solvedRooms.includes(roomNumber)) {
      setSolvedRooms([...solvedRooms, roomNumber]);
      setAnswers({ ...answers, [roomNumber]: answer });
      
      if (roomNumber === 6) {
        setGameCompleted(true);
      }
    }
  };

  const rooms = [
    { number: 1, title: 'THE MIRROR PROBLEM', color: 'bg-red-600', textColor: 'text-red-500' },
    { number: 2, title: 'THE SILENT CIPHER', color: 'bg-blue-600', textColor: 'text-blue-500' },
    { number: 3, title: 'THE FALSE TIMER', color: 'bg-green-600', textColor: 'text-green-500' },
    { number: 4, title: 'THE SHIFTED RULE', color: 'bg-yellow-600', textColor: 'text-yellow-500' },
    { number: 5, title: 'THE MEMORY ERASER', color: 'bg-orange-600', textColor: 'text-orange-500' },
    { number: 6, title: 'THE FINAL DECEPTION', color: 'bg-red-600', textColor: 'text-red-500' },
  ];

  const renderRoom = () => {
    const commonProps = {
      onSolved: handleRoomSolved,
      solvedRooms,
      answers,
    };

    switch (currentRoom) {
      case 1:
        return <Room1Mirror {...commonProps} />;
      case 2:
        return <Room2Silent {...commonProps} />;
      case 3:
        return <Room3Timer {...commonProps} />;
      case 4:
        return <Room4Shifted {...commonProps} />;
      case 5:
        return <Room5Memory {...commonProps} />;
      case 6:
        return <Room6Final {...commonProps} />;
      default:
        return null;
    }
  };

  if (gameCompleted) {
    return <VictoryScreen username={username} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">THE ECHO FACILITY</h1>
            <p className="text-sm text-gray-400">Player: {username}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Rooms Cleared</p>
            <p className="text-2xl font-bold">{solvedRooms.length}/6</p>
          </div>
        </div>
      </div>

      {/* Room Navigation */}
      <div className="bg-zinc-900/50 border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {rooms.map((room) => {
              const isSolved = solvedRooms.includes(room.number);
              const isLocked = room.number === 6 && solvedRooms.length < 5;
              const isCurrent = currentRoom === room.number;

              return (
                <button
                  key={room.number}
                  onClick={() => !isLocked && setCurrentRoom(room.number)}
                  disabled={isLocked}
                  className={`relative p-3 rounded-lg border-2 transition-all ${
                    isCurrent
                      ? `${room.color} border-white`
                      : isSolved
                      ? 'bg-zinc-800 border-green-500'
                      : isLocked
                      ? 'bg-zinc-900 border-zinc-700 opacity-50 cursor-not-allowed'
                      : 'bg-zinc-800 border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  <div className="text-xs font-mono mb-1">ROOM {room.number}</div>
                  <div className="text-xs truncate">{room.title}</div>
                  {isSolved && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-green-500" />
                  )}
                  {isLocked && (
                    <Lock className="absolute top-2 right-2 w-4 h-4 text-zinc-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Room Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          key={currentRoom}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl"
        >
          {renderRoom()}
        </motion.div>
      </div>
    </div>
  );
}
