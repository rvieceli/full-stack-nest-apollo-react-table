import { GraphQLResolveInfo } from 'graphql';
import {
  FieldsByTypeName,
  ResolveTree,
  parseResolveInfo,
} from 'graphql-parse-resolve-info';

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

type JoinCapitalize<T extends string[]> = T extends []
  ? ''
  : T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? `${Capitalize<Head>}${JoinCapitalize<Tail extends string[] ? Tail : []>}`
    : never
  : never;

type Result<T> = {
  [K in T extends ReadonlyArray<infer U extends string>
    ? `load${JoinCapitalize<Split<U, '.'>>}`
    : never]: boolean;
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function shouldBeLoaded<T extends ReadonlyArray<string>>(
  info: GraphQLResolveInfo,
  ...fields: T
): Result<T> {
  const fieldSet = extractFields(info);

  const result = {} as Result<T>;

  for (const field of fields) {
    const fieldCapitalize = field.split('.').map(capitalize).join('');

    result[`load${fieldCapitalize}`] = fieldSet.has(field);
  }

  return result;
}

function extractFields(info: GraphQLResolveInfo) {
  const { fieldsByTypeName } = parseResolveInfo(info);
  const fields = new Set<string>();

  function recursive(rootObjects: typeof fieldsByTypeName, current = '') {
    for (const rootObjectKey of Object.keys(rootObjects)) {
      const rootObject = rootObjects[rootObjectKey];

      for (const fieldName of Object.keys(rootObject)) {
        const field = rootObject[fieldName];
        const has = Object.keys(field.fieldsByTypeName).length > 0;

        fields.add(`${current}${fieldName}`);

        if (has) {
          recursive(field.fieldsByTypeName, `${current}${fieldName}.`);
        }
      }
    }
  }

  recursive(fieldsByTypeName);

  return fields;
}
