import { notification } from "antd";
import { useCallback } from "react";

type Status = "success" | "error" | "info" | "warning";

const useShowNotification = () => {
  const showNotification = useCallback(
    (title: string, description: string, status: Status) => {
      notification[status]({
        message: title,
        description,
        duration: 3,
      });
    },
    []
  );

  return showNotification;
};

export default useShowNotification;
