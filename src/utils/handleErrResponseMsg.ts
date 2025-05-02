import { ErrorResponse } from '@/interfaces/api-response';

export const handleErrResponseMsg = (
  error: ErrorResponse,
  defaultMessage: string
): string => {
  const statusCode = error?.response?.data?.statusCode;
  const customMessage = error?.response?.data?.message;

  switch (statusCode) {
    case 401:
      return 'Bạn không có quyền thực hiện hành động này.';
    default:
      return customMessage || defaultMessage;
  }
};
