/*
  Warnings:

  - You are about to drop the column `avg_time_due_to_assigned` on the `DateStatistics` table. All the data in the column will be lost.
  - Added the required column `avg_num_assignments_due_per_day` to the `DateStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DateStatistics" DROP COLUMN "avg_time_due_to_assigned",
ADD COLUMN     "avg_num_assignments_due_per_day" DOUBLE PRECISION NOT NULL;
