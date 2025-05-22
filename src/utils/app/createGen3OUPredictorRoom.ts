import * as ReactDOM from 'react-dom/client';
import { type RootStore } from '@showdex/redux/store';
import { createHtmlRoom, getBattleRoom } from '@showdex/utils/host';

// Optional: if you want an ID generator utility for your predictor room
const getGen3OUPredictorRoomId = (battleId: string) => `gen3ou-predictor-${battleId}`;

/**
 * Creates an `HtmlRoom` to house a Gen3OUPredictor overlay for a specific battle.
 * - Like Calcdex/Hellodex, attaches a ReactDOM root to the room's element.
 * - Handles unmounting and cleanup on room leave.
 */
export const createGen3OUPredictorRoom = (
  battleId: string,
  store?: RootStore,
  focus?: boolean,
): Showdown.HtmlRoom => {
  if (!battleId) return null;

  // You can customize side, icon, and maxWidth as needed
  const gen3ouRoom = createHtmlRoom(getGen3OUPredictorRoomId(battleId), 'Gen 3 OU Predictor', {
    side: true,
    icon: 'eye', // Or any FontAwesome icon you like
    focus: false,
    maxWidth: 650,
  });

  if (!gen3ouRoom?.el) return null;

  gen3ouRoom.reactRoot = ReactDOM.createRoot(gen3ouRoom.el);

  // Optional: custom cleanup on leave
  gen3ouRoom.requestLeave = () => {
    const battle = getBattleRoom(battleId)?.battle;

    if (battle?.id) {
      delete battle.calcdexRoom;
    }

    // Unmount the React root
    gen3ouRoom.reactRoot?.unmount?.();
    // Optionally: perform any Redux or other cleanup here
    // actually leave the room
    return true;
  };

  return gen3ouRoom;
};
