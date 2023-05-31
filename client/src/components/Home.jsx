import Header from './Header.jsx';
import Todo from './Todo.jsx';
const Home = () => {
  return (
    <div>
      <Header />
      <div className='container'>
        <div className='row justify-content-md-center mt-4'>
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </div>
      </div>
      <div
        className=''
        style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type='button'
          class='btn btn-success'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          Add Todo
        </button>
      </div>

      <div className='modal mt-5' id='exampleModal'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='modal-title'>Modal Title</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
