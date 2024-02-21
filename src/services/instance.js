import axios from "axios";

export const instance=axios.create({baseURL:'http://116.202.210.102:3030/api/v1/user/auth/',withCredentials:true})