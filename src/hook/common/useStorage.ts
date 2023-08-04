
export default function () {
  
  const isObject = (v: any) => ['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(v))

  const Local = {
    // 设置永久缓存
    set (key: string, val: any) {
      localStorage.setItem(key, isObject(val) ? JSON.stringify(val) : val)
    },
    // 获取永久缓存
    get (key: string) {
      const value = localStorage.getItem(key)
      if (value && /^(\[.*\])|(\{.*\})$/.test(value)) {
        return JSON.parse(value)
      } else {
        return value
      }
    },
    // 移除永久缓存
    remove (key: string) {
      localStorage.removeItem(key)
    },
    // 移除全部永久缓存
    clear () {
      localStorage.clear()
    }
  }

  return {
    Local
  }
}