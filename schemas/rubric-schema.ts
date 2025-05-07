import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from "graphql";

export const assessment_type_enum = new GraphQLEnumType({
    name: 'assessment_type',
    values: {
        GRADING: {value: 'grading'},
        PEER_REVIEW: {value: 'peer_review'},
        PROVISIONAL_GRADE: {value: 'provisional_grade'}
    }
})

export const rubric_association_purpose_enum = new GraphQLEnumType({
    name: 'purpose',
    values: {
        GRADING: {value: 'grading'},
        BOOKMARK: {value: 'bookmark'}
    }
})

export const rubric_rating_type = new GraphQLObjectType({
    name: 'RubricRating',
    fields: {
        points: {type: GraphQLInt},
        id: {type: GraphQLString},
        description: {type: GraphQLString},
        long_description: {type: GraphQLString},
    }
})

export const rubric_rating_input = new GraphQLInputObjectType({
    name: 'RubricRatingInput',
    fields: {
        points: {type: GraphQLInt},
        id: {type: GraphQLString},
        description: {type: GraphQLString},
        long_description: {type: GraphQLString},
    }
})

export const rubric_assessment_type = new GraphQLObjectType({
    name: 'RubricAssessment',
    fields: {
        id: {type: GraphQLInt},
        rubric_id: {type: GraphQLInt},
        rubric_association_id: {type: GraphQLInt},
        score: {type: GraphQLInt},
        artifact_type: {type: GraphQLString},
        artifact_id: {type: GraphQLInt},
        artifact_attempt: {type: GraphQLInt},
        assessment_type: {type: assessment_type_enum},
        assessor_id: {type: GraphQLInt},
        data: {type: GraphQLString},
        comments: {type: GraphQLString}
    }
})

export const rubric_assessment_input = new GraphQLInputObjectType({
    name: 'RubricAssessmentInput',
    fields: {
        id: {type: GraphQLInt},
        rubric_id: {type: GraphQLInt},
        rubric_association_id: {type: GraphQLInt},
        score: {type: GraphQLInt},
        artifact_type: {type: GraphQLString},
        artifact_id: {type: GraphQLInt},
        artifact_attempt: {type: GraphQLInt},
        assessment_type: {type: assessment_type_enum},
        assessor_id: {type: GraphQLInt},
        data: {type: GraphQLString},
        comments: {type: GraphQLString}
    }
})

export const rubric_association_type = new GraphQLObjectType({
    name: 'RubricAssociation',
    fields:{
        id: {type: GraphQLInt},
        rubric_id: {type: GraphQLInt},
        association_id: {type: GraphQLInt},
        association_type: {type: GraphQLString},
        use_for_grading: {type: GraphQLBoolean},
        summary_data: {type: GraphQLString},
        purpose: {type: rubric_association_purpose_enum},
        hide_score_total: {type: GraphQLBoolean},
        hide_points: {type: GraphQLBoolean},
        hide_outcome_results: {type: GraphQLBoolean},
    }
})

export const rubric_association_input = new GraphQLInputObjectType({
    name: 'RubricAssociationInput',
    fields: {
        id: {type: GraphQLInt},
        rubric_id: {type: GraphQLInt},
        association_id: {type: GraphQLInt},
        association_type: {type: GraphQLString},
        use_for_grading: {type: GraphQLBoolean},
        summary_data: {type: GraphQLString},
        purpose: {type: rubric_association_purpose_enum},
        hide_score_total: {type: GraphQLBoolean},
        hide_points: {type: GraphQLBoolean},
        hide_outcome_results: {type: GraphQLBoolean},
    }
})

export const rubric_criteria_type = new GraphQLObjectType({
    name: 'RubricCriteria',
    fields: {
        points: {type: GraphQLInt},
        id: {type: GraphQLString},
        learning_outcome_id: {type: GraphQLString},
        vendor_guid: {type: GraphQLString},
        description: {type: GraphQLString},
        long_description: {type: GraphQLString},
        criterion_use_range: {type: GraphQLBoolean},
        ratings: {type: new GraphQLList(rubric_rating_type)},
        ignore_for_scoring: {type: GraphQLBoolean},
    }
})

export const rubric_criteria_input = new GraphQLInputObjectType({
    name: 'RubricCriteriaInput',
    fields: {
        points: {type: GraphQLInt},
        id: {type: GraphQLString},
        learning_outcome_id: {type: GraphQLString},
        vendor_guid: {type: GraphQLString},
        description: {type: GraphQLString},
        long_description: {type: GraphQLString},
        criterion_use_range: {type: GraphQLBoolean},
        ratings: {type: new GraphQLList(rubric_rating_input)},
        ignore_for_scoring: {type: GraphQLBoolean},
    }
})

export const rubric_type = new GraphQLObjectType({
    name: 'Rubric',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        context_id: {type: GraphQLInt},
        context_type: {type: GraphQLString},
        points_possible: {type: GraphQLInt},
        reusable: {type: GraphQLBoolean},
        read_only: {type: GraphQLBoolean},
        free_form_criterion_comments: {type: GraphQLBoolean},
        hide_score_total: {type: GraphQLBoolean},
        data: {type: new GraphQLList(rubric_criteria_type)},
        assessments: {type: new GraphQLList(rubric_assessment_type)},
        associations: {type: new GraphQLList(rubric_association_type)}
    }
})

export const rubric_input = new GraphQLInputObjectType({
    name: 'RubricInput',
    fields: {
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        context_id: {type: GraphQLInt},
        context_type: {type: GraphQLString},
        points_possible: {type: GraphQLInt},
        reusable: {type: GraphQLBoolean},
        read_only: {type: GraphQLBoolean},
        free_form_criterion_comments: {type: GraphQLBoolean},
        hide_score_total: {type: GraphQLBoolean},
        data: {type: new GraphQLList(rubric_criteria_input)},
        assessments: {type: new GraphQLList(rubric_assessment_input)},
        associations: {type: new GraphQLList(rubric_association_input)}
    }
})