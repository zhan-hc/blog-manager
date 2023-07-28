import dayjs from 'dayjs'

export default function () {

  const formatDate = (time: any, formatStr: string = 'YYYY-MM-DD hh:mm:ss') => {
    return dayjs(time).format(formatStr)
  }

  return {
    formatDate
  }
}