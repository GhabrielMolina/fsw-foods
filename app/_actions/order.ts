"use server";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";

// Função para criar um pedido (createOrder) com base nos dados de um pedido (data) e retornar o pedido criado
export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/my-orders");
};
