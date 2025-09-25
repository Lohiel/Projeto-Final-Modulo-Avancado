/*
  Warnings:

  - Added the required column `motivo` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `prioridade` on the `Paciente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "motivo" TEXT NOT NULL,
DROP COLUMN "prioridade",
ADD COLUMN     "prioridade" INTEGER NOT NULL;
