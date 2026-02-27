import axios from '../axiosinstance';

export type ManufacturerFormData = {
  company_name: string;
  incorporation_certificate: File | null;
  pan_no: string;
  pan_file: File | null;
  gst_no: string;
  gst_cert_file: File | null;
  registered_office_address: string;
  factory_address: string;
  excise_no: string;
  excise_license_file: File | null;
  fssai_license_no: string;
  fssai_license_file: File | null;
  trade_license_file: File | null;
  auth_signatory_name: string;
  auth_letter_file: File | null;
  manufacturer_images: File[] | null;
  bank_name: string;
  bank_ac_no: string;
  ifsc_code: string;
  cancelled_cheque_file: File | null;
  upi_id?: string;
  email: string;
  phn_no: string;
  alt_phn_no?: string;
};

export const sendManufacturerMessage = async (
  data: ManufacturerFormData | FormData
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

    const response = await axios.post('/api/manufacturers/create', payload);
    return response.data;
  } catch (error) {
    throw new Error('Failed to upload the manufacturer form data');
  }
};
