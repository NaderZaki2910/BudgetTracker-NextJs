import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";
import { Avatar } from "@nextui-org/avatar";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/src/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/src/components/theme-switch";
import {

} from "@/src/components/icons";

import { Logo } from "@/src/components/icons";
import { auth, signOut } from "../auth";
import { UserDropDown } from "./userDropdown";
import { ReactElement, JSXElementConstructor, ReactNode, PromiseLikeOfReactNode, Key } from "react";
import { UrlObject } from "url";
import { MenuDropDown } from "./menuDropDown";
import { DropdownTrigger } from "@nextui-org/react";

export const Navbar = async () => {
	const session = await auth();
	const getDropDown = (children: { label: string; href: string | UrlObject; }[], trigger: JSX.Element) => {
		const color: "primary" = "primary"
		const items = children.map((child: { label: string; href: string | UrlObject; }) => (
			{
				content:
					<NextLink
					key={child.label}
					className={clsx(
						linkStyles({ color: "foreground" }),
						"data-[active=true]:text-primary data-[active=true]:font-medium"
					)}
					color="foreground"
					href={child.href}
					>
						{child.label}
					</NextLink>,
				key: child.label,
				color: color
			}
		))
		return (
			<MenuDropDown items={items} trigger={trigger}>
			</MenuDropDown>
		);
	}
	const userMenu = () => {
		const primary: "primary" = "primary"
		const danger: "danger" = "danger"
		const items = [{
			key: "profile",
			content: <><p className="font-semibold">Signed in as</p>
			<p className="font-semibold">{session?.user?.name}</p></>,
			color: primary
		},
		{
			key: "logout",
			content: "Sign Out",
			color: danger
		}]
		return (
			<MenuDropDown items={items} trigger={<Avatar
				isBordered
				as="button"
				className="transition-transform"
				color="primary"
				size="sm"
				src={(session?.user?.image)?session?.user?.image:""}
			  />}>
			</MenuDropDown>
		);
	}
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">BUDGETECTIVE</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{session?.user ?
					siteConfig.navItems.map((item) => (
						(item.children)? 
						getDropDown(item.children,<NavbarItem>
							<DropdownTrigger>
							  <Button
								disableRipple
								className="p-0 bg-transparent data-[hover=true]:bg-transparent"
								radius="sm"
								variant="light"
							  >
								{item.label}
							  </Button>
							</DropdownTrigger>
						  </NavbarItem>)
						:
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium")}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem> 
					)):<></>}
				</ul>
			</NavbarContent>

			<NavbarContent
				as="div"
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
				{
					session?.user ?
					userMenu() : <></>
				}
				<NavbarItem className="hidden md:flex">
					{
						session?.user ?
							<></>
							:
							<Button
								as={Link}
								color="primary"
								variant="shadow"
								size="sm"
								href="/api/auth/signin"
							>
								Login
							</Button>
					}
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
											? "danger"
											: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
