import catchAsync from "../../utils/catchAsync";
import { createBuilding, deleteBuilding, getBuildings } from "./buildingServices";

export const createBuildingHandler = catchAsync(async (req, res) => {
    // Implementation for creating a building
    const buildingData = req.body;
    const result = await createBuilding(buildingData);
    // Save buildingData to database (not implemented here)
    res.status(201).json({ message: "Building created successfully", data: result });
});

export const getSingleBuildingHandler = catchAsync(async (req, res) => {
    // Implementation for getting a single building by name
    const { id } = req.params;
    const result = await getBuildings(id);
    res.status(200).json({ data: result });
});

export const getAllBuildingHandler = catchAsync(async (req, res) => {
    // Implementation for getting all buildings
    const result = await getBuildings();
    res.status(200).json({ data: result });
});

export const updateBuildingHandler = catchAsync(async (req, res) => {
    // Implementation for updating a building by id
    const { id } = req.params;
    const buildingData = req.body;
    // Update buildingData in database (not implemented here)
    res.status(200).json({ message: "Building updated successfully", data: buildingData });
});

export const deleteBuildingHandler = catchAsync(async (req, res) => {
    // Implementation for deleting a building by id
    const { id } = req.params;
    await deleteBuilding(id);

    // Delete building from database (not implemented here)
    res.status(200).json({ message: "Building deleted successfully" });
});

