import React, { useState,  } from 'react';
import {  Container, Col, Form, Button, Card, } from 'react-bootstrap';
// import Auth from '../utils/auth';
// import { savePlayerIds, getSavedPlayerIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_PLAYER } from '../utils/mutations';

const SearchPlayers = () => {
  const [searchedPlayers, setsearchedPlayers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // const [savedPlayerIds, setsavedPlayerIds] = useState(getsavedPlayerIds());
console.log(searchedPlayers);
  const [savePlayer, { error }] = useMutation(SAVE_PLAYER);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
                'X-RapidAPI-Key': '8896c92bf1msh635a963d37eb9b1p1e7f2ejsn7baf1e665bd5'
            }
        };
        
    
    const response = await fetch(`https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=${searchInput}`, options)
        
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      console.log(data);
      setsearchedPlayers(data.data);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handlesavePlayer = async (playerId) => {

    try {
      const { data } = await savePlayer({
        variables: { playerId },
      });

      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      
        <Container>

          <Form onSubmit={handleFormSubmit}>
            
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a players'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
          
          </Form>
        </Container>
      

      <Container>
        <h2>
          {searchedPlayers.length
            ? `Viewing ${searchedPlayers.length} results:`
            : 'Search for a players to begin'}
        </h2>
        
          {searchedPlayers.map((player) => {
            console.log(player);
            return (
              
              <Card key={player.id} border='dark'>
              <Card.Body>{player.first_name} {player.last_name}
              <Button
                      
                      className='btn-block btn-info'
                      onClick={() => handlesavePlayer(player.id)}>
                      saved player!
                    </Button>
              </Card.Body>
              
              </Card>
            );
          })}
        
      </Container>
    </>
  );
};

export default SearchPlayers;