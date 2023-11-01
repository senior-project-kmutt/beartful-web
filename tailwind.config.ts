import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary1': '#5A2810',
        'primary2': '#873C18',
        'primary3': '#B45020',
        'primary4': '#E16428',
        'primary5': '#E78353',
        'primary6': '#EDA27E',
        'primary7': '#F3C1A9',
        'primary8': '#F9E0D4',
      },
    },
  },
  plugins: [],
}
export default config
