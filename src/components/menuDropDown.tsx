"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react"
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/dropdown";
type Item = {
    key: string;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    content: string | React.ReactNode | any;
  };
export const MenuDropDown = ({
    items: propItems,
    trigger: propTrigger,
  }: {
    items: Item[];
    trigger: React.ReactNode | any;
  }) => {
    const { data: session, status } = useSession();
    const handleAction = async (key: string | number) => {
      switch(key){
        case "logout":
          signOut();
          break;
        case "profile":
          console.log(session?.user);
          break;
      }
    }
    return (
        <Dropdown placement="bottom">
          <DropdownTrigger>
            {propTrigger}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => handleAction(key)}>
            {
                propItems.map((item) => 
                (
                    <DropdownItem key={item.key} color={item.color} className="h-14 gap-2">
                        {item.content}
                    </DropdownItem>
                ))
            }
          </DropdownMenu>
        </Dropdown>
    );
};
