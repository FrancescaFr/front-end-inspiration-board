import { useState } from "react"

const NewCardForm = ({handleCardSubmit, currentBoard}) => {
  const [newCard, setnewCard] = useState('')
  
  const handleNewCard = (event) => {
  setnewCard(event.target.value)
  
  };

  const handleSubmitCard = (event) => {
   event.preventDefault();
   handleCardSubmit(newCard, currentBoard)
   setnewCard('');
  }
  return(
    <form onSubmit={handleSubmitCard} >
   <div>
    <label htmlFor="title">New Card:</label>
      <input type="text" id='title' name="title" value={newCard} onChange={handleNewCard} />
      <div><input type="submit" value="Add New Card"/></div>
 </div> 
 </form>
 )
  };



export default NewCardForm;