"use client"

import { useState } from "react"

const socials = [
	{
		name: "GitHub",
		href: "https://github.com/SHXZ7",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
				<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
			</svg>
		),
	},
	{
		name: "LinkedIn",
		href: "https://www.linkedin.com/in/mohammed-shaaz-098a1628b/",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
			</svg>
		),
	},
	{
		name: "Email",
		href: "mailto:shaazney123@gmail.com",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
				<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
			</svg>
		),
	},
	{
		name: "Phone",
		href: "tel:+916282984460",
		icon: (
			<svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
				<path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
			</svg>
		),
	},
]

export function SocialIcons({ theme = "dark" }) {
	const [hoveredIndex, setHoveredIndex] = useState(null)

	return (
		<div
			className={`relative flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl backdrop-blur-xl border transition-all duration-700 shadow-lg ${
				theme === "dark"
					? "bg-[#1a1a1a]/80 border-white/[0.08] shadow-black/20"
					: "bg-white/80 border-gray-200/50 shadow-gray-200/50"
			}`}
		>
			{/* Subtle gradient overlay */}
			<div
				className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700 ${
					theme === "dark"
						? "bg-gradient-to-b from-white/[0.02] to-transparent"
						: "bg-gradient-to-b from-gray-50/50 to-transparent"
				}`}
			/>

			{socials.map((social, index) => (
				<a
					key={social.name}
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					className="group relative flex items-center justify-center size-10 rounded-xl transition-all duration-300"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
					aria-label={social.name}
				>
					{/* Hover background */}
					<span
						className={`absolute inset-1 rounded-lg transition-all duration-300 ease-out ${
							hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
						} ${
							theme === "dark"
								? "bg-white/[0.05]"
								: "bg-gray-100/80"
						}`}
					/>

					{/* Icon */}
					<span
						className={`relative z-10 transition-all duration-300 ease-out ${
							hoveredIndex === index
								? theme === "dark"
									? "text-[#C8FF5C] scale-110"
									: "text-[#8ec438] scale-110"
								: theme === "dark"
								? "text-white/40"
								: "text-gray-500"
						}`}
					>
						{social.icon}
					</span>

					{/* Bottom indicator line */}
					<span
						className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ease-out ${
							hoveredIndex === index ? "w-3 opacity-100" : "w-0 opacity-0"
						} ${
							theme === "dark" ? "bg-[#C8FF5C]" : "bg-[#8ec438]"
						}`}
					/>

					{/* Tooltip */}
					<span
						className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all duration-300 ease-out shadow-lg ${
							hoveredIndex === index
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-1 pointer-events-none"
						} ${
							theme === "dark"
								? "bg-white/95 text-[#1a1a1a] backdrop-blur-sm"
								: "bg-[#1a1a1a]/95 text-white backdrop-blur-sm"
						}`}
					>
						{social.name}
						{/* Tooltip arrow */}
						<span
							className={`absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 ${
								theme === "dark" ? "bg-white/95" : "bg-[#1a1a1a]/95"
							}`}
						/>
					</span>
				</a>
			))}
		</div>
	)
}
