import { useState, ChangeEvent } from "react";
import useShowNotification from "./useShowNotification";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const showToast = useShowNotification();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type", "Please select an image file", "error");
      setImgUrl(null);
    }
  };

  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
