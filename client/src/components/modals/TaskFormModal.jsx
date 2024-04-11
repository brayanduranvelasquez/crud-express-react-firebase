import { Button, Modal, Input, Form, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
const { TextArea } = Input;

export default function TaskFormModal({ isModalOpen, handleCancel, refetch, itemSelected }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (data) => {
    setLoading(true);

    try {
      await api.post(!itemSelected ? '/tasks' : `/tasks/${itemSelected.id}`, {
        description: data.description,
        status: data.status ? 'completed' : 'uncompleted',
      });
      refetch();
      handleCancel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemSelected) {
      form.setFieldsValue({ description: itemSelected.description });
      form.setFieldsValue({ status: itemSelected.status === 'completed' ? true : false });
    } else {
      form.resetFields();
    }
  }, [form, itemSelected]);

  return (
    <Modal
      footer={
        <Button loading={loading} type="primary" htmlType="submit" onClick={() => form.submit()}>
          Submit
        </Button>
      }
      title="Tasks"
      open={isModalOpen}
      onCancel={handleCancel}
    >
      <Form form={form} disabled={loading} onFinish={handleFinish} layout="vertical" style={{ padding: '20px 0px' }}>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <TextArea rows={6} />
        </Form.Item>

        {itemSelected && (
          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Mark as completed</Checkbox>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
