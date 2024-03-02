import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";

export const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: {
        id: {type: new GraphQLEnumType({
            name: 'MemberId',
            values: {
                BASIC: {value: 'basic'},
                BUSINESS: {value: 'business'},
            },
        })},
        discount: {type: GraphQLFloat},
        postsLimitPerMonth: {type: GraphQLInt}
    }
});
