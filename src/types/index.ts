export interface Film {
    id: string;
    title: string;
    original_title: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
    rt_score: string;
    watched: boolean;
    favorite: boolean;
    notes: Note[];
    personalRating: number;
    url: string;
    movie_banner: string;
}

export interface Note {
    id: string;
    filmId: string;
    text: string;
    rating: number;
}

export interface FilterOptions {
    title: string;
    includeSynopsis: boolean;
}

export interface SortOptions {
    field: 'title' | 'running_time' | 'personal_rating' | 'rt_score';
    order: 'asc' | 'desc';
}