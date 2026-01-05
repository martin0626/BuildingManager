import catchAsync from "../../utils/catchAsync";
import { createAnnouncement, getAllAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } from "./announcementService";



export const createAnnouncementHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const apartmentData = req.body;
    const result = await createAnnouncement(buildingId, apartmentData);
    res.status(201).json({ message: "Apartment created successfully", data: result });
});



export const getAnnouncementsHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const apartments = await getAllAnnouncements(buildingId, req.query);
    res.status(200).json({ data: apartments });
});



export const getAnnouncementByIdHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    
    const result = await getAnnouncementById(buildingId, id);
    res.status(200).json({ data: result });
});



export const updateAnnouncementHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    const apartmentData = req.body;
    const updatedApartment = await updateAnnouncement(buildingId, id, apartmentData);
    res.status(200).json({ message: "Apartment updated successfully", data: updatedApartment });
});



export const deleteAnnouncementHandler = catchAsync(async (req, res) => {
    const { buildingId, id } = req.params;
    await deleteAnnouncement(buildingId, id);
    res.status(200).json({ message: "Apartment deleted successfully" });
});

