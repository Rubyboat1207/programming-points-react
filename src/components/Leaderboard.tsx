import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LeaderboardData } from '../api/api';


export type LeaderboardProps = {
  entries: LeaderboardData[];
};

export type LoginBoxProps = {
    onClick: (username: string, password: string) => void
}

export const LoginBox: React.FC<LoginBoxProps> = ({onClick}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h6">Point Tracker</Typography>
      <TextField label="username" variant="outlined" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)}/>
      <TextField label="password" type="password" variant="outlined" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={() => onClick(username, password)} variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Paper>
  );
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h6">Leaderboard</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.sort((a, b) => b.points - a.points).filter(entry => entry.username != 'Rudy').map((entry, index) => (
            <TableRow key={entry.username}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.username.replace('_', ' ')}</TableCell>
              <TableCell>{entry.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
