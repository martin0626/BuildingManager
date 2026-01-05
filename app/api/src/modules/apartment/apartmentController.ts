import catchAsync from "../../utils/catchAsync";
import { createApartment, deleteApartment, getAllApartments, getApartmentById, updateApartment } from "./apartmentService";



export const createApartmentHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const apartmentData = req.body;
    const result = await createApartment(buildingId, apartmentData);
    res.status(201).json({ message: "Apartment created successfully", data: result });
});



export const getApartmentsHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const apartments = await getAllApartments(buildingId, req.query);
    res.status(200).json({ data: apartments });
});



export const getApartmentByIdHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    
    const result = await getApartmentById(buildingId, id);
    res.status(200).json({ data: result });
});



export const updateApartmentHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    const apartmentData = req.body;
    const updatedApartment = await updateApartment(buildingId, id, apartmentData);
    res.status(200).json({ message: "Apartment updated successfully", data: updatedApartment });
});



export const deleteApartmentHandler = catchAsync(async (req, res) => {
    const { buildingId, id } = req.params;
    await deleteApartment(buildingId, id);
    res.status(200).json({ message: "Apartment deleted successfully" });
});

