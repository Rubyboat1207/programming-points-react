import {
    Paper,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { User } from '../api/api';


// Your existing Leaderboard and LoginBox components...

// New component for account information and actions
export const AccountInfo: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px'}}>
            <Typography variant="h6">{user.currency}</Typography>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <TextField label="Recipient" variant="outlined" style={{ marginRight: '10px' }} />
                <IconButton color="primary" aria-label="send points">
                    <SendIcon />
                </IconButton>
            </div>
            <Typography variant="h6">Transaction History:</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Event</TableCell>
                        <TableCell>Previous bal</TableCell>
                        <TableCell>Difference</TableCell>
                        <TableCell>Cur bal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.history.map((transaction, index) => (
                        <TableRow key={index}>
                            <TableCell>{transaction.event_name}</TableCell>
                            <TableCell>{transaction.prev_bal}</TableCell>
                            <TableCell>{transaction.difference}</TableCell>
                            <TableCell>{transaction.post_bal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};