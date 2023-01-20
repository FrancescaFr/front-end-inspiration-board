import { useState } from "react"

const NewBoardForm = ({ handleBoardSubmit }) => {
  const [newBoard, setnewBoard] = useState('');

  const handleNewBoard = (event) => {
    setnewBoard(event.target.value);
  };

  const handleSubmitBoard = (event) => {
    event.preventDefault();
    handleBoardSubmit(newBoard)
    setnewBoard('');
  };

  return (
    <form onSubmit={handleSubmitBoard} >
      <div>
        <input type="text" id='title' name="title"
          value={newBoard} onChange={handleNewBoard} placeholder="Enter New Board Title Here" />
        <div>
          <input type='submit' value="Submit New Board" />
        </div>
      </div>
    </form>
  )
};



export default NewBoardForm;