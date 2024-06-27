import express from 'express'
import { deleteUserController, getAllUsersController, login, signout } from '../controllers/adminController.js';
import { signup } from '../controllers/authController.js';


const router = express.Router();

router.post("/admin-login",login);
router.get("/get-users",getAllUsersController);
router.get('/signout', signout);
router.post("/add-user", signup);
router.delete("/delete-user/:id",deleteUserController);








export default router