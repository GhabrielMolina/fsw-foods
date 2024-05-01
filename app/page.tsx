import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      // Filtrar produtos com desconto (Buscar produtos ONDE o DESCONTO é MAIOR que 0)
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10, // Limitar a 10 produtos
    include: {
      restaurant: {
        select: {
          name: true,
        }, // Selecionar apenas o nome do restaurante
      },
    },
  });

  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain" // object-contain para manter a proporção da imagem e preencher o espaço
          sizes="100vw" // Tamanho da imagem em relação à tela quando não há um width definido
          quality={100} // Qualidade da imagem
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
