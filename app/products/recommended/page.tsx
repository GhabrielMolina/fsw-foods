import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  // TODO
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
      <div className="px-5 py-6">
        <h2 className="font-lg mb-6 font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedProductsPage;
