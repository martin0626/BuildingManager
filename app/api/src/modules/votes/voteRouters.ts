import { Router } from "express";
import { activateVoteHandler, closeVoteHandler, createVoteHandler, deleteVoteHandler, getVoteByIdHandler, getVotesHandler, updateVoteHandler } from "./voteController";
import voteOptionRoutes from "../voteOptions/optionRouter";
import voteResponseRoutes from "../voteResponse/responseRouter";
import { roleAuthorize } from "../../middlewares/roleAuthorize";

const router = Router({ mergeParams: true });


//TODO: Implement vote option and response routes
router.use("/:voteId/options", voteOptionRoutes);
router.use("/:voteId/responses", voteResponseRoutes);

router
    .post("/", roleAuthorize(["ADMIN", "MANAGER"]), createVoteHandler)
    .post("/:id/activate", roleAuthorize(["ADMIN", "MANAGER"]), activateVoteHandler)
    .post("/:id/close", roleAuthorize(["ADMIN", "MANAGER"]), closeVoteHandler)
    .get("/:id", getVoteByIdHandler)
    .get('/', getVotesHandler)
    .patch('/:id', roleAuthorize(["ADMIN", "MANAGER"]), updateVoteHandler)
    .delete('/:id', roleAuthorize(["ADMIN", "MANAGER"]), deleteVoteHandler)

export default router;
