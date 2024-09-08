import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';
import {Button} from "@/components/ui/button";
import {NavLink} from "react-router-dom";
import SignInForm from "@/components/forms/signInForm";

function Login() {

    return (
        <main className={"flex size-full justify-center items-center"}>
            <Card className="w-[350px]">
                <CardHeader className={"flex justify-center items-center w-full"}>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
                <CardFooter className="flex justify-center">
                    <NavLink to={"/register"}>
                        <Button variant={"link"}>Don't have an account?</Button>
                    </NavLink>
                </CardFooter>
            </Card>
        </main>
    );
}

export default Login;