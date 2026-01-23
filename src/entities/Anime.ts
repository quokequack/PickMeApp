export class Anime {
    id: number|null = null;
    title: {
        english: string;
        romanji: string;
    }|null = null;
    coverImage: {
        medium: null|string;
        large: null|string;
        extraLarge: null|string;
    }|null = null;
    
}