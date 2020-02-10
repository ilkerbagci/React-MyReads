import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage'

class App extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  //Get all books from BooksAPI, setState of books as result of API call
  getBooks = () => {
    BooksAPI.getAll().then((result) => {
      this.setState({
        books: result
      })
    })
  }

  //Change book's shelf when selection changed
  onShelfSelectionChanged = (event, book) => {
    const shelf = event.target.value
    this.updateBookShelfOnServer(book, shelf)
    let isBookMatched = false

    //Switch book's shelf
    let booksWithUpdatedShelves = this.state.books.map((oldBook, index) => {
      if (oldBook.id === book.id) {
        isBookMatched = true
        book.shelf = shelf
        return book
      }
      return oldBook
    })

    this.setBookState(isBookMatched, booksWithUpdatedShelves, book, shelf)
  }

  //Set book's state
  setBookState = (isBookMatched, booksWithUpdatedShelves, book, shelf) => {
    if (isBookMatched === true) {
      this.setState(prevState => ({
        books: booksWithUpdatedShelves
      }))
    } else {
      book.shelf = shelf
      this.setState(currentState => ({
        books: [...currentState.books, book]
      }))
    }
  }

  //Update book's sheld on server with API call
  updateBookShelfOnServer = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage
            categorizedBooks={this.state.books}
            onShelfSelectionChanged={this.onShelfSelectionChanged} />
        )} />
        <Route exact path='/' render={() => (
          <MainPage
            books={this.state.books}
            onShelfSelectionChanged={this.onShelfSelectionChanged} />
        )} />
      </div>
    )
  }
}

export default App
