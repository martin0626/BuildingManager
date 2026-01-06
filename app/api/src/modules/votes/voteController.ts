import catchAsync from "../../utils/catchAsync";
import { activateVote, closeVote, createVote, deleteVote, getAllVotes, getVoteById, updateVote } from "./voteServices";


export const createVoteHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const voteData = req.body;
    const result = await createVote(buildingId, voteData);
    res.status(201).json({ message: "Vote created successfully", data: result });
});


export const getVotesHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const votes = await getAllVotes(buildingId, req.query);
    res.status(200).json({ data: votes });
});


export const getVoteByIdHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    const result = await getVoteById(buildingId, id);
    res.status(200).json({ data: result });
});


export const updateVoteHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    const expenseData = req.body;
    const updated = await updateVote(buildingId, id, expenseData);
    res.status(200).json({ message: "Vote updated successfully", data: updated });
});


export const deleteVoteHandler = catchAsync(async (req, res) => {
    const { buildingId, id } = req.params;
    await deleteVote(buildingId, id);
    res.status(200).json({ message: "Vote deleted successfully" });
});


export const activateVoteHandler = catchAsync(async (req, res) => {
    const { buildingId, id } = req.params;
    await activateVote(buildingId, id);
    res.status(200).json({ message: "Vote activated successfully" });
});

export const closeVoteHandler = catchAsync(async (req, res) => {
    const { buildingId, id } = req.params;
    await closeVote(buildingId, id);
    res.status(200).json({ message: "Vote closed successfully" });
});