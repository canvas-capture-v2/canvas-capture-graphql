import {PrismaClient} from '../../prisma/app/generated/prisma/client/index.js'
import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";
import {
    date_statistics_input,
    date_statistics_type,
    score_statistics_input,
    score_statistics_type
} from "./stats-schema.js";
import {assignment_input, assignment_type} from "./assigment-schema.js";

const prisma = new PrismaClient()

export const assignment_group_type = new GraphQLObjectType({
    name: 'AssignmentGroup',
    fields: {
        id: {type: GraphQLInt},
        course_id: {type: GraphQLInt},
        name: {type: GraphQLString},
        assignments: {type: new GraphQLList(assignment_type)},
        position: {type: GraphQLInt},
        group_weight: {type: GraphQLInt},
        points_possible: {type: GraphQLInt},
        score_statistics: {type: score_statistics_type},
        date_statistics: {type: date_statistics_type}
    }
})

export const assignment_group_input = new GraphQLInputObjectType({
    name: 'AssignmentGroupInput',
    fields: {
        id: {type: GraphQLInt},
        course_id: {type: GraphQLInt},
        name: {type: GraphQLString},
        assignments: {type: new GraphQLList(assignment_input)},
        position: {type: GraphQLInt},
        group_weight: {type: GraphQLInt},
        points_possible: {type: GraphQLInt},
        score_statistics: {type: score_statistics_input},
        date_statistics: {type: date_statistics_input}
    }
})

export const assignment_group_query= new GraphQLObjectType({
    name: 'AssignmentGroupSchema',
    fields: {
        assignment_group: {
            type: assignment_group_type,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (_: any, {id}: any) => {
                return prisma.assignmentGroup.findUnique({
                    where: {
                        id: id
                    },
                    include: {
                        assignments: {
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
                })
            }
        },
        assignment_groups: {
            type: new GraphQLList(assignment_group_type),
            args: {
                course_id: {type: GraphQLInt}
            },
            resolve: (_: any, {course_id}) => {
                return prisma.assignmentGroup.findMany({
                    where: {
                        course_id: course_id
                    },
                    include: {
                        assignments: {
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
                })
            }
        },
        assignment_group_assignments: {
            type: assignment_group_type,
            args: {
                id: {type: GraphQLInt},
                assignment_ids: {type: new GraphQLList(GraphQLInt)}
            },
            resolve: (_: any, {id, assignment_ids}: any) => {
                return prisma.assignmentGroup.findUnique({
                    where: {
                        id: id,
                    },
                    include: {
                        assignments: {
                            where: {
                                id: {in: assignment_ids}
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
                })
            }
        },
        course_assignment_groups_assignments: {
            type: new GraphQLList(assignment_group_type),
            args: {
                course_id: {type: GraphQLInt},
                assignment_ids: {type: new GraphQLList(GraphQLInt)}
            },
            resolve: (_: any, {course_id, ids, assignment_ids}) => {
                return prisma.assignmentGroup.findMany({
                    where: {
                        course_id: course_id,
                        id: {in: ids}
                    },
                    include: {
                        assignments: {
                            where: {
                                id: {in: assignment_ids}
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
                })
            }
        }
    }
})

export const assignment_group_schema = new GraphQLSchema({ query: assignment_group_query})