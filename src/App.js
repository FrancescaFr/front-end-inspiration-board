import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
// COMPONENTS
import Boards from "./components/Board";
import BoardList from "./components/BoardList";
import Card from "./components/Card";
import CardList from "./components/CardList";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";

const kBaseUrl = "https://oyster-inspiration-board.herokuapp.com/";

const getAllBoardsApi = () => {
  return axios
    .get(`${kBaseUrl}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllCardsApi = (board_id) => {
  return axios
    .get(`${kBaseUrl}/boards/${board_id}/cards`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addNewBoardApi = (title) => {
  const currentData = { title };
  return axios
    .post(`${kBaseUrl}/boards`, currentData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addNewCardApi = (body, currentBoardID) => {
  const currentData = {
    body,
    likes: 0,
    board_id: currentBoardID,
  };

  return axios
    .post(`${kBaseUrl}/cards`, currentData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCardApi = (card_id) => {
  return axios
    .patch(`${kBaseUrl}cards/${card_id}/like`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteCardApi = (card_id) => {
  return axios
    .delete(`${kBaseUrl}/cards/${card_id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteBoardApi = (board_id) => {
  return axios
    .delete(`${kBaseUrl}/boards/${board_id}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

function App() {
  const [boardData, setboardData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [currentBoardID, setCurrentBoardID] = useState([]);
  const [currentBoardTitle, setCurrentBoardTitle] = useState([]);
  // const [handlelike, sethandleLike] = useState(0)

  const getAllBoards = () => {
    getAllBoardsApi().then((boards) => {
      setboardData(boards);
    });
  };

  const getAllCards = () => {
    getAllCardsApi().then((cards) => {
      setCardData(cards);
    });
  };

  useEffect(() => {
    // data fetching code

    getAllBoards();
  }, [boardData]);

  const likedCard = (card_id) => {
    return likeCardApi(card_id).then((likeResult) => {
      setCardData((cardData) =>
        cardData.map((card) => {
          if (card.card_id === likeResult.card_id) {
            return likeResult;
          } else {
            return card;
          }
        })
      );
    });
  };

  const deleteCard = (card_id) => {
    deleteCardApi(card_id);
    setCardData((cardData) =>
      cardData.filter((card) => {
        return card.card_id !== card_id;
      })
    );
  };
  // function incomplete, building get board api
  const deleteBoard = () => {
    getAllCardsApi(currentBoardID).then((boardData) => {
      boardData.cards.map((card) => {
        deleteCard(card.card_id);
      });
    });
    deleteBoardApi(currentBoardID);
    setCurrentBoardID([]);
    setCurrentBoardTitle([]);
  };

  const boardClick = (board_id) => {
    getAllCardsApi(board_id).then((board) => {
      setCardData(board.cards);
      setCurrentBoardID(board.board_id);
      setCurrentBoardTitle(board.title);
    });
  };

  const handleBoardSubmit = (data) => {
    addNewBoardApi(data)
      .then((newBoard) => {
        setboardData([...boardData, newBoard]);
      })
      .catch((e) => console.log(e));
  };

  const handleCardSubmit = (newCardMessage, currentBoardID) => {
    addNewCardApi(newCardMessage, currentBoardID)
      .then((newCard) => {
        console.log(newCard);

        setCardData([...cardData, newCard]);

        //  response is currently - card # created
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="app-header">Inspiration Board</header>
      <div className="App-container">
        <section className="boards-container">
          <h1>Boards</h1>
          <p className="board-list-display">
            <BoardList
              boardData={boardData}
              handleBoardSubmit={handleBoardSubmit}
              onboardClick={boardClick}
              handleCardSubmit={handleCardSubmit}
            ></BoardList>
          </p>
        </section>
        <section className="selected-board-display">
          <h1>Selected Board </h1>
          <p id="current-board-name">
            {/* ternary not working */}
            {currentBoardID
              ? `${currentBoardTitle}`
              : `Select a board to see
            content`}
          </p>
          <button onClick={() => deleteBoard()}>Delete Board</button>
        </section>
        <section className="new-board-form">
          <h1>Create a New Board</h1>
          <NewBoardForm handleBoardSubmit={handleBoardSubmit}></NewBoardForm>
        </section>
        <section className="create-new-card-display">
          {/* add ternary here */}
          {/* currentBoardID ? cards for: {current board title} : select a board to add new cards */}
          <h3>
            {" "}
            {currentBoardID
              ? `${currentBoardTitle}`
              : "Select a board to add new cards"}
          </h3>
          <NewCardForm
            handleCardSubmit={handleCardSubmit}
            currentBoardID={currentBoardID}
          />
        </section>
        <section className="cards-container">
          <CardList
            onlikedCard={likedCard}
            cardData={cardData}
            ondeleteCard={deleteCard}
            handleCardSubmit={handleCardSubmit}
          />
        </section>
      </div>
    </div>
  );
}
export default App;
