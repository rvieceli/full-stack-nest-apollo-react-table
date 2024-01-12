/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Artist = {
  __typename?: 'Artist';
  /** ID of the artist. */
  id: Scalars['Int']['output'];
  /** Name of the artist. */
  name: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** Index of the requested page. */
  page: Scalars['Int']['output'];
  /** Size of a single page. */
  pageSize: Scalars['Int']['output'];
  /** Total number of tracks. */
  total: Scalars['Int']['output'];
  /** Total number of pages. */
  totalPages: Scalars['Int']['output'];
};

export type PaginatedTracks = {
  __typename?: 'PaginatedTracks';
  /** Tracks of the requested page. */
  items: Array<Track>;
  /** Information about the page. */
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  getAlbumsForArtist: Array<Album>;
  getTrack?: Maybe<Track>;
  getTracks: PaginatedTracks;
};


export type QueryGetAlbumsForArtistArgs = {
  artistId: Scalars['Float']['input'];
};


export type QueryGetTrackArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTracksArgs = {
  artistName?: InputMaybe<Scalars['String']['input']>;
  genreName?: InputMaybe<Scalars['String']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};

export type Track = {
  __typename?: 'Track';
  /** Artist of the track. */
  artist: Artist;
  /** Duration of the track. */
  duration: Scalars['Int']['output'];
  /** Name of the track genre. */
  genre: Scalars['String']['output'];
  /** ID of the track. */
  id: Scalars['Int']['output'];
  /** Name of the track. */
  name: Scalars['String']['output'];
  /** Price of the track. */
  price: Scalars['Float']['output'];
};

export type GetTracksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  artistName?: InputMaybe<Scalars['String']['input']>;
  genreName?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTracksQuery = { __typename?: 'Query', getTracks: { __typename?: 'PaginatedTracks', items: Array<{ __typename?: 'Track', id: number, name: string, genre: string, price: number, duration: number, artist: { __typename?: 'Artist', id: number, name: string } }>, pageInfo: { __typename?: 'PageInfo', total: number, page: number, pageSize: number, totalPages: number } } };


export const GetTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxPrice"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artistName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genreName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"minPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"artistName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artistName"}}},{"kind":"Argument","name":{"kind":"Name","value":"genreName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genreName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<GetTracksQuery, GetTracksQueryVariables>;