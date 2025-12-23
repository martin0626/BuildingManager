import { Request, Response } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "./userServices";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

export const createUserHandler = catchAsync(async (req: Request, res: Response) =>{
    const { email, fullName, role } = req.body;

    if (!email || !fullName || !email.includes('@')) {
      return res.status(400).json({
        message: "Email and Full Name are required and email must be valid!",
      });
    }
    

    const user = await createUser({ email, fullName, role });
    return res.status(201).json(user);
})


export const getSingleUserHandler = catchAsync(async (req: Request, res: Response) => {
    let name: string = req.params.name;
    if(name.length < 2){
      return res.status(400).json({
        message: "Name parameter is required and length should be at least 2 characters!",
      });
    }

    let users = await getUsers(name);
    return res.status(200).json(users);
});


export const getAllUserHandler = catchAsync(async (req: Request, res: Response) => {
  const user = await getUsers();
  return res.status(200).json(user);
});
   


export const updateUserHandler = catchAsync(async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const updateData = req.body;
  const updatedUser = await updateUser(userId, updateData);
  return res.status(200).json(updatedUser);
});
  

export const deleteUserHandler = catchAsync(async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const deletedUser = await deleteUser(userId);
  return res.status(200).json(deletedUser);
});