import axios from 'axios'

class adminService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async getRole() {
        try {
            const result = await axios.get(`${this.url}role/get`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getUR() {
        try {
            const result = await axios.get(`${this.url}roleuser/get`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getUserByRole(id) {
        try {
            const result = await axios.post(`${this.url}user/getByRole/` + id);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }

    async getRole() {
        try {
            const result = await axios.get(`${this.url}role/get`)
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getUserRole(page) {
        try {
            const result = await axios.get(`${this.url}roleuser/get?page=${page}`)
            return result.data.UR;
        } catch (error) {
            console.log(error)
        }
    }
    async deleteRole(id) {
        try {
            const result = await axios.delete(`${this.url}role/delete/${id}`)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateRole(id, rolename) {
        try {
            const result = await axios.put(`${this.url}role/update/${id}`,
                {
                    name_role: rolename
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async addRole(rolename) {
        try {
            const result = await axios.post(`${this.url}role/add`,
                {
                    name_role: rolename
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateUR(roleid, userid, urid) {
        try {
            const result = await axios.put(`${this.url}roleuser/change`,
                {
                    id_role: roleid,
                    id_user: userid,
                    id_ur: urid
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async deleteUR(id) {
        try {
            const result = await axios.delete(`${this.url}roleuser/delete/${id}`)
            return result
        } catch (error) {
            console.log(error)
        }
    }
}
export default new adminService();