import { PrismaClient } from '../../prisma/app/generated/prisma/client/index.js';
import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
const prisma = new PrismaClient();
export const date_statistics_type = new GraphQLObjectType({
    name: 'DateStatistic',
    fields: {
        id: { type: GraphQLInt },
        avg_time_due_to_assigned: { type: GraphQLString },
        avg_time_assigned_to_due: { type: GraphQLString },
        avg_time_last_past_due: { type: GraphQLString },
        avg_time_last_to_grade: { type: GraphQLString },
        avg_num_late: { type: GraphQLFloat },
        avg_submissions: { type: GraphQLFloat },
    }
});
export const date_statistics_input = new GraphQLInputObjectType({
    name: 'DateStatisticInput',
    fields: {
        avg_time_due_to_assigned: { type: GraphQLString },
        avg_time_assigned_to_due: { type: GraphQLString },
        avg_time_last_past_due: { type: GraphQLString },
        avg_time_last_to_grade: { type: GraphQLString },
        avg_num_late: { type: GraphQLFloat },
        avg_submissions: { type: GraphQLFloat },
    }
});
export const score_statistics_type = new GraphQLObjectType({
    name: 'ScoreStatistic',
    fields: {
        id: { type: GraphQLInt },
        min: { type: GraphQLFloat },
        max: { type: GraphQLFloat },
        mean: { type: GraphQLFloat },
        upper_q: { type: GraphQLFloat },
        median: { type: GraphQLFloat },
        lower_q: { type: GraphQLFloat },
    }
});
export const score_statistics_input = new GraphQLInputObjectType({
    name: 'ScoreStatisticInput',
    fields: {
        min: { type: GraphQLInt },
        max: { type: GraphQLInt },
        mean: { type: GraphQLInt },
        upper_q: { type: GraphQLInt },
        median: { type: GraphQLInt },
        lower_q: { type: GraphQLInt },
    }
});
export const date_statistics_query = new GraphQLObjectType({
    name: 'DateStatisticQuery',
    fields: {
        date_statistics: {
            type: date_statistics_type,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, { id }) => {
                return prisma.dateStatistics.findUnique({
                    where: {
                        id: id
                    }
                });
            }
        },
        assignment_group_date_statistics: {
            type: date_statistics_type,
            args: {
                assignment_group_id: { type: GraphQLInt }
            },
            resolve: (_, { assignment_group_id }) => {
                return prisma.assignmentGroup.findUnique({
                    where: {
                        id: assignment_group_id
                    }
                }).date_statistics();
            }
        },
        course_date_statistics: {
            type: date_statistics_type,
            args: {
                course_id: { type: GraphQLInt }
            },
            resolve: (_, { course_id }) => {
                return prisma.course.findUnique({
                    where: {
                        id: course_id
                    }
                }).date_statistics();
            }
        }
    }
});
export const score_statistics_query = new GraphQLObjectType({
    name: 'ScoreStatisticQuery',
    fields: {
        score_statistic: {
            type: score_statistics_type,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (_, { id }) => {
                return prisma.scoreStatistic.findUnique({
                    where: {
                        id: id
                    }
                });
            }
        },
        assignment_score_statistic: {
            type: score_statistics_type,
            args: {
                assignment_id: { type: GraphQLInt }
            },
            resolve: (_, { assignment_id }) => {
                return prisma.assignment.findUnique({
                    where: {
                        id: assignment_id
                    }
                }).score_statistics();
            }
        },
        assignment_group_score_statistic: {
            type: score_statistics_type,
            args: {
                assignment_group_id: { type: GraphQLInt }
            },
            resolve: (_, { assignment_group_id }) => {
                return prisma.assignmentGroup.findUnique({
                    where: {
                        id: assignment_group_id
                    }
                }).score_statistics();
            }
        },
        course_score_statistic: {
            type: score_statistics_type,
            args: {
                course_id: { type: GraphQLInt }
            },
            resolve: (_, { course_id }) => {
                return prisma.course.findUnique({
                    where: {
                        id: course_id
                    }
                });
            }
        }
    }
});
export const date_statistics_schema = new GraphQLSchema({ query: date_statistics_query });
export const score_statistic_schema = new GraphQLSchema({ query: score_statistics_query });
