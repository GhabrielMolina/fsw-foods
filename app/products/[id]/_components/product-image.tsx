"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  // Pick é um utilitário do TypeScript que permite selecionar propriedades específicas de um tipo que deseja utilizar e não precisa de todas as propriedades
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  // useRouter é um hook do Next.js que fornece acesso ao objeto de roteamento do Next.js
  const router = useRouter();
  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
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
    </div>
  );
};

export default ProductImage;
