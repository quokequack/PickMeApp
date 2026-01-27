import { anilist } from '../utils/anilist.ts';

async function getAnimes(page = 1) {
    const query = `
    query ($page: Int = 1) {
      Page(page: $page, perPage: 50) {
        pageInfo {
          total
          currentPage
          hasNextPage
         }
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          description
          coverImage { 
            extraLarge
          }
        }
      }
    }
    `;

    const { data } = await anilist.post('/anime',{
        query,
        variables: {page}
    }, {
            headers: {
                'Content-Type': 'application/json'
            }
    });
    return data.data;
}

export const anilistService = {
    getAnimes,
}