import axios from 'axios'

class noteService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async addNotes(title,content,id_user) {
        try {
            const result = await axios.post(`${this.url}note/add`,
                {
                    title_note: title, content_note: content, id_user: id_user
                });
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateNote(title,content,id_user,id) {
        try {
            const result = await axios.put(`${this.url}note/update/${id}`,
                {
                    title_note: title, content_note: content, id_user: id_user
                });
          return result
        } catch (error) {
            console.log(error)
        }
    }
    async deleteNote(id) {
        try {
            const result = await axios.delete(`${this.url}note/delete/` + id);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async getNote(id) {
        try {
            const result = await axios.get(`${this.url}note/get?page=${this.query}&&id=${id}`);
            return result.data.note
        } catch (error) {
            console.log(error)
        }
    }
}

export default new noteService();
