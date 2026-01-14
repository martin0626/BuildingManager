import catchAsync from "../../utils/catchAsync";
import { addMemberToBuilding, getBuildingMembers, removeMemberFromBuilding, updateMembershipOwnership } from "./msServices";

export const inviteMemberHandler = catchAsync(async (req, res) => {
    const { buildingId, memberId } = req.params;

    const result = await addMemberToBuilding(buildingId, req.user!.id, memberId);
    res.status(200).json({
        message: `User with ID ${memberId} has been added to building with ID ${buildingId}.`,
        data: result
    });
});


export const removeMemberHandler = catchAsync(async (req, res) => {
    const { buildingId, memberId } = req.params;
    await removeMemberFromBuilding(buildingId, req.user!.id, memberId);
    res.status(200).json({
        message: `User with ID ${memberId} has been removed from building with ID ${buildingId}.`
    });
});


export const updateMembershipHandler = catchAsync(async (req, res) => {
    const { buildingId, memberId } = req.params;
    
    const result = await updateMembershipOwnership(
        buildingId,
        req.user!.id,
        memberId,
        req.body.isOwner
    );
    res.status(200).json({
        message: `Membership for user with ID ${memberId} has been updated.`,
        data: result
    });
});


export const listMembersHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    // Logic to list all members of the building  
    const members = await getBuildingMembers(buildingId);
    res.status(200).json({ data: members });
});