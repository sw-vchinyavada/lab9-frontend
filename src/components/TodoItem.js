// import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
      fetch(`http://ec2-35-172-129-171.compute-1.amazonaws.com:4000/api/task/${todo._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify({
              ...todo,
              status: checked ? 'incomplete' : 'complete'
            }),
          })
            .then((r) => r.json())
            .then((r) => {
              if (r.success) {
                toast.success('Task updated successfully');
                window.location.reload();
              } else {
                toast.error(r.error)
              }
            });
  };

  const handleDelete = () => {
    fetch(`http://ec2-35-172-129-171.compute-1.amazonaws.com:4000/api/task/${todo._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.success) {
            toast.success('Todo Deleted Successfully');
            window.location.reload();
          } else {
            toast.error(r.error)
          }
        });

  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.text}>
              <p className={getClasses([styles.todoText, todo.status === 'complete' && styles['todoText--completed'],])}>{todo.title}</p>
              <p className={styles.time}><b>Priority: </b>{todo.priority}</p><br/>
              <p className={styles.time}><b>Created:</b>&nbsp;{todo.createdAt}</p><br/>
              <p className={styles.time}><b>Due Date:&nbsp;</b>{todo.dueDate}</p><br/>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
