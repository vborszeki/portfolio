import React from 'react';
import './emptyRows.css';

const EmptyRows = ({ contentHeight }) => {
  const numberOfRows = 13;
  const numberOfNeededEmptyRows =
    numberOfRows - contentHeight / (window.innerHeight / numberOfRows);

  if (numberOfNeededEmptyRows < 0) return null;

  return (
    <>
      {Array(Math.ceil(numberOfNeededEmptyRows))
        .fill(null)
        .map((e, i) => (
          <div className="empty-row" key={i} />
        ))}
    </>
  );
};

export default EmptyRows;
