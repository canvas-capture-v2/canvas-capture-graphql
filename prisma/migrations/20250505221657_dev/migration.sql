-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_discussion_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_rubric_settings_id_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionTopic" DROP CONSTRAINT "DiscussionTopic_root_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricAssessment" DROP CONSTRAINT "RubricAssessment_rubric_association_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricAssessment" DROP CONSTRAINT "RubricAssessment_rubric_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricAssociation" DROP CONSTRAINT "RubricAssociation_rubric_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricCriteria" DROP CONSTRAINT "RubricCriteria_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricCriteria" DROP CONSTRAINT "RubricCriteria_rubric_id_fkey";

-- DropForeignKey
ALTER TABLE "RubricRating" DROP CONSTRAINT "RubricRating_rubric_criteria_id_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionComment" DROP CONSTRAINT "SubmissionComment_submission_id_fkey";

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "submission_types" DROP NOT NULL,
ALTER COLUMN "has_submitted_submissions" DROP NOT NULL,
ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "anonymous_submissions" DROP NOT NULL,
ALTER COLUMN "discussion_topic_id" DROP NOT NULL,
ALTER COLUMN "use_rubric_for_grading" DROP NOT NULL,
ALTER COLUMN "rubric_settings_id" DROP NOT NULL,
ALTER COLUMN "allowed_attempts" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "syllabus_body" DROP NOT NULL,
ALTER COLUMN "public_description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DiscussionTopic" ALTER COLUMN "posted_at" DROP NOT NULL,
ALTER COLUMN "last_reply_at" DROP NOT NULL,
ALTER COLUMN "require_initial_post" DROP NOT NULL,
ALTER COLUMN "discussion_subentry_count" DROP NOT NULL,
ALTER COLUMN "delayed_post_at" DROP NOT NULL,
ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "lock_at" DROP NOT NULL,
ALTER COLUMN "locked" DROP NOT NULL,
ALTER COLUMN "user_name" DROP NOT NULL,
ALTER COLUMN "root_topic_id" DROP NOT NULL,
ALTER COLUMN "discussion_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rubric" ALTER COLUMN "context_id" DROP NOT NULL,
ALTER COLUMN "context_type" DROP NOT NULL,
ALTER COLUMN "points_possible" DROP NOT NULL,
ALTER COLUMN "reusable" DROP NOT NULL,
ALTER COLUMN "read_only" DROP NOT NULL,
ALTER COLUMN "free_form_criterion_comments" DROP NOT NULL,
ALTER COLUMN "hide_score_total" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricAssessment" ALTER COLUMN "rubric_id" DROP NOT NULL,
ALTER COLUMN "rubric_association_id" DROP NOT NULL,
ALTER COLUMN "artifact_type" DROP NOT NULL,
ALTER COLUMN "artifact_id" DROP NOT NULL,
ALTER COLUMN "artifact_attempt" DROP NOT NULL,
ALTER COLUMN "assessment_type" DROP NOT NULL,
ALTER COLUMN "assessor_id" DROP NOT NULL,
ALTER COLUMN "data" DROP NOT NULL,
ALTER COLUMN "comments" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricAssociation" ALTER COLUMN "rubric_id" DROP NOT NULL,
ALTER COLUMN "association_id" DROP NOT NULL,
ALTER COLUMN "association_type" DROP NOT NULL,
ALTER COLUMN "use_for_grading" DROP NOT NULL,
ALTER COLUMN "summary_data" DROP NOT NULL,
ALTER COLUMN "purpose" DROP NOT NULL,
ALTER COLUMN "hide_score_total" DROP NOT NULL,
ALTER COLUMN "hide_points" DROP NOT NULL,
ALTER COLUMN "hide_outcome_results" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricCriteria" ALTER COLUMN "learning_outcome_id" DROP NOT NULL,
ALTER COLUMN "vendor_guid" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "long_description" DROP NOT NULL,
ALTER COLUMN "criterion_use_range" DROP NOT NULL,
ALTER COLUMN "ignore_for_scoring" DROP NOT NULL,
ALTER COLUMN "assignment_id" DROP NOT NULL,
ALTER COLUMN "rubric_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RubricRating" ALTER COLUMN "points" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "long_description" DROP NOT NULL,
ALTER COLUMN "rubric_criteria_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "late" DROP NOT NULL,
ALTER COLUMN "excused" DROP NOT NULL,
ALTER COLUMN "missing" DROP NOT NULL,
ALTER COLUMN "late_policy_status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubmissionComment" ALTER COLUMN "submission_id" DROP NOT NULL,
ALTER COLUMN "author_name" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "edited_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_discussion_topic_id_fkey" FOREIGN KEY ("discussion_topic_id") REFERENCES "DiscussionTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_rubric_settings_id_fkey" FOREIGN KEY ("rubric_settings_id") REFERENCES "Rubric"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionComment" ADD CONSTRAINT "SubmissionComment_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricAssessment" ADD CONSTRAINT "RubricAssessment_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricAssessment" ADD CONSTRAINT "RubricAssessment_rubric_association_id_fkey" FOREIGN KEY ("rubric_association_id") REFERENCES "RubricAssociation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricAssociation" ADD CONSTRAINT "RubricAssociation_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricCriteria" ADD CONSTRAINT "RubricCriteria_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricCriteria" ADD CONSTRAINT "RubricCriteria_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRating" ADD CONSTRAINT "RubricRating_rubric_criteria_id_fkey" FOREIGN KEY ("rubric_criteria_id") REFERENCES "RubricCriteria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionTopic" ADD CONSTRAINT "DiscussionTopic_root_topic_id_fkey" FOREIGN KEY ("root_topic_id") REFERENCES "DiscussionTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
