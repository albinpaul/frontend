import { Box, Button, Card } from '@mui/material'
import { useAuth } from '../hooks/useAuth'


import ace_of_clubs from '../assets/cards/ace_of_clubs.svg';
import ace_of_diamonds from '../assets/cards/ace_of_diamonds.svg';
import ace_of_hearts from '../assets/cards/ace_of_hearts.svg';
import ace_of_spades from '../assets/cards/ace_of_spades.svg';
import ace_of_spades2 from '../assets/cards/ace_of_spades2.svg';
import black_joker from '../assets/cards/black_joker.svg';
import eight_of_clubs from '../assets/cards/eight_of_clubs.svg';
import eight_of_diamonds from '../assets/cards/eight_of_diamonds.svg';
import eight_of_hearts from '../assets/cards/eight_of_hearts.svg';
import eight_of_spades from '../assets/cards/eight_of_spades.svg';
import five_of_clubs from '../assets/cards/five_of_clubs.svg';
import five_of_diamonds from '../assets/cards/five_of_diamonds.svg';
import five_of_hearts from '../assets/cards/five_of_hearts.svg';
import five_of_spades from '../assets/cards/five_of_spades.svg';
import four_of_clubs from '../assets/cards/four_of_clubs.svg';
import four_of_diamonds from '../assets/cards/four_of_diamonds.svg';
import four_of_hearts from '../assets/cards/four_of_hearts.svg';
import four_of_spades from '../assets/cards/four_of_spades.svg';
import jack_of_clubs from '../assets/cards/jack_of_clubs.svg';
import jack_of_clubs2 from '../assets/cards/jack_of_clubs2.svg';
import jack_of_diamonds from '../assets/cards/jack_of_diamonds.svg';
import jack_of_diamonds2 from '../assets/cards/jack_of_diamonds2.svg';
import jack_of_hearts from '../assets/cards/jack_of_hearts.svg';
import jack_of_hearts2 from '../assets/cards/jack_of_hearts2.svg';
import jack_of_spades from '../assets/cards/jack_of_spades.svg';
import jack_of_spades2 from '../assets/cards/jack_of_spades2.svg';
import king_of_clubs from '../assets/cards/king_of_clubs.svg';
import king_of_clubs2 from '../assets/cards/king_of_clubs2.svg';
import king_of_diamonds from '../assets/cards/king_of_diamonds.svg';
import king_of_diamonds2 from '../assets/cards/king_of_diamonds2.svg';
import king_of_hearts from '../assets/cards/king_of_hearts.svg';
import king_of_hearts2 from '../assets/cards/king_of_hearts2.svg';
import king_of_spades from '../assets/cards/king_of_spades.svg';
import king_of_spades2 from '../assets/cards/king_of_spades2.svg';
import nine_of_clubs from '../assets/cards/nine_of_clubs.svg';
import nine_of_diamonds from '../assets/cards/nine_of_diamonds.svg';
import nine_of_hearts from '../assets/cards/nine_of_hearts.svg';
import nine_of_spades from '../assets/cards/nine_of_spades.svg';
import queen_of_clubs from '../assets/cards/queen_of_clubs.svg';
import queen_of_clubs2 from '../assets/cards/queen_of_clubs2.svg';
import queen_of_diamonds from '../assets/cards/queen_of_diamonds.svg';
import queen_of_diamonds2 from '../assets/cards/queen_of_diamonds2.svg';
import queen_of_hearts from '../assets/cards/queen_of_hearts.svg';
import queen_of_hearts2 from '../assets/cards/queen_of_hearts2.svg';
import queen_of_spades from '../assets/cards/queen_of_spades.svg';
import queen_of_spades2 from '../assets/cards/queen_of_spades2.svg';
import seven_of_clubs from '../assets/cards/seven_of_clubs.svg';
import seven_of_diamonds from '../assets/cards/seven_of_diamonds.svg';
import seven_of_hearts from '../assets/cards/seven_of_hearts.svg';
import seven_of_spades from '../assets/cards/seven_of_spades.svg';
import six_of_clubs from '../assets/cards/six_of_clubs.svg';
import six_of_diamonds from '../assets/cards/six_of_diamonds.svg';
import six_of_hearts from '../assets/cards/six_of_hearts.svg';
import six_of_spades from '../assets/cards/six_of_spades.svg';
import ten_of_clubs from '../assets/cards/ten_of_clubs.svg';
import ten_of_diamonds from '../assets/cards/ten_of_diamonds.svg';
import ten_of_hearts from '../assets/cards/ten_of_hearts.svg';
import ten_of_spades from '../assets/cards/ten_of_spades.svg';
import three_of_clubs from '../assets/cards/three_of_clubs.svg';
import three_of_diamonds from '../assets/cards/three_of_diamonds.svg';
import three_of_hearts from '../assets/cards/three_of_hearts.svg';
import three_of_spades from '../assets/cards/three_of_spades.svg';
import two_of_clubs from '../assets/cards/two_of_clubs.svg';
import two_of_diamonds from '../assets/cards/two_of_diamonds.svg';
import two_of_hearts from '../assets/cards/two_of_hearts.svg';
import two_of_spades from '../assets/cards/two_of_spades.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../main';
import Header from './SignOutButton';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { userAtom } from '../store/atoms/user';
import { useEffect } from 'react';
import axios from 'axios';
import { backend_url } from '../creds/backend_cred';
import { Socket } from 'socket.io-client';

let Cards = [
  ace_of_clubs,
  ace_of_diamonds,
  ace_of_hearts,
  ace_of_spades,
  eight_of_clubs,
  eight_of_diamonds,
  eight_of_hearts,
  eight_of_spades,
  five_of_clubs,
  five_of_diamonds,
  five_of_hearts,
  five_of_spades,
  four_of_clubs,
  four_of_diamonds,
  four_of_hearts,
  four_of_spades,
  jack_of_clubs,
  jack_of_diamonds,
  jack_of_hearts,
  jack_of_spades,
  king_of_clubs,
  king_of_diamonds,
  king_of_hearts,
  king_of_spades,
  nine_of_clubs,
  nine_of_diamonds,
  nine_of_hearts,
  nine_of_spades,
  queen_of_clubs,
  queen_of_diamonds,
  queen_of_hearts,
  queen_of_spades,
  seven_of_clubs,
  seven_of_diamonds,
  seven_of_hearts,
  seven_of_spades,
  six_of_clubs,
  six_of_diamonds,
  six_of_hearts,
  six_of_spades,
  ten_of_clubs,
  ten_of_diamonds,
  ten_of_hearts,
  ten_of_spades,
  three_of_clubs,
  three_of_diamonds,
  three_of_hearts,
  three_of_spades,
  two_of_clubs,
  two_of_diamonds,
  two_of_hearts,
  two_of_spades,
]

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function GamePage(props: any) {
  const [user, _] = useRecoilState(userAtom)
  const navigate = useNavigate()
  if (!user.user) {
    navigate("/")
  }
  let { gameId } = useParams()
  const instance = axios.create({
    baseURL: backend_url,
    timeout: 1000,
  });
  useEffect(() => {
    // instance.get("/game/" + gameId, {
    //   headers: {
    //     "token": user.user?.accessToken,
    //   }
    // }).then((response) => {
    //   console.log(response)
    // }).catch(console.error)
  })
  if(!props.socket){
    return <h1>Not connected to backend create room and try again</h1>
  }
  Cards = shuffle(Cards)

  return (
    <Box display="flex"
      flexDirection="row"
      minWidth="100vw"
      flexWrap="wrap"
    >
      {
        Cards.map(card => <img src={card}
          style={{ margin: "10px" }}
          width="130px"
          height="180px" />)
      }
    </Box>
  )
}

export default GamePage