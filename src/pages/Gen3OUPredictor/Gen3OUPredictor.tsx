import React, { useEffect, useState } from 'react';

export interface Gen3OUPredictorProps {
  store: any; // Type as needed
  battleId: string;
  battleRoom: any; // Type as needed
}

export const Gen3OUPredictor: React.FC<Gen3OUPredictorProps> = ({ store, battleId, battleRoom }) => {
  const battle = battleRoom.battle;
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<string[]>([]); // or whatever format your backend returns
  const [turn, setTurn] = useState(battle?.turn || 0);

  useEffect(() => {
    if (!battle) return;

    // Setup an interval or listener if needed — but for simplicity:
    const interval = setInterval(() => {
      if (battle?.turn !== turn) {
        setTurn(battle.turn);
      }
    }, 500); // poll every half second

    return () => clearInterval(interval);
  }, [battle, turn]);

  useEffect(() => {
    if (!battle) return;

    const sendLogToBackend = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://yourbackend/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ log: battle.stepQueue }),
        });

        const data = await response.json();
        setPredictions(data.pokemon || []); // or however the API responds
      } catch (error) {
        console.error('Prediction API failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void sendLogToBackend();
  }, [turn]); // triggers after turn number changes

  return (
    <div style={{
      padding: 32,
      textAlign: 'center',
      fontSize: 20,
      color: '#444',
      background: '#f7f7f7',
      borderRadius: 16,
      boxShadow: '0 4px 20px #0001'
    }}>
      <strong>Gen 3 OU Dex Placeholder</strong>
      <div style={{ marginTop: 10 }}>
        battleId: <code>{battleId}</code><br />
        current turn: {battle?.turn ?? '??'}
      </div>

      {isLoading ? (
        <div style={{ marginTop: 20, color: '#999' }}>Fetching prediction...</div>
      ) : (
        predictions.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <strong>Predicted Pokémon:</strong>
            <ul>
              {predictions.map((poke, i) => <li key={i}>{poke}</li>)}
            </ul>
          </div>
        )
      )}
    </div>
  );
};
