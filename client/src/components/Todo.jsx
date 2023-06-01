const Todo = ({ todo }) => {
  return (
    <div className='card text-white bg-dark m-2' style={{ maxWidth: '20rem' }}>
      <div className='card-header' style={{ textAlign: 'center' }}>
        {todo.isCompleted ? (
          <button type='button' className='btn btn-success'>
            Completed
          </button>
        ) : (
          <button type='button' className='btn btn-danger'>
            Active
          </button>
        )}
      </div>
      <div className='card-body'>
        <h4 className='card-title'>{todo.title}</h4>
        <p className='card-text'>{todo.description}</p>
      </div>
    </div>
  );
};
export default Todo;
