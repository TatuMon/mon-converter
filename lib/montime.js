export function todayDateString() {
  return new Date().toISOString().replace('-', '');
}

module.exports = {
  todayDateString: todayDateString
}