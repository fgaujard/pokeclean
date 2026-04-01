export const Room = {
  ALL_HOUSE: "ALL_HOUSE",
  KITCHEN: "KITCHEN",
  BATHROOM: "BATHROOM",
  TOILETS: "TOILETS",
  CORRIDOR: "CORRIDOR",
  BALCONY: "BALCONY",
};

export type Room = (typeof Room)[keyof typeof Room];
