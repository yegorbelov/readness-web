export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diff = date.getTime() - now.getTime();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  const formatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });

  if (Math.abs(diff) < minute) {
    return formatter.format(Math.round(diff / second), 'second');
  }

  if (Math.abs(diff) < hour) {
    return formatter.format(Math.round(diff / minute), 'minute');
  }

  if (Math.abs(diff) < day) {
    return formatter.format(Math.round(diff / hour), 'hour');
  }

  if (Math.abs(diff) < week) {
    return formatter.format(Math.round(diff / day), 'day');
  }

  if (Math.abs(diff) < month) {
    return formatter.format(Math.round(diff / week), 'week');
  }

  if (Math.abs(diff) < year) {
    return formatter.format(Math.round(diff / month), 'month');
  }

  return formatter.format(Math.round(diff / year), 'year');
}
