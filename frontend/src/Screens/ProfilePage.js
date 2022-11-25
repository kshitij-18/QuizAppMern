import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentlyLoggedInUser } from "../api/quizApis/Query";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ScoreIcon from "@mui/icons-material/Score";
import "./ProfilePage.css";

const ProfilePage = () => {
  const {
    data: { data: currentUserData = {} } = {},
    isLoading,
    isError,
    error,
  } = useQuery(["authUser"], () => fetchCurrentlyLoggedInUser());

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.message}</h1>;
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={3}
      style={{ marginTop: "30px" }}
    >
      <Grid item xs={4}>
        <Paper elevation={3} style={{ padding: "1rem", borderRadius: "10px" }}>
          <div className="card__avatar__header">
            <Avatar
              alt={currentUserData.name}
              src={`https://ui-avatars.com/api/?name=${currentUserData?.name}&size=511&background=0D8ABC&color=fff`}
              sx={{ width: 90, height: 90, marginRight: "1rem" }}
            />
            <div id="card__name__header">
              <Typography variant="h4" component="h2">
                {currentUserData?.name}
              </Typography>
              <p>{currentUserData?.username}</p>
            </div>
          </div>

          <hr />
          <div className="profile__card__details">
            <div>
              <EmailIcon accentHeight={21} />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>{currentUserData?.email}</p>
            </div>
          </div>

          {currentUserData?.userType ? (
            <div className="profile__card__details">
              <div>
                <LoyaltyIcon accentHeight={21} />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <p>{currentUserData?.userType.toUpperCase()}</p>
              </div>
            </div>
          ) : null}

          <div className="profile__card__details">
            <div>
              <ScoreIcon accentHeight={21} />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>{currentUserData?.totalScore}</p>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <h1>ProfilePage</h1>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
