import { useEffect, useState } from 'react'
import './App.css'
import { Leaderboard, LoginBox } from './components/Leaderboard';
import { LeaderboardData, User, checkLeaderboard, getUserData } from './api/api';
import { AccountInfo } from './components/AccountInfo';

const App: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // You'll need to define setUser somewhere, and set it with the user data when they log in.
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('test')
    checkLeaderboard().then(setLeaderboard);
  }, [])

  function login(username: string, password: string) {
    getUserData(username, password).then((r) => {
      if(typeof(r) == typeof("")) {
        return;
      }

      setUser(r as User);
    });
  }

  return (
    <div>
      {user ? (<AccountInfo user={user}></AccountInfo>) : (<LoginBox onClick={login}/>)}
      
      <Leaderboard entries={leaderboard} />
    </div>
  );
};

export default App
