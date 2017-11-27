export const timeConverter = (timestamp) => {
  const a = new Date(timestamp);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = ('0'+a.getHours()).slice(-2);
  const min = ('0'+a.getMinutes()).slice(-2);
  const sec = ('0'+a.getSeconds()).slice(-2);
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
};