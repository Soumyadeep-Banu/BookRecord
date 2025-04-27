const express = require("express");

const { books } = require("../data/books.json");

const { users } = require("../data/users.json");

const router = express.Router();

/*
Route - /books
method - GET
description - get all books
access - public
parameter - none
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by thier id
 * Access: Public
 * Parmanters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);

  if (!book)
    return res.status(404).json({ success: false, message: "Book not found" });

  return res.status(200).json({ success: true, data: book });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parmanters: none
 */

router.get("/issued/user", (req, res) => {
  //   console.log("issued Books");
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0)
    return res
      .status(404)
      .json({ success: false, message: "No booke has been issued" });

  return res.status(200).json({
    success: true,
    message: "Users with the issued book",
    data: issuedBooks,
  });
});

module.exports = router;
