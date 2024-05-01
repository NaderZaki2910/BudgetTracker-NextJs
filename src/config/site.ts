export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	secret: "st0sLZ5FpoQA8yzW70mDAWuYnMdRzj1E+wdQxuL0uwQ=",
	navItems: [
		{
			label: "Settings",
			href: "/settings",
			children: [
				{
					label: "Insert User Data",
					href: "/settings/insert",
				}
			]
		},
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
	],
};
