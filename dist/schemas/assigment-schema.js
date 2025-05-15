import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { submission_input, submission_type } from "./submission-schema.js";
import { score_statistics_input, score_statistics_type } from "./stats-schema.js";
import { PrismaClient } from "../../prisma/app/generated/prisma/client/index.js";
import { rubric_criteria_input, rubric_criteria_type, rubric_input, rubric_type } from "./rubric-schema.js";
import { discussion_topic_input, discussion_topic_type } from "./discussion_topic-schema.js";
const prisma = new PrismaClient();
export const submission_types_enum = new GraphQLEnumType({
    name: 'submission_types',
    values: {
        DISCUSSION_TOPIC: { value: 'discussion_topic' },
        ONLINE_QUIZ: { value: 'online_quiz' },
        ON_PAPER: { value: 'on_paper' },
        NONE: { value: 'none' },
        EXTERNAL_TOOL: { value: 'external_tool' },
        ONLINE_TEXT_ENTRY: { value: 'online_text_entry' },
        ONLINE_URL: { value: 'online_url' },
        ONLINE_UPLOAD: { value: 'online_upload' },
        MEDIA_RECORDING: { value: 'media_recording' },
        STUDENT_ANNOTATION: { value: 'student_annotation' }
    }
});
export const assignment_type = new GraphQLObjectType({
    name: 'Assignment',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        updated_at: { type: GraphQLString },
        due_at: { type: GraphQLString },
        unlock_at: { type: GraphQLString },
        course_id: { type: GraphQLInt },
        assignment_group_id: { type: GraphQLInt },
        position: { type: GraphQLInt },
        points_possible: { type: GraphQLInt },
        submission_types: { type: GraphQLString },
        has_submitted_submissions: { type: GraphQLBoolean },
        published: { type: GraphQLBoolean },
        quiz_id: { type: GraphQLInt },
        anonymous_submissions: { type: GraphQLBoolean },
        discussion_topic: { type: discussion_topic_type },
        use_rubric_for_grading: { type: GraphQLBoolean },
        rubric_settings: { type: rubric_type },
        rubric: { type: new GraphQLList(rubric_criteria_type) },
        allowed_attempts: { type: GraphQLInt },
        score_statistics: { type: score_statistics_type },
        is_quiz_assignment: { type: GraphQLBoolean },
        submissions: { type: new GraphQLList(submission_type) },
        low_submission: { type: submission_type },
        median_submission: { type: submission_type },
        high_submission: { type: submission_type },
        last_submission_date: { type: GraphQLString },
        last_graded_date: { type: GraphQLString },
        num_late_submissions: { type: GraphQLInt },
        avg_submissions_per_user: { type: GraphQLFloat },
        avg_submission_time: { type: GraphQLString },
        avg_time_to_grade: { type: GraphQLString },
    }
});
export const assignment_input = new GraphQLInputObjectType({
    name: 'AssignmentInput',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        updated_at: { type: GraphQLString },
        due_at: { type: GraphQLString },
        unlock_at: { type: GraphQLString },
        course_id: { type: GraphQLInt },
        assignment_group_id: { type: GraphQLInt },
        position: { type: GraphQLInt },
        points_possible: { type: GraphQLInt },
        submission_types: { type: GraphQLString },
        has_submitted_submissions: { type: GraphQLBoolean },
        published: { type: GraphQLBoolean },
        quiz_id: { type: GraphQLInt },
        anonymous_submissions: { type: GraphQLBoolean },
        discussion_topic: { type: discussion_topic_input },
        use_rubric_for_grading: { type: GraphQLBoolean },
        rubric_settings: { type: rubric_input },
        rubric: { type: new GraphQLList(rubric_criteria_input) },
        allowed_attempts: { type: GraphQLInt },
        score_statistics: { type: score_statistics_input },
        is_quiz_assignment: { type: GraphQLBoolean },
        submissions: { type: new GraphQLList(submission_input) },
        low_submission: { type: submission_input },
        median_submission: { type: submission_input },
        high_submission: { type: submission_input },
        last_submission_date: { type: GraphQLString },
        last_graded_date: { type: GraphQLString },
        num_late_submissions: { type: GraphQLInt },
        avg_submissions_per_user: { type: GraphQLFloat },
        avg_submission_time: { type: GraphQLString },
        avg_time_to_grade: { type: GraphQLString },
    }
});
export const assignment_query = new GraphQLObjectType({
    name: 'AssignmentQuery',
    fields: {
        assignment: {
            type: assignment_type,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, { id }) => {
                return prisma.assignment.findUnique({
                    where: {
                        id: id
                    },
                    include: {
                        submissions: true,
                        low_submission: true,
                        median_submission: true,
                        high_submission: true,
                        score_statistics: true
                    }
                });
            }
        },
        assignment_group_assignments: {
            type: new GraphQLList(assignment_type),
            args: {
                assignment_group_id: { type: GraphQLInt },
                ids: { type: new GraphQLList(GraphQLInt) }
            },
            resolve: (_, { assignment_group_id, ids }) => {
                return prisma.assignment.findMany({
                    where: {
                        assignment_group_id: assignment_group_id,
                        id: { in: ids }
                    },
                    include: {
                        submissions: true,
                        low_submission: true,
                        median_submission: true,
                        high_submission: true,
                        score_statistics: true
                    }
                });
            }
        }
    }
});
export const assignment_schema = new GraphQLSchema({ query: assignment_query });
