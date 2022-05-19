import Startup from './config/startup.js'

const config = async (phase, { defaultConfig }) => {

  const startupConfig = await Startup()
  
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: true
    },
    ...startupConfig
  }

  return nextConfig
}

// module.exports = nextConfig
export default config
