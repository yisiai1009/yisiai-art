const menuBtn = document.getElementById("menuBtn")
const menuOverlay = document.getElementById("menuOverlay")
const menuClose = document.getElementById("menuClose")

menuBtn.onclick = () => {
menuOverlay.classList.add("active")
}

menuClose.onclick = () => {
menuOverlay.classList.remove("active")
}