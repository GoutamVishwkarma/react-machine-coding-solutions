import React, { useEffect, useState } from "react";
import "./styles.css";

const PAGE_SIZE = 10;

const User = ({ user }) => {
  return (
    <div className="user-row">
      <span>
        <img src={user.image} alt={user.image} />{" "}
      </span>
      <span>{user.firstName + " " + user.lastName}</span>
      <span>{user.age}</span>
    </div>
  );
};

export default function App() {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getUsersList = async () => {
    try {
      await fetch("https://dummyjson.com/users?limit=50")
        .then((res) => res.json())
        .then((res) => setUsersList(res.users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  if (!usersList.length) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(usersList.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="App">
      <h1>My Pagination</h1>
      <div className="pagination-container">
        {/* Previous Button */}
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={goToPrevPage}
        >
          ⬅️
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          const isNearCurrent =
            page === currentPage ||
            page === currentPage - 1 ||
            page === currentPage + 1;

          if (!isNearCurrent) return null; // skip if far away

          return (
            <button
              key={page}
              className={`pagination-btn ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
        >
          ➡️
        </button>
      </div>

      <div className="user-container">
        {usersList.slice(startIndex, endIndex).map((user) => {
          return <User user={user} key={user.id} />;
        })}
      </div>
    </div>
  );
}
