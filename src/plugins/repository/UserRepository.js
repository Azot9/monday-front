import Repository from "./Repository";
const resource = '/user';

export default {
    get() {
        return Repository.get(`${resource}`);
    },
    createUser(payload) {
        return Repository.post(`${resource}/create`, payload);
    },
    logInUser(payload) {
        return Repository.post(`${resource}/login`, payload);
    }
}