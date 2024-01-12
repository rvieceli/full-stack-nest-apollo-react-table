import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';

export interface GetTrackData {
  TrackId: number;
  Name: string;
  Milliseconds: number;
  UnitPrice: number;
  Genre: string;
  ArtistId?: number;
  ArtistName?: string;
}

export interface GetTracksPaginatedData {
  items: GetTrackData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetTracksParams {
  artistName?: string;
  genreName?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  pageSize: number;
}

export interface GetTracksOptions {
  loadArtist?: boolean;
}

@Injectable()
export class TrackService {
  constructor(private readonly db: Database) {}

  async getTracksPaginated(
    {
      page,
      pageSize,
      artistName,
      genreName,
      maxPrice,
      minPrice,
    }: GetTracksParams,
    { loadArtist = false }: GetTracksOptions = {},
  ) {
    const params = {};

    const columns = ['Track.*', 'Genre.Name AS Genre'];

    // let sql = `
    //   SELECT
    //     Track.*, Genre.Name AS Genre
    // `;

    if (loadArtist) {
      columns.push('Artist.ArtistId', 'Artist.Name AS ArtistName');
      // sql += `
      //   , Artist.ArtistId
      //   , Artist.Name as ArtistName
      // `;
    }

    const segments = [
      `
      FROM Track
        INNER JOIN Genre ON Track.GenreId = Genre.GenreId
    `,
    ];

    if (genreName) {
      segments.push(`
          AND Genre.Name like $genreName
      `);
      params['$genreName'] = `%${genreName}%`;
    }

    if (artistName || loadArtist) {
      segments.push(`
        INNER JOIN Album ON Track.AlbumId = Album.AlbumId
        INNER JOIN Artist ON Album.ArtistId = Artist.ArtistId
      `);

      if (artistName) {
        segments.push(`AND Artist.Name like $artistName`);
        params['$artistName'] = `%${artistName}%`;
      }
    }

    segments.push('WHERE 1 = 1 ');

    if (minPrice >= 0) {
      segments.push('AND Track.UnitPrice >= $minPrice');
      params['$minPrice'] = minPrice;
    }

    if (maxPrice >= 0) {
      segments.push('AND Track.UnitPrice < $maxPrice');
      params['$maxPrice'] = maxPrice;
    }

    const sql = segments.join(' ');

    const selectAll = `
      SELECT ${columns.join(', ')} ${sql}
      LIMIT $pageSize OFFSET $offset
    `;
    const countAll = `SELECT COUNT(*) AS Total ${sql}`;

    const offset = pageSize * page;

    const items = await new Promise<GetTrackData[]>((resolve, reject) => {
      this.db.all<GetTrackData>(
        selectAll,
        {
          ...params,
          $pageSize: pageSize,
          $offset: offset,
        },
        (error, data) => {
          if (error) reject(error);
          else resolve(data);
        },
      );
    });

    const total = await new Promise<number>((resolve, reject) => {
      this.db.get<{ Total: number }>(countAll, params, (error, data) => {
        if (error) reject(error);
        else resolve(data.Total);
      });
    });

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
