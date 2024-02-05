import axios from "axios";
import { server } from "../../server";
import { LoadUserFail, LoadUserRequest, LoadUserSuccess } from "../reducers/user";



export const loadUser = () => async (dispatch) => {
    try {
        dispatch(LoadUserRequest());
        const { data } = await axios.get(`${server}/getuser`, {
            withCredentials: true,
        });
        dispatch(LoadUserSuccess(data.user));
    } catch (error) {
        dispatch(LoadUserFail(error.response.data.message));
    }
}

