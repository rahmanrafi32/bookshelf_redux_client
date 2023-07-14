import {Grid} from "@mui/material";
import AllBooks from "../components/AllBooks.tsx";
import Filter from "../components/Filter.tsx";

const Home = () => {
    return (
        <Grid
            container
            sx={{display: 'flex', justifyContent: 'center'}}
        >
           <Grid item xs={2}>
               <Filter/>
           </Grid>
            <Grid item xs={10}>
                <AllBooks/>
            </Grid>
        </Grid>

    );
};

export default Home;
