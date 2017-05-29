import { User } from './user';
import { Team } from "./team";

export enum MatchStatus {
    'PENDING', 'ACTIVE', 'COMPLETE', 'CANCELLED'
}

export enum MatchType {
    'PONG', 'FOOS'
}

export type Match = {
    players: User[];
    status: number;
    date: Date;
    result: string;
    winner:User | Team;
    loser:User | Team;
    location: string;
    type: number;
}
