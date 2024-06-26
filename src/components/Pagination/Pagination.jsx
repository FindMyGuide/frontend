import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  border: none;
  background-color: ${(props) => (props.active === 'true' ? '#50abf2' : 'transparent')};
  color: ${(props) => (props.active === 'true' ? 'white' : 'black')};
  padding: 6px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationContainer>
      {pageNumbers.map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          active={pageNumber === currentPage ? 'true' : 'false'}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
