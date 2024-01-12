import { Module } from '@nestjs/common';
import { AlbumService } from './domains/album/album.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AlbumResolver } from './domains/album/album.resolver';
import { Database } from 'sqlite3';
import { TrackResolver } from './domains/track/track.resolver';
import { TrackService } from './domains/track/track.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [
    AlbumService,
    AlbumResolver,
    TrackService,
    TrackResolver,
    {
      provide: Database,
      useFactory: () => new Database('chinook.sqlite'),
    },
  ],
})
export class AppModule {}
