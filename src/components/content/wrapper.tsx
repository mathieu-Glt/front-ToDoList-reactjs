import React, {ReactNode, useState} from 'react';
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {LogOut, Menu, Plus, X} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useLogOutMutation} from "@/redux/features/auth/auth.service";
import {useAppSelector} from "@/redux/config/hooks";
import {useNavigate} from "react-router-dom";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

interface IWrapperProps {
    children: ReactNode;
}

function Wrapper({children}: IWrapperProps) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const userId = useAppSelector((state) => state.authReducer?.user?.id)

    const [
        logOut,
        {isLoading}
    ] = useLogOutMutation()

    const handleLogOut = async () => {
        if(!userId || isLoading) return
        const result = await logOut({userId})

        if(result?.data?.message === "Success")
            return navigate("/login")
    }

    const handleOpen = () => {
        setOpen((prev) => !prev)
    }

    return (
        <main className={"flex min-h-screen w-full flex-col bg-muted/40"}>
            <aside className={cn("fixed inset-y-0 left-0 z-10 hidden transition-all ease-in-out duration-300", "flex-col border-r bg-background sm:flex", open ? "w-56" : "w-16")}>
                <nav className="flex flex-col items-center gap-4 px-1 py-4">
                    <Button onClick={handleOpen} variant={"ghost"} className={open ? "self-end" : "self-center"}>
                        <Menu
                            className={`absolute transition-transform transform duration-300 ease-in-out ${open ? 'opacity-0' : 'opacity-100'}`}
                        />
                        <X
                            className={`absolute transition-transform transform duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"link"}>
                                <Plus/> <span className={cn(
                                "transition-all",
                                open ? "opacity-100" : "opacity-0 w-0"
                            )}>New List</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent side={"left"} className={"flex flex-col gap-2"}>
                            <Label>Create a new List</Label>
                            <Input id={"list-name"} name={"listName"} placeholder={"List Name"}  />
                            <Button>Create</Button>
                        </PopoverContent>
                    </Popover>
                </nav>
                <nav className="mt-auto flex flex-col items-start gap-4 px-2 py-4">
                    <Button variant={"link"} className={"gap-2"} onClick={handleLogOut}>
                        <LogOut /> <span className={cn(
                            "transition-all",
                            open ? "opacity-100" : "opacity-0"
                    )}>Logout</span>
                    </Button>
                </nav>
            </aside>
            <div className={"pl-24"}>
            {children}
            </div>
        </main>
    );
}

export default Wrapper;