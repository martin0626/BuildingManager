declare module "passport-google-oauth20" {
  import { Strategy as PassportStrategy } from "passport-strategy";

  interface Profile {
    id: string;
    displayName: string;
    emails?: { value: string }[];
    photos?: { value: string }[];
  }

  interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }

  type VerifyCallback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void
  ) => void;

  export default class GoogleStrategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyCallback);
  }
}
