import {
    GraphQLBoolean,
    GraphQLEnumType, GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";
import {PrismaClient} from '../../prisma/app/generated/prisma/client/index.js'

const prisma = new PrismaClient()

export const late_policy_status_enum = new GraphQLEnumType({
    name: 'late_policy_status',
    values: {
        LATE: {value: 'late'},
        MISSING: {value: 'missing'},
        EXTENDED: {value: 'extended'},
        NONE: {value: 'none'}
    }
})

export const submission_comment_type = new GraphQLObjectType({
    name: 'SubmissionComment',
    fields: {
        id: {type: GraphQLInt},
        author_name: {type: GraphQLString},
        comment: {type: GraphQLString},
        created_at: {type: GraphQLString},
        edited_at: {type: GraphQLString},
    }
})

export const submission_comment_input = new GraphQLInputObjectType({
    name: 'SubmissionCommentInput',
    fields: {
        id: {type: GraphQLInt},
        author_name: {type: GraphQLString},
        comment: {type: GraphQLString},
        created_at: {type: GraphQLString},
        edited_at: {type: GraphQLString},
    }
})

export const submission_type = new GraphQLObjectType({
    name: 'Submission',
    fields: {
        assignment_id: {type: GraphQLInt},
        attempt: {type: GraphQLInt},
        body: {type: GraphQLString},
        score: {type: GraphQLInt},
        submission_comments: {type: new GraphQLList(submission_comment_type)},
        submitted_at: {type: GraphQLString},
        user_id: {type: GraphQLInt},
        late: {type: GraphQLBoolean},
        excused: {type: GraphQLBoolean},
        missing: {type: GraphQLBoolean},
        late_policy_status: {type: late_policy_status_enum},
        anonymous_id: {type: GraphQLString},
        id: {type: GraphQLInt},
        time_late: {type: GraphQLString},
        time_to_grade: {type: GraphQLString}
    },
})

export const submission_input = new GraphQLInputObjectType({
    name: 'SubmissionInput',
    fields: {
        assignment_id: {type: GraphQLInt},
        attempt: {type: GraphQLInt},
        body: {type: GraphQLString},
        score: {type: GraphQLInt},
        submission_comments: {type: new GraphQLList(submission_comment_input)},
        submitted_at: {type: GraphQLString},
        user_id: {type: GraphQLInt},
        late: {type: GraphQLBoolean},
        excused: {type: GraphQLBoolean},
        missing: {type: GraphQLBoolean},
        late_policy_status: {type: late_policy_status_enum},
        anonymous_id: {type: GraphQLString},
        id: {type: GraphQLInt},
        time_late: {type: GraphQLString},
        time_to_grade: {type: GraphQLString}
    }
})

export const submission_query = new GraphQLObjectType({
    name: 'SubmissionQuery',
    fields: {
        submission: {
            type: submission_type,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (_, { id }) => {
                return prisma.submission.findUnique({
                    where: {
                        id: id
                    }
                })
            }
        },
        submissions: {
            type: new GraphQLList(submission_type),
            resolve: (_: any, {assignment_id}: any) => {
                return prisma.submission.findMany({
                    where: {
                        assignment_id: assignment_id
                    }
                })
            }
        }
    }
})

export const submission_schema = new GraphQLSchema({ query: submission_query })