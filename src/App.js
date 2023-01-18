import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
// COMPONENTS
import Boards from './components/Board';
import BoardList from './components/BoardList';
import Card from './components/Card';
import CardList from './components/CardList';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';


const kBaseUrl = 'https://oyster-inspiration-board.herokuapp.com/';

const getAllBoardsApi = () => {
  return (
    axios.get(`${kBaseUrl}/boards`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
  );
};

const getAllCardsApi = (board_id) => {
  return (
    axios.get(`${kBaseUrl}/boards/${board_id}/cards`)
    .then(response => {
      console.log(response.data)
    return response.data;
    })
    .catch(err => {
    console.log(err);
    })
  );
};

const addNewBoardApi = (title) => {
  const currentData = {title}
  return (
    axios.post(`${kBaseUrl}/boards`, currentData)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
  );
};

const addNewCardApi = (body) => {
  const currentData = {
    body,
    likes: 0,
    board_id: 3
  };
  return (
    axios.post(`${kBaseUrl}/cards`, currentData)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
  );
};

const likeCardApi = (card_id) => {
  return (
    axios.patch(`${kBaseUrl}/cards/${card_id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  );
};

const deleteCardApi = (card_id) => {
  return (
    axios.delete(`${kBaseUrl}/cards/${card_id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  );
};
  

function App() {
const [boardData, setboardData] = useState([]);
const [cardData, setCardData] = useState([]);
const [handlelike, sethandleLike] = useState(0)




const getAllBoards = () => {
   getAllBoardsApi()
  .then(boards => {
    setboardData(boards)
  })
};

const getAllCards = () => {
  getAllCardsApi()
  .then(cards => {
    setCardData(cards)
  })
};

useEffect( () => {
// data fetching code

getAllBoards();


}, [boardData]);


const likedCard = (card_id) => {
likeCardApi(card_id)
.then(likeResult => {
  
    setCardData(handleLike => cardData.map(card => {
      if(card.card_id !== card_id) {
        return {...card, likes: card.likes + 1}
      } else {
        return card;
   
      }
    }));
  })
}

  const deleteCard = card_id => {
    deleteCardApi(card_id)
    setCardData(cardData => cardData.filter(card => {
      return card.card_id !== card_id;
    }));
  };

  const boardClick = (board_id) => {
    getAllCardsApi(board_id)
    .then(board => {
      setCardData(board.cards)
    })
  };

   const handleBoardSubmit = (data) => {
    addNewBoardApi(data)
  .then(newBoard => {
    setboardData([...boardData, newBoard])
  

  })
  .catch(e => console.log(e));
};

  const handleCardSubmit = (data) => {
    addNewCardApi(data)
    
    .then(newCard => {

       console.log(newCard)
   
      setCardData([...cardData,newCard])  
      // getAllCards()
 
  //  response is currently - card # created 
    })
  .catch(e => console.log(e))
  }
  return (
    <div className="App">
      <header className="App-header">Inspiration Board</header>
      <h1>Boards</h1>
     
      <div className='boxed'>
     <BoardList boardData={boardData} handleBoardSubmit={handleBoardSubmit} onboardClick={boardClick}  ></BoardList>
     </div>
  
      
    
      <h1>Create a New Board</h1>
      <NewBoardForm handleBoardSubmit={handleBoardSubmit} ></NewBoardForm>
      
         
<CardList  onlikedCard={likedCard} cardData={cardData} ondeleteCard={deleteCard} handleCardSubmit={handleCardSubmit}/> 
      
       <NewCardForm handleCardSubmit={handleCardSubmit}  />  

      
      
    
    </div>
  )}







export default App;






// <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
