import axios, {AxiosInstance, AxiosRequestConfig, Method} from "axios";
import config from "../config/config.json"

export class Request {
    public static axiosInstance: AxiosInstance

    public static init() {
        this.axiosInstance = axios.create({
            baseURL: config.BASE_URL,
            timeout: 6000
        })
        this.initInterceptors()
    }

    public static errorHandle(res: any){
        switch (res.status){
            case 401:
                break
            case 403:
                break
            case 404:
                console.log('请求的资源不存在')
                break
            default:
                console.log('连接错误')
        }
    }

    public static initInterceptors() {
        this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            return config
        })

        this.axiosInstance.interceptors.response.use((response) => {
            if(response.status === 200) {
                return response
            } else {
                Request.errorHandle(response)
                return response
            }
        }, (error: any) => {
            if(error) {
                Request.errorHandle(error)
                return Promise.reject(error)
            } else {
                console.log('网络连接异常，请稍后再试！')
            }
        })
    }

}

// //定义接口
// interface PendingType {
//     url: string,
//     method: Method,
//     params: any,
//     data: any,
//     cancel: any
// }
//
// //取消重复请求
// const pending:Array<PendingType> = []
// const CancelToken = axios.CancelToken
//
// //实例
// const instance = axios.create({
//     timeout: 10000,
//     responseType: 'json'
// })
//
// //移除重复请求
// const removerPending = (config: AxiosRequestConfig) => {
//     for(const key in pending){
//         const item: number = +key
//         const list: PendingType = pending[key]
//         let ifUrl:boolean = (list.url === config.url)
//         let ifMethod: boolean = (list.method === config.method)
//         let ifParams: boolean = (JSON.stringify(list.params) === JSON.stringify(config.params))
//         let ifData:boolean = (JSON.stringify(list.data) === JSON.stringify(config.data))
//         if(  ifUrl && ifMethod && ifParams && ifData){
//             list.cancel('操作太频繁，请稍后在试')
//             pending.splice(item, 1)
//         }
//     }
// }