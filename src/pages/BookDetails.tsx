import {useParams} from "react-router-dom";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {useGetBookByIdQuery} from "../redux/features/books/booksApi.ts";

const BookDetails = () => {
    const {id} = useParams()
    const {data: book, isLoading}= useGetBookByIdQuery(id);

    return (
        <Grid container
              direction="row"
              justifyContent="center"
              sx={{width: '100vw'}}
        >
            {
                isLoading
                    ? <Grid item><CircularProgress/></Grid>
                    : <Grid item>
                    <img style={{width: '20vw', height:'60vh'}} src={book?.data.cover} alt={book?.data.title}/>
                    <Typography sx={{mt: 5}} align={'center'} variant={'h4'}>Title: {book?.data.title}</Typography>
                    <Typography align={'center'} variant={'h6'}>Author: {book?.data.author}</Typography>
                    <Typography align={'center'} variant={'h6'}>Genre: {book?.data.genre}</Typography>
                    <Typography align={'center'} variant={'h6'}>Publication Date: {book?.data.publicationDate}</Typography>
                </Grid>
            }

        </Grid>
    );
};

export default BookDetails;
