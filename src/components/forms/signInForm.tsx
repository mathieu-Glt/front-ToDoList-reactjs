import React from 'react';
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useSignInMutation} from "@/redux/features/auth/auth.service";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

function SignInForm() {
    const navigate = useNavigate();
    const [
        signIn,
        { isLoading },
    ] = useSignInMutation();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        if(isLoading) return
        const result = await signIn(values)

        if(result?.data?.code === 401 && (result?.data?.error as any)?.message === "User not found") {
            form.setError("email", {message: "Invalid Credentials"})
            form.setError("password", {message: "Invalid Credentials"})
            return;
        }

        if(result?.data?.message === "Error" && (result?.data?.error as any)?.message === "Invalid credentials") {
            form.setError("email", {message: "Invalid Credentials"})
            form.setError("password", {message: "Invalid Credentials"})
            return;
        }

        if(result?.data?.message === "Success")
            return navigate("/")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col justify-between gap-5"}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john@doe.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="********" {...field} type={"password"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type={"submit"} disabled={isLoading}>Login</Button>
            </form>
        </Form>
    );
}

export default SignInForm;