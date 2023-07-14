import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Grid} from "@mui/material";

type IProps = {
    title: string
    author: string
    genre: string
    cover: string
    publicationDate: string
}
const SingleCard = ({title, author, genre, cover, publicationDate}: IProps) => {
    return (
        <Card sx={{width: 350}}>
            <CardMedia
                sx={{height: 240}}
                image={cover}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body1">
                    Author: {author}
                </Typography>
                <Typography variant="body1">
                    Genre: {genre}
                </Typography>
                <Typography variant="body1">
                    Publication Date: {publicationDate}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Button size="medium">Share</Button>
                        <Button size="medium">Learn More</Button>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
        ;
};

export default SingleCard;
