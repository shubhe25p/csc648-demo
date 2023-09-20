import axios from "axios";
class UserService{
    sendData(item){
        const data = {
            item: item
        }
        return axios.post('http://172.178.55.203:5000/add', data).then(response => {
            return response;
        })
    }
    fetchData(){
        return axios.get('http://172.178.55.203:5000/getall').then(response => {
            return response;
        })
    }
}

export default new UserService();