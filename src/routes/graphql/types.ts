import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

import { UUIDType } from "./types/uuid.js";
import { YearType } from "./types/year.js";

export const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: {
        id: {
            type: new GraphQLEnumType({
                name: 'MemberId',
                values: {
                    BASIC: {value: 'basic'},
                    BUSINESS: {value: 'business'},
                },
            })
        },
        discount: {type: GraphQLFloat},
        postsLimitPerMonth: {type: GraphQLInt}
    }
});

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: UUIDType},
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat}
    }
});

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: {type: UUIDType},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: YearType},
        userId: {type: UserType.getFields().id.type},
        memberTypeId: {type: MemberType.getFields().id.type},
    }
});

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: {type: UUIDType},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        authorId: {type:UserType.getFields().id.type},
    }
});