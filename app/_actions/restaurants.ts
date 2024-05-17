"use server";

import { db } from "../_lib/prisma";

export const favoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const userAlreadyFavorited = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (userAlreadyFavorited) {
    throw new Error("Restaurante já favoritado");
  }

  return db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  });
};
