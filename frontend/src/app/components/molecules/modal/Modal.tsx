import { X } from "lucide-react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeButton?: boolean;
  children: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  closeButton = true,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-content">
          {closeButton && (
            <button className="close-button" onClick={onClose}>
              <X />
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
