import express from 'express';
import { getUsers,findUser,createUser,updateUser,deleteUser } from '../controllers/user.controller';

const router=express.Router();

router
.route("/")
.get(getUsers)

router
.route("/create") 
.post(createUser)     

router
.route("/read/:id") 
.get(findUser)

router
.route("/update/:id")
.put(updateUser)

router
.route("/delete/:id")
.delete(deleteUser)

export default router;
