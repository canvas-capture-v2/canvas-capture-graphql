-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "total_students" INTEGER NOT NULL,
    "syllabus_body" TEXT NOT NULL,
    "public_description" TEXT NOT NULL,
    "date_statistics_id" INTEGER NOT NULL,
    "score_statistics_id" INTEGER NOT NULL,
    "points_possible" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentGroup" (
    "id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "group_weight" DOUBLE PRECISION NOT NULL,
    "points_possible" INTEGER NOT NULL,
    "score_statistics_id" INTEGER NOT NULL,
    "date_statistics_id" INTEGER NOT NULL,

    CONSTRAINT "AssignmentGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "due_at" TIMESTAMP(3) NOT NULL,
    "unlock_at" TIMESTAMP(3) NOT NULL,
    "course_id" INTEGER NOT NULL,
    "assignment_group_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "points_possible" INTEGER NOT NULL,
    "submission_types" TEXT NOT NULL,
    "has_submitted_submissions" BOOLEAN NOT NULL,
    "published" BOOLEAN NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "anonymous_submissions" BOOLEAN NOT NULL,
    "discussion_topic_id" INTEGER NOT NULL,
    "use_rubric_for_grading" BOOLEAN NOT NULL,
    "rubric_settings_id" INTEGER NOT NULL,
    "allowed_attempts" INTEGER NOT NULL,
    "score_statistics_id" INTEGER NOT NULL,
    "is_quiz_assignment" BOOLEAN NOT NULL,
    "low_submission_id" INTEGER NOT NULL,
    "median_submission_id" INTEGER NOT NULL,
    "high_submission_id" INTEGER NOT NULL,
    "last_submission_date" TIMESTAMP(3) NOT NULL,
    "last_graded_date" TIMESTAMP(3) NOT NULL,
    "num_late_submissions" INTEGER NOT NULL,
    "avg_submissions_per_user" DOUBLE PRECISION NOT NULL,
    "avg_submission_time" TEXT NOT NULL,
    "avg_time_to_grade" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "assignment_id" INTEGER NOT NULL,
    "attempt" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "late" BOOLEAN NOT NULL,
    "excused" BOOLEAN NOT NULL,
    "missing" BOOLEAN NOT NULL,
    "late_policy_status" TEXT NOT NULL,
    "anonymous_id" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "time_late" TEXT NOT NULL,
    "time_to_grade" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionComment" (
    "id" INTEGER NOT NULL,
    "submission_id" INTEGER NOT NULL,
    "author_name" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "edited_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmissionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateStatistics" (
    "id" SERIAL NOT NULL,
    "avg_time_due_to_assigned" TEXT NOT NULL,
    "avg_time_assigned_to_due" TEXT NOT NULL,
    "avg_time_last_past_due" TEXT NOT NULL,
    "avg_time_last_to_grade" TEXT NOT NULL,
    "avg_num_late" DOUBLE PRECISION NOT NULL,
    "avg_submissions" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DateStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreStatistic" (
    "id" SERIAL NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "mean" DOUBLE PRECISION NOT NULL,
    "upper_q" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "lower_q" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ScoreStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubric" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "context_id" INTEGER NOT NULL,
    "context_type" TEXT NOT NULL,
    "points_possible" INTEGER NOT NULL,
    "reusable" BOOLEAN NOT NULL,
    "read_only" BOOLEAN NOT NULL,
    "free_form_criterion_comments" BOOLEAN NOT NULL,
    "hide_score_total" BOOLEAN NOT NULL,

    CONSTRAINT "Rubric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricAssessment" (
    "id" INTEGER NOT NULL,
    "rubric_id" INTEGER NOT NULL,
    "rubric_association_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "artifact_type" TEXT NOT NULL,
    "artifact_id" INTEGER NOT NULL,
    "artifact_attempt" INTEGER NOT NULL,
    "assessment_type" TEXT NOT NULL,
    "assessor_id" INTEGER NOT NULL,
    "data" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "RubricAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricAssociation" (
    "id" INTEGER NOT NULL,
    "rubric_id" INTEGER NOT NULL,
    "association_id" INTEGER NOT NULL,
    "association_type" TEXT NOT NULL,
    "use_for_grading" BOOLEAN NOT NULL,
    "summary_data" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "hide_score_total" BOOLEAN NOT NULL,
    "hide_points" BOOLEAN NOT NULL,
    "hide_outcome_results" BOOLEAN NOT NULL,

    CONSTRAINT "RubricAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricCriteria" (
    "points" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "learning_outcome_id" TEXT NOT NULL,
    "vendor_guid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "criterion_use_range" BOOLEAN NOT NULL,
    "ignore_for_scoring" BOOLEAN NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "rubric_id" INTEGER NOT NULL,

    CONSTRAINT "RubricCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubricRating" (
    "points" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "rubric_criteria_id" TEXT NOT NULL,

    CONSTRAINT "RubricRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionTopic" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "posted_at" TIMESTAMP(3) NOT NULL,
    "last_reply_at" TIMESTAMP(3) NOT NULL,
    "require_initial_post" BOOLEAN NOT NULL,
    "discussion_subentry_count" INTEGER NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "delayed_post_at" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL,
    "lock_at" TIMESTAMP(3) NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "user_name" TEXT NOT NULL,
    "root_topic_id" INTEGER NOT NULL,
    "discussion_type" TEXT NOT NULL,

    CONSTRAINT "DiscussionTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_date_statistics_id_key" ON "Course"("date_statistics_id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_score_statistics_id_key" ON "Course"("score_statistics_id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentGroup_score_statistics_id_key" ON "AssignmentGroup"("score_statistics_id");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentGroup_date_statistics_id_key" ON "AssignmentGroup"("date_statistics_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_discussion_topic_id_key" ON "Assignment"("discussion_topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_rubric_settings_id_key" ON "Assignment"("rubric_settings_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_score_statistics_id_key" ON "Assignment"("score_statistics_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_low_submission_id_key" ON "Assignment"("low_submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_median_submission_id_key" ON "Assignment"("median_submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_high_submission_id_key" ON "Assignment"("high_submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "RubricAssessment_rubric_association_id_key" ON "RubricAssessment"("rubric_association_id");

-- CreateIndex
CREATE UNIQUE INDEX "DiscussionTopic_root_topic_id_key" ON "DiscussionTopic"("root_topic_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_date_statistics_id_fkey" FOREIGN KEY ("date_statistics_id") REFERENCES "DateStatistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_score_statistics_id_fkey" FOREIGN KEY ("score_statistics_id") REFERENCES "ScoreStatistic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroup" ADD CONSTRAINT "AssignmentGroup_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroup" ADD CONSTRAINT "AssignmentGroup_score_statistics_id_fkey" FOREIGN KEY ("score_statistics_id") REFERENCES "ScoreStatistic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentGroup" ADD CONSTRAINT "AssignmentGroup_date_statistics_id_fkey" FOREIGN KEY ("date_statistics_id") REFERENCES "DateStatistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_assignment_group_id_fkey" FOREIGN KEY ("assignment_group_id") REFERENCES "AssignmentGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_discussion_topic_id_fkey" FOREIGN KEY ("discussion_topic_id") REFERENCES "DiscussionTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_rubric_settings_id_fkey" FOREIGN KEY ("rubric_settings_id") REFERENCES "Rubric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_score_statistics_id_fkey" FOREIGN KEY ("score_statistics_id") REFERENCES "ScoreStatistic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_low_submission_id_fkey" FOREIGN KEY ("low_submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_median_submission_id_fkey" FOREIGN KEY ("median_submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_high_submission_id_fkey" FOREIGN KEY ("high_submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionComment" ADD CONSTRAINT "SubmissionComment_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricAssessment" ADD CONSTRAINT "RubricAssessment_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricAssessment" ADD CONSTRAINT "RubricAssessment_rubric_association_id_fkey" FOREIGN KEY ("rubric_association_id") REFERENCES "RubricAssociation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricAssociation" ADD CONSTRAINT "RubricAssociation_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricCriteria" ADD CONSTRAINT "RubricCriteria_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricCriteria" ADD CONSTRAINT "RubricCriteria_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RubricRating" ADD CONSTRAINT "RubricRating_rubric_criteria_id_fkey" FOREIGN KEY ("rubric_criteria_id") REFERENCES "RubricCriteria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionTopic" ADD CONSTRAINT "DiscussionTopic_root_topic_id_fkey" FOREIGN KEY ("root_topic_id") REFERENCES "DiscussionTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
