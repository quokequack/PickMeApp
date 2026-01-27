export class Anime {
    id: number|null = null;
    title: {
        english: string;
        romaji: string;
    }|null = null;
    description: string|null = null;
    coverImage: {
        medium: null|string|undefined;
        large: null|string|undefined;
        extraLarge: null|string|undefined;
    }|null = null;
    
}