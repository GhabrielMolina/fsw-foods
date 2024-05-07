"use client";

import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

// Contexto basicamente é um objeto que contém informações que podem ser acessadas por qualquer componente filho que esteja dentro do contexto
// Interface que define o formato de um produto (Product) com um id (id), nome (name), descrição (description), preço (price) e porcentagem de desconto (discountPercentage)

// Interface que define o formato de um produto no carrinho de compras (CartProduct) que é um produto (Product) com uma quantidade (quantity)
export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
        };
      };
    };
  }> {
  quantity: number;
}

// Interface que define o formato do contexto do carrinho de compras (ICardContext) com um array de produtos (products) e uma função para adicionar produtos ao carrinho (addProductToCart)
interface ICardContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

// Criar o contexto do carrinho de compras com um valor inicial vazio e uma função vazia para adicionar produtos ao carrinho de compras (addProductToCart) e exportar o contexto
export const CartContext = createContext<ICardContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

// Componente que provê o contexto do carrinho de compras para os componentes filhos com os produtos e a função para adicionar produtos ao carrinho de compras
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  // Calcular o preço total de um produto no carrinho de compras com base no preço total do produto e a quantidade do produto
  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  // Calcular o preço total dos produtos no carrinho de compras com base no preço total de cada produto e a quantidade de cada produto
  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)
    );
  }, [products]);

  const totalDiscounts = subtotalPrice - totalPrice;

  // Função que diminui a quantidade de um produto no carrinho de compras e atualiza o estado dos produtos
  const decreaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) return cartProduct;
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  // Função que aumenta a quantidade de um produto no carrinho de compras e atualiza o estado dos produtos
  const increaseProductQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  // Função que remove um produto do carrinho de compras e atualiza o estado dos produtos
  const removeProductFromCart = (productId: string) => {
    return setProducts((prev) =>
      // Filtrar os produtos para remover o produto com o id passado como argumento da função removeProductFromCart (productId) do array de produtos (prev) e retornar um novo array sem o produto removido
      prev.filter((product) => product.id !== productId),
    );
  };

  // Função que adiciona um produto ao carrinho de compras com uma quantidade inicial de 0 (zero) e atualiza o estado dos produtos
  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            deliveryFee: true;
          };
        };
      };
    }>;
    quantity: number;
    emptyCart?: boolean;
  }) => {
    if (emptyCart) {
      setProducts([]);
    }

    // Verificar se o produto já está no carrinho de compras
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    // Se o produto já estiver no carrinho de compras, atualizar a quantidade do produto no carrinho de compras
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        }),
      );
    }

    setProducts((prev) => [...prev, { ...product, quantity: quantity }]);
  };

  return (
    // Prover o contexto do carrinho de compras com os produtos e a função para adicionar produtos ao carrinho para os componentes filhos
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
