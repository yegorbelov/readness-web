import type { Book } from '@/types/book';
import { mockUsers } from './users';
import { mockAuthors } from './authors';

export const mockBooks: Book[] = [
  {
    book_id: '1',
    is_public: false,
    uploaded_by: mockUsers[0],
    authors: mockAuthors,
    uploaded_at: 'yesterday',
    title: 'The Looming Tower: Al-Qaeda and the Road to 9/11',
    cover_url: 'The-Looming-Tower.png',
    description:
      'A gripping, Pulitzer Prize-winning account of the events leading up to 9/11. Lawrence Wright traces the rise of Al-Qaeda through the eyes of the men who created it and the FBI agents who tried to stop it, revealing the missed opportunities and institutional failures that allowed the attacks to happen.',
  },
  {
    book_id: '2',
    title: 'Run Away With Me',
    cover_url: 'Run_Away_With_Me.png',
    uploaded_at: 'yesterday',
    description:
      'Two boys, one summer, and a love that refuses to be simple. When Noah returns to his childhood town, he reconnects with Xavier, his first love, sparking a whirlwind romance shadowed by grief, addiction, and the question of whether they can build a future together.',
  },
  {
    book_id: '3',
    title: 'I Am, I Am, I Am: Seventeen Brushes With Death',
    cover_url: 'I Am, I Am.png',
    description:
      "Maggie O'Farrell recounts seventeen close encounters with death across her life — from a childhood illness to a terrifying confrontation on a remote path. Each essay is a meditation on mortality, motherhood, and what it means to feel truly alive.",
  },
  {
    book_id: '4',
    title: 'Last Acts',
    cover_url: 'Last Acts.png',
    description:
      "Even though his firearms store is failing, things are looking up for Davbook_id Rizzo. His son, Nick, has just recovered after a near-fatal overdose, which means one thing: Rizzo can use Nick's resurrection to create the most compelling television commercial for a gun emporium the world has ever seen. After all, this is America, Rizzo tells himself. Surely anything is possible. But the relationship between father and son is fragile, mired in mutual disappointment. And when the pair embarks on their scheme to avobook_id bankruptcy, a high-stakes crash of hijinks, hope, and disaster ensues.",
  },
  {
    book_id: '5',
    title: 'The Mbook_idnight Library',
    cover_url: 'The-Mbook_idnight-Library.png',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provbook_ides a chance to try another life you could have lived. Nora Seed finds herself faced with the possibility of undoing her regrets — but which life is truly hers?',
  },
  {
    book_id: '6',
    title: 'Educated',
    cover_url: 'Educated.png',
    description:
      'Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalist parents in the mountains of book_idaho, she grew up preparing for the end of the world, not for a future that included education. Educated is her memoir of self-invention through learning.',
  },
  {
    book_id: '7',
    title: 'Atomic Habits',
    cover_url: 'atomic-habits.jpg',
    description:
      'No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
  },
  {
    book_id: '8',
    title: 'Where the Crawdads Sing',
    cover_url: 'Where the Crawdads Sing.jpg',
    description:
      'For years, rumors of the "Marsh Girl" have haunted Barkley Cove. Now Kya Clark is a murder suspect. A painfully beautiful novel about isolation, resilience, and the wild that raised her, weaving together a coming-of-age story with a gripping mystery.',
  },
  {
    book_id: '9',
    title: 'The Silent Patient',
    cover_url: 'The Silent Patient.jpg',
    description:
      "Alicia Berenson's life is seemingly perfect. Then one evening she shoots her husband five times and never speaks another word. A psychotherapist becomes obsessed with uncovering her motive, leading to a shocking twist no one sees coming.",
  },
  {
    book_id: '10',
    title: 'Circe',
    cover_url: 'Circe.jpg',
    description:
      'In the house of Helios, god of the sun, a strange child is born — Circe. Discovering herself to have the power of witchcraft, she is banished to a deserted island, where she hones her occult craft and comes into her own as a formbook_idable witch.',
  },
];
