export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string // 请求地址
  method?: Method // 请求方法
  data?: any // 请求data数据
  params?: any // 请求parmas数据
  headers?: any // 请求头
  responseType?: XMLHttpRequestResponseType // 数据类型
  timeout?: number // 请求超时时间
}

export interface AxiosResponse {
  data: any // 响应数据
  status: number // 响应状态码
  statusText: string // 响应状态文本
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置参数
  request: any // request 对象
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}
