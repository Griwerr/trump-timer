import { useEffect, useState } from "react"
import "./App.css"
import putin from "./assets/putin.png"
import trump from "./assets/trump.png"

const trumpEndDate = new Date("2029-01-20T12:00:00-05:00")
const trumpStartDate = new Date("2025-01-20T12:00:00-05:00")

function App() {
	const calculateTimeLeft = () => {
		const now = new Date()
		const difference = trumpEndDate - now
		if (difference <= 0) return null

		const totalSeconds = Math.floor(difference / 1000)
		const rawProgress =
			((now - trumpStartDate) / (trumpEndDate - trumpStartDate)) * 100
		const progress = Math.min(100, Math.max(0, rawProgress))

		return {
			days: Math.floor(totalSeconds / (3600 * 24)),
			hours: Math.floor((totalSeconds % (3600 * 24)) / 3600),
			minutes: Math.floor((totalSeconds % 3600) / 60),
			seconds: totalSeconds % 60,
			progress,
		}
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
	const [isDark, setIsDark] = useState(false)
	const [showPutin, setShowPutin] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		const hour = new Date().getHours()
		setIsDark(hour >= 20 || hour < 7)
	}, [])

	const shareCountdown = () => {
		const text = `🕒 Трампу ще сидіти у Білому домі ${timeLeft.days} днів, ${timeLeft.hours} год, ${timeLeft.minutes} хв і ${timeLeft.seconds} сек!`
		if (navigator.share) {
			navigator.share({ title: "Trump Timer", text, url: window.location.href })
		} else {
			navigator.clipboard.writeText(text)
			alert("Скопійовано в буфер обміну!")
		}
	}

	if (!timeLeft) {
		return (
			<div
				className={`min-h-screen flex flex-col items-center justify-center ${
					isDark ? "bg-gray-300 text-gray-800" : "bg-gray-100 text-gray-700"
				} text-center p-4`}
			>
				<h1 className="text-3xl md:text-5xl font-bold mb-4">
					🎉 Трамп більше не президент! 🎉
				</h1>
				<div className="w-52 md:w-72 h-52 md:h-72 overflow-hidden rounded-full">
					<div className="w-full h-full overflow-hidden rounded-full">
						<img
							src={showPutin ? putin : trump}
							alt="Trump or Putin"
							className="object-cover w-full h-full"
							onMouseEnter={() => setShowPutin(true)}
							onMouseLeave={() => setShowPutin(false)}
						/>
					</div>
				</div>
				<audio autoPlay>
					<source
						src="https://www.fesliyanstudios.com/play-mp3/387"
						type="audio/mp3"
					/>
				</audio>
			</div>
		)
	}

	return (
		<div
			className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center ${
				isDark
					? "bg-gray-300 text-gray-800"
					: "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800"
			}`}
		>
			<div className="w-52 md:w-72 h-52 md:h-72 overflow-hidden rounded-full mt-6 mb-5">
				<div className="w-full h-full overflow-hidden rounded-full">
					<img
						src={showPutin ? putin : trump}
						alt="Trump or Putin"
						className="object-cover w-full h-full"
						onMouseEnter={() => setShowPutin(true)}
						onMouseLeave={() => setShowPutin(false)}
					/>
				</div>
			</div>
			<div className="bg-gray-100/80 backdrop-blur rounded-md shadow-sm p-6 max-w-xl w-full">
				<h1 className="text-xl md:text-3xl font-extrabold mb-4 text-gray-800">
					🕒 Скільки Трампу ще сидіти у Білому домі?
				</h1>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-lg md:text-2xl font-bold">
					<div className="bg-amber-300  text-amber-900 rounded-md py-3 transition-colors duration-300">
						{timeLeft.days}
						<div className="text-sm">днів</div>
					</div>
					<div className="bg-gray-300  text-gray-900 rounded-md py-3 transition-colors duration-300">
						{timeLeft.hours}
						<div className="text-sm">год</div>
					</div>
					<div className="bg-gray-200  text-gray-800 rounded-md py-3 transition-colors duration-300">
						{timeLeft.minutes}
						<div className="text-sm">хв</div>
					</div>
					<div className="bg-gray-100  text-gray-700 rounded-md py-3 transition-colors duration-300">
						{timeLeft.seconds}
						<div className="text-sm">сек</div>
					</div>
				</div>

				<div className="w-full bg-neutral-300 rounded-full mt-4 relative h-6 cursor-pointer group">
					<div
						className="h-full bg-amber-400 rounded-full transition-all duration-500"
						style={{ width: `${timeLeft.progress}%` }}
					></div>

					<div className="absolute inset-0 flex items-center justify-center text-dark font-semibold select-none text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
						{timeLeft.progress.toFixed(4)}%
					</div>
				</div>

				<p className="mt-2 text-sm text-gray-700">
					🏛 До 20 січня 2029 року, 12:00 EST
				</p>
			</div>

			<button
				onClick={shareCountdown}
				className="mt-6 px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
			>
				🔗 Поділитися
			</button>
		</div>
	)
}

export default App
