import {body} from "express-validator";

export const validateProject = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required"),
    body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required"),
    body("budget")
    .isNumeric()
    .withMessage("Budget must be a number")
    .custom((value)=>value>=0)
    .withMessage("Budget cannot be negative"),  
];