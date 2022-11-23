import Form from '../Form/Form';
import s from './TodoPage.module.css';

const TodoPage = () => {

  return (
    <div className={s.root}>
      <h1>ToDo List</h1>
      <Form />
    </div>
  );
};

export default TodoPage;
