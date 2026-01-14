import catchAsync from "../../utils/catchAsync";
import { createBuilding, deleteBuilding, getAllBuildings, getBuildingById, updateBuilding } from "./buildingServices";



export const createBuildingHandler = catchAsync(async (req, res) => {
    // Implementation for creating a building
    const userId = req.user?.id;
    const buildingData = req.body;
    const result = await createBuilding(buildingData, userId);
    res.status(201).json({ message: "Building created successfully", data: result });
});



export const getBuildingsHandler = catchAsync(async (req, res) => {
    const buildings = await getAllBuildings(req.query);
    res.status(200).json({ data: buildings });
});



export const getBuildingByIdHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    
    const result = await getBuildingById(buildingId);
    res.status(200).json({ data: result });
});



export const updateBuildingHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const buildingData = req.body;

    const updatedBuilding = await updateBuilding(buildingId, buildingData);

    res.status(200).json({ message: "Building updated successfully", data: updatedBuilding });
});



export const deleteBuildingHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    await deleteBuilding(buildingId);
    res.status(200).json({ message: "Building deleted successfully" });
});

