import axios from '../axiosinstance';


export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const sendContactMessage = async (data: ContactFormData) => {
  try {
    const response = await axios.post('/api/bhukk_contacts/post', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to send contact message');
  }
};