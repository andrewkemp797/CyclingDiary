import { User } from './user';
import { Comment } from './comment';
import { Time } from 'ngx-bootstrap/timepicker/timepicker.models';

export class Event {
    id: string;
    userId: string;
    description: string;
    date: Date = new Date();
    distance: number;
    verticalAscend: number;
    attending: string[];
}
