import TaskDeleteModal from '../components/modals/TaskDeleteModal';
import TaskFormModal from '../components/modals/TaskFormModal';
import { Button, Flex, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../api';
const { Title } = Typography;

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
  },
];

export default function Tasks() {
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleTasksData = (tasks) => {
    return tasks.map((item, key) => {
      return {
        description: item.description,
        status: (
          <Flex justify="flex-start" align="center" key={key} gap="small">
            {item.status === 'uncompleted' && <Tag color="processing">Uncompleted</Tag>}
            {item.status === 'completed' && <Tag color="success">Completed</Tag>}
          </Flex>
        ),
        actions: (
          <Flex justify="flex-end" align="center" key={key} gap="small">
            <Button
              onClick={() => {
                setItemSelected(item);
                setIsTaskFormModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                setItemSelected(item);
                setIsDeleteModalOpen(true);
              }}
            >
              Delete
            </Button>
          </Flex>
        ),
      };
    });
  };

  const getTasks = async () => {
    setLoading(true);

    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ padding: '50px 50px' }}>
      <Flex justify="center" align="center" vertical={true} gap={'large'}>
        <Title>Your Tasks</Title>

        <Flex justify="flex-end" align="center" style={{ width: '100%' }}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setItemSelected(null);
              setIsTaskFormModalOpen(true);
            }}
          >
            New Task
          </Button>
        </Flex>

        <Table loading={loading} dataSource={handleTasksData(tasks)} columns={columns} style={{ width: '100%' }} />
      </Flex>

      <TaskFormModal
        isModalOpen={isTaskFormModalOpen}
        handleCancel={() => setIsTaskFormModalOpen(false)}
        refetch={getTasks}
        itemSelected={itemSelected}
      />

      {itemSelected && (
        <TaskDeleteModal
          isModalOpen={isDeleteModalOpen}
          handleCancel={() => setIsDeleteModalOpen(false)}
          itemSelected={itemSelected}
          refetch={getTasks}
        />
      )}
    </div>
  );
}
