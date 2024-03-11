import axios from "axios";
class UserService{
    sendData(item){
        const data = {
            item: item
        }
        return axios.post('https://probable-space-journey-rr7w9469v7qfww9q-5000.app.github.dev/add', data).then(response => {
            return response;
        })
    }
    fetchData(){
        return axios.get('https://probable-space-journey-rr7w9469v7qfww9q-5000.app.github.dev/getall').then(response => {
            return response;
        })
    }
}

export default new UserService();