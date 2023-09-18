// import { SALE_ORDER_API_KEY, USER_AUTH_API_KEY } from "@env"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderData = async (bodyprop) => {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.SALE_ORDER_API_KEY,
        data: {
            "user_prompt": bodyprop
        }
    };

    const data = await axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error) {
                return "Error"
            }
        });


    return data;
}

export default OrderData;



export const Login = async (loginCredentials, prop) => {
    const { username, password } = loginCredentials;


    let config = {
        method: 'post',
        maxBodyLength: Infinity,

        url: process.env.USER_AUTH_API_KEY + `${prop}`,
        data: {
            "email": username,
            "password": password,
        },
    }

    const dataresponse = await axios.request(config)
        .then(async (response) => {
            console.log(response.data)
            await AsyncStorage.setItem('token', response.data.token);
            return response.data;
        })
        .catch((error) => {
            if (error) {
                return {
                    "success": false,
                    "message": 'User Not Found',

                }

            }
        });

    return dataresponse;


}


export const findUser = async (method, prop) => {


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.USER_AUTH_API_KEY + `${method}`,
        data: {
            "token": prop
        }
    }

    const dataresponse = await axios.request(config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error) {
                return {
                    "success": false,
                    "message": 'User Not Found',

                }

            }
        });

    return dataresponse;


}
