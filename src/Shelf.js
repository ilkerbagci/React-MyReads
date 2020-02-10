import React, { Component } from "react"
import Book from "./Book.js"

class Shelf extends Component {
  render() {
    let books = this.props.books.map(book => {
      return (
        <Book
          key={book.id}
          book={book}
          onShelfSelectionChanged={this.props.onShelfSelectionChanged}
        />
      )
    })
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        {books.length > 0 ? 
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books}
            </ol>
          </div>
          : <div>There isn't any book on {this.props.shelfName} shelf</div> 
        }
      </div>
    )
  }
}

export default Shelf