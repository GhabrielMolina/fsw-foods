/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;

// Basicamente arquivo que garante que o Prisma seja instanciado apenas uma vez toda vez que a aplicação for iniciada e que ele seja reutilizado em todas as requisições
// Usando o PrismaClient para fazer as queries no banco de dados
