// Distance presets in km
export const DISTANCE_PRESETS = [
  { label: '1K', value: 1 },
  { label: '3K', value: 3 },
  { label: '5K', value: 5 },
  { label: '10K', value: 10 },
  { label: '15K', value: 15 },
  { label: '21.1K', value: 21.1 },
  { label: '42.195K', value: 42.195 },
];

// Convert time to seconds
export function timeToSeconds(hours, minutes, seconds) {
  return (hours * 3600) + (minutes * 60) + seconds;
}

// Convert seconds to HH:MM:SS
export function secondsToTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);
  
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Convert pace (seconds per km) to MM:SS/km
export function paceToDisplay(paceSeconds) {
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = Math.round(paceSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Calculate pace from distance and time
export function calculatePace(distanceKm, totalSeconds) {
  if (distanceKm <= 0 || totalSeconds <= 0) return 0;
  return totalSeconds / distanceKm;
}

// Calculate speed from distance and time (km/h)
export function calculateSpeed(distanceKm, totalSeconds) {
  if (distanceKm <= 0 || totalSeconds <= 0) return 0;
  return (distanceKm / totalSeconds) * 3600;
}

// Calculate distance from pace and time
export function calculateDistance(paceSecondsPerKm, totalSeconds) {
  if (paceSecondsPerKm <= 0 || totalSeconds <= 0) return 0;
  return totalSeconds / paceSecondsPerKm;
}

// Calculate time from distance and pace
export function calculateTime(distanceKm, paceSecondsPerKm) {
  if (distanceKm <= 0 || paceSecondsPerKm <= 0) return 0;
  return distanceKm * paceSecondsPerKm;
}

// Race time prediction using Riegel formula
// T2 = T1 × (D2 / D1)^1.06
export function predictRaceTime(referenceTimeSeconds, referenceDistanceKm, targetDistanceKm) {
  if (referenceTimeSeconds <= 0 || referenceDistanceKm <= 0 || targetDistanceKm <= 0) {
    return 0;
  }
  return referenceTimeSeconds * Math.pow(targetDistanceKm / referenceDistanceKm, 1.06);
}

// Convert km to miles
export function kmToMiles(km) {
  return km * 0.621371;
}

// Convert miles to km
export function milesToKm(miles) {
  return miles / 0.621371;
}
