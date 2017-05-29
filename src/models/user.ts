import { Match } from './match';
import { Team } from "./team";
import { IScore } from "./score";

export interface IUserConfig {
    uid: string,
    email?: string;
    name: string;
    matches?:  { [key: string]: Match },
    teams?: {[key: string]: Team},
    joined: number;
    recentActivity: number;
    photoURL: string;
    providerId: string;
    emailVerified?: boolean;
    lat?: string;
    online: boolean;
    totalScore?: IScore;
    score?: any;
    wins?: any;
    losses?: any;
}

export class User {

    uid: string;
    email: string;
    name: string;
    matches: { [key: string]: Match };
    teams: {[key: string]: Team};
    joined: number;
    recentActivity: number;
    photoURL: string;
    providerId: string;
    emailVerified?: boolean;
    lat?: string;
    online: boolean;
    wins?: any;
    losses?: any;
    score?: any;
   
    constructor(config: IUserConfig) {
      this.uid = config.uid || null;
      this.email = config.email || null;
      this.name = config.email || null;
      this.joined = config.joined || null;
      this.recentActivity = config.recentActivity || null;
      this.photoURL = config.photoURL || null;
      this.providerId = config.providerId || null;
      this.emailVerified = config.emailVerified || null;
      this.teams = config.teams || null;
      this.matches = config.matches || null;
      this.wins = config.wins || null;
      this.losses = config.losses || null;
      this.score = config.score || null;
    }

}

