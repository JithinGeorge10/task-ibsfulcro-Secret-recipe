
import React, { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScoreEntry } from '@/types/game';
import { getScores } from '@/services/gameService';


const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  useEffect(() => {
    const fetchScores = async () => {
      const data = await getScores();
      setScores(data);
    };
    fetchScores();
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Leaderboard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">🏆 Top Scores</DialogTitle>
        </DialogHeader>
        {scores.length > 0 ? (
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full border-collapse">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-right">Score</th>
                  <th className="p-2 text-right">Attempts</th>
                  <th className="p-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{score.playerName}</td>
                    <td className="p-2 text-right font-bold">{score.score}</td>
                    <td className="p-2 text-right">{score.attempts}</td>
                    <td className="p-2 text-right">{formatTime(score.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No scores yet. Be the first to play!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Leaderboard;
