export interface Movie {
  id: string;
  imageUrl: string;
  title: string;
  summary: string;
  rating: number;
}

export interface User {
  id?: string;
  name: string;
  email: string;
}
