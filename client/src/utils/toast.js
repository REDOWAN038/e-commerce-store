import { message } from "antd"

export function showToast(msg, type) {
    if (type === "success") {
        message.success(msg)
    } else if (type === "info") {
        message.info(msg)
    } else if (type === "error") {
        message.error(msg)
    }
}