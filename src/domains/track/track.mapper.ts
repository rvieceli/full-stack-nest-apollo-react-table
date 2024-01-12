import { Track } from './track.model';
import { GetTrackData } from './track.service';

export class TrackMapper {
  static toObjectType(track: GetTrackData): Track {
    const artist = track.ArtistName
      ? {
          id: track.ArtistId,
          name: track.ArtistName,
        }
      : undefined;

    return {
      id: track.TrackId,
      name: track.Name,
      price: track.UnitPrice,
      duration: Math.round(track.Milliseconds / 1000),
      genre: track.Genre,
      artist,
    } satisfies Track;
  }
}
