const CONFETTI_COUNT = 50;
const CONFETTI_G = 9.8;

const colors = ["#FF9821", "#02CBFF", "#FF6358"];
const confettiParticles = [];
const confettiX = 80;
const confettiY = 20;

const boxContainer = document.getElementsByClassName("box-container")[0];
for(let i=0; i<CONFETTI_COUNT; i++) {
		const dimension = Math.floor((Math.random() * 3) + 9) + "px";
		const color = colors[Math.floor(Math.random() * colors.length)];
		const particle = document.createElement("div");

		particle.classList.add("particle");
		particle.style.width = dimension;
		particle.style.height = dimension;
		particle.style.background = "radial-gradient(circle at 0 0, rgba(0,0,0,0) 40%, " + color + " 50%)";

		confettiParticles.push(particle);
		boxContainer.appendChild(particle);
}

function stepperGenerator(confetti) {
		let confettiStartTimestamp = null;
		let confettiPreviousY = 0;

		const confettiAngle = Math.floor(Math.random() * 520);
		const isNegative = Math.random() > 0.5;
		const confetti_Vx = ((Math.random() * 15)) * (isNegative ? -1 : 1);
		const confetti_Vy = (Math.random() * 20) + 60;

		const step = function(timestamp) {
				if(confettiStartTimestamp == null) {
						confettiStartTimestamp = timestamp;
						confetti.style.transform = "rotate(" + confettiAngle + "deg)";
				}
				let t = (timestamp - confettiStartTimestamp) / 1000;
				t = t * 7;
				const x = confetti_Vx * t;
				const y = (confetti_Vy * t) - (0.5 * CONFETTI_G * t * t);
				if(y < confettiPreviousY) {
						confetti.style.zIndex = "10";
				}
				confettiPreviousY = y;

				confetti.style.left = confettiX + x;
				confetti.style.bottom = confettiY + y;

				if(y >= -confettiY) {
						requestAnimationFrame(step);
				} else {
						confetti.classList.add("disappear");
						setTimeout(function() {
								confetti.parentElement.removeChild(confetti);
						}, 3000);
				}
		};
		return step;
}

setTimeout(function () {
		document.getElementsByClassName("box-body")[0].classList.remove("box-body--animated");
		document.getElementsByClassName("box-head")[0].classList.add("box-head--animated");
		setTimeout(function() {
				document.getElementsByClassName("box-head")[0].style.visibility = "hidden";
		}, 700);

		for(let i=0; i<confettiParticles.length; i++) {
				requestAnimationFrame(stepperGenerator(confettiParticles[i]));
		}
}, 3000);

setTimeout(function() {
		document.getElementsByClassName("box-body__glow")[0].style.visibility = "visible";
		document.getElementsByClassName("box-body__glow")[0].style.opacity = "1";
		document.getElementsByClassName("box-container__product")[0].style.bottom = "120px";
}, 3100);
