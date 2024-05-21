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