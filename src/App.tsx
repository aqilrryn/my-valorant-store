import React, { useState } from 'react';
import 'twin.macro';

import type { Credentials } from 'types/userTypes';
import Login from './views/Login';
import Store from './views/Store';

const App: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>();

  return (
    <div tw="flex justify-center h-full w-full bg-background overflow-y-scroll">
      {credentials ? (
        <Store
          credentials={credentials}
          onFailure={() => setCredentials(undefined)}
        />
      ) : (
        <Login onLogin={credentials => setCredentials(credentials)} />
      )}
    </div>
  );
};

export default App;
