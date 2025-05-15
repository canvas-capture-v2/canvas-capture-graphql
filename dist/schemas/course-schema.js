import { GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { date_statistics_input, date_statistics_type, score_statistics_input, score_statistics_type } from "./stats-schema.js";
import { assignment_group_input, assignment_group_type } from "./assignment_group-schema.js";
import { PrismaClient } from "../../prisma/app/generated/prisma/client/index.js";
const prisma = new PrismaClient();
export const course_type = new GraphQLObjectType({
    name: 'Course',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        course_code: { type: GraphQLString },
        start_at: { type: GraphQLString },
        end_at: { type: GraphQLString },
        total_students: { type: GraphQLInt },
        syllabus_body: { type: GraphQLString },
        public_description: { type: GraphQLString },
        assignment_groups: { type: new GraphQLList(assignment_group_type) },
        date_statistics: { type: date_statistics_type },
        score_statistics: { type: score_statistics_type },
        points_possible: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        user_id: { type: GraphQLInt }
    }
});
export const course_input = new GraphQLInputObjectType({
    name: 'CourseInput',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        course_code: { type: GraphQLString },
        start_at: { type: GraphQLString },
        end_at: { type: GraphQLString },
        total_students: { type: GraphQLInt },
        syllabus_body: { type: GraphQLString },
        public_description: { type: GraphQLString },
        assignment_groups: { type: new GraphQLList(assignment_group_input) },
        date_statistics: { type: date_statistics_input },
        score_statistics: { type: score_statistics_input },
        points_possible: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        user_id: { type: GraphQLInt }
    }
});
export const course_query = new GraphQLObjectType({
    name: 'CourseQuery',
    fields: {
        course: {
            type: course_type,
            args: {
                user_id: { type: GraphQLInt },
                id: { type: GraphQLInt },
                assignment_group_ids: { type: new GraphQLList(GraphQLInt) },
                assignment_ids: { type: new GraphQLList(GraphQLInt) }
            },
            resolve: (_, { user_id, id, assignment_group_ids, assignment_ids }) => {
                return prisma.course.findUnique({
                    where: {
                        user_id: user_id,
                        id: id
                    },
                    include: {
                        assignment_groups: {
                            where: {
                                id: { in: assignment_group_ids }
                            },
                            include: {
                                assignments: {
                                    where: {
                                        id: { in: assignment_ids }
                                    },
                                    include: {
                                        submissions: true,
                                        low_submission: true,
                                        median_submission: true,
                                        high_submission: true,
                                        score_statistics: true
                                    }
                                },
                                score_statistics: true,
                                date_statistics: true
                            }
                        },
                        score_statistics: true,
                        date_statistics: true
                    }
                });
            }
        },
        courses: {
            type: new GraphQLList(course_type),
            args: {
                user_id: { type: GraphQLInt },
                ids: { type: new GraphQLList(GraphQLInt) },
                assignment_group_ids: { type: new GraphQLList(GraphQLInt) },
                assignment_ids: { type: new GraphQLList(GraphQLInt) }
            },
            resolve: (_, { user_id, ids, assignment_group_ids, assignment_ids }) => {
                return prisma.course.findMany({
                    where: {
                        user_id: user_id,
                        id: { in: ids }
                    },
                    include: {
                        assignment_groups: {
                            where: {
                                id: { in: assignment_group_ids }
                            },
                            include: {
                                assignments: {
                                    where: {
                                        id: { in: assignment_ids }
                                    },
                                    include: {
                                        submissions: true,
                                        low_submission: true,
                                        median_submission: true,
                                        high_submission: true,
                                        score_statistics: true
                                    }
                                },
                                score_statistics: true,
                                date_statistics: true
                            }
                        },
                        score_statistics: true,
                        date_statistics: true
                    }
                });
            }
        }
    }
});
export const course_mutation = new GraphQLObjectType({
    name: 'CourseMutation',
    fields: {
        create_course: {
            type: course_type,
            args: {
                input: { type: new GraphQLNonNull(course_input) }
            },
            resolve: (_, { input }) => {
                return prisma.course.create({
                    data: {
                        id: input.id,
                        name: input.name,
                        course_code: input.course_code,
                        start_at: input.start_at,
                        end_at: input.end_at,
                        total_students: input.total_students,
                        syllabus_body: input.syllabus_body,
                        public_description: input.public_description,
                        assignment_groups: input.assignment_groups,
                        date_statistics: input.date_statistics,
                        score_statistics: input.score_statistics,
                        points_possible: input.points_possible,
                        weight: input.weight,
                        user_id: input.user_id
                    }
                });
            }
        },
        update_course: {
            type: course_type,
            args: {
                input: { type: course_input }
            },
            resolve: (_, { input }) => {
                return prisma.course.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        id: input.id,
                        name: input.name,
                        course_code: input.course_code,
                        start_at: input.start_at,
                        end_at: input.end_at,
                        total_students: input.total_students,
                        syllabus_body: input.syllabus_body,
                        public_description: input.public_description,
                        assignment_groups: input.assignment_groups,
                        date_statistics: input.date_statistics,
                        score_statistics: input.score_statistics,
                        points_possible: input.points_possible,
                        weight: input.weight,
                        user_id: input.user_id
                    }
                });
            }
        }
    }
});
export const course_schema = new GraphQLSchema({ query: course_query, mutation: course_mutation });
