<<<<<<< HEAD
import React, { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import Auth from "../utils/auth";
//import { removePlayerId } from '../utils/localStorage';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_PLAYER } from "../utils/mutations";
// import { REMOVE_PLAYER } from '../utils/mutations';

const SavedPlayers = () => {
  const { loading, data } = useQuery(QUERY_ME);
=======
import React, { useEffect } from 'react';
import { Jumbotron, Container, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
// import { removePlayerId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_PLAYER } from '../utils/mutations';

const SavedPlayers = () => {
  const { loading, data } = useQuery(GET_ME);
>>>>>>> fc364aac13904e8e29961af89ce744f935230bc0
  const [removePlayer, { error }] = useMutation(REMOVE_PLAYER);
  const userData = data?.me || {};
  let playerIds = [];
  loading
    ? playerIds = []
    : playerIds = playerIds.concat(data.me.playerIds) || [];
  console.log(playerIds.length);

  useEffect(() => {
    if (playerIds.length > 0) {
      const getPlayerStats = async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
              "X-RapidAPI-Key":
                "8896c92bf1msh635a963d37eb9b1p1e7f2ejsn7baf1e665bd5",
            },
          };

          const response = await fetch(
            `https://free-nba.p.rapidapi.com/stats?page=0&per_page=25&player_ids[]=${playerIds[0]}`,
            options
          );

          if (!response.ok) {
            throw new Error("Player Not Found");
          }

          const data = await response.json();

          console.log(data);
          // setPlayer(data.data);
          // setSavedInput('');
        } catch (err) {
          console.error(err);
        }
      };
      getPlayerStats();
    }
  }, [data?.me]);
  // create function that accepts the player's mongo _id value as param and deletes the player from the database
  const handleDeletePlayer = async (playerId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removePlayer({
        variables: { playerId },
      });

      // removePlayerId(playerId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    console.log('loading')
    return <h2>LOADING...</h2>;
  }


  return (
    <>
      <div fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved Players!</h1>
        </Container>
      </div>
      <Container>
        
        <h2>
          {playerIds.length
            ? `Viewing ${playerIds.length} saved ${
                playerIds.length === 1 ? "player" : "players"
              }:`
            : "You have no saved players!"}
        </h2>
        
       
        {/* <Card key={player.id} border='dark'>
          <Card.Body>
            <Card.Title>{player.first_name} {player.last_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Player Info</Card.Subtitle>
            <Card.Text>
              {player.height_feet} {player.height_inches}
              {player.position} {player.team} {player.weight_pounds}
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card> */}
      </Container>
    </>
  );
};

export default SavedPlayers;
