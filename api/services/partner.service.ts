import axios from '../axiosinstance';

export type PartnerFormData = {
  first_name?: string;
  last_name?: string;
  name?: string; // legacy
  email?: string;
  country_code?: string;
  phone?: string;
  store_name?: string;
  business_category?: string;
  terms_accepted?: boolean;
  // file fields may be File or File[] when supplied from the browser
  beverages_retail_license?: File | null;
  business_registration_license?: File | null;
  owner_id_files?: File[] | null;
  store_address_proof?: File | null;
  store_photos?: File[] | null;
};

export const sendPartnerMessage = async (
  data: PartnerFormData | FormData
) => {
  try {
    let payload: FormData;

    if (data instanceof FormData) {
      payload = data;
    } else {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          value.forEach((v) => {
            // files in arrays
            payload.append(key, v as File);
          });
        } else if (value instanceof File) {
          payload.append(key, value);
        } else if (typeof value === 'boolean') {
          payload.append(key, value ? '1' : '0');
        } else {
          payload.append(key, String(value));
        }
      });
    }

    const response = await axios.post('/api/bhukk_partners/post', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload the form data');
  }
};