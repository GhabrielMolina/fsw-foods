"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  // Pick é um utilitário do TypeScript que permite selecionar propriedades específicas de um tipo que deseja utilizar e não precisa de todas as propriedades
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  // useRouter é um hook do Next.js que fornece acesso ao objeto de roteamento do Next.js
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full bg-gray-700"
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
