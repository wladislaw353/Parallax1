const $headImage        = document.querySelector('.fixed-header > .bg')
const $headTitle        = document.querySelector('.fixed-header > .content > .title')
const $iframeContainer  = document.querySelector('.iframe-wrapper')
const $iframe           = document.querySelector('.iframe-wrapper iframe')
let   $iframeHeader     = document.querySelector('.iframe-wrapper img:nth-child(1)')

if(document.width <= 425)
    $iframeHeader = document.querySelector('.iframe-wrapper img:nth-child(2)')

const headImageInitScale = 2

let headImageScaleDelta  = headImageInitScale - 1
let headImageCurentScale = headImageInitScale
let titleCurentOpacity   = 0
let titleCurentTransform = 0
let iframeScale          = 1

const windowHeight = window.innerHeight

function setView(offset) {
    if (offset < windowHeight) {
        headImageCurentScale = headImageInitScale - (headImageScaleDelta / windowHeight * offset)
        titleCurentOpacity =  offset / 200
        titleCurentTransform = 0 - (offset / 2)
        $iframeContainer.classList.remove('active')
        $iframe.style.cssText = `height: 100%; transform: translateY(0)`
        $iframeContainer.style.cssText = `transform: scale(1)`
    } else {
        headImageCurentScale = 1
        titleCurentOpacity = 50
        titleCurentTransform = windowHeight / 2 + 54
        $iframeContainer.classList.add('active')
        $iframe.style.cssText = `height: calc(100% - ${$iframeHeader.height}px); transform: translateY(${$iframeHeader.height}px)`
        const scale = 1 - (offset / (windowHeight * 3)) + 0.3
        if(scale > 0.76 && scale < 1) {
            iframeScale = scale
            $iframeContainer.classList.remove('scrolled')
        }
        if(scale <= 0.76) {
            $iframeContainer.classList.add('scrolled')
        }
        console.log(1 - (offset / (windowHeight * 3)) + 0.3)
        $iframeContainer.style.cssText = `transform: scale(${iframeScale})`
    }

    $headImage.style.cssText = `transform: scale(${headImageCurentScale})`
    $headTitle.style.cssText = `filter: blur(${titleCurentOpacity}px); transform: translateY(${titleCurentTransform}px)`
}

window.addEventListener('scroll', ()=> {
    setView(window.pageYOffset)
});