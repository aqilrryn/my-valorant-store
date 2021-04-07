import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import 'twin.macro';

import type { Credentials } from 'types/userTypes';
import type { Skin } from 'types/weaponTypes';
import { Card } from '../components/card/Card';
import Wrapper from '../components/page-wrapper/PageWrapper';
import NavigationIcon from '../components/navigation-icon/NavigationIcon';
import { client } from '../index';

const PLAYER_STORE = gql`
  query GetPlayerStore($username: String!, $password: String!) {
    store(username: $username, password: $password) {
      skins {
        uuid
        displayName
        displayIcon
        cost
      }
    }
  }
`;

const Store: React.FC<{
  credentials: Credentials;
  onFailure: (mode: 'network' | 'auth') => void;
}> = ({ credentials, onFailure }) => {
  const { loading, error, data } = useQuery<
    { store: { skins: Skin[] } },
    Credentials
  >(PLAYER_STORE, {
    variables: {
      username: credentials.username,
      password: credentials.password,
    },
  });

  useEffect(() => {
    if (error?.graphQLErrors?.[0]?.message === 'Unauthorized')
      onFailure('auth');
  }, [error]);

  useEffect(() => {
    if (!loading && !data) onFailure('network');
  }, [loading, data]);

  const logoutHandler = async () => {
    // Clear apollo cache
    await client.clearStore().then(() => {
      // Clear localstorage
      localStorage.clear();
      // Go to root page
      window.location.href = '/';
    });
  };

  return (
    <Wrapper>
      <NavigationIcon icon="logout" size={20} onClick={() => logoutHandler()} />
      <ul tw="flex max-h-full justify-center flex-wrap overflow-y-scroll">
        {(data ? data?.store?.skins : [...Array(4)]).map(
          (skin: Skin, index: number) => (
            <li key={data ? skin?.uuid : index} tw="m-4">
              <Card skin={data ? skin : undefined} loading={loading} />
            </li>
          ),
        )}
      </ul>
    </Wrapper>
  );
};

export default Store;
