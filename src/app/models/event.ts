import { User } from './user';
import { Comment } from './comment';
import { Time } from 'ngx-bootstrap/timepicker/timepicker.models';

export class Event {
    id: number;
    user: User;
    description: string;
    date: Date;
    distance: number;
    verticalAscend: number;
    attending: number;
    comments: Comment[];
}
