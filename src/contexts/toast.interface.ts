interface Toast {
  id: number;
  message: string;
  type: string;
  title: string;
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (title: string, message: string, type?: string) => void;
}
