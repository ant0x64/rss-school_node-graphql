import { Context } from "./types/context.js";
import { Prisma }  from '@prisma/client';

export default {
    // QUERIES

    getMemberTypes: (_, args, { db }: Context) => {
        return db.memberType.findMany();
    },
    getMemberType: (_, { id }: { id: string }, { db }: Context) => {
        return db.memberType.findUnique({where: { id }});
    },
    getMemberTypeByProfile: (parent: { memberTypeId: string}, _args, { db }: Context) => {
        return db.memberType.findUnique({ where: {id : parent.memberTypeId } });
    },
    getPosts: (_, args, { db }: Context) => {
        return db.post.findMany();
    },
    getPost: (_, { id }: { id: string }, { db }: Context) => {
        return db.post.findUnique({where: { id }});
    },
    getPostsByUserID: (parent: { id: string}, _args, { db }: Context) => {
        return db.post.findMany({ where: {authorId : parent.id } });
    },
    getUsers: (_, args, { db }: Context) => {
        return db.user.findMany();
    },
    getUser: (_, { id }: { id: string }, { db }: Context) => {
        return db.user.findUnique({where: { id }});
    },
    getUserSubscribedTo: async (parent: { id: string}, _args, { db }: Context) => {
        return (await db.subscribersOnAuthors.findMany({ 
            where: { subscriberId: parent.id }, select: {author: true}
        })).map((row) => row.author);
    },
    getSubscribedToUser: async (parent: { id: string}, _args, { db }: Context) => {
        return (await db.subscribersOnAuthors.findMany({ 
            where: { authorId: parent.id }, select: {subscriber: true}
        })).map((row) => row.subscriber);
    },
    getProfiles: (_, args, { db }: Context) => {
        return db.profile.findMany();
    },
    getProfile: (_, { id }: { id: string }, { db }: Context) => {
        return db.profile.findUnique({where: { id }});
    },
    getProfileByUserID: (parent: { id: string}, _args, { db }: Context) => {
        return db.profile.findUnique({ where: { userId: parent.id } });
    },

    // MUTATIONS
    createPost: (_, args: { dto: Prisma.PostUncheckedCreateInput }, { db }: Context) => {
        return db.post.create({data: args.dto})
    },
    createUser: (_, args: { dto: Prisma.UserUncheckedCreateInput }, { db }: Context) => {
        return db.user.create({data: args.dto})
    },
    createProfile: (_, args: { dto: Prisma.ProfileUncheckedCreateInput }, { db }: Context) => {
        return db.profile.create({data: args.dto})
    },
    changePost: (_, args: { 
        dto: Prisma.PostUncheckedUpdateInput,
        id: string
     }, { db }: Context) => {
        return db.post.update({data: {...args.dto}, where: {id: args.id}})
    },
    changeUser: (_, args: { 
        dto: Prisma.UserUncheckedUpdateInput,
        id: string
     }, { db }: Context) => {
        return db.user.update({data: {...args.dto}, where: {id: args.id}})
    },
    changeProfile: (_, args: { 
        dto: Prisma.ProfileUncheckedUpdateInput,
        id: string
     }, { db }: Context) => {
        return db.profile.update({data: {...args.dto}, where: {id: args.id}})
    },
    deletePost: async (_, args: {id: string}, { db }: Context) => {
        return !!(await db.post.delete({where: {id: args.id}}))
    },
    deleteUser: async (_, args: {id: string}, { db }: Context) => {
        return !!(await db.user.delete({where: {id: args.id}}))
    },
    deleteProfile: async (_, args: {id: string}, { db }: Context) => {
        return !!(await db.profile.delete({where: {id: args.id}}))
    },
    subscribeTo: (_, args: { userId: string, authorId: string}, { db }: Context) => {
        return db.user.update({
            where: {id: args.userId},
            data: {
                userSubscribedTo: {
                    create: {
                        authorId: args.authorId,
                    },
                },
            },
        })
    },
    unsubscribeFrom: async (_, args: { userId: string, authorId: string}, { db }: Context) => {
        return !!(await db.subscribersOnAuthors.delete({
            where: {
                subscriberId_authorId: {
                    subscriberId: args.userId,
                    authorId: args.authorId
                }
            }
        }))
    },
}
