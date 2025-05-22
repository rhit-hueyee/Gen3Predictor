import { createGen3OUPredictorRoom } from '@showdex/utils/app';
import { Gen3OUPredictorRenderer } from './Gen3OUPredictor.renderer';
import { getBattleRoom } from '@showdex/utils/host';
import { detectGenFromFormat } from '@showdex/utils/dex';
import { logger } from '@showdex/utils/debug';

const l = logger('@showdex/pages/Gen3OUPredictor/bootstrap');

export const Gen3OUPredictorBootstrapper = (store, data, roomid) => {
  if (!roomid?.startsWith?.('battle-')) return;

  const battleRoom = getBattleRoom(roomid);
  const battle = battleRoom?.battle;

  if (!battle?.id) {
    l.debug('No battle ID found; skipping Gen3OUPredictor bootstrap.');
    return;
  }

  const format = battle.id.split('-').find((p) => detectGenFromFormat(p));
  if (!/gen3ou/i.test(format)) {
    l.debug('Format is not Gen3OU; skipping Gen3OUPredictor.');
    return;
  }

  // Only bootstrap once
  if (battle.gen3ouPredictorRoom) {
    return;
  }

  l.debug(`Creating Gen3OU Predictor tab for ${battle.id}`);

  const predictorRoom = createGen3OUPredictorRoom(battle.id, store, false);
  if (!predictorRoom) {
    l.error('Failed to create Gen3OUPredictorRoom.');
    return;
  }

  battle.gen3ouPredictorRoom = predictorRoom;

  Gen3OUPredictorRenderer(
    predictorRoom.reactRoot,
    store,
    battle.id,
    battleRoom
  );
};
