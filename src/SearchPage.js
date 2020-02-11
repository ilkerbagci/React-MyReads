import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchBar from './SearchBar'
import Shelf from './Shelf'

let currentlyReadingBooks = []
let wantToReadBooks = []
let readBooks = []
let uncategorizedBooks = []

class SearchPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filteredBooks: []
        }
    }

    //Search and filter books 
    searchBooks = (query) => {
        BooksAPI.search(query).then((result) => {
            
                if (typeof result === 'undefined') {
                this.setState({
                    filteredBooks: this.props.categorizedBooks,
                })
                } else {
                    this.setState({
                        filteredBooks: result,
                    })
                }
            
            }).catch(error => console.log(error));
    }

    //Get filtered books
    getBooksWithShelves = () => {
        const { categorizedBooks } = this.props
        const { filteredBooks } = this.state

        let books = []
        let isCategorized = false

        if (filteredBooks.length > 0) {
            const currentFilteredBooks = [...filteredBooks]

            currentFilteredBooks.forEach((filteredBook) => {
                isCategorized = false
                categorizedBooks.forEach(book => {
                    if (book.id === filteredBook.id) {
                        isCategorized = true
                        books.push(book)
                        return
                    }
                })
                if (!isCategorized) {
                    filteredBook.shelf = 'none'
                    books.push(filteredBook)
                }
            })
        }
        return books
    }

    render() {
        uncategorizedBooks = []
        currentlyReadingBooks = []
        wantToReadBooks = []
        readBooks = []

        //push uncategorized books to own array
        this.getBooksWithShelves().forEach(book => {
            if (book.shelf === 'none') { uncategorizedBooks.push(book) }
            else if (book.shelf === 'currentlyReading') { currentlyReadingBooks.push(book) }
            else if (book.shelf === 'wantToRead') { wantToReadBooks.push(book) }
            else if (book.shelf === 'read') { readBooks.push(book) }
        })

        let uncategorizedBookItems = uncategorizedBooks.map((book) => {
            return (
                <Book
                    key={book.id}
                    book={book}
                    onShelfSelectionChanged={this.props.onShelfSelectionChanged}
                />
            )
        })

        return (
            <div className="search-books">
                <SearchBar searchBooks={this.searchBooks}/>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {uncategorizedBookItems}
                    </ol>
                    {currentlyReadingBooks.length > 0 &&
                        <Shelf
                            books={currentlyReadingBooks}
                            shelfName='Currently Reading'
                            onShelfSelectionChanged={this.props.onShelfSelectionChanged}
                        />
                    }
                    {wantToReadBooks.length > 0 &&
                        <Shelf
                            books={wantToReadBooks}
                            shelfName='Want To Read'
                            onShelfSelectionChanged={this.props.onShelfSelectionChanged}
                        />
                    }
                    {readBooks.length > 0 &&
                        <Shelf
                            books={readBooks}
                            shelfName='Read'
                            onShelfSelectionChanged={this.props.onShelfSelectionChanged}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default SearchPage