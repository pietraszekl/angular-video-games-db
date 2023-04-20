export interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshot>;
  trailers: Array<Trailers>;
}

export interface APIResponse<T> {
  results: Array<T>;
}

interface ParentPlatform {
  platform: {
    slug: any;
    name: string;
  };
}

interface Genre {
  name: string;
}

interface Publishers {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshot {
  image: string;
}

interface Trailers {
  data: {
    max: string;
  };
}
