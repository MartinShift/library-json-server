export interface Book {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    publishedDate: string;
  }
  export interface BookListProps {
    books: Book[];
    deleteBook: (id: string) => void;
  }
export interface BookProps {
  book: Book;
  deleteBook: (id: string) => void;
}
export interface FilterProps {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
}
export interface SortProps {
  sortType: string;
  onSortTypeChange: (sortType: string) => void;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface AddBookModalProps extends ModalProps {
  addBook: (book: Book) => void;
}
