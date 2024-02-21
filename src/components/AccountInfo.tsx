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
    IconButton,
    TableContainer
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { User, transferFunds } from '../api/api';
import { useState } from 'react';

export const AccountInfo: React.FC<{ user: User, username: string, password: string, onTransferSuccess: (updatedUser: User) => void }> = ({ user, username, password, onTransferSuccess }) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    function sendMoney() {
        transferFunds(username, password, recipient + "_ACCOUNT", parseFloat(amount)).then((d) => {
            if(typeof(d) == typeof('')) {
                return;
            }

            onTransferSuccess(d as User);
        });
    }


    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h6">Hello {user.name}!</Typography>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <TextField label="Recipient" variant="outlined" style={{ marginRight: '10px' }} value={recipient} onChange={e => setRecipient(e.target.value)} />
                <TextField label="Amount" variant="outlined" style={{ marginRight: '10px' }} value={amount} onChange={e => setAmount(e.target.value)} />
                <IconButton color="primary" aria-label="send points" onClick={sendMoney}>
                    <SendIcon />
                </IconButton>
            </div>
            <Typography>You have {user.points} {user.currency}</Typography>
            <br/>
            <Typography variant="h6">Transaction History:</Typography>
            <TableContainer sx={{maxHeight: 200}}>
            <Table stickyHeader>
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
                        <TableRow key={user.history.length - index}>
                            <TableCell>{transaction.event_name}</TableCell>
                            <TableCell>{transaction.prev_bal}</TableCell>
                            <TableCell>{transaction.difference}</TableCell>
                            <TableCell>{transaction.post_bal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
    );
};