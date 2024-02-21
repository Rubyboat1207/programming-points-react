import axios from "axios"
const API_URL = "http://localhost:8000"

export interface LeaderboardData {
    points: number,
    username: string
}

// Define the types for your user and transaction history
export type User = {
    name: string;
    points: number;
    currency: string;
    history: Transaction[];
};

export type Transaction = {
    event_name: string;
    difference: number;
    prev_bal: number;
    post_bal: number;
    message: string;
};

export async function checkLeaderboard() {
    const data = (await axios.get(API_URL + '/leaderboard')).data as LeaderboardData[];

    return data;
}

export async function getUserData(username: string, password: string) {
    const data = (await axios.post(API_URL + '/login', {password, username})).data as User & {message?: string};

    if(data.message) {
        return data.message;
    }

    return data as User
}

export async function transferFunds(username: string, password: string, destination: string, amount: number, message?: string) {
    const data = (await axios.post(API_URL + '/transfer', {authentication: {username, password}, amount, destination})).data as User & {message?: string};

    if(data.message) {
        return data.message;
    }

    return data as User
}