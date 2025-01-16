import sendAsync from '../message-control/renderer';

export const getUsersDB = async () => {
    const query = `SELECT * FROM Users`;
    
    const response = await sendAsync(query);

    return response
}