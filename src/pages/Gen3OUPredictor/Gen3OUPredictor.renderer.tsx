import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { Gen3OUPredictor } from './Gen3OUPredictor';

export const Gen3OUPredictorRenderer = (
  root: ReactDOM.Root,
  store: any,          // Type as needed
  battleId: string,
  battleRoom: any      // Type as needed
) => {
  root.render(
    <ReduxProvider store={store}>
      <Gen3OUPredictor store={store} battleId={battleId} battleRoom={battleRoom} />
    </ReduxProvider>
  );
};
