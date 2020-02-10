import React, { Component } from "react"
import Shelf from "./Shelf.js"
import { Link } from "react-router-dom"

class MainPage extends Component {
  render() {
    let currentlyReadingBooks = []
    let wantToReadBooks = []
    let readBooks = []

    //Assign each book to their shelves
    this.props.books.forEach(book => {
        if (book.shelf === "currentlyReading") { currentlyReadingBooks.push(book) }
        else if (book.shelf === "wantToRead") { wantToReadBooks.push(book) } 
        else if (book.shelf === "read") { readBooks.push(book) }
    })

    //Create shelves
    return (
      <div className="list-books">
        <div className="list-books-title">
            <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
        <Shelf
            books = {currentlyReadingBooks}
            shelfName='Currently Reading'
            onShelfSelectionChanged={this.props.onShelfSelectionChanged}
        />
        <Shelf
            books = {wantToReadBooks}
            shelfName='Want To Read'
            onShelfSelectionChanged={this.props.onShelfSelectionChanged}
        />  
        <Shelf
            books = {readBooks}
            shelfName='Read'
            onShelfSelectionChanged={this.props.onShelfSelectionChanged}
        /> 
        </div>
        <Link className="open-search" to="/search">
            <button>Add a book</button>
        </Link>
      </div>
    )
  }
}

export default MainPage
