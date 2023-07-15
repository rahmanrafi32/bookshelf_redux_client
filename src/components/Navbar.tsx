import { useState } from 'react';
import {
  alpha,
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { Link, Outlet } from 'react-router-dom';
import AddBook from './AddBook.tsx';

const drawerWidth = 240;
const navItems = ['All Books', 'Sign In', 'Sign Up'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BookShelf
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h4"
                component="div"
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                <Link
                  style={{ textDecoration: 'none', color: '#fff' }}
                  to={'/'}
                >
                  BookShelf
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item>
                  <Box>
                    <Button size={'large'}>
                      <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to="/"
                      >
                        All Books
                      </Link>
                    </Button>
                    <Button
                      sx={{ color: '#fff' }}
                      size={'large'}
                      onClick={handleOpenModal}
                    >
                      Add New Book
                    </Button>
                    <AddBook open={open} handleClose={handleCloseModal} />
                    <Button size={'large'}>
                      <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to="/signin"
                      >
                        Sign In
                      </Link>
                    </Button>
                    <Button size={'large'}>
                      <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Navbar;
