import { Router } from "express";
import { activateVoteHandler, closeVoteHandler, createVoteHandler, deleteVoteHandler, getVoteByIdHandler, getVotesHandler, updateVoteHandler } from "./voteController";


const router = Router({ mergeParams: true });


//TODO: Implement vote option and response routes
// router.use("/:voteId/options", voteOptionRoutes);
// router.use("/:voteId/responses", voteResponseRoutes);

router
    .post("/", createVoteHandler)
    .post("/:id/activate", activateVoteHandler)
    .post("/:id/close", closeVoteHandler)
    .get("/:id", getVoteByIdHandler)
    .get('/', getVotesHandler)
    .patch('/:id', updateVoteHandler)
    .delete('/:id', deleteVoteHandler)

export default router;
