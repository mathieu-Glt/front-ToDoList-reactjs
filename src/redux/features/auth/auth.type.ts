export type SignInInput = {
    email: string;
    password: string;
}

export type AuthOutput = {
    id: string;
    email: string;
    accessToken: string;
}

export type SignUpInput = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type LogOutInput = {
    userId: string;
}