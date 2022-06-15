import { css } from 'styled-components'

export const tablet = (props) => {
    return css`
        @media only screen and (min-width: 871px) and (max-width: 1200px) {
           ${props}
        }
    `
}

export const smallTablet = (props) => {
    return css`
        @media only screen and (min-width: 681px) and (max-width: 870px) {
           ${props}
        }
    `
}

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 680px) {
           ${props}
        }
    `
}

export const smallMobile = (props) => {
    return css`
        @media only screen and (max-width: 350px) {
           ${props}
        }
    `
}
