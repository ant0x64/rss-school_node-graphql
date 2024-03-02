import { Context } from "./types/context.js";

export default {
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
}