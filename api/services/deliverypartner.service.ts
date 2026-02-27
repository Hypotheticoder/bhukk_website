import axios from '../axiosinstance';

export type DeliveryPartnerFormData = {
  full_name: string;
  date_of_birth?: string;
  gender?: string;
  email: string;
  phone_no: string;
  alt_phone_no?: string;
  password: string;

  id_proof_type?: string;

  address_line?: string;

  vehicle_type?: string;
  vehicle_model?: string;
  vehicle_number?: string;

  driving_license_number?: string;

  servicing_zones?: string;

  is_active_for_delivery?: string;
  chakna_enabled?: string;
  food_trade_license_available?: string;
  fssai_number?: string;

  bank_account_name?: string;
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  upi_id?: string;

  // File fields (UploadFile)
  profile_photo_url?: File | null;
  id_proof_url?: File | null;
  vehicle_rc_url?: File | null;
  driving_license_url?: File | null;
  cancelled_cheque_url?: File | null;
};

export const sendDeliveryPartnerMessage = async (
  data: DeliveryPartnerFormData | FormData
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
        } else if (typeof value === 'boolean') {
          payload.append(key, value ? 'true' : 'false');
        } else {
          payload.append(key, String(value));
        }
      });
    }

    const response = await axios.post('/api/partners/create', payload);
    return response.data;
  } catch (error: any) {
    // If server returned a structured error, rethrow it for the caller to inspect
    if (error?.response?.data) {
      const serverErr = error.response.data;
      const message = serverErr.detail || serverErr.message || JSON.stringify(serverErr);
      const err = new Error(`Server error: ${message}`);
      // attach original response for debugging
      (err as any).response = error.response;
      throw err;
    }
    throw new Error('Failed to submit the delivery partner form data');
  }
};
