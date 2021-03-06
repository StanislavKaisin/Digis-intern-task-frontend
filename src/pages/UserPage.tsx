import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useHistory } from "react-router";
import { getUserAlerts } from "../api/alert";
import { CommentsList } from "../components/CommentsList";
import { setLoader, unSetLoader } from "../redux/loaderSlice";
import { setMessage } from "../redux/messageSlice";
import { getUserComments } from "../api/comment";
import { IUserCreateResponse, logout } from "../redux/userSlice";

export const UserPage = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [alerts, setalerts] = useState<null | any[]>(null);
  const [comments, setcomments] = useState<null | any[]>(null);

  const [isOpenAlerts, setisOpenAlerts] = useState<boolean>(false);
  const [isOpenComments, setisOpenComments] = useState<boolean>(false);

  useEffect(() => {
    if (!user.access_token) {
      history.push("user/signin");
    }
  }, []);

  useEffect(() => {
    const loadAlerts = async () => {
      if (isOpenAlerts) {
        dispatch(setLoader());
        try {
          const alertsFromDb = await getUserAlerts({ owner: user._id! });
          setalerts(alertsFromDb);
          dispatch(unSetLoader());
        } catch (error: any) {
          let errorMessage;
          if (error.response) {
            errorMessage = error.response.data.message;
          }
          if (error instanceof Error) {
            dispatch(unSetLoader());
            dispatch(
              setMessage({
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage: errorMessage ? errorMessage : error.message,
              })
            );
          }
        }
      }
    };
    loadAlerts();
  }, [isOpenAlerts]);

  useEffect(() => {
    const loadComments = async () => {
      if (isOpenComments) {
        dispatch(setLoader());
        try {
          const commentsFromDb = await getUserComments(user._id as string);
          setcomments(commentsFromDb);
          dispatch(unSetLoader());
        } catch (error: any) {
          let errorMessage;
          if (error.response) {
            errorMessage = error.response.data.message;
          }
          if (error instanceof Error) {
            dispatch(unSetLoader());
            dispatch(
              setMessage({
                snackbarOpen: true,
                snackbarType: "error",
                snackbarMessage: errorMessage ? errorMessage : error.message,
              })
            );
          }
        }
      }
    };
    loadComments();
  }, [isOpenComments]);

  const handleAlerts = async () => {
    if (isOpenAlerts === false) {
      setisOpenAlerts(true);
    } else {
      setisOpenAlerts(false);
    }
  };

  const handleComments = async () => {
    if (isOpenComments === false) {
      setisOpenComments(true);
    } else {
      setisOpenComments(false);
    }
  };

  const handleLogOut = async () => {
    dispatch(logout(user as IUserCreateResponse));
    localStorage.removeItem("Pet!Alert");
    history.push("/");
  };

  const theme = useTheme();
  const larger = useMediaQuery(theme.breakpoints.down("sm"));
  const spacing = larger ? 0 : 1;

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ fontWeight: 600, textTransform: "uppercase" }}
        >
          Personal data
        </Typography>
        <Grid container mt={2} spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              E-mail:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Phone:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Viber:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.viber ? user.viber : "No data found..."}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={spacing}>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6" style={{ fontWeight: 600 }}>
              Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="p" variant="h6">
              {user.address ? user.address : "No data found..."}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              onClick={() => {
                history.push("/user/update");
              }}
              fullWidth
            >
              Change personal data
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" onClick={handleLogOut} fullWidth>
              Log out
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Accordion onChange={handleAlerts}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ fontWeight: 600 }}>Your alerts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{}}>
          <CommentsList list={alerts as any[]} />
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleComments}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ fontWeight: 600 }}>Your comments:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CommentsList list={comments as any[]} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
