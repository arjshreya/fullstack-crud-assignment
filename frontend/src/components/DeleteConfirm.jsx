import "./DeleteConfirm.css";

function DeleteConfirm({ message, onConfirm, onCancel }) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <p>{message}</p>
        <div className="delete-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="cancel-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
