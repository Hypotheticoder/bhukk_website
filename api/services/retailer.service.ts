import axios from '../axiosinstance';

export type RetailerFormData = {
  shop_name: string;
  license_type?: string;
  excise_license_no?: string;
  license_issuing_authority: string;
  license_valid_from: string;
  license_valid_upto: string;
  gst_no?: string;
  pan_no?: string;
  owner_name?: string;
  ownership_type?: string;
  registered_address: string;
  opening_time?: string;
  closing_time?: string;
  bank_name: string;
  bank_ac_no: string;
  ifsc_code: string;
  bank_branch_name?: string;
  upi_id?: string;
  phn_no: string;
  alt_phn?: string;
  email: string;
  authorized_signatory_name?: string;

  shop_photo_file?: File | null;
  cancelled_cheque_file: File | null;
  excise_license_file: File | null;
  trade_license_file: File | null;
  shop_establishment_license_file: File | null;
  gst_certificate_file: File | null;
  fire_noc_file: File | null;
};

export const sendRetailerMessage = async (
  data: RetailerFormData | FormData
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
            payload.append(key, v as File);
          });
        } else if (value instanceof File) {
          payload.append(key, value);
        } else {
          payload.append(key, String(value));
        }
      });
    }

    const response = await axios.post('/api/retailers/create', payload);
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload the retailer form data');
  }
};
