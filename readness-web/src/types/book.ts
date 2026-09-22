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
  uploaded_at?: number;
  uploaded_by?: number;
}
