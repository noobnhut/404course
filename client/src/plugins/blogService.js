import axios from 'axios'

class blogService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async getblog(query, status) {
        try {
            const result = await axios.get(`${this.url}blog/get?page=${query}&&status=${status}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async check_blog(id) {
        try {
            const result = await axios.put(`${this.url}blog/check/` + id);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async addBlog(title, content, id, id_tag, img_blog) {

        try {
            const result = await axios.post(`${this.url}blog/add`,
                {
                    title_blog: title, content_blog: content, id_user: id, id_tag: id_tag, img_blog: img_blog
                });
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async deleteBlog(id) {
        try {
            const result = await axios.delete(`${this.url}blog/delete/` + id);
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateBlog(title, content, id_user, id_tag, img_blog, id) {
        try {
            const result = await axios.put(`${this.url}blog/update/${id}`,
                {
                    title_blog: title,
                    content_blog: content,
                    id_user: id_user,
                    img_blog: img_blog,
                    id_tag: id_tag
                });
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async getBlogById(id) {
        try {
            const result = await axios.get(`${this.url}blog/get/${id}`)
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    // get like - save - comment
    async getLike(id) {
        try {
            const result = await axios.get(`${this.url}blog/like/getbyid/${id}`);
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    async getComment(id) {
        try {
            const result = await axios.get(`${this.url}blog/comment/getbyid/${id}`);
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    async getSave(id) {
        try {
            const result = await axios.get(`${this.url}blog/save/getbyid/${id}`);
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    async getReply(id) {
        try {
            const result = await axios.get(`${this.url}blog/replycomment/get/${id}`)
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
    // handle thêm like - save - comment 
    async likeBlog(id_blog, id_user) {
        try {
            const result = await axios.post(`${this.url}blog/like/handle`,
                {
                    id_blog: id_blog,
                    id_user: id_user
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async saveBlog(id_blog, id_user) {
        try {
            const result = await axios.post(`${this.url}blog/save/handle`,
                {
                    id_blog: id_blog,
                    id_user: id_user
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async commentBlog(comment, id_blog, id_user) {
        try {
            const result = await axios.post(`${this.url}blog/comment/add`,
                {
                    id_blog: id_blog,
                    id_user: id_user,
                    comment: comment
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    // update delete Comment
    async updateComment(comment, id) {
        try {
            const result = await axios.put(`${this.url}blog/comment/update/${id}`,
                {
                    comment: comment
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async deleteComment(id) {
        try {
            const result = await axios.delete(`${this.url}blog/comment/delete/${id}`)
            return result
        } catch (error) {
            console.log(error)
        }
    }


    //reply cmt
    async replyCMTBlog(comment, id_blog, id_user, id_reply) {
        try {
            const result = await axios.post(`${this.url}blog/replycomment/add/${id_reply}`,
                {
                    id_blog: id_blog,
                    id_user: id_user,
                    comment: comment,
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async deleteReply(id) {
        try {
            const result = await axios.delete(`${this.url}blog/replycomment/delete/${id}`)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async updateReply(comment, id) {
        try {
            const result = await axios.put(`${this.url}blog/replycomment/update/${id}`,
                {
                    comment: comment
                })
            return result
        } catch (error) {
            console.log(error)
        }
    }

}
export default new blogService();