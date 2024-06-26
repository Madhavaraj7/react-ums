import express from 'express'
import { getAllUsersController, login } from '../controllers/adminController.js';


const router = express.Router();

router.post("/admin-login",login);
router.get("/get-users",getAllUsersController);





export default router