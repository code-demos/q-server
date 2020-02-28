import axios from 'axios'
import { message } from 'ant-design-vue'

/**
 * 为了区分 api 和静态资源，所有 api 请求推荐使用 post 方式，将 get 留给静态资源使用
 */
export default async (path, data, method = 'post', showErrorMsg = true) => {
    try {
        const response = await axios[method.toLowerCase()](path, data)
        if (response.status === 200) {
            const { data } = response
            if (data.success) {
                return data.result
            } else {
                console.error(data.message)
            }
        }
    } catch (err) {
        showErrorMsg && message.error(err.message)
        throw err
    }

}