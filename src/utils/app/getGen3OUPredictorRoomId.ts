import { formatId } from '@showdex/utils/core';

export const getGen3OUPredictorRoomId = (
  battleId: string,
): string => (battleId ? `view-gen3oupredictor-${formatId(battleId)}` : null);
