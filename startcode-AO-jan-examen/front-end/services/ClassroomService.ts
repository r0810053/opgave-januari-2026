const createClassroom = (className: string) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser'))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/classroom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ className }),
    });
};

const ClassroomService = { createClassroom };

export default ClassroomService;