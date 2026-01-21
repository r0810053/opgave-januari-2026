/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 */
import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { ClassroomInput } from '../types';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created classroom
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const classroomInput = <ClassroomInput>req.body;
        const classroom = await classroomService.createClassroom(classroomInput);
        res.status(200).json(classroom);
    } catch (error) {
        next(error);
    }
});

export { classroomRouter };