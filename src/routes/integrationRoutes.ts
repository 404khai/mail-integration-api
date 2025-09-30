import express from "express";
import { saveIntegration, getLists } from "../controllers/integrationController";

const router = express.Router();

router.post("/esp", saveIntegration);
router.get("/esp/lists", getLists);

export default router;
