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

// === Heart Rate Zone Calculations ===

// Calculate Max Heart Rate (Tanaka formula: 208 - 0.7 * age)
export function calculateMaxHR(age) {
  return Math.round(208 - (0.7 * age));
}

// Calculate Heart Rate Reserve (Karvonen formula)
export function calculateHRR(maxHR, restingHR) {
  return maxHR - restingHR;
}

// Calculate Target HR for a zone (Karvonen)
export function calculateTargetHR(restingHR, hrr, lowPercent, highPercent) {
  const low = Math.round(restingHR + (hrr * lowPercent));
  const high = Math.round(restingHR + (hrr * highPercent));
  return { low, high };
}

// 5-Zone Training (based on % of HRR)
export const HR_ZONES = [
  { zone: 1, name: 'Recovery', color: '#94A3B8', bg: '#F1F5F9', lowPercent: 0.50, highPercent: 0.60, description: 'Active recovery, warm-up, cool-down' },
  { zone: 2, name: 'Aerobic', color: '#3B82F6', bg: '#EFF6FF', lowPercent: 0.60, highPercent: 0.70, description: 'Base building, fat burning, endurance' },
  { zone: 3, name: 'Tempo', color: '#22C55E', bg: '#F0FDF4', lowPercent: 0.70, highPercent: 0.80, description: 'Aerobic capacity, comfortably hard' },
  { zone: 4, name: 'Threshold', color: '#F59E0B', bg: '#FFFBEB', lowPercent: 0.80, highPercent: 0.90, description: 'Lactate threshold, race pace' },
  { zone: 5, name: 'VO2 Max', color: '#EF4444', bg: '#FEF2F2', lowPercent: 0.90, highPercent: 1.00, description: 'Max effort, intervals, speed work' },
];

// Calculate all zones
export function calculateAllZones(maxHR, restingHR) {
  const hrr = calculateHRR(maxHR, restingHR);
  return HR_ZONES.map(zone => {
    const hr = calculateTargetHR(restingHR, hrr, zone.lowPercent, zone.highPercent);
    const lowPace = maxHR >= 180 ? 7.5 : 8.0; // rough pace estimate
    return {
      ...zone,
      heartRate: hr,
      targetPercent: `${Math.round(zone.lowPercent * 100)}-${Math.round(zone.highPercent * 100)}%`
    };
  });
}

// Estimate pace for a given HR zone (based on typical runner)
// This is a rough estimation - real pace depends on fitness
export function estimatePaceForZone(zone, currentPace) {
  if (!currentPace || currentPace <= 0) return null;
  
  // Zone 3 is typically race pace for most runners
  const zoneMultipliers = {
    1: 1.4,   // 40% slower than tempo
    2: 1.2,   // 20% slower
    3: 1.0,   // tempo pace (baseline)
    4: 0.9,   // 10% faster
    5: 0.8,   // 20% faster
  };
  
  const multiplier = zoneMultipliers[zone] || 1.0;
  return Math.round(currentPace * multiplier);
}

// Training recommendations per zone
export const ZONE_TRAINING = [
  { zone: 1, weekly: '20-30%', sessions: 'Recovery runs, easy jog', intensity: 'Very Easy' },
  { zone: 2, weekly: '50-60%', sessions: 'Long runs, base training', intensity: 'Easy' },
  { zone: 3, weekly: '15-20%', sessions: 'Tempo runs, marathon pace', intensity: 'Moderate' },
  { zone: 4, weekly: '5-10%', sessions: 'Threshold runs, intervals', intensity: 'Hard' },
  { zone: 5, weekly: '2-5%', sessions: 'Speed work, hill repeats', intensity: 'Very Hard' },
];
