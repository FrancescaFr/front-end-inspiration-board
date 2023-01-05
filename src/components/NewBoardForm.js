import { useState } from "react"

const NewBoardForm = ({handleBoardSubmit}) => {

 
  const [newBoard, setnewBoard] = useState('')
  
  const handleNewBoard = (event) => {
  setnewBoard(event.target.value);
  
  };

  const handleSubmitBoard = (event) => {
   event.preventDefault();
   handleBoardSubmit(newBoard)
   setnewBoard('');
  }
  return(
    <form onSubmit={handleSubmitBoard} >
   <div>
    <label htmlFor="title">New Board Title:</label>
      <input type="text" id='title' name="title" value={newBoard} onChange={handleNewBoard} />
      <div><input type='submit' value="Add New Board"/></div>
 </div> 
 </form>
 )
  };



export default NewBoardForm;