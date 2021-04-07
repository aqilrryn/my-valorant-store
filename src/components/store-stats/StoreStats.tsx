import React from 'react';
import 'twin.macro';

import Logo from '../logo/Logo';

const StoreStats: React.FC<{
  loading?: boolean;
  time?: string;
  valorantPoints?: number;
  radianitePoints?: number;
}> = ({ loading, time, valorantPoints, radianitePoints }) => {
  return (
    <>
      {!loading ? (
        <div tw="flex flex-col justify-center items-center">
          <Logo variant="grayed" />
          {time && <p tw="text-white text-3xl mt-6">{time}</p>}
          <div tw="flex justify-between mt-3">
            <p tw="mr-4">
              <span tw="mr-1">V</span>
              {valorantPoints}
            </p>
            <p>
              <span tw="mr-1">R</span>
              {radianitePoints}
            </p>
          </div>
        </div>
      ) : (
        <div tw="flex flex-col justify-center items-center">
          <div tw="bg-primary animate-pulse h-12 w-12 rounded-full" />
          <div tw="bg-primary animate-pulse h-10 w-60 mt-6 rounded-3xl" />
          <div tw="flex justify-between">
            <div tw="bg-primary animate-pulse h-6 w-12 mt-6 rounded-3xl mr-4" />
            <div tw="bg-primary animate-pulse h-6 w-12 mt-6 rounded-3xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default StoreStats;
