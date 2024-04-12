

const PATHS = {
  logo: '/assets/logo.svg',
  github: '/assets/github.png',
  linkedin: '/assets/linkedin.png',
  spotify: '/assets/Spotify_Logo_CMYK_Black.png',
  spotifyGreen: '/assets/Spotify_Logo_RGB_Green.png',
}

export const images = [
  {
    name: "spotify",
    icon: PATHS.spotify,
    width: 100,
    height: 100,
  },
  {
    name: "spotifyGreen",
    icon: PATHS.spotifyGreen,
    width: 100,
    height: 100,
  },
]

export const socials = [
  {
    name: "portfolio",
    icon: PATHS.logo,
    link: "https://calvinyuuu.github.io/Portfolio_2023/"
  },
  {
    name: "github",
    icon: PATHS.github,
    link: "https://github.com/Calvinyuuu",
  },
  {
    name: "linkedin",
    icon: PATHS.linkedin,
    link: "https://www.linkedin.com/in/calvinjkyu/",
  },
]

export const ERROR_MESSAGES = {
  error: 'error',
  unauthorized: 'Unauthorized',
}