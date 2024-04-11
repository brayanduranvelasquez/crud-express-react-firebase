import { Button, Modal } from 'antd';
import { useState } from 'react';
import { api } from '../../api';

export default function TaskDeleteModal({ isModalOpen, handleCancel, itemSelected, refetch }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await api.delete(`/tasks/${itemSelected.id}`);
      refetch();
      handleCancel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      footer={
        <Button danger type="primary" loading={loading} onClick={handleDelete}>
          Delete
        </Button>
      }
      title="Delete Task"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      Are you sure you want to delete this task?
    </Modal>
  );
}
