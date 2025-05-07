import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

export const discussion_type_enum = new GraphQLEnumType({
    name: 'discussion_type',
    values: {
        SIDE_COMMENT: {value: 'side_comment'},
        NOT_THREADED: {value: 'not_threaded'},
        THREADED: {value: 'threaded'}
    }
})

export const discussion_topic_type = new GraphQLObjectType({
    name: 'DiscussionTopic',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        message: {type: GraphQLString},
        posted_at: {type: GraphQLString},
        last_reply_at: {type: GraphQLString},
        require_initial_post: {type: GraphQLBoolean},
        discussion_subentry_count: {type: GraphQLInt},
        assignment_id: {type: GraphQLInt},
        delayed_post_at: {type: GraphQLString},
        published: {type: GraphQLBoolean},
        lock_at: {type: GraphQLString},
        locked: {type: GraphQLBoolean},
        user_name: {type: GraphQLString},
        topic_children: {type: new GraphQLList(GraphQLInt)},
        group_topic_children: {type: new GraphQLList(GraphQLInt)},
        root_topic_id: {type: GraphQLInt},
        discussion_type: {type: discussion_type_enum}
    }
})

export const discussion_topic_input = new GraphQLInputObjectType({
    name: 'DiscussionTopicInput',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        message: {type: GraphQLString},
        posted_at: {type: GraphQLString},
        last_reply_at: {type: GraphQLString},
        require_initial_post: {type: GraphQLBoolean},
        discussion_subentry_count: {type: GraphQLInt},
        assignment_id: {type: GraphQLInt},
        delayed_post_at: {type: GraphQLString},
        published: {type: GraphQLBoolean},
        lock_at: {type: GraphQLString},
        locked: {type: GraphQLBoolean},
        user_name: {type: GraphQLString},
        topic_children: {type: new GraphQLList(GraphQLInt)},
        group_topic_children: {type: new GraphQLList(GraphQLInt)},
        root_topic_id: {type: GraphQLInt},
        discussion_type: {type: discussion_type_enum}
    }
})