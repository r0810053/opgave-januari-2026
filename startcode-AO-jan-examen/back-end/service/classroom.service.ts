import classroomDb from '../repository/classroom.db';
import { Classroom } from '../model/classroom';
import { ClassroomInput } from '../types';

const createClassroom = async (classroomInput: ClassroomInput): Promise<Classroom> => {
    if (!classroomInput.className || classroomInput.className.trim() === '') {
        throw new Error('Name is required');
    }
    const existingClassrooms = await classroomDb.getAllClassrooms();
    const duplicate = existingClassrooms.find(
        (c) => c.className.toLowerCase() === classroomInput.className.toLowerCase()
    );
    if (duplicate) {
        throw new Error(`Classroom with name ${classroomInput.className} already exists`);
    }
    const classroom = new Classroom({ className: classroomInput.className });
    return classroomDb.createClassroom(classroom.className);
};

export default { createClassroom };