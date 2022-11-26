export function todayDateString() {
  return new Date().toISOString().substring(0, 10).replace(/[^0-9]/g, '');
}

module.exports = {
  todayDateString: todayDateString
}