import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export const clockToDateString = (time: number) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  const inSeconds = new Date(time).getTime();
  const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);

  return minutesAgo;
};
