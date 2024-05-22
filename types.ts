import { LocalDateTime } from "edgedb";

export type User = {
  githubUsername: string;
  name: string;
  email: string | null;
  id: string;
  avatarUrl: string;
  created: LocalDateTime;
  updated: LocalDateTime;
  userRole: string;
};

export type Workspace = {
  id: string;
  name: string;
  created: LocalDateTime;
  updated: LocalDateTime;
};

export type List = {
  id: string;
  title: string;
  order: number;
  boardId: string;
  created: LocalDateTime;
  updated: LocalDateTime;
};

export type Card = {
  id: string;
  title: string;
  description: string;
  order: number;
  listId: string;
  created: LocalDateTime;
  updated: LocalDateTime;
  assigneeId: string;
  duedate: Date | null;
  priority: string;
  status: string;
  list_id?: string;
};


export type ListWithCards = List & { cards: Card[] };