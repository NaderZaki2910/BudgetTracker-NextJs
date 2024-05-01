"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react"
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/dropdown";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { ListboxWrapper } from "./listBoxWrapper";
import { auth } from "../auth";
import api from "../config/api";

export const UserDropDown = () => {
    const { data: session, status } = useSession();
    const handleAction = async (key: string | number) => {
      switch(key){
        case "logout":
          signOut();
          break;
      }
    }
    return (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              size="sm"
              src={(session?.user?.image)?session?.user?.image:""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" onAction={(key) => handleAction(key)}>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user?.name}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
    );
};
