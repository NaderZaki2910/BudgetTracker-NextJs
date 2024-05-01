"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/utils/cn";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import api from "../config/api";
const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
export default function SignupModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    var onclose = () => {};
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log();
        var firstname = formData.get("firstname");
        var lastname = formData.get("lastname");
        var email = formData.get("email");
        var password = formData.get("password");
        const res = await api.post('signup', {
            "user": {
              "email": email,
              "password": password,
              "name": `${firstname} ${lastname}`
          }
        })
        if (res.status == 200) onclose();
    };
    return (
        <>
            <Button color="secondary" variant="shadow" onPress={onOpen}>Sign Up</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            { onclose = onClose }
                            <form className="my-8" onSubmit={handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1">Welcome to Budgetective!</ModalHeader>
                                <ModalBody>
                                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                        <LabelInputContainer>
                                            <Label htmlFor="firstname">First name</Label>
                                            <Input name="firstname" placeholder="XXXX" type="text" />
                                        </LabelInputContainer>
                                        <LabelInputContainer>
                                            <Label htmlFor="lastname">Last name</Label>
                                            <Input name="lastname" placeholder="XXXX" type="text" />
                                        </LabelInputContainer>
                                    </div>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input name="email" placeholder="XXXX@XXXX.com" type="email" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="password">Password</Label>
                                        <Input name="password" placeholder="••••••••" type="password" />
                                    </LabelInputContainer>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" variant="shadow" type="submit">
                                        Sign Up
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}