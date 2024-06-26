import express from 'express'
import { getAllUsersController, login, signout } from '../controllers/adminController.js';


const router = express.Router();

router.post("/admin-login",login);
router.get("/get-users",getAllUsersController);
router.get('/signout', signout);






export default router