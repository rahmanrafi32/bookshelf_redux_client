import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks.ts';
import { logout } from '../redux/features/user/userSlice.ts';
import CustomSearch from './CustomSearch.tsx';

const drawerWidth = 240;
const navItems = ['All Books', 'Sign In', 'Sign Up'];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const { username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
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
              <CustomSearch />
            </Grid>
            <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item>
                  <Box>
                    <Button>
                      <Link
                        style={{ textDecoration: 'none', color: '#fff' }}
                        to="/"
                      >
                        All Books
                      </Link>
                    </Button>
                    {username ? (
                      <>
                        <Button>
                          <Link
                            style={{ textDecoration: 'none', color: '#fff' }}
                            to="/wishlist"
                          >
                            Wishlists
                          </Link>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                          <Link
                            style={{ textDecoration: 'none', color: '#fff' }}
                            to={'/add-new-book'}
                          >
                            Add New Book
                          </Link>
                        </Button>
                        <Button>
                          <Link
                            style={{ textDecoration: 'none', color: '#fff' }}
                            to="/readinglist"
                          >
                            Reading List
                          </Link>
                        </Button>
                      </>
                    ) : null}
                    {!username ? (
                      <>
                        <Button>
                          <Link
                            style={{ textDecoration: 'none', color: '#fff' }}
                            to="/signin"
                          >
                            Sign In
                          </Link>
                        </Button>
                        <Button>
                          <Link
                            style={{ textDecoration: 'none', color: '#fff' }}
                            to="/signup"
                          >
                            Sign Up
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{ color: '#fff' }}
                        onClick={() => dispatch(logout())}
                      >
                        <Link
                          style={{ textDecoration: 'none', color: '#fff' }}
                          to={pathname === '/' ? '/' : '/signin'}
                        >
                          Sign out
                        </Link>
                      </Button>
                    )}
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
      <Box component="main" sx={{ p: 3, width: '100vw' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Navbar;
