import { API_CONFIG } from '../config/api';

class UploadService {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('auth_token');

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();

    // Return the full URL or path depending on backend response
    if (data.url) {
      return data.url;
    } else if (data.path) {
      return `${API_CONFIG.BASE_URL}${data.path}`;
    } else if (data.filename) {
      return `${API_CONFIG.BASE_URL}/uploads/${data.filename}`;
    }

    throw new Error('Invalid upload response');
  }
}

export const uploadService = new UploadService();
export default uploadService;