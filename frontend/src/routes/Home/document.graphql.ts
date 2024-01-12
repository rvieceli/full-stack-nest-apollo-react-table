import { graphql } from '../../lib/gql';

export const document = graphql(/* GraphQL */ `
  query getTracks(
    $page: Int
    $pageSize: Int
    $minPrice: Float
    $maxPrice: Float
    $artistName: String
    $genreName: String
  ) {
    getTracks(
      page: $page
      pageSize: $pageSize
      minPrice: $minPrice
      maxPrice: $maxPrice
      artistName: $artistName
      genreName: $genreName
    ) {
      items {
        id
        name
        genre
        price
        duration
        artist {
          id
          name
        }
      }
      pageInfo {
        total
        page
        pageSize
        totalPages
      }
    }
  }
`);
