import React, { useState } from 'react';
import './style.css';
import { Table, Button, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'test',
      email: 'test@test.com',
      address: 'test address',
    },
    {
      id: 2,
      name: 'John',
      email: 'John@test.com',
      address: 'John address',
    },
    {
      id: 3,
      name: 'Cena',
      email: 'Cena@test.com',
      address: 'Cena address',
    },
  ]);

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: '4',
      title: 'Address',
      dataIndex: 'address',
    },
    {
      key: '5',
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => editStudent(record)} />
            <DeleteOutlined
              onClick={() => deleteStudent(record)}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const addStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);

    const newStudent = {
      id: randomNumber,
      name: 'name' + randomNumber,
      email: randomNumber + '@test.com',
      address: 'Address' + randomNumber,
    };

    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };

  const deleteStudent = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const editStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <header>
        <Button onClick={addStudent}>Add a new student</Button>
        <Table dataSource={dataSource} columns={columns}></Table>
        <Modal
          title="Edit student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}
