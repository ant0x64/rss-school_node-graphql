import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { MemberTypeId, MemberType, PostType, ProfileType, UserType } from './types.js';
import { UUIDType as UUID } from "./types/uuid.js";
import resolvers from "./resolvers.js";

const UUIDType = new GraphQLNonNull(UUID);

export const queries = new GraphQLObjectType({
    name: 'Query',
    fields: {
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: resolvers.getMemberTypes
        },
        memberType: {
            type: MemberType,
            args: {id: {type: MemberTypeId}},
            resolve: resolvers.getMemberType
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: resolvers.getPosts,
        },
        post: {
            type: PostType,
            args: {id: {type: UUIDType}},
            resolve: resolvers.getPost,
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: resolvers.getUsers,
        },
        user: {
            type: UserType,
            args: {id: {type: UUIDType}},
            resolve: resolvers.getUser,
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: resolvers.getProfiles,
        },
        profile: {
            type: ProfileType,
            args: {id: {type: UUIDType}},
            resolve: resolvers.getProfile,
        },
    }
});
