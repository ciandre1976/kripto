import React from "react";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <ul>
            <li style={{ float: "left", margin: "20px" }}>
              <a href="#" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          </ul>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
