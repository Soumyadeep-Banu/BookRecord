// DTO => Data Transfer Object

class IssuedBook {
  _id; // _id means that id's will generate manually by order
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  // Whenever we create obj, the constructor will get invoked = parameterised contructor

  constructor(user) {
    this._id = user.issuedBook._id;
    this.name = user.issuedBook.name;
    this.genre = user.issuedBook.genre;
    this.price = user.issuedBook.price;
    this.publisher = user.issuedBook.publisher;
    this.issuedBy = user.issuedBook.issuedBy;
    this.issuedDate = user.issuedBook.issuedDate;
    this.returnDate = user.issuedBook.returnDate;
  }
}

module.exports = IssuedBook;
