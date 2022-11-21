import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import config from "../config";
import { IUser } from "../utils/interface";
import models from "../models";
import jwtHelper from "../utils/jwt";

const { generateToken } = jwtHelper;

passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL
    },
    async (accessToken: string, refreshToken:string, profile, done) => {
      const user: IUser | null = await models.User.findOne({ email: profile.emails?.[0].value, });
      if (user) {
        const { _id, email } = user;
        const token = await generateToken({ _id, email });
        const userDetails = {
          _id,
          email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          photo: user.photo,
          accountNo: user.accountNo,
          balance: user.balance,
          header: user.header,
          verified: user.verified,
          active: user.active,
          password: user.password
        };
        return done(null, userDetails, token);
      }
      if (!user) {
        const newUser: IUser = await models.User.create({
          googleId: profile.id,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          email: profile.emails?.[0].value,
          photo: profile.photos?.[0].value,
          role: "user",
          accountNo: `20${Math.floor(Math.random() * 90000000)}`,
          header: profile.photos?.[1].value,
          balance: 0,
          active: true,
          password: " ",
          verified: true
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);
