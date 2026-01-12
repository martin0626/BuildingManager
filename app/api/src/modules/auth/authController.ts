import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { signJwt } from "../../utils/jwt";

/**
 * Redirects user to Google OAuth
 */
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

/**
 * Handles Google OAuth callback
 */
export const googleAuthCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "google",
    { session: false },
    (err: any, user: any) => {
      if (err || !user) {
        return res.redirect("/auth/login-failed");
      }

      const token = signJwt(user);

      // OPTION A: redirect with token
      // return res.redirect(
      //   `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
      // );

      // OPTION B (API-only):
      return res.json({ accessToken: token });
    }
  )(req, res, next);
};

/**
 * Logout user
 */
export const logout = (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "Logged out successfully",
  });
};
