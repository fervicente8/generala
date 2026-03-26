-- AlterTable
ALTER TABLE "GameUser" ADD COLUMN IF NOT EXISTS "scoreSheetPrefs" JSONB;
