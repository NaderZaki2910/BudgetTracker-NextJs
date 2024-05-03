"use client";
import { title } from "@/src/components/primitives";
import { Tabs } from "@/src/components/tabs";
import { Label } from "@/src/components/label";
import { Input } from "@/src/components/input";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { api } from "@/src/config/api";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode | any;
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
export default function SettingsPage() {
	const { data: session, status } = useSession();
	const handleSubmitWallet = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget)
		var name = formData.get("name");
		var description = formData.get("description");
		var value = formData.get("value");
		console.log({ name, description, value })
		if (name?.length && name?.length > 0) {
			const res = await api((session?.user?.token) ? session?.user?.token : "").post('api/wallets/create', {
				"wallet": {
					"name": name,
					"description": description,
					"amount": value
				}
			})
			if (res.status == 200) {
				alert("Wallet insertion was successful.")
			}
			else {
				alert("Wallet insertion failed.")
			}
		}
		else {
			alert("Name Field is Empty")
		}
	};
	const tabs: Tab[] = [
		{
			title: "Wallets",
			value: "wallets",
			content: (
				<div className="w-full overflow-hidden relative h-[70%] rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Insert Wallet</p>
					<form className="p-5" onSubmit={handleSubmitWallet}>
						<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
							<LabelInputContainer>
								<Label htmlFor="name">Name</Label>
								<Input name="name" placeholder="Cash" type="text" />
							</LabelInputContainer>
						</div>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="description">Description</Label>
							<Input name="description" placeholder="Info..." type="text" />
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="value">Value</Label>
							<Input name="value" placeholder="0" type="number" />
						</LabelInputContainer>
						<LabelInputContainer className="mb-4 ">
							<Button color="secondary" variant="faded" type="submit">
								Insert
							</Button>
						</LabelInputContainer>
					</form>
				</div>
			),
		},
		{
			title: "Categories",
			value: "categories",
			content: (
				<div className="w-full overflow-hidden relative h-[70%] rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Insert Category</p>
					<form className="p-5" onSubmit={handleSubmitWallet}>
						<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
							<LabelInputContainer>
								<Label htmlFor="name">Name</Label>
								<Input name="name" placeholder="Cash" type="text" />
							</LabelInputContainer>
						</div>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="description">Description</Label>
							<Input name="description" placeholder="Info..." type="text" />
						</LabelInputContainer>
						<LabelInputContainer className="mb-4">
							<Label htmlFor="value">Value</Label>
							<Input name="value" placeholder="0" type="number" />
						</LabelInputContainer>
						<LabelInputContainer className="mb-7">
							<Button color="secondary" variant="faded" type="submit">
								Insert
							</Button>
						</LabelInputContainer>
					</form>
				</div>
			),
		},
		{
			title: "Insert Income Source",
			value: "income",
			content: (
				<div className="w-full overflow-hidden relative h-[70%] rounded-2xl p-5 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Income Sources tab</p>
					<DummyContent />
				</div>
			),
		}
	];

	return (
		<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
			<Tabs tabs={tabs} />
		</div>
	);
}
const DummyContent = () => {
	return (
		<Image
			src="/linear.webp"
			alt="dummy image"
			width="1000"
			height="1000"
			className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	);
};