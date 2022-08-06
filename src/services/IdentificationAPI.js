import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

// user registration
export const registrationService = async (data) => {
    try {
        const response = await axios.post(
            `${baseURL}/api/identification/signup`,
            data
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// user log in
export const loginService = async (data) => {
    try {
        const response = await axios.post(
            `${baseURL}/api/identification/login`,
            data
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
