import { Router } from "express";
import { inviteMemberHandler, listMembersHandler, removeMemberHandler, updateMembershipHandler } from "./msController";

const router = Router({ mergeParams: true });


router
    .get("/", listMembersHandler)
    .post("/:memberId", inviteMemberHandler)
    .patch("/:memberId", updateMembershipHandler)
    .delete("/:memberId", removeMemberHandler);


export default router;