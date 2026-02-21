import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

export interface ChatApiResponse {
    reply: string
}

export const sendMessage = async (message: string): Promise<ChatApiResponse> => {
    const { data } = await api.post<ChatApiResponse>('/api/chat', { message })
    return data
}

export default api
