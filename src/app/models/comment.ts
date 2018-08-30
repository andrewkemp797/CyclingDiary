import { User } from "./user";

export class Comment {
    user: User;
    text: string;
    date: Date;
    eventId: number;
}