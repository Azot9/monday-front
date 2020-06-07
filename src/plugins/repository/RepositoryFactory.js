import UserRepository from "./UserRepository";
import Repository from "./Repository";


function crud(resource) {
    return {
        get() {
            return Repository.get(`${resource}`);
        },
        create(payload) {
            return Repository.post(`${resource}/create`, payload);
        },
        update(payload) {
            return Repository.put(`${resource}/update`, payload);
        },
        delete(payload) {
            return Repository.delete(`${resource}/delete`, payload);
        }
    }
}

const repositories = {
    user: UserRepository,
    detail: crud('/details'),
    stand: crud('/stands'),
    laboratory: crud('/laboratories')
};

const RepositoryFactory = {
    get: name => repositories[name]
}
export default RepositoryFactory;