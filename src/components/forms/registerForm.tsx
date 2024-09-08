import React from 'react';
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useSignUpMutation} from "@/redux/features/auth/auth.service";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const registerSchema = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
})

function SignUpForm() {
    const navigate = useNavigate();
    const [
        signUp,
        { isLoading },
    ] = useSignUpMutation();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        if(isLoading) return
        const result = await signUp(values)

        if(result?.data?.code === 401 && (result?.data?.error as any)?.message === "User not found") {
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
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firstname</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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

export default SignUpForm;