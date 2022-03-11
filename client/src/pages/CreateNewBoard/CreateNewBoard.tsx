import './CreateNewBoard.css';
import React from "react";

const CreateNewBoard = () => {

  return (
      <div className="CreateNewBoard">
          <header className="Background">
              {/* <img src={logo} className="Bulletin-logo"></img> */}
              <h1 className='BackToBoardsLink'> Back to Boards</h1>
              <h1 className='CreateNewBoardHeader'> Create a new board!</h1>
              <h3 className="boardNameText">Board Name (max 20 characters)</h3>
              <form>
                  <input type="text" id="boardName" placeholder="Add a Board Name" className="InputName"></input>
              </form>
              <h3 className="descriptionText">Description (max 50 characters)</h3>
              <form>
                  <input type="text" id="description" placeholder="Add a description" className="InputDescription"></input>
              </form>
              <h3 className="memberText">Invite members</h3>
              <form>
                  <input type="text" id="membersEmails" placeholder="Email, comma separated" className="InputMember"></input>
              </form>
              <button className="DiscardButton">Discard</button>
              
          </header>
      </div>
  );
};


export default CreateNewBoard;
