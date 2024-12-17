import React, { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [_id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState('incomplete');

  useEffect(() => {
    if (type === 'update' && todo) {
      setId(todo._id);
      setTitle(todo.title);
      setStatus(todo.status);
      setPriority(todo.priority);
      setDueDate(todo.dueDate);
    } else {
      setId('');
      setTitle('');
      setStatus('incomplete');
      setPriority(1);
      setDueDate(null);
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (priority === '') {
      toast.error('Please enter a priority');
      return;
    }
    if (dueDate === null) {
      toast.error('Please enter a Due Date');
      return;
    }
    if (title && status) {
      if (type === 'add') {
          fetch(`http://localhost:4000/api/task`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify({
              title,
              status,
              priority,
              dueDate
            }),
          })
            .then((r) => r.json())
            .then((r) => {
              if (r.success) {
                toast.success('Task added successfully');
                setModalOpen(false);
                window.location.reload();
              } else {
                toast.error(r.error)
              }
            });
      }
      if (type === 'update') {
        fetch(`http://localhost:4000/api/task/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          },
          body: JSON.stringify({
            title,
            status,
            priority,
            dueDate
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            if (r.success) {
              toast.success('Task updated successfully');
              setModalOpen(false);
              window.location.reload();
            } else {
              toast.error(r.error)
            }
          });
      }
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="priority">
                Priority
                <input
                  type="number"
                  min={1}
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </label>
              <label htmlFor="dueDate">
                Due Date
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
