import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/logo.jpg";
import { Badge, Button, CssBaseline } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useStateValue } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "10px",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      });
      history.push("/");
    }
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <Link to='/'>
              <IconButton>
                <img
                  src={logo}
                  alt='logo.js'
                  height='40px'
                  className={classes.image}
                />
              </IconButton>
            </Link>

            <div className={classes.grow} />
            <Typography variant='h6' color='textPrimary' component='p'>
              Hola {user ? user.email : "invitado"}
            </Typography>
            <div className={classes.button}>
              <Link to={!user && "/signin"}>
                <Button onClick={handleAuth} variant='outlined'>
                  <strong>{user ? "Cerrar sesión" : "Iniciar sesión"}</strong>
                </Button>
              </Link>
              <Button disabled={basket?.length === 0}>
                <Link to='/checkout-page' >
                  <IconButton aria-label='show cart items' color='inherit'>
                    <Badge badgeContent={basket?.length} color='secondary'>
                      <ShoppingCart fontSize='large' color='primary' />
                    </Badge>
                  </IconButton>  
                </Link>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Navbar;
