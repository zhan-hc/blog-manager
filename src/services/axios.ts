import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { RequestOptions } from './type';
import { AxiosCanceler } from './cancel';
import { handleNetworkError } from './tool';
import { envPageHost } from '@/utils/env';
class MyAxios {
  instance: AxiosInstance;
  customOptions?: RequestOptions;
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)
    this.customOptions = {
      repect_request_cacel: true
    }
    const AxiosCancel = new AxiosCanceler()

    /**
     * @description: 全局请求之前的拦截器
     */
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 取消重复请求
        this.customOptions?.repect_request_cacel && AxiosCancel.addPending(config)
        config.headers['x-need-token'] = true
        // 添加token
        const token = localStorage.getItem('access_token')
        if (token && config.headers) {
          config.headers.Authorization = token
        }
        return config
      },
      (err: any) => err
    )

    /**
     * @description: 全局响应之后的拦截器
     */
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 清除已响应的请求
        AxiosCancel.removePending(res.config)
        return res
      },
      (err: any) => {
        ElMessage({
          type: 'error',
          message: handleNetworkError(err?.response?.status || err.code)
        })
        if (err?.response?.status === 401) {
          window.location = `${envPageHost}/admin/login` // 因在服务器配置了admin前缀所以此处需要加/admin
        }
        console.error(handleNetworkError(err?.response?.status || err.code), err.message)
      }
    )
  }

  request<T>(config: AxiosRequestConfig): Promise<[any, T | undefined]> {
    return new Promise((resolve, reject) => {
      this.instance.request<any, T>(config).then((res: any) => {
        const { data } = res.data
        resolve([null, data])
      })
        .catch((err) => {
          reject([err, undefined])
          return err
        })
    })
  }
}

export default MyAxios