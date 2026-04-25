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
		if (!timeLeft) return

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
			<main className={`meme-page ${isDark ? "night" : "day"}`}>
				<section className="meme-board done-board">
					<div className="meme-badge">FAKE NEWS</div>
					<h1>GAME OVER: каденцію завершено</h1>
					<p className="sub">Mission complete. Мем-табло офіційно зупинено.</p>
					<div
						className={`avatar-frame ${showPutin ? "is-hovered" : ""}`}
						onMouseEnter={() => setShowPutin(true)}
						onMouseLeave={() => setShowPutin(false)}
					>
						<img src={trump} alt="Trump" className="avatar base" />
						<img src={putin} alt="Putin" className="avatar alt" />
					</div>
					<audio autoPlay>
						<source
							src="https://www.fesliyanstudios.com/play-mp3/387"
							type="audio/mp3"
						/>
					</audio>
				</section>
			</main>
		)
	}

	return (
		<main className={`meme-page ${isDark ? "night" : "day"}`}>
			<section className="meme-board" role="timer" aria-live="polite">
				<div className="meme-badge">FAKE NEWS</div>

				<header className="hero">
					<h1>Скільки Трампу ще сидіти у Білому домі? 🦧</h1>
				</header>

				<div className="main-grid">
					<div
						className={`avatar-frame ${showPutin ? "is-hovered" : ""}`}
						onMouseEnter={() => setShowPutin(true)}
						onMouseLeave={() => setShowPutin(false)}
					>
						<img src={trump} alt="Trump" className="avatar base" />
						<img src={putin} alt="Putin" className="avatar alt" />
						<p className="hover-tip">Hover = мой хороший друг</p>
					</div>

					<div className="timer-grid">
						<article className="tile yellow">
							<strong>{timeLeft.days}</strong>
							<span>днів</span>
						</article>
						<article className="tile blue">
							<strong>{timeLeft.hours.toString().padStart(2, "0")}</strong>
							<span>годин</span>
						</article>
						<article className="tile green">
							<strong>{timeLeft.minutes.toString().padStart(2, "0")}</strong>
							<span>хвилин</span>
						</article>
						<article className="tile red pulse">
							<strong
								key={timeLeft.seconds}
								className="second-value"
							>
								{timeLeft.seconds.toString().padStart(2, "0")}
							</strong>
							<span>секунд</span>
						</article>
					</div>
				</div>

				<div className="progress-wrap" title={`${timeLeft.progress.toFixed(2)}%`}>
					<div className="progress-fill" style={{ width: `${timeLeft.progress}%` }} />
					<span>{timeLeft.progress.toFixed(2)}%</span>
				</div>

				<div className="ticker" aria-hidden="true">
					<div>
						BREAKING NEWS: Колись путін назвав мене генієм, і що, я маю від
						цього відхрещуватися? Ви з’їхали з глузду?
					</div>
				</div>

				<footer className="footer-row">
					<p>До 20 січня 2029 року, 12:00 EST</p>
					<a
						className="cta-link"
						href="https://t.me/hlib_chahan"
						target="_blank"
						rel="noreferrer"
					>
						Обʼявити імпічмент
					</a>
				</footer>
			</section>
		</main>
	)
}

export default App
