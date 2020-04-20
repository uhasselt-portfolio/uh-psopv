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

    async fetchMessagesFrom(id: number) {
        const url = this.getRestApiEndpoint() + '/api/message/fetch/send-to/' + id;

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

    async fetchPlanningsWithPostId(id: number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/post/' + id;

        return await axios.get(url)
    }

    async fetchUsersFromShift(post_id: number, shift_id: number) {
        const url = this.getRestApiEndpoint() + '/api/planning/fetch/users/' + post_id + "/" + shift_id;

        return await axios.get(url)
    }

    async addMessage(title: string | undefined, message: string | undefined, created_by_id: number, send_to_id: number, priority: number) {
        const url = this.getRestApiEndpoint() + '/api/message/add'

        return await axios.post(url, {
            title: title,
            message: message,
            created_by_id: created_by_id,
            send_to_id: send_to_id,
            priority: priority,
        })

    }

    

    
}

