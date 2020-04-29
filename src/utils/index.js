export const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 760
}