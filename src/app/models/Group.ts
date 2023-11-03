export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
}

export interface Group {
    id: string;
    groupName: string;
    students: Student[];
}