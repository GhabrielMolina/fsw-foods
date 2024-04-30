import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  // Pegar as categorias do banco de dados
  // Renderizar um item para cada categoria

  const categories = await db.category.findMany({}); // Busca todas as categorias dentro do banco de dados

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
