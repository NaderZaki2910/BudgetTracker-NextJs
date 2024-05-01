import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";
import { TypewriterEffect, TypewriterEffectSmooth } from "../components/typewriter-effect";
import { Button } from "@nextui-org/react";
import { auth } from "../auth";
import SignupModal from "../components/signupModal";

export default async function Home() {
	const session = await auth();
	const words = [
		{
			text: "Welcome",
		},
		{
			text: "to",
		},
		{
			text: "Budgetective",
			className: "text-blue-500 dark:text-blue-500",
		},
		{
			text: "Spendings",
		},
		{
			text: "Tracker.",
		},
	];
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
				Financial freedom starts here
			</p>
			<TypewriterEffect words={words} />
			{session?.user ? <></> : <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
				<Button
					as={Link}
					color="primary"
					variant="shadow"
					href="/api/auth/signin"
				>
					Login
				</Button>
				<SignupModal />
			</div>}
		</section>
	);
}
