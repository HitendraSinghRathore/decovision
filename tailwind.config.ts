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
        brandBlue: '#682bd7',
        primaryWhite: '#f0eafb',
        brandBlueLight:'#e1d5f7',
        dark1: '#1c1820',
        dark2: '#131016',
        dark4: '#1f1b24',
        dark3: '#35323a',
        borderLight: '#625f66',
        white: '#ffffff',
        black: '#000000',
        accent: '#99300A',
        success: '#007A5A'
      }
    },
  },
  plugins: [],
}
export default config
