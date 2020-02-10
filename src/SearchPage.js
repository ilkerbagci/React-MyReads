import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import SearchBar from './SearchBar'

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
            })
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
                        return
                    }
                })
                if (!isCategorized) {
                    filteredBook.shelf = 'none'
                    books.push(filteredBook)
                }
                // if (!filteredBook.shelf){
                //     filteredBook.shelf = 'none'
                //     books.push(filteredBook)
                // }
            })
        }
        return books
    }

    render() {
        uncategorizedBooks = []

        //push uncategorized books to own array
        this.getBooksWithShelves().forEach(book => {
            if (book.shelf === 'none') { uncategorizedBooks.push(book) }
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
                </div>
            </div>
        )
    }
}

export default SearchPage