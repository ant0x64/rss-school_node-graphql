import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

import { UUIDType } from "./types/uuid.js";
import { YearType } from "./types/year.js";

import resolvers from "./resolvers.js";


export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: {value: 'basic'},
        business: {value: 'business'},
    },
});

export const MemberType = new GraphQLObjectType({
    name: 'Member',
    fields: {
        id: {
            type: MemberTypeId
        },
        discount: {type: GraphQLFloat},
        postsLimitPerMonth: {type: GraphQLInt}
    }
});

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: UUIDType},
        name: {type: GraphQLString},
        balance: {type: GraphQLFloat},
        profile: {
            type: ProfileType,
            resolve: resolvers.getProfileByUserID,
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: resolvers.getPostsByUserID,
        },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: resolvers.getUserSubscribedTo
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: resolvers.getSubscribedToUser
        }
    })
});

export const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: {type: UUIDType},
        isMale: {type: GraphQLBoolean},
        yearOfBirth: {type: YearType},
        userId: {type: UUIDType},
        memberTypeId: {type: MemberType.getFields().id.type},
        memberType: {
            type: MemberType,
            resolve: resolvers.getMemberTypeByProfile
        }
    }
});

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: UUIDType},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        authorId: {type:UserType.getFields().id.type},
    })
});