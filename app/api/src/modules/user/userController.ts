import { Request, Response } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "./userServices";
import catchAsync from "../../utils/catchAsync";


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
    let id: string = req.params.id;
    if(id.length < 2){
      return res.status(400).json({
        message: "ID parameter is required and length should be at least 2 characters!",
      });
    }

    let users = await getUserById(id);
    return res.status(200).json(users);
});


export const getAllUserHandler = catchAsync(async (req: Request, res: Response) => {

  const { email, fullName } = req.query;

  const user = await getUsers({ 
    email: email ? String(email) : undefined,
    fullName: fullName ? String(fullName) : undefined,
  });
  
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