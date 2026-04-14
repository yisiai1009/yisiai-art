/* ============================================
   SERIES DATA — exact filenames per folder
   ============================================ */

const SERIES = {
  'young-promises': {
    title: 'YOUNG PROMISES',
    files: ['01.jpg', '02.JPG', '03.JPEG']
  },
  'coyote-hills': {
    title: 'COYOTE HILLS',
    files: ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg','010.jpg']
  },
  'filoli': {
    title: 'FILOLI',
    files: ['01.jpg','02.jpg','03.jpg','04.jpg']
  },
  'japan-town': {
    title: 'JAPAN TOWN',
    files: ['01.JPG','02.JPG','03.JPG','04.JPG','05.JPG','06.JPG','07.jpg','08.jpg','09.jpg','010.jpg','011.jpg']
  },
  'los-altos': {
    title: 'LOS ALTOS',
    files: ['01.jpg','02.JPG','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg']
  },
  'sf': {
    title: 'SAN FRANCISCO',
    files: ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg']
  },
  'landend': {
    title: "LAND'S END",
    files: ['01.jpg','02.JPG','03.JPG','04.JPG','05.JPG']
  },
  'sjsu-parking': {
    title: 'SJSU PARKING',
    files: ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg']
  }
}


/* ============================================
   SPLASH SCREEN
   ============================================ */

window.addEventListener('load', () => {
  const splash = document.getElementById('splash')
  const fill   = document.getElementById('splashFill')

  // Start fill bar
  if (fill) requestAnimationFrame(() => { fill.style.width = '100%' })

  // Auto-dismiss after 3.2s
  let dismissed = false
  function dismissSplash() {
    if (dismissed) return
    dismissed = true
    splash.classList.add('hidden')
    document.body.classList.add('loaded')
  }

  const autoTimer = setTimeout(dismissSplash, 3200)

  // Click or key dismisses early
  function earlyDismiss() {
    clearTimeout(autoTimer)
    dismissSplash()
    document.removeEventListener('keydown', earlyDismiss)
    document.removeEventListener('click', earlyDismiss)
  }

  // Slight delay so the animation has started
  setTimeout(() => {
    document.addEventListener('keydown', earlyDismiss)
    document.addEventListener('click', earlyDismiss)
  }, 600)
})


/* ============================================
   CUSTOM CURSOR  (desktop only)
   ============================================ */

const cursorEl = document.getElementById('cursor')

if (window.matchMedia('(pointer: fine)').matches && cursorEl) {

  let mouseX = 0, mouseY = 0
  let cx = 0, cy = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  ;(function animateCursor() {
    cx += (mouseX - cx) * 0.11
    cy += (mouseY - cy) * 0.11
    cursorEl.style.left = cx + 'px'
    cursorEl.style.top  = cy + 'px'
    requestAnimationFrame(animateCursor)
  })()

  document.querySelectorAll('a, .menu-button, .menu-close, .series-item, .lb-btn, .lb-close').forEach(el => {
    el.addEventListener('mouseenter', () => cursorEl.classList.add('expanded'))
    el.addEventListener('mouseleave', () => cursorEl.classList.remove('expanded'))
  })

  document.addEventListener('mouseleave', () => cursorEl.style.opacity = '0')
  document.addEventListener('mouseenter', () => cursorEl.style.opacity = '1')
}


/* ============================================
   SCROLL PROGRESS
   ============================================ */

const progressBar = document.getElementById('scrollProgress')

window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight
  if (total > 0) {
    progressBar.style.width = (window.scrollY / total * 100) + '%'
  }
}, { passive: true })


/* ============================================
   HEADER — darken on scroll
   ============================================ */

const header = document.getElementById('header')
const heroEl = document.querySelector('.hero')

function updateHeader() {
  if (!heroEl) return
  const past = heroEl.getBoundingClientRect().bottom <= 60
  header.classList.toggle('scrolled', past)
}

window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()


/* ============================================
   HERO PARALLAX — right panel image only
   ============================================ */

const heroImg = document.getElementById('heroImg')

if (heroImg) {
  window.addEventListener('scroll', () => {
    heroImg.style.transform = `translateY(${window.scrollY * 0.2}px)`
  }, { passive: true })
}


/* ============================================
   SCROLL REVEAL
   ============================================ */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.reveal, .series-item').forEach(el => observer.observe(el))


/* ============================================
   MENU
   ============================================ */

const menuBtn     = document.getElementById('menuBtn')
const menuOverlay = document.getElementById('menuOverlay')
const menuClose   = document.getElementById('menuClose')

menuBtn.onclick   = () => menuOverlay.classList.add('active')
menuClose.onclick = () => menuOverlay.classList.remove('active')

document.querySelectorAll('.overlay-nav a').forEach(link => {
  link.addEventListener('click', () => menuOverlay.classList.remove('active'))
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menuOverlay.classList.remove('active')
  }
})


/* ============================================
   LIGHTBOX
   ============================================ */

const lightbox  = document.getElementById('lightbox')
const lbImg     = document.getElementById('lbImg')
const lbTitle   = document.getElementById('lbTitle')
const lbCounter = document.getElementById('lbCounter')
const lbFile    = document.getElementById('lbFile')
const lbClose   = document.getElementById('lbClose')
const lbPrev    = document.getElementById('lbPrev')
const lbNext    = document.getElementById('lbNext')

let currentSeries = null
let currentIndex  = 0

function pad(n) { return String(n).padStart(2, '0') }

function showImage(index) {
  if (!currentSeries) return
  const data  = SERIES[currentSeries]
  const file  = data.files[index]
  const src   = `images/${currentSeries}/${file}`

  // Crossfade
  lbImg.classList.add('fading')
  setTimeout(() => {
    lbImg.src = src
    lbImg.alt = `${data.title} — ${file}`
    lbImg.classList.remove('fading')
  }, 200)

  currentIndex = index
  lbCounter.textContent = `${pad(index + 1)} / ${pad(data.files.length)}`
  lbFile.textContent    = file.toUpperCase()
}

function openLightbox(seriesKey) {
  const data = SERIES[seriesKey]
  if (!data) return

  currentSeries = seriesKey
  lbTitle.textContent = data.title

  // Show first image immediately (no crossfade)
  currentIndex = 0
  const file = data.files[0]
  lbImg.src = `images/${seriesKey}/${file}`
  lbImg.alt = `${data.title} — ${file}`
  lbCounter.textContent = `${pad(1)} / ${pad(data.files.length)}`
  lbFile.textContent    = file.toUpperCase()

  lightbox.classList.add('active')
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.classList.remove('active')
  document.body.style.overflow = ''
  currentSeries = null
}

function prevImage() {
  if (!currentSeries) return
  const len = SERIES[currentSeries].files.length
  showImage((currentIndex - 1 + len) % len)
}

function nextImage() {
  if (!currentSeries) return
  const len = SERIES[currentSeries].files.length
  showImage((currentIndex + 1) % len)
}

// Click handlers
lbClose.onclick = closeLightbox
lbPrev.onclick  = prevImage
lbNext.onclick  = nextImage

// Click on image area to go next
lbImg.addEventListener('click', nextImage)

// Series item clicks
document.querySelectorAll('.series-item[data-series]').forEach(item => {
  item.addEventListener('click', () => {
    openLightbox(item.dataset.series)
  })
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openLightbox(item.dataset.series)
    }
  })
})

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return

  switch (e.key) {
    case 'Escape':    closeLightbox(); break
    case 'ArrowLeft': prevImage();     break
    case 'ArrowRight':nextImage();     break
  }
})
