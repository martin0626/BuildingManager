import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { AuthProvider } from "@prisma/client";
import { findOrCreateOAuthUser } from "./authService";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("Google account has no email"));
        }

        const user = await findOrCreateOAuthUser({
          provider: AuthProvider.GOOGLE,
          providerId: profile.id,
          email,
          fullName: profile.displayName,
        });

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
