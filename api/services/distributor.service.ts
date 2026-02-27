import axios from '../axiosinstance';

export type DistributorFormData = {
    trade_name: string;
    business_type?: string;

    gst_no?: string;
    pan_no?: string;
    tan_no?: string;

    msme_registered?: boolean;

    registered_address: string;
    warehouse_address?: string;

    warehouse_license_no?: string;
    excise_license_no?: string;
    license_valid_from?: string;
    license_valid_upto?: string;

    bank_ac_name: string;
    bank_ac_no: string;
    ifsc_code: string;
    bank_branch_name?: string;
    upi_id?: string;

    delivery_fleet_size?: number | string;
    servicing_area?: string;
    vehicle_count?: number | string;

    contact_person_name?: string;
    phn_no: string;
    alt_phn_no?: string;
    email: string;

    gst_certificate_file: File | null;
    pan_file: File | null;
    msme_certificate_file: File | null;
    firesafety_certificate_file: File | null;
    excise_license_file: File | null;
    company_incorporation_certificate_file: File | null;
    trade_license_file: File | null;
    cancelled_cheque_file: File | null;
    transporation_logistics_file: File | null;
};

export const sendDistributorMessage = async (
    data: DistributorFormData | FormData
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
                } else if (typeof value === "boolean") {
                    payload.append(key, value ? "true" : "false");
                } else {
                    payload.append(key, String(value));
                }
            });
        }

        const response = await axios.post('/api/bhukk_distributors/post', payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to upload the distributor form data');
    }
};
