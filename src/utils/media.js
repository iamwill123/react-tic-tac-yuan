import {css} from 'styled-components'  // allows us to import media queries

export const media = {      // ...args Destructuring assignment
    handheld: (...args) => css`
        @media (max-width: 800px) {
            ${ css(...args) }
        }
    `
}