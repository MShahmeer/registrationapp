// we are making this interface to make the helper strongly typed
export interface User {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    dob: string,
    email: string,
    password: string,
    acceptTerms: boolean
}