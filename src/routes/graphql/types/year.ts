import { GraphQLScalarType, Kind } from 'graphql';

const isValidYear = (year: unknown): year is number => {
    return typeof year === 'number' && year > 0 && year < 9999;
}

export const YearType = new GraphQLScalarType({
    name: 'Year',
  
    serialize(value) {
      if (!isValidYear(value)) {
        throw new Error('Invalid year');
      }
      return value;
    },
  
    parseValue(value) {
      const year = parseInt(value as string, 10);
      if (!isValidYear(year)) {
        throw new Error('Invalid year');
      }
      return year;
    },
  
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        const parsedYear = parseInt(ast.value, 10);
        if (isValidYear(parsedYear)) {
          return parsedYear;
        }
      }
      return undefined;
    },
});
