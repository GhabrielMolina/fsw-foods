"use client";

import { notFound, useSearchParams } from "next/navigation";
import Header from "../_components/header";
import { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";
import RestaurantItem from "../_components/restaurant-item";
import { searchForRestaurants } from "./_actions/search";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;

      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="font-lg mb-6 font-semibold">Restaurantes Encontrados</h2>
        <div className="grid grid-cols-2 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
