import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { MAX_PAGE_SIZE } from '../constants';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    defaultValue: 0,
    description: 'Index of the requested page, starting from 0.',
  })
  @Min(0)
  page: number;

  @Field(() => Int, { defaultValue: 10, description: 'Size of a single page.' })
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  pageSize: number;
}

@ObjectType()
export class PageInfo {
  @Field(() => Int, { description: 'Total number of tracks.' })
  total: number;

  @Field(() => Int, {
    description: 'Index of the requested page. Starting from 0',
  })
  page: number;

  @Field(() => Int, { description: 'Size of a single page.' })
  pageSize: number;

  @Field(() => Int, { description: 'Total number of pages.' })
  totalPages: number;
}
