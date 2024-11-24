import axios from 'axios';

// Создаём экземпляр axios с базовыми настройками
const apiClient = axios.create({
    baseURL: 'https://api.github.com' // Базовый URL
});

export default apiClient;
