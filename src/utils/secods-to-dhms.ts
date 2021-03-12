export const secondsToDhms = (value: number) => {
  const d = Math.floor(value / (3600 * 24));
  const h = Math.floor((value % (3600 * 24)) / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = Math.floor(value % 60);
  const dDisplay = d > 0 ? d + (d === 1 ? 'z ' : 'z ') : '';
  const hDisplay = h > 0 ? h + (h === 1 ? 'h ' : 'h ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? 'm ' : 'm ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? 's' : 's') : '';
  return d > 0 ? dDisplay : dDisplay + hDisplay + mDisplay + sDisplay;
};
