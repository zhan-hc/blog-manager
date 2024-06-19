import { getLinkData } from '@/api/bury'
export default function () {

  const getBuryCount = async (params = {}) => {
    const [_err, navdata ] = await getLinkData(params)
    return navdata
  }

  return {
    getBuryCount
  }
}