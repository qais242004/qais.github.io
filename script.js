/* TYPING EFFECT */
const typingEl = document.getElementById("typing");
const phrases = ["Web Developer", "Cybersecurity Learner", "Linux Enthusiast"];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;

function type() {
  if (i >= phrases.length) i = 0;
  const fullText = phrases[i];

  if (isDeleting) {
    currentPhrase = fullText.substring(0, currentPhrase.length - 1);
  } else {
    currentPhrase = fullText.substring(0, currentPhrase.length + 1);
  }

  typingEl.textContent = currentPhrase;

  let speed = 200;
  if (isDeleting) speed /= 2;

  if (!isDeleting && currentPhrase === fullText) {
    speed = 1000;
    isDeleting = true;
  } else if (isDeleting && currentPhrase === "") {
    isDeleting = false;
    i++;
    speed = 500;
  }

  setTimeout(type, speed);
}
type();

/* SMOOTH SCROLL */
document.querySelectorAll("a[href^='#'], button").forEach(el => {
  el.addEventListener("click", e => {
    const targetId = el.getAttribute("href");
    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({behavior: "smooth"});
    }
  });
});

/* SECTION REVEAL ON SCROLL */
const sections = document.querySelectorAll("section, article, .stat, .timeline-list li");
sections.forEach(sec => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(50px)";
  sec.style.transition = "0.8s ease";
});

function reveal(){
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;
    if(top < trigger){
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", reveal);

/* BUTTON RIPPLE EFFECT */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = btn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

/* PROJECT CARD 3D TILT EFFECT */
document.querySelectorAll("#projects article").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y/rect.height)-0.5)*10;
    const rotateY = ((x/rect.width)-0.5)*-10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", ()=>{card.style.transform="rotateX(0) rotateY(0) scale(1)";});
});

/* RESUME BUTTON FUNCTION */
document.getElementById("resumeBtn").addEventListener("click", () => {
  window.open("Muhammad_Qais_Resume.pdf", "_blank"); // Put your PDF file in project folder
});
// RESUME DOWNLOAD FUNCTION
document.getElementById("resumeBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "Muhammad_Qais_Resume.pdf"; // PDF file path
    link.download = "Muhammad_Qais_Resume.pdf"; // Download name
    document.body.appendChild(link);
    link.click(); // Trigger download
    document.body.removeChild(link);
});
