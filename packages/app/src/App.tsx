import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

const WEAPONS = gql`
  query GetWeapons {
    weapons {
      uuid
      displayName
    }
  }
`;

const App: React.FC = () => {
  const { loading, error, data } = useQuery(WEAPONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.weapons.map(
    ({ uuid, displayName }: { uuid: string; displayName: string }) => (
      <div key={uuid}>
        <p>
          {uuid}: {displayName}
        </p>
      </div>
    ),
  );
};

export default App;
