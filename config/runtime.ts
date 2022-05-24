import getConfig from 'next/config'

export const Config = getConfig()
  .publicRuntimeConfig as MyNextConfig['publicRuntimeConfig']
export default Config
