import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    fetch('http://ec2-35-172-129-171.compute-1.amazonaws.com/backend/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorisation': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.success) {
          setTodoList(r.result.tasks);
        } else {
          window.alert(r.error)
        }
      });
  }, []);

  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => a.priority - b.priority);

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            // <motion.div key={todo._id} variants={child}>
            <TodoItem key={todo._id} todo={todo} />
            // </motion.div>
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
