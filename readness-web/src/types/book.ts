import type { User } from './user';

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface BookStatus {
  id: number;
  user: number;
  status: string;
}

export interface Book {
  id: number;
  title: string;
  photo_url?: string;
  description?: string;
  authors?: Author[];
  language?: Language;
  published_at?: string;
  is_public?: boolean;
  file_path?: string;
  file_size?: number;
  uploaded_at?: string;
  uploaded_by?: User;
}

export interface BookDetails extends Book {
  added_at?: string;
  library_id?: number;
}

export type CreateBookRequest = {
  author_id: string;
  description: string;
  language_id: string;
  published_at: string;
  title: string;
};
