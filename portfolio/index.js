console.log('Ваша оценка - 60 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1. Вёрстка +10\n2. Кнопка Play/Pause на панели управления +10\n3. Разный цвет прогресс-бара до и после ползунка +10\n4.Разный цвет регулятора громкости звука до и после ползунка +10\n4. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10\n5. Кнопка Play/Pause в центре видео +10')
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Перевод
let langu = 'en'

import i18Obj from './assets/js/translate.js'
const langButtons = document.querySelectorAll('.switch-lng__link')
for (const langButton of langButtons) {
    langButton.addEventListener('click', function() {

        langButtons.forEach(i => i.classList.remove('active'))
        this.classList.toggle('active')

        if(this.textContent == 'en'){

            document.querySelectorAll('[data-i18]').forEach(el => {
                el.innerHTML = i18Obj['en'][Object.values(el.dataset)];
                langu = 'en'

            })}

        else  {
            document.querySelectorAll('[data-i18]').forEach(el => {
                el.innerHTML = i18Obj['ru'][Object.values(el.dataset)];
                langu = 'ru'

            })
        }

        return  langu
    })}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Бургер меню (768px)



const burger = document.querySelector('.header__burger')
const headerMenu = document.querySelector('.header__menu')


if (burger) {
    burger.addEventListener("click", function() {
        document.body.classList.toggle('_lock')
        burger.classList.toggle('_active')
        headerMenu.classList.toggle('_active')
    })
}
// для всех ссылок навигации после нажатия убираем перечисленные классы у элементов

const menulinks = document.querySelectorAll('.header__link')

if (menulinks.length > 0) {

    menulinks.forEach(menulink => {
        menulink.addEventListener("click", onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menulink = e.target


        if (burger.classList.contains('_active')) {

            document.body.classList.remove('_lock')
            burger.classList.remove('_active')
            headerMenu.classList.remove('_active')
        }
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Активные кнопки


const buttons = document.querySelectorAll(".button")

for (const button of buttons) {
    button.addEventListener('click', function() {
        buttons.forEach(i => i.classList.remove('active'))

        this.classList.toggle('active')
    })
}




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// portfolio смена изображений



const portfolioImages = document.querySelectorAll('.portfolio__image')
const portfolioBtns = document.querySelectorAll('.button[data-season]')

for (const portfolioBtn of portfolioBtns) {
    portfolioBtn.addEventListener('click', function() {
        let season = portfolioBtn.getAttribute('data-season')

        if (season.length > 0) {
            portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`)
        }

    })
}
// ********************************************************************
// Фиксирую меню при прокрутке назад для удобства

window.addEventListener('scroll', function(e) {
    const
        oldScroll = this.oldScroll || 0,
        newScroll = this.scrollY,
        isScrollDown = newScroll < oldScroll

    if (window.pageYOffset < 1000) {

        document.querySelector('.header').classList.remove('fixed')
    }
    if (window.pageYOffset > 1000) {
        document.querySelector('.header').classList.toggle('fixed', isScrollDown)
        this.oldScroll = newScroll
    }
})

// ********************************************************************
// Смена темы


    const theme = document.querySelector('.switch-them')

    theme.addEventListener('click', function() {

        theme.classList.toggle('active')


        if(theme.classList.contains('active')){

            document.documentElement.style.setProperty('--body-color', '#fff');
            document.documentElement.style.setProperty('--text-color', '#000');
            document.documentElement.style.setProperty('--gold-color', '#000');
        }

        else {

            document.documentElement.style.setProperty('--body-color', '#000');
            document.documentElement.style.setProperty('--text-color', '#fff');
            document.documentElement.style.setProperty('--gold-color', '#BDAE82');
        }



    })




// ********************************************************************
// Video https://www.youtube.com/watch?v=yx-HYerClEA&ab_channel=WesBos
const player = document.querySelector('.video__player')
const poster = player.querySelector('.poster')
const video = player.querySelector('.viewer')
const btn = player.querySelector('.btn')
const play = player.querySelector('.play')
const progressBar = player.querySelector('.progress')
const progressBarVolume = player.querySelector('.volume')
const volum = player.querySelector('.volume_icon')


function toggleVolume(){
    volum.classList.toggle('mute')
    if(volum.classList.contains('mute')){

        video.muted = true;
    }
    else{

        video.muted = false;
    }
}

function togglePlay(){
    const method = video.paused ? 'play' : 'pause'
    video[method]();
    if(method == 'play'){
        btn.style.display = 'none'
        poster.style.left = '-200%'
        play.style.backgroundImage = "url('./assets/svg/pause.svg')"
    }
    else{
        btn.style.display = 'block'
        play.style.backgroundImage = "url('./assets/svg/play.svg')"
    }
}

function videoProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.value = `${percent}`
    progressBar.style.background = `linear-gradient( to right, #bdae82 0%,#bdae82 ${percent}%, #c8c8c8 ${percent}%, #c8c8c8 100%)`
    if(progressBar.value == 100){
        btn.style.display = 'block'
        poster.style.left = '0'
    }
}

function rangeUpdate(){
    if(this.name == 'volume'){
        console.log(this.value)
        video['volume'] = this.value / 100
        progressBarVolume.value = `${this.value}`
        progressBarVolume.style.background = `linear-gradient( to right, #bdae82 0%,#bdae82 ${this.value}%, #c8c8c8 ${this.value}%, #c8c8c8 100%)`

        if (video['volume'] == 0) {
            volum.classList.add('mute')
            video.muted = true;}

        else {
            volum.classList.remove('mute')
            video.muted = false;}
    }
}

function videoProgressUpdate(e){
    const scrubtime = (e.offsetX / progressBar.offsetWidth) * video.duration
    video.currentTime = scrubtime
}



btn.addEventListener('click', togglePlay)
volum.addEventListener('click', toggleVolume)
play.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', videoProgress)
progressBarVolume.addEventListener('change', rangeUpdate)
// progressBarVolume.addEventListener('mousemove', rangeUpdate)
progressBar.addEventListener('click',videoProgressUpdate)
let mousedown = false
progressBar.addEventListener('mousemove', (e) => mousedown && videoProgressUpdate(e))
progressBar.addEventListener('mousedown', () => mousedown = true)
progressBar.addEventListener('mouseup',() => mousedown = false)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






