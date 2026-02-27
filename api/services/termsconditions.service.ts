import axiosInstance from "../axiosinstance";

export interface TermsCondition {
  id: number;
  headline: string;
  description: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all terms & conditions from the backend.
 */
export const fetchTermsConditions = async (): Promise<TermsCondition[]> => {
  const response = await axiosInstance.get<TermsCondition[]>(
    "/api/terms-conditions/get-all"
  );
  return response.data;
};
