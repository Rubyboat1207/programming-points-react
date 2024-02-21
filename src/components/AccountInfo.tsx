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
import { useNotification } from '../contexts/NotificationContext';

export const AccountInfo: React.FC<{ user: User, username: string, password: string, onTransferSuccess: (updatedUser: User) => void }> = ({ user, username, password, onTransferSuccess }) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const {addNotification} = useNotification();

    function sendMoney() {
        transferFunds(username, password, recipient + "_ACCOUNT", parseFloat(amount), message.length > 0 ? message : undefined).then((d) => {
            if(typeof(d) == typeof('')) {
                addNotification({text: d as string, btnText: 'OK', color: 'error'});
                return;
            }

            addNotification({text: "Transfer was successful!", btnText: 'OK', color: 'ok'});
            onTransferSuccess(d as User);
        });
    }


    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h6">Hello {user.name}!</Typography>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <TextField label="Recipient*" variant="outlined" style={{ marginRight: '10px' }} value={recipient} onChange={e => setRecipient(e.target.value)} />
                <TextField label="Amount*" variant="outlined" style={{ marginRight: '10px' }} value={amount} onChange={e => setAmount(e.target.value)} />
                <TextField label="Message (Optional)" variant="outlined" style={{ marginRight: '10px' }} value={message} onChange={e => setMessage(e.target.value)} />
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
                        <TableCell>Previous balance</TableCell>
                        <TableCell>Difference</TableCell>
                        <TableCell>Post-Transaction balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.history.map((transaction, index) => (
                        <TableRow key={user.history.length - index}>
                            <TableCell>{transaction.event_name || transaction.message}</TableCell>
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