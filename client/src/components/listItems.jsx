import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { Fastfood, Home, LocalBar, ShoppingCart, Store, StoreMallDirectory, Whatshot } from '@material-ui/icons';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { ManageAccounts, Newspaper, ShoppingBag } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ViewListIcon from '@mui/icons-material/ViewList';

export const adminListItems = (
  <React.Fragment>
    <Link to={'/admin'}>
      <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/admin/orders'}>
      <ListItemButton>
        <ListItemIcon>
          <LocalBar />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const customerListItems = (
  <React.Fragment>
  <Link to={'/items'}>
    <ListItemButton>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Items" />
    </ListItemButton>
  </Link>
  
  <Link to={'/transactions'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingBag />
      </ListItemIcon>
      <ListItemText primary="My Transactions" />
    </ListItemButton>
  </Link>
  <Link to={'/cart'}>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Cart" />
    </ListItemButton>
  </Link>
  <Link to={'/ticket'}>
    <ListItemButton>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Ticket" />
    </ListItemButton>
  </Link>
  <Link to={'/appointment'}>
    <ListItemButton>
      <ListItemIcon>
        <BookOnlineIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItemButton>
  </Link>
  <Link to={'/docScheduler'}>
    <ListItemButton>
      <ListItemIcon>
        <BookOnlineIcon />
      </ListItemIcon>
      <ListItemText primary="Doctor Scheduler" />
    </ListItemButton>
  </Link>
  
  </React.Fragment>
);


export const guestListItems = (
  <React.Fragment>
  <Link to={'/'}>
    <ListItemButton>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>

  </React.Fragment>
);


export const scheduleManagerListItems = (
  <React.Fragment>
  

  <Link to={'/appointments'}>
    <ListItemButton>
      <ListItemIcon>
        <BookOnlineIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItemButton>
  </Link>

  <Link to={'/overview'}>
    <ListItemButton>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemButton>
  </Link>

  <Link to={'/schedule'}>
    <ListItemButton>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Schedule" />
    </ListItemButton>
  </Link>
  
  </React.Fragment>
);

export const customerServiceManagerListItems = (
  <React.Fragment>
  

  <Link to={'/tickets'}>
    <ListItemButton>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Tickets" />
    </ListItemButton>
  </Link>
  
  </React.Fragment>
);