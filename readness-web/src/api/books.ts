export interface Book {
  id: number;
  name: string;
  photo_url: string;
  description?: string;
}

const mockBooks: Book[] = [
  {
    id: 1,
    name: 'The Looming Tower: Al-Qaeda and the Road to 9/11',
    photo_url: 'The-Looming-Tower.png',
  },
  { id: 2, name: 'Run Away With Me', photo_url: 'Run_Away_With_Me.png' },
  {
    id: 3,
    name: 'I Am, I Am, I Am: Seventeen Brushes With Death',
    photo_url: 'I Am, I Am.png',
  },
  {
    id: 4,
    name: 'Last Acts',
    photo_url: 'Last Acts.png',
    description:
      "Even though his firearms store is failing, things are looking up for David Rizzo. His son, Nick, has just recovered after a near-fatal overdose, which means one thing: Rizzo can use Nick's resurrection to create the most compelling television commercial for a gun emporium the world has ever seen. After all, this is America, Rizzo tells himself. Surely anything is possible. But the relationship between father and son is fragile, mired in mutual disappointment. And when the pair embarks on their scheme to avoid bankruptcy, a high-stakes crash of hijinks, hope, and disaster ensues.",
  },
];

export async function fetchBooks(): Promise<Book[]> {
  return mockBooks;
}

export async function fetchBookById(id: number): Promise<Book | undefined> {
  return mockBooks.find((b) => b.id === id);
}

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query.trim()) return [];
  return mockBooks.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()),
  );
}
