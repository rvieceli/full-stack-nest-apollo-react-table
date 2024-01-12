import {
  Args,
  Info,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track, GetTracksArgs, PaginatedTracks } from './track.model';
import { ValidationPipe } from '@nestjs/common';
import { Artist } from '../artist/artist.model';
import { GraphQLResolveInfo } from 'graphql';
import { shouldBeLoaded } from '../../common/shouldBeLoaded';
import { TrackMapper } from './track.mapper';

@Resolver(() => Track)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(() => Track, { nullable: true })
  async getTrack(@Args('id') id: number): Promise<Track | undefined> {
    throw new Error('Not implemented');
  }

  @Query(() => PaginatedTracks)
  async getTracks(
    @Args(new ValidationPipe()) params: GetTracksArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<PaginatedTracks> {
    const { loadItemsArtist } = shouldBeLoaded(info, 'items.artist');

    const { items, page, pageSize, total, totalPages } =
      await this.trackService.getTracksPaginated(params, {
        loadArtist: loadItemsArtist,
      });

    return {
      items: items.map(TrackMapper.toObjectType),
      pageInfo: {
        page: page,
        pageSize,
        total,
        totalPages,
      },
    };
  }

  @ResolveField(() => Artist, { nullable: true })
  async artist(@Parent() track: Track): Promise<Artist | undefined> {
    return track.artist;
  }
}
