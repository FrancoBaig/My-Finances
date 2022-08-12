import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const getCategoriesService = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/api/categories`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

export const postCategoryService = async (data, token) => {
    try {
        const response = await axios.post(`${baseURL}/api/categories`, data, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
