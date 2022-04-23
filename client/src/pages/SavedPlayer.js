import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removePlayerId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
// import { REMOVE_PLAYER } from '../utils/mutations';

const SavedPlayers = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removePlayer, { error }] = useMutation(REMOVE_Player);
  const userData = data?.me || {};

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

      removePlayerId(playerId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved Players!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPlayers.length
            ? `Viewing ${userData.savedPlayers.length} saved ${userData.savedPlayers.length === 1 ? 'player' : 'players'}:`
            : 'You have no saved players!'}
        </h2>
        <Card>
          {userData.savedPlayers.map((player) => {
            return (
              <Card key={player.playerId} border='dark'>
                
                <Card.Body>
                  
                </Card.Body>
              </Card>
            );
          })}
        </Card>
      </Container>
    </>
  );
};

export default Savedplayers;