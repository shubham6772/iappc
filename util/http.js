// import { SALE_ORDER_API_KEY, USER_AUTH_API_KEY } from "@env"
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderData = async (bodyprop, lastid) => {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.SALE_ORDER_API_KEY,

        data: {
            "user_prompt": `Create an order for ${bodyprop}`,
            "last_id": lastid,

        }
    };

    const data = await axios.request(config)
        .then((response) => {

            const { is_successful, sales } = response.data;

            if (is_successful == true) {
                return {
                    sales
                }
            }
            else {
                return "Error"
            }
        })
        .catch((error) => {
            if (error) {

                return "Error"
            }
        });


    return data;
}

export default OrderData;

export const Login = async (loginCredentials) => {
    const { username, password } = loginCredentials;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.LOGIN_API_KEY + 'login',
        data: {
            "email": username,
            "password": password,
        },
    }

    const dataresponse = await axios.request(config)
        .then(async (response) => {
            const { is_successful, is_user_exists, last_id, refresh_token } = response.data;

            if (is_successful == true && is_user_exists == true) {

                await AsyncStorage.setItem('refreshToken', JSON.stringify(refresh_token));
                const value = await AsyncStorage.getItem('refreshToken');
                const token = await JSON.parse(value);

                return {
                    "success": true,
                    "message": "Logged In",
                    "last_id": last_id,
                    "token": token,
                }
            }
            else if (is_successful == true && is_user_exists == false) {
                return {
                    "success": false,
                    "message": "User Not Found",
                }
            }
            else {
                return {
                    "success": false,
                    "message": "User Not Found",
                }
            }


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

export const ExpenseDataApi = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.FIREBASE_API_KEY,
    }


    const dataresponse = await axios.request(config)
        .then((response) => {
            return {
                success: 'true',
                data: response.data,
            }
        })
        .catch((error) => {
            if (error) {
                return {
                    success: false,
                    data: "Not Found",
                }
            }
        });

    return dataresponse;

}

export const ExpenseDataApiPost = async (picker, Amount, Date, Remarks, id) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.FIREBASE_API_KEY,
        data: {
            ExpenseType: picker,
            Amount,
            Date,
            Remarks,
            id
        }
    }

    const dataresponse = await axios.request(config)
        .then((response) => {
            return {
                success: 'true',
                data: response.data,
            }
        })
        .catch((error) => {
            if (error) {
                return {
                    success: false,
                    data: "Not Found",
                }
            }
        });

    return dataresponse;

}

export const PostOrders = async (email, Customer_Name, Customer_Number, Item_Name, Quantity, _id) => {

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.POST_ORDER_API_KEY,
        data: {
            "order_data": {
                "order_id": email,
                "orders": [
                    {
                        "_id": _id,
                        "Customer_Number": Customer_Number,
                        "Quantity": Quantity,
                        "Item_Name": Item_Name,
                        "Customer_Name": Customer_Name,
                    }
                ]
            }
        }
    }

    const dataresponse = await axios.request(config)
        .then((response) => {
            return {
                success: 'true',
                data: response.data,
            }
        })
        .catch((error) => {
            if (error) {
                return {
                    success: false,
                    data: "Not Posted",
                }
            }
        });

    return dataresponse;

}

export const CartInsert = async (item, email) => {

    if (item.customer_name == null || item.item_name == null) {
        return {
            success: false,
            data: "Solve Problem First"
        }
    }
    else {

        const order = {
            "_id": item.item_id,
            "Customer_Number": Number(item.customer_no),
            "Quantity": Number(item.quantity),
            "Item_Name": item.item_name,
            "Customer_Name": item.customer_name,
        }


        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: process.env.CART_API_KEY + 'insert',
            data: {
                "order_id": email,
                "orders": order,
            }
        }



        const dataresponse = await axios.request(config)
            .then((response) => {

                return {
                    success: true,
                    data: response.data,
                }
            })
            .catch((error) => {
                if (error) {

                    return {
                        success: false,
                        data: "Not Found",
                    }
                }
            });

        return dataresponse;

    }



}

export const CartFetch = async (email) => {


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.CART_API_KEY + 'fetch',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "order_id": email,
        }
    }


    const dataresponse = await axios.request(config)
        .then((response) => {
            const { is_successful, user_cart } = response.data;

            if (is_successful == true) {
                return {
                    success: true,
                    data: user_cart
                }
            }
            else {
                return {
                    success: false,
                    data: "Not Found"
                }
            }
        })
        .catch((error) => {
            if (error) {
                console.log(error)
            }
        });

    return dataresponse;

}

export const CartDelete = async (_id, email) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.CART_API_KEY + 'delete',
        data: {
            "order_id": email,
            "_id": _id
        }

    }

    const dataresponse = await axios.request(config)
        .then((response) => {

            return {
                success: true,
                data: response.data,
            }

        })
        .catch((error) => {
            if (error) {
                return {
                    success: false,
                    data: "Not Deleted",
                }
            }
        });

    return dataresponse;

}

export const History = async (email) => {

    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: process.env.CART_API_KEY + 'history',
        data: {
            "order_id": email,
        }

    }

    const dataresponse = await axios.request(config)
        .then((response) => {
            const { is_successful, user_cart } = response.data;

            if (is_successful == true) {
                return {
                    success: true,
                    data: user_cart
                }
            }
            else {
                return {
                    success: false,
                    data: "Not Found"
                }
            }

        })
        .catch((error) => {
            if (error) {
                return {
                    success: false,
                    data: "Not Found",
                }
            }
        });

    return dataresponse;

}

export const getAccessToken = async (email) => {

    const value = await AsyncStorage.getItem('refreshToken');
    const token = await JSON.parse(value);

    if (token) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.LOGIN_API_KEY + "get_access_token",
            data: {
                "email": email,
                "refresh_token": token,
            },
        }
        const dataresponse = await axios.request(config)
            .then(async (response) => {

                const { is_expired, is_successful, jwt_token } = response.data;

                if (is_expired == false && is_successful == true) {
                    await AsyncStorage.setItem('jwtToken', JSON.stringify(jwt_token));

                    return {
                        "success": true,
                        "message": "Logged In"

                    }
                } else {
                    return {
                        "success": true,
                        "message": "Token is invalid"

                    }
                }

            })
            .catch((error) => {
                if (error) {
                    return {
                        "success": false,
                        "message": 'Server Error',
                    }

                }
            });

        return dataresponse;

    } else {
        return {
            "success": false,
            "message": 'Token Not Exists',
        }
    }



}

export const Logout = async () => {

    let keys = ["jwtToken", "refreshToken"]

    try {
        await AsyncStorage.multiRemove(keys, err => {
            console.log('LoggedOut')
        });

        return {
            "success": true,
            "message": "Logged out successfully",
        }

    } catch (error) {
        return {
            "success": false,
            "message": "Error Happened",
        }
    }
}


