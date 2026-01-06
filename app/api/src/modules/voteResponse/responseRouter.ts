import { Router } from "express";
import { createResponseHandler, getVoteResponsesHandler, getVoteResultsHandler } from "./responseController";


const router = Router({ mergeParams: true });


router
    .post("/", createResponseHandler)
    .get("/", getVoteResponsesHandler)
    .get("/results", getVoteResultsHandler)

export default router;