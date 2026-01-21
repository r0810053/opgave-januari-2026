import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly className: string;

    constructor(classroom: { id?: number; className: string }) {
        this.validate(classroom);
        this.id = classroom.id;
        this.className = classroom.className;
    }

    validate(classroom: { className: string }) {
        if (!classroom.className?.trim()) {
            throw new Error('Classroom name is required');
        }
    }

    static from(classroomPrisma: ClassroomPrisma): Classroom {
        return new Classroom({
            id: classroomPrisma.id,
            className: classroomPrisma.className,
        });
    }
}