import {Grid} from "@mui/material";
import SingleCard from "./Card.tsx";
import {useGetAllBooksQuery} from "../redux/features/books/booksApi.ts";
import {IBook} from "../types/book.ts";
import {Link} from "react-router-dom";


const AllBooks = () => {
    const {data: allBooks} = useGetAllBooksQuery(undefined);
    return (
        <Grid container spacing={4}>
            {
                allBooks?.data?.map((book: IBook) => (
                    <Grid key={book.id} item md={4} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Link style={{textDecoration: 'none'}} to={`/book-details/${book.id}`}>
                            <SingleCard title={book.title} author={book.author} genre={book.genre} cover={book.cover}
                                        publicationDate={book.publicationDate}/>
                        </Link>

                    </Grid>
                ))
            }
        </Grid>
    );
};

export default AllBooks;
