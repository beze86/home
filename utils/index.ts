import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';

const getWeekDays = () => {
  dayjs.extend(weekday);

  return {
    nextMonday: dayjs().weekday(1 + 7),
    nextSunday: dayjs().weekday(0 + 14),
  };
};

const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { shuffle, getWeekDays };
