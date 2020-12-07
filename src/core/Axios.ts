import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  MethodWithObject,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    /**
     *  初始化拦截器函数对象
     * @param request 请求前拦截函数
     * @param response 请求后拦截函数
     */
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  /**
   *
   * @param url 请求地址，也可以传递config对象
   * @param config 请求配置对象
   */
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
