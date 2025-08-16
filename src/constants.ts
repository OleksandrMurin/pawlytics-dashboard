export const METRICS = {
  AVG_FOOD_BY_SPECIES: "avgFoodBySpecies",
  COMPLEX_ANALYTICS: "complexAnalytics",
  ROOM_EXPENCES: "roomExpences",
  ROOM_PROFIT: "roomProfit",
  ROOM_VISITS: "roomVisits",
  VISITS_BY_SPECIES: "visitsBySpecies",
} as const;

export const METRICS_LABELS = {
  [METRICS.AVG_FOOD_BY_SPECIES]: {
    id: "chart-10",
    name: "Average food by species",
    endpoint: "api/hotels/avg-food-by-species/?year=",
  },
  [METRICS.COMPLEX_ANALYTICS]: {
    id: "chart-20",
    name: "Complex analytics",
    endpoint: "api/hotels/complex-analytics/?year=",
  },
  [METRICS.ROOM_EXPENCES]: {
    id: "chart-30",
    name: "Room expences",
    endpoint: "api/hotels/room-expences/?year=",
  },
  [METRICS.ROOM_PROFIT]: {
    id: "chart-40",
    name: "Room profit",
    endpoint: "api/hotels/room-profit/?year=",
  },
  [METRICS.ROOM_VISITS]: {
    id: "chart-50",
    name: "Room visits",
    endpoint: "api/hotels/room-visits/?year=",
  },
  [METRICS.VISITS_BY_SPECIES]: {
    id: "chart-60",
    name: "Visits by species",
    endpoint: "api/hotels/visits-by-species/?year=",
  },
};
