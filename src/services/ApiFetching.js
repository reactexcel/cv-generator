import { instance } from "./instance";

async function ApiFetching(method, api, data) {
    try {
        let response;
        switch (method) {
            case 'GET':
                response = await instance.get(api);
                break;
            case 'POST':
                response = await instance.post(api, data);
                break;
            case 'PUT':
                console.log(data,'data');
                response = await instance.put(api, data);
                break;
            case 'DELETE':
                response = await instance.delete(api);
                break;
            default:
                throw new Error('Unsupported HTTP method');
        }
        return response;
    } catch (error) {
        return error;
    }
}

export default ApiFetching;
