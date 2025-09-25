/*
  Warnings:

  - Added the required column `medicoId` to the `Atendimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Atendimento" ADD COLUMN     "medicoId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Atendimento_medicoId_idx" ON "Atendimento"("medicoId");
