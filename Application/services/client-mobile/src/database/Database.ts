import axios from 'axios'

export default class Database {

    getRestApiEndpoint() : string | undefined {
        // @ts-ignore
        if(process.env.NODE_ENV == 'debug')
            return "http://localhost";
        return "https://psopv.herokuapp.com";
    }

    async loginUser(email: string | undefined, password: string | undefined) {
        const url = this.getRestApiEndpoint() + '/api/user/authenticate';

        return await axios.post(url, {
            email: email,
            password: password
        })
    }

    async fetchPlannings() {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/all';

        return await axios.get(url)
    }

    async fetchMessages() {
        const url = this.getRestApiEndpoint() + '/api/message/fetch/all';

        return await axios.get(url)
    }

    async fetchUsers() {
        const url = this.getRestApiEndpoint() + '/api/user/fetch/all';

        return await axios.get(url)
    }

    async fetchPosts() {
        const url = this.getRestApiEndpoint() + '/api/post/fetch/all';

        return await axios.get(url)
    }

    
}

