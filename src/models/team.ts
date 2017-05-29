import { Match } from './match';
import { User } from './user';
import { IScore } from './score';

export interface Team {
    name: string;
    description: string;
    matches?:  { [key: string]: Match };
    score?: IScore;
    role?: string;
    joined: number;
    recentActivity: number;
    photoURL: string;
    members:  { [key: string]: User }
}

