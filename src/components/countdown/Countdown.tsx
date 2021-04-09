import React, { useEffect, useMemo, useState } from 'react';
import 'twin.macro';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const calculateTimeToMidnight = (): dayjs.Dayjs => {
  const midnight = new Date(new Date().setHours(24, 0, 0, 0));

  const now = Date.now();
  const diff = new Date(Math.abs(midnight.getTime() - now));

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const zone = dayjs.tz.guess();
  const difference = dayjs(diff).tz(zone, true);

  return difference;
};

export const CountdownTimer: React.FC = () => {
  const initialTimeLeft = useMemo(() => calculateTimeToMidnight(), []);

  const [timeLeft, setTimeLeft] = useState<dayjs.Dayjs>(initialTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeLeft = calculateTimeToMidnight();
      if (
        currentTimeLeft &&
        Object.keys(currentTimeLeft).length === 0 &&
        currentTimeLeft.constructor === Object
      )
        clearInterval(interval);
      setTimeLeft(currentTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p tw="text-3xl">
      {timeLeft?.hour() ?? '00'}:{timeLeft?.minute() ?? '00'}:
      {timeLeft?.second() ?? '00'}
    </p>
  );
};

export default CountdownTimer;
