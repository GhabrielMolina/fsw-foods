"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

// Função para criar um pedido (createOrder) com base nos dados de um pedido (data) e retornar o pedido criado
export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return db.order.create({ data });
};
