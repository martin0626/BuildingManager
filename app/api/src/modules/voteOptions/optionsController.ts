import catchAsync from "../../utils/catchAsync";
import { createVoteOption, createVoteOptionsBulk, deleteVoteOption, getVoteOptions, updateVoteOption } from "./optionsServices";



export const createOptionHandler = catchAsync(async (req, res) => {
    const data = req.body;
    const { voteId } = req.params;  
    const result = await createVoteOption(voteId, data);
    res.status(201).json({ message: "Vote option created successfully", data: result });
});

export const createBulkOptionHandler = catchAsync(async (req, res) => {
    const data = req.body;
    const { voteId } = req.params;
    const result = await createVoteOptionsBulk(voteId, data);
    res.status(201).json({ message: "Vote options created successfully", data: result });
});

export const getOptionsHandler = catchAsync(async (req, res) => {
    const { voteId } = req.params;
    const options = await getVoteOptions(voteId);
    res.status(200).json({ data: options });
});

export const updateOptionHandler = catchAsync(async (req, res) => {
    const { voteId, id } = req.params;
    const data: string = req.body.label;
    const updated = await updateVoteOption(voteId, id, data);
    res.status(200).json({ message: "Vote option updated successfully", data: updated });
});

export const deleteOptionHandler = catchAsync(async (req, res) => {
    const { voteId, id } = req.params;
    await deleteVoteOption(voteId, id);
    res.status(200).json({ message: "Vote option deleted successfully" });
});