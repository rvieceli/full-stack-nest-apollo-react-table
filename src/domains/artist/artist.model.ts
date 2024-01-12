import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => Int, { description: 'ID of the artist.' })
  id: number;

  @Field(() => String, { description: 'Name of the artist.' })
  name: string;
}
