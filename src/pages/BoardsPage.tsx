import BoardList from 'components/BoardList/BoardList';
import React from 'react';

const BoardsPage = () => {
  return (
    <main className="main">
      <div className="main__container no-paddings">
        <h1>BoardsPage</h1>
        <BoardList />
      </div>
    </main>
  );
};

export default BoardsPage;
