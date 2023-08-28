import axios from 'axios'

class courseService {
    url = `${import.meta.env.VITE_API_BASE_URL}`;
    async getCourse(query,status) {
        try {
            const result = await axios.get(`${this.url}course/get?page=${query}&&status=${status}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getCourseSave(query,status,id) {
        try {
            const result = await axios.get(`${this.url}course/getbysave?page=${query}&&status=${status}&&id=${id}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getCourseByID(id) {
        try {
            const result = await axios.get(`${this.url}course/get/${id}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async check_course(id)
    {
        try {
            const result = await axios.put(`${this.url}course/check/`+id);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async getCourse_Index(id)
    {
        try {
            const result = await axios.get(`${this.url}course/index/get/`+id);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getContent()
    {
        try {
            const result = await axios.get(`${this.url}course/index/content/get`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async getContentbyIndex(id)
    {
        try {
            const result = await axios.get(`${this.url}course/index/content/get/${id}`);
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
    async updateCourse(id,title_course,description_course,img)
    {
        try {
            const result = await axios.put(`${this.url}course/update/${id}`,
            {
                title_course:title_course,
                description_course:description_course,
                img_course:img
            })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateIndex(id,title_index,description_index)
    {
        try {
            const result = await axios.put(`${this.url}course/index/update/${id}`,
            {
                title_index:title_index,
                description_index:description_index
            })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    async updateContent(id,title,document,link_video)
    {
        try {
            const result = await axios.put(`${this.url}course/index/content/update/${id}`,
            {
                title_content:title,
                description_content:document,
                link_video:link_video

            })
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async addIndex(id_course,index_title,index_description) {
          try {
            const result = await axios.post(
              `${this.url}course/index/add/` + id_course,
              {
                title_index: index_title,
                description_index: index_description,
              }
            )
            return result
          } catch (error) {
            console.log(error);
          } 
      }

      async addContent(id_index,content_title,content_description,content_link,content_type) {
       
          try {
            const result = await axios.post(
              `${this.url}course/index/content/add/${id_index}`,
              {
                title_content: content_title,
                description_content: content_description,
                link_video: content_link,
                type: content_type,
              }
            );
              return result
          } catch (error) {
            console.log(error);
          }
        
      } 
   
}
export default new courseService();