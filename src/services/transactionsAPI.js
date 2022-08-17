import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const getTransactionsService = async (token, limit = undefined) => {
    try {
        const response = await axios.get(
            `${baseURL}/api/transaction${
                limit !== undefined ? `/?limit=${limit}` : ""
            }`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const postTransactionService = async (data, token) => {
    try {
        const response = await axios.post(`${baseURL}/api/transaction`, data, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const updateTransactionService = async (data, token) => {
    try {
        const response = await axios.put(
            `${baseURL}/api/transaction/${data.id}`,
            data,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const deleteTransactionService = async (id, token) => {
    try {
        const response = await axios.delete(
            `${baseURL}/api/transaction/${id}`,
            {
                headers: { Authorization: token },
            }
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
