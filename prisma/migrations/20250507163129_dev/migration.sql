-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_high_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_low_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_median_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_score_statistics_id_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentGroup" DROP CONSTRAINT "AssignmentGroup_course_id_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentGroup" DROP CONSTRAINT "AssignmentGroup_date_statistics_id_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentGroup" DROP CONSTRAINT "AssignmentGroup_score_statistics_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_date_statistics_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_score_statistics_id_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_assignment_id_fkey";

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "due_at" DROP NOT NULL,
ALTER COLUMN "unlock_at" DROP NOT NULL,
ALTER COLUMN "course_id" DROP NOT NULL,
ALTER COLUMN "points_possible" DROP NOT NULL,
ALTER COLUMN "quiz_id" DROP NOT NULL,
ALTER COLUMN "score_statistics_id" DROP NOT NULL,
ALTER COLUMN "is_quiz_assignment" DROP NOT NULL,
ALTER COLUMN "low_submission_id" DROP NOT NULL,
ALTER COLUMN "median_submission_id" DROP NOT NULL,
ALTER COLUMN "high_submission_id" DROP NOT NULL,
ALTER COLUMN "last_submission_date" DROP NOT NULL,
ALTER COLUMN "last_graded_date" DROP NOT NULL,
ALTER COLUMN "num_late_submissions" DROP NOT NULL,
ALTER COLUMN "avg_submissions_per_user" DROP NOT NULL,
ALTER COLUMN "avg_submission_time" DROP NOT NULL,
ALTER COLUMN "avg_time_to_grade" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AssignmentGroup" ALTER COLUMN "course_id" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "group_weight" DROP NOT NULL,
ALTER COLUMN "points_possible" DROP NOT NULL,
ALTER COLUMN "score_statistics_id" DROP NOT NULL,
ALTER COLUMN "date_statistics_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "course_code" DROP NOT NULL,
ALTER COLUMN "start_at" DROP NOT NULL,
ALTER COLUMN "end_at" DROP NOT NULL,
ALTER COLUMN "total_students" DROP NOT NULL,
ALTER COLUMN "date_statistics_id" DROP NOT NULL,
ALTER COLUMN "score_statistics_id" DROP NOT NULL,
ALTER COLUMN "points_possible" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DateStatistics" ALTER COLUMN "avg_time_assigned_to_due" DROP NOT NULL,
ALTER COLUMN "avg_time_last_past_due" DROP NOT NULL,
ALTER COLUMN "avg_time_last_to_grade" DROP NOT NULL,
ALTER COLUMN "avg_num_late" DROP NOT NULL,
ALTER COLUMN "avg_submissions" DROP NOT NULL,
ALTER COLUMN "avg_num_assignments_due_per_day" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DiscussionTopic" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rubric" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricAssessment" ALTER COLUMN "score" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricCriteria" ALTER COLUMN "points" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ScoreStatistic" ALTER COLUMN "min" DROP NOT NULL,
ALTER COLUMN "max" DROP NOT NULL,
ALTER COLUMN "mean" DROP NOT NULL,
ALTER COLUMN "upper_q" DROP NOT NULL,
ALTER COLUMN "median" DROP NOT NULL,
ALTER COLUMN "lower_q" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "assignment_id" DROP NOT NULL,
ALTER COLUMN "attempt" DROP NOT NULL,
ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "submitted_at" DROP NOT NULL,
ALTER COLUMN "anonymous_id" DROP NOT NULL,
ALTER COLUMN "time_late" DROP NOT NULL,
ALTER COLUMN "time_to_grade" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_date_statistics_id_fkey" FOREIGN KEY ("date_statistics_id") REFERENCES "DateStatistics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_score_statistics_id_fkey" FOREIGN KEY ("score_statistics_id") REFERENCES "ScoreStatistic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroup" ADD CONSTRAINT "AssignmentGroup_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroup" ADD CONSTRAINT "AssignmentGroup_score_statistics_id_fkey" FOREIGN KEY ("score_statistics_id") REFERENCES "ScoreStatistic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroup" ADD CONSTRAINT "AssignmentGroup_date_statistics_id_fkey" FOREIGN KEY ("date_statistics_id") REFERENCES "DateStatistics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_score_statistics_id_fkey" FOREIGN KEY ("score_statistics_id") REFERENCES "ScoreStatistic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_low_submission_id_fkey" FOREIGN KEY ("low_submission_id") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_median_submission_id_fkey" FOREIGN KEY ("median_submission_id") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_high_submission_id_fkey" FOREIGN KEY ("high_submission_id") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
