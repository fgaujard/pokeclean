import axiosInstance from "@lib/axios";

import { queryClient } from "../lib/queryClient";

import type { Card } from "@models";

interface BuyBoosterPayload {
  userId: string;
  boosterId: string;
  quantity: number;
}

export const buyBooster = async (
  payload: BuyBoosterPayload,
): Promise<Card[][]> => {
  const { userId, boosterId, quantity } = payload;

  const queryParams = new URLSearchParams();
  if (quantity) {
    queryParams.append("quantity", quantity.toString());
  }

  const { data } = await axiosInstance
    .post<
      Card[][]
    >(`/users/${userId}/boosters/${boosterId}/purchase?${queryParams.toString()}`)
    .then((data) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["users"] }),
        queryClient.invalidateQueries({ queryKey: ["pokemons-found"] }),
        queryClient.invalidateQueries({ queryKey: ["pokemons-count"] }),
        queryClient.invalidateQueries({ queryKey: ["binder-cards"] }),
      ]);
      return data;
    });

  return data;
};
