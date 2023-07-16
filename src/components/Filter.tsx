import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { filterOptions } from '../redux/features/books/bookSlice.ts';

const Filter = () => {
  const [publicationYear, setPublicationYear] = useState<
    number | number[] | undefined
  >();
  const [genre, setGenre] = useState<string | undefined>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterOptions({ publicationYear, genre }));
  }, [dispatch, publicationYear, genre]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: { width: 320, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', ml: 3, mt: 2 }}>
        <Typography variant={'h6'}>Filter by publication year</Typography>
        <Slider
          min={1970}
          max={2023}
          defaultValue={1990}
          sx={{ width: '10vw', ml: 2.5 }}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(_, value) => setPublicationYear(value)}
        />
        <FormControl sx={{ mt: 3 }}>
          <FormLabel
            sx={{ fontSize: '24px', color: '#000' }}
            id="demo-radio-buttons-group-label"
          >
            Genre
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Sci-Fi"
              control={<Radio />}
              label="Sci-Fi"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
            <FormControlLabel
              value="Fantasy"
              control={<Radio />}
              label="Fantasy"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
            <FormControlLabel
              value="Thriller"
              control={<Radio />}
              label="Thriller"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
            <FormControlLabel
              value="Historical Fiction"
              control={<Radio />}
              label="Historical Fiction"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
            <FormControlLabel
              value="Literary Fiction"
              control={<Radio />}
              label="Literary Fiction"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
            <FormControlLabel
              value="Mystery"
              control={<Radio />}
              label="Mystery"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
            <FormControlLabel
              value="Classic"
              control={<Radio />}
              label="Classic"
              onChange={(event) =>
                setGenre((event.target as HTMLInputElement).value)
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Button sx={{ mt: 3 }} onClick={() => dispatch(filterOptions({}))}>
        Reset Filter
      </Button>
    </Drawer>
  );
};

export default Filter;
