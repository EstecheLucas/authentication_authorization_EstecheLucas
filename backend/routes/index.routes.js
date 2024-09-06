import { loginUser, logoutUser, registerUser } from "../controllers/index.controllers.js";
import { Router } from "express";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export {router}
