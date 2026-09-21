export interface BookStatus {
  book_id: number;
  user_id: number;
  status: string;
}

export interface Book {
  id: number;
  name: string;
  photo_url: string;
  is_public?: boolean;
  description?: string;
  upload_at?: number;
  uploaded_by?: number;
}
