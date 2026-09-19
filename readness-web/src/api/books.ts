import type { Book } from '@/types/book';

const mockBooks: Book[] = [
  {
    id: 1,
    name: 'The Looming Tower: Al-Qaeda and the Road to 9/11',
    photo_url: 'The-Looming-Tower.png',
    description:
      'A gripping, Pulitzer Prize-winning account of the events leading up to 9/11. Lawrence Wright traces the rise of Al-Qaeda through the eyes of the men who created it and the FBI agents who tried to stop it, revealing the missed opportunities and institutional failures that allowed the attacks to happen.',
  },
  {
    id: 2,
    name: 'Run Away With Me',
    photo_url: 'Run_Away_With_Me.png',
    description:
      'Two boys, one summer, and a love that refuses to be simple. When Noah returns to his childhood town, he reconnects with Xavier, his first love, sparking a whirlwind romance shadowed by grief, addiction, and the question of whether they can build a future together.',
  },
  {
    id: 3,
    name: 'I Am, I Am, I Am: Seventeen Brushes With Death',
    photo_url: 'I Am, I Am.png',
    description:
      "Maggie O'Farrell recounts seventeen close encounters with death across her life — from a childhood illness to a terrifying confrontation on a remote path. Each essay is a meditation on mortality, motherhood, and what it means to feel truly alive.",
  },
  {
    id: 4,
    name: 'Last Acts',
    photo_url: 'Last Acts.png',
    description:
      "Even though his firearms store is failing, things are looking up for David Rizzo. His son, Nick, has just recovered after a near-fatal overdose, which means one thing: Rizzo can use Nick's resurrection to create the most compelling television commercial for a gun emporium the world has ever seen. After all, this is America, Rizzo tells himself. Surely anything is possible. But the relationship between father and son is fragile, mired in mutual disappointment. And when the pair embarks on their scheme to avoid bankruptcy, a high-stakes crash of hijinks, hope, and disaster ensues.",
  },
  {
    id: 5,
    name: 'The Midnight Library',
    photo_url: 'The-Midnight-Library.png',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Nora Seed finds herself faced with the possibility of undoing her regrets — but which life is truly hers?',
  },
  {
    id: 6,
    name: 'Educated',
    photo_url: 'Educated.png',
    description:
      'Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalist parents in the mountains of Idaho, she grew up preparing for the end of the world, not for a future that included education. Educated is her memoir of self-invention through learning.',
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
