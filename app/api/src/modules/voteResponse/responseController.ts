import catchAsync from "../../utils/catchAsync";
import { createVoteResponse, getVoteResponses, getVoteResults } from "./responseServices";



export const createResponseHandler = catchAsync(async (req, res) => {
    const data = req.body;
    const apartmentId = data.apartmentId;
    const { buildingId, voteId } = req.params;
    const result = await createVoteResponse(buildingId, voteId, apartmentId, data);
    res.status(201).json({ message: "Vote option created successfully", data: result });
});


export const getVoteResponsesHandler = catchAsync(async (req, res) => {
    const { buildingId, voteId } = req.params;
    const options = await getVoteResponses(buildingId, voteId);
    res.status(200).json({ data: options });
});

export const getVoteResultsHandler = catchAsync(async (req, res) => {
    const { buildingId, voteId } = req.params;
    const results = await getVoteResults(buildingId, voteId);
    res.status(200).json({ data: results });
});