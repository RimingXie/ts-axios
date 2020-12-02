import { AxiosPromise, AxiosRequestConfig, MethodWithObject } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'get', url, config })
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'delete', url, config })
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'head', url, config })
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'options', url, config })
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'post', url, config, data })
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'put', url, config, data })
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWith({ method: 'patch', url, config, data })
  }

  private _requestMethodWith(obj: MethodWithObject): AxiosPromise {
    return this.request(Object.assign(obj.config || {}, obj))
  }
}
