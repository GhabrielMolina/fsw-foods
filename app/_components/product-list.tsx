import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
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
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
