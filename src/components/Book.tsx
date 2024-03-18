// Book.tsx
import React from 'react';
import { BookProps } from '../types';
import swal from 'sweetalert';

const Book: React.FC<BookProps> = ({ book, deleteBook }) => {
return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={book.imageUrl} alt={book.title} className="card-img-top" />
            <div className="card-body">
                <h2 className="card-title fw-bold">{book.title}</h2>
                <p className="card-text fw-semibold">By {book.author}</p>
                <p className="card-text">Published: {book.publishedDate}</p>
                <button 
                    onClick={() => {
                        swal({
                            title: "Are you sure?",
                            text: "Once deleted, you will not be able to recover this book!",
                            icon: "warning",
                            buttons: ["Cancel", "Delete"],
                            dangerMode: true,
                        })
                        .then((willDelete: boolean) => {
                            if (willDelete) {
                                console.log(book)
                                deleteBook(book.id);
                                swal("Poof! The book has been deleted!", {
                                    icon: "success",
                                });
                            } else {
                                swal("The book is safe!");
                            }
                        });
                    }}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                <a href={`/edit-book/${book.id}`} className="btn btn-primary">
                    Edit
                </a>
            </div>
        </div>
);
};

export default Book;