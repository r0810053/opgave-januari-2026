import database from '../util/database';
import { Classroom } from '../model/classroom';

const createClassroom = async (className: string): Promise<Classroom> => {
    try {
        const classroomPrisma = await database.classroom.create({
            data: { className },
        });
        return Classroom.from(classroomPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllClassrooms = async (): Promise<Classroom[]> => {
    try {
        const classroomsPrisma = await database.classroom.findMany();
        return classroomsPrisma.map(Classroom.from);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { createClassroom, getAllClassrooms };