import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'src/**/*.tsx',
  generates: {
    'src/lib/gql/': {
      preset: 'client',
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
