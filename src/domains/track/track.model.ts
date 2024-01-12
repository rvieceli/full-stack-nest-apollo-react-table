import { ArgsType, Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';
import { Artist } from '../artist/artist.model';
import { PageInfo, PaginationArgs } from 'src/common/models/page-info.model';

@ObjectType()
export class Track {
  @Field(() => Int, { description: 'ID of the track.' })
  id: number;

  @Field(() => String, { description: 'Name of the track.' })
  name: string;

  @Field(() => Float, { description: 'Price of the track.' })
  price: number;

  // it could be float once we have the value in milliseconds
  @Field(() => Int, { description: 'Duration of the track.' })
  duration: number;

  @Field(() => String, { description: 'Name of the track genre.' })
  genre: string;

  @Field(() => Artist, { description: 'Artist of the track.' })
  artist?: Artist;
}

@ObjectType()
export class PaginatedTracks {
  @Field(() => [Track], { description: 'Tracks of the requested page.' })
  items: Track[];

  @Field(() => PageInfo, { description: 'Information about the page.' })
  pageInfo: PageInfo;
}

@ArgsType()
export class GetTracksArgs extends PaginationArgs {
  @Field(() => String, {
    nullable: true,
    description: "Name of the track's artist. Min length: 2.",
  })
  @IsOptional()
  @MinLength(2)
  artistName?: string;

  @Field(() => String, {
    nullable: true,
    description: "Name of the track's genre. Min length: 2.",
  })
  @IsOptional()
  @MinLength(2)
  genreName?: string;

  @Field(() => Float, {
    nullable: true,
    description: 'Minimum price of the track, inclusive.',
  })
  minPrice?: number;

  @Field(() => Float, {
    nullable: true,
    description: 'Maximum price of the track, exclusive.',
  })
  maxPrice?: number;
}
