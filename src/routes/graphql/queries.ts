import { GraphQLObjectType, GraphQLList } from "graphql";

import { Context } from "./types/context.js";
import { MemberType } from './types.js';

export const queries = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: (_, args, { db }: Context) => {
                return db.memberType.findMany()
            }
        }
    })
});
