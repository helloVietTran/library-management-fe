export default function convertToFormData(
  formValues: Record<string, any>
): FormData {
  const formData = new FormData();

  Object.entries(formValues).forEach(([key, value]) => {
    if (key === "file" && value instanceof File) {
      formData.append("file", value);
    } else if (Array.isArray(value)) {
      // Nếu giá trị là một mảng, thêm từng item vào formData
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          formData.append(`${key}[]`, String(item));
        }
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
}
