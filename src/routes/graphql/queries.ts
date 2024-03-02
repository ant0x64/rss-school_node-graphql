import { GraphQLObjectType, GraphQLList } from "graphql";

import { Context } from "./types/context.js";
import { MemberType, PostType, ProfileType, UserType } from './types.js';
import { UUIDType } from "./types/uuid.js";

export const queries = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: (_, args, { db }: Context) => {
                return db.memberType.findMany();
            }
        },
        memberType: {
            type: MemberType,
            args: {id: {type: UUIDType}},
            resolve: (_, { id }: { id: string }, { db }: Context) => {
                return db.memberType.findUnique({where: { id }});
            },
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: (_, args, { db }: Context) => {
                return db.post.findMany();
            },
        },
        post: {
            type: PostType,
            args: {id: {type: UUIDType}},
            resolve: (_, { id }: { id: string }, { db }: Context) => {
                return db.post.findUnique({where: { id }});
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: (_, args, { db }: Context) => {
                return db.user.findMany();
            },
        },
        user: {
            type: UserType,
            args: {id: {type: UUIDType}},
            resolve: (_, { id }: { id: string }, { db }: Context) => {
                return db.user.findUnique({where: { id }});
            },
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: (_, args, { db }: Context) => {
                return db.profile.findMany();
            },
        },
        profile: {
            type: ProfileType,
            args: {id: {type: UUIDType}},
            resolve: (_, { id }: { id: string }, { db }: Context) => {
                return db.profile.findUnique({where: { id }});
            },
        },
    })
});
