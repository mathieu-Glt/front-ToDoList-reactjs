import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';
import {Button} from "@/components/ui/button";
import {NavLink, useNavigate} from "react-router-dom";
import SignUpForm from "@/components/forms/registerForm";

function SignUp() {

    return (
        <main className={"flex size-full justify-center items-center"}>
            <Card className="w-[350px]">
                <CardHeader className={"flex justify-center items-center w-full"}>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="flex justify-center">
                    <NavLink to={"/login"}>
                        <Button variant={"link"}>Already have an account?</Button>
                    </NavLink>
                </CardFooter>
            </Card>
        </main>
    );
}

export default SignUp;