export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Budgetective",
	description: "Financial freedom starts here.",
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
