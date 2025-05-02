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

router.get("/issued/by-users", (req, res) => {
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

  return res.status(200).json({ success: true, data: issuedBooks });
});

/**
 * Route: /
 * Method: POST
 * Description: Add a new book
 * Access: Public
 * Parmanters: none
 * Data: id, name, genre, price, publication
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(400).json({
      success: false,
      message: "There have no data to add a book",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    res.status(404).json({
      success: false,
      message: "Book id already exists",
    });
  }

  const addBook = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: addBook,
  });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not found with that particular Id",
    });
  }
  const UpdatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedData,
  });
});

/*
Route - /:id
method - DELETE
description - Deleting user by their id
access - public
parameter - id
*/

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      sucess: false,
      message: "Book doesn't exists",
    });
  }
  const index = books.indexOf(book);
  books.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: "Deleting book information sucessfully",
    data: book,
  });
});

module.exports = router;
