export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
}

export interface StudentGroup {
    id: string;
    groupName: string;
    students: Student[];
}