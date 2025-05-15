import { GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { course_type } from "./course-schema.js";
export const user_type = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        courses: { type: new GraphQLList(course_type) }
    }
});
export const user_input = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    }
});
