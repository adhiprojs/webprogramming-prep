import React from "react";
import BookCard from "./components/BookCard";

function App() {
  return (
    <div>
      <BookCard
        bookTitle="The Alchemist"
        authorName="Paulo Coelho"
        availabilityStatus="Available"
      />
    </div>
  );
}

export default App;
