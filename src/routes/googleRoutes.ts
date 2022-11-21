import { Router } from "express";
import passport from "passport";
import "../controllers/google";
import { successResponse } from "../utils/responses";

const router = Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);

router.get("/redirect", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  return successResponse(res, 200, "User Logged in!", { userDetails: req.user, token: req.file });
});

export default router;
