import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import 'twin.macro';

import type { Credentials, PlayerBalance } from 'types/userTypes';
import type { Skin } from 'types/weaponTypes';
import { Card } from '../components/card/Card';
import Wrapper from '../components/page-wrapper/PageWrapper';
import NavigationIcon from '../components/navigation-icon/NavigationIcon';
import { client } from '../index';
import StoreStats from '../components/store-stats/StoreStats';

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

const PLAYER_BALANCE = gql`
  query GetPlayerBalance($username: String!, $password: String!) {
    player(username: $username, password: $password) {
      balance {
        valorantPoints
        radianitePoints
      }
    }
  }
`;

const Store: React.FC<{
  credentials: Credentials;
  onFailure: (mode: 'network' | 'auth') => void;
}> = ({ credentials, onFailure }) => {
  const {
    loading: loadingStore,
    error: storeError,
    data: storeData,
  } = useQuery<{ store: { skins: Skin[] } }, Credentials>(PLAYER_STORE, {
    variables: {
      username: credentials.username,
      password: credentials.password,
    },
  });

  const {
    loading: loadingBalance,
    error: balanceError,
    data: balanceData,
  } = useQuery<{ balance: PlayerBalance }, Credentials>(PLAYER_BALANCE, {
    variables: {
      username: credentials.username,
      password: credentials.password,
    },
  });

  useEffect(() => {
    if (storeError?.graphQLErrors?.[0]?.message === 'Unauthorized')
      onFailure('auth');
  }, [storeError]);

  useEffect(() => {
    if (!loadingStore && !storeData) onFailure('network');
  }, [loadingStore, storeData]);

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
      <div tw="flex flex-col">
        <div tw="mt-11 mb-12">
          <StoreStats
            loading={loadingBalance}
            valorantPoints={balanceData?.balance?.valorantPoints ?? 0}
            radianitePoints={balanceData?.balance?.radianitePoints ?? 0}
          />
        </div>
        <ul tw="flex max-h-full justify-center flex-wrap overflow-y-scroll">
          {(storeData ? storeData?.store?.skins : [...Array(4)]).map(
            (skin: Skin, index: number) => (
              <li key={storeData ? skin?.uuid : index} tw="m-4">
                <Card
                  skin={storeData ? skin : undefined}
                  loading={loadingStore}
                />
              </li>
            ),
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Store;
