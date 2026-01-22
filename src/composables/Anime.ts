export default class Anime implements IAnime{
    id: number;
    title: {
        english: string;
        romanji: string;
    }
    coverImage: {
        medium: null|string;
        large: null|string;
        extraLarge: null|string;
    }

    constructor(anime: Object) {
        self = {...anime};
    }
}