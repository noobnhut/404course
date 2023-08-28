<template>
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto">
    <div class="absolute w-full h-full bg-gray-900 opacity-30"></div>
    <div class="bg-white w-11/12 md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto max-h-full">
      <!-- thêm khóa học-->
      <div class="course" v-if="isShowCourse">
        <div class="flex flex-row py-2 px-4 bg-violet-300">
          <h5 class="text-lg font-semibold flex-grow text-white">
            Thêm khóa học
          </h5>
          <button @click="onclose()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>

        <div class="modal-footer">
          <div class="py-4 px-4">
            <label for="text" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Tiêu đề</label>
            <input type="text" id="title" v-model="course_title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tiêu đề" required />
            <p class="text-red-500 m-2" v-if="!course_title && course_titleFocused">
              - Vui lòng nhập tiêu đề
            </p>

            <label for="text" class="block mb-2 text-base font-medium text-gray-900 dark:text-white mt-1">Mô tả</label>
            <QuillEditor theme="snow" ref="courseEditor" />

            <label for="text" class="block mb-2 text-base font-medium text-gray-900 dark:text-white mt-1">Đường dẫn ảnh
              mạng:</label>
            <input placeholder="Nhập nội dung đường ảnh" type="text" id="head" name="head" v-model="img_course"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <p class="text-red-500 m-2" v-if="!img_course && img_courseFocused">
              Vui lòng nhập đường dẫn ảnh
            </p>
          </div>
        </div>

        <div class="modal-footer py-3 px-4">
          <button class="py-2 px-4 bg-violet-300 text-white rounded-lg cursor-pointer mr-4" @click="onclose()">
            Đóng
          </button>
          <button class="py-2 px-4 bg-violet-300 text-white rounded-lg cursor-pointer" @click="addCourse()">
            Bước tiếp theo
          </button>
        </div>
      </div>

      <!-- index view-->
      <div class="index_view" v-if="isShowIndex">
        <div class="flex flex-row py-2 px-4 bg-violet-300">
          <h5 class="text-lg font-semibold flex-grow text-white">
            Thêm chỉ mục
          </h5>
          <div class="flex space-x-6">
            <span class="cursor-pointer px-4 py-2 bg-violet-500 rounded" @click="oncloseAddIndex()">+ Thêm chỉ mục</span>
          </div>
          <button @click="onclose()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>

        <div class="modal-footer">
          <div class="py-4 px-4">
            <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer">
              <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                <thead>
                  <tr class="text-left">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                      STT
                    </th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                      Tiêu đề
                    </th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">
                      Giới thiệu
                    </th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs"></th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(index_course, index) in index_courses"
                    :key="index">
                    <td class="border-t">
                      <span class="text-gray-700 px-6 py-4 flex items-center">{{
                        index + 1
                      }}</span>
                    </td>
                    <td class="border-t">
                      <span class="text-gray-700 px-6 py-4 flex items-center">
                        {{ index_course.title_index }}
                      </span>
                    </td>
                    <td class="border-t">
                      <span class="text-gray-700 px-6 py-4 flex items-center">
                        <span v-html="index_course.description_index"></span>
                      </span>
                    </td>
                    <td class="border-t">
                      <span class="text-rose-700 px-6 py-4 flex items-center">
                        <button type="button"
                          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                          @click="deleteIndex(index_course.id)">
                          X
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p class="sr-only mt-2">aaa</p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer py-3 px-4">
          <button class="py-2 px-4 bg-violet-300 text-white rounded-lg cursor-pointer" @click="addAllIndex()">
            Bước tiếp theo
          </button>
        </div>
      </div>

      <!--index content view-->
      <div class="index_view" v-if="isShowContent">
        <div class="flex flex-row py-2 px-4 bg-violet-300">
          <h5 class="text-lg font-semibold flex-grow text-white">
            Thêm chỉ mục
          </h5>
          <div class="flex space-x-6">
            <span class="cursor-pointer px-4 py-2 bg-violet-500 rounded" @click="oncloseAddContent()">+ Thêm nội
              dung</span>
          </div>
          <button @click="onclose()" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
        <div class="modal-footer">
          <div class="py-4 px-4">
            <div class="mt-8 bg-white p-4 shadow rounded-lg" v-for="index in index_courses">
              <h2 class="text-gray-500 text-lg font-semibold pb-4">
                {{ index.title_index }}
              </h2>
              <div class="my-1"></div>
              <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <table class="w-full table-auto text-sm">
                <thead>
                  <tr class="text-sm leading-normal">
                    <th
                      class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Tiêu đề
                    </th>
                    <th
                      class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Kiểu tài liệu
                    </th>
                    <th
                      class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                      Nội dung
                    </th>
                    <th
                      class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-rose-300 border-b border-grey-light">
                      X
                    </th>
                  </tr>
                </thead>
                <tbody v-for="content in index_contents.filter(
                  (item) => item.id_index == index.id
                )">
                  <tr class="hover:bg-grey-lighter">
                    <td class="py-2 px-4 border-b border-grey-light">
                      {{ content.title_content }}
                    </td>
                    <td class="py-2 px-4 border-b border-grey-light">
                      {{ content.type }}
                    </td>
                    <td class="py-2 px-4 border-b border-grey-light" v-if="content.type == 'video'">
                      {{ content.link_video }}
                    </td>
                    <td class="py-2 px-4 border-b border-grey-light" v-if="content.type == 'document'">
                      <span v-html="content.description_content"></span>
                    </td>
                    <td class="py-2 px-4 border-b border-grey-light">
                      <button type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                        @click="deleteContent(content.id)">
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-footer py-3 px-4">
          <button class="py-2 px-4 bg-violet-300 text-white rounded-lg cursor-pointer" @click="addAllContent()">
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--Thêm index-->
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50" v-show="isShowAddIndex">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseAddIndex()"></div>

    <div class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Thêm chỉ mục</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseAddIndex()"></i>
      </div>

      <div class="px-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900">Tiêu đề</label>
          <input type="text"
            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
            v-model="index_title" required />
          <p class="text-red-500 m-2" v-if="!index_title && index_titleFocused">
            - Vui lòng nhập tiêu đề
          </p>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
          <QuillEditor theme="snow" ref="indexEditor" />

        </div>
      </div>

      <div class="py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="addIndex()">
          Thêm chỉ mục
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="oncloseAddIndex()">
          Đóng
        </button>
      </div>
    </div>
  </div>

  <!--Thêm index content-->
  <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50" v-show="isShowAddContent">
    <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseAddContent()"></div>

    <div class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Thêm nội dung</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseAddContent()"></i>
      </div>

      <div class="px-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900">Chọn nội dung</label>
          <select id="select" name="select" v-model="id_index"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option v-for="index in index_courses" :key="index.id" :value="index.id">
              {{ index.title_index }}
            </option>
          </select>
          <p class="text-red-500 m-2" v-if="!id_index && id_indexFocused">
            - Vui lòng chọn nội dung
          </p>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900">Tiêu đề</label>
          <input type="text"
            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
            v-model="content_title" required />
          <p class="text-red-500 m-2" v-if="!content_title && content_titleFocused">
            - Vui lòng nhập tiêu đề
          </p>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900">Loại tài liệu:</label>
          <select id="select" name="select" v-model="content_type" @change="handleContent()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option value="video">Video</option>
            <option value="document">Document</option>
          </select>
          <p class="text-red-500 m-2" v-if="!content_type && content_typeFocused">
            - Vui lòng chọn loại tài liệu
          </p>
        </div>

        <div v-if="show_Video">
          <label class="block mb-2 text-sm font-medium text-gray-900">Đường dẫn Youtube</label>
          <input type="text"
            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
            v-model="content_link" required />
          <p class="text-red-500 m-2" v-if="!content_link && content_linkFocused">
            - Vui lòng nhập đường dẫn Youtube
          </p>
        </div>

        <div v-if="show_Content">
          <label class="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
          <QuillEditor theme="snow" ref="contentEditor" />

        </div>
      </div>

      <div class="py-3 px-4">
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
          @click="addContent()">
          Thêm nội dung
        </button>
        <button
          class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
          @click="oncloseAddContent()">
          Đóng
        </button>
      </div>
    </div>
  </div>

  <toast ref="toast"></toast>
</template>

<script>
import userService from "../../plugins/userServices";
import courseService from "../../plugins/courseService";
import toast from "../../components/toast/toast.vue";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  emits: ["cancel"],
  data() {
    return {
      user: "",
      isShowCourse: true, isShowIndex: false, isShowContent: false,
      course: [], index_courses: [], index_contents: [], id_course: "", id_index: "",
      course_title: "", course_description: "", img_course: "",
      index_title: "", index_description: "", content_title: "", content_description: "", content_link: "", content_type: "",
      show_Video: false, show_Content: false, isShowAddIndex: false, isShowAddContent: false,
      course_titleFocused: false, course_descriptionFocused: false,
      img_courseFocused: false, index_titleFocused: false, index_descriptionFocused: false, id_indexFocused: false,
      content_titleFocused: false, content_typeFocused: false, content_linkFocused: false, content_descriptionFocused: false,
    };
  },
  mounted() {
    this.user = userService.getUserToken();
    console.log(this.user);
  },
  components: { QuillEditor, toast },
  methods: {
    onclose() {
      this.$emit("cancel");
    },
    async addCourse() {
      this.course_titleFocused = true;
      this.course_descriptionFocused = true;
      this.img_courseFocused = true;
      if (this.course_title && this.$refs.courseEditor.getText().length > 1 && this.img_course) {
        try {
          const result = await this.$axios.post(`course/add`, {
            id_user: this.user.id,
            title_course: this.course_title,
            description_course: this.$refs.courseEditor.getHTML(),
            img_course: this.img_course,
          });
          if (result.status == 200) {
            this.id_course = result.data.course.id;
            this.$refs.toast.showToast(result.data.message);
            this.isShowCourse = false;
            this.isShowIndex = true;
            this.title_course = "";
            this.description_course = " ";
          } else {
            this.$refs.toast.showToast(result.data.message);
          }
          this.course_titleFocused = false;
          this.course_descriptionFocused = false;
          this.img_courseFocused = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    addAllIndex() {
      if (this.index_courses.length > 0) {
        this.isShowIndex = false;
        this.isShowContent = true;
      } else {
        this.$refs.toast.showToast(
          "Vui lòng nhập ít nhất 1 chỉ mục để qua bước tiếp theo."
        );
      }
    },

    addAllContent() {
      if (this.index_contents.length > 0) {
        this.onclose();
        window.location.reload()
      } else {
        this.$refs.toast.showToast(
          "Vui lòng nhập ít nhất 1 nội dung để hoàn thành."
        );
      }
    },

    async addIndex() {
      this.index_titleFocused = true;

      if (this.index_titleFocused) {
        try {
          const result = await this.$axios.post(
            `course/index/add/` + this.id_course,
            {
              title_index: this.index_title,
              description_index: this.$refs.indexEditor.getHTML(),
            }
          );
          if (result.status == 200) {
            this.$refs.toast.showToast(result.data.message);
            this.isShowAddIndex = false;
            courseService.getCourse_Index(this.id_course).then((data) => {
              this.index_courses = data;
            });
            this.index_title = "";
            this.$refs.indexEditor.setHTML('')
          } else {
            this.$refs.toast.showToast(result.data.message);
          }
          this.index_titleFocused = false;

        } catch (error) {
          console.log(error);
        }
      }
    },

    async deleteIndex(id) {
      try {
        const result = await this.$axios.delete(`course/index/delete/` + id);
        if (result.status == 200) {
          this.$refs.toast.showToast(result.data.message);
          courseService.getCourse_Index(this.id_course).then((data) => {
            this.index_courses = data;
          });
        } else {
          this.$refs.toast.showToast(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleContent() {
      if (this.content_type === "video") {
        this.show_Video = true;
        this.show_Content = false;
      } else {
        this.show_Content = true;
        this.show_Video = false;
      }
    },

    async addContent() {
      this.id_indexFocused = true;
      this.content_titleFocused = true;
      this.content_typeFocused = true;
      this.content_linkFocused = true;

      if (this.content_type && this.content_title) {
        try {

          let result;
          if (this.content_type == 'document') {
            result = await this.$axios.post(
              `course/index/content/add/${this.id_index}`,
              {
                title_content: this.content_title,
                description_content: this.$refs.contentEditor.getHTML(),
                link_video: null,
                type: this.content_type,
              }
            );
          } else {

            result = await this.$axios.post(
              `course/index/content/add/${this.id_index}`,
              {
                title_content: this.content_title,
                description_content: null,
                link_video: this.content_link,
                type: this.content_type,
              }
            );
          }

          if (result.status === 200) { // Use strict equality operator
            const data = await courseService.getContent();
            this.index_contents = data;
            this.$refs.toast.showToast(result.data.message);
            this.isShowAddContent = false;
            this.content_title = "";
            this.$refs.contentEditor.setHTML('')
            this.content_link = "";
            this.content_type = "";
          } else {
            this.$refs.toast.showToast(result.data.message);
          }
          this.id_indexFocused = false;
          this.content_titleFocused = false;
          this.content_typeFocused = false;
          this.content_linkFocused = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    async deleteContent(id) {
      try {
        const result = await this.$axios.delete(
          `course/index/content/delete/` + id
        );
        if (result.status == 200) {
          this.$refs.toast.showToast(result.data.message);
          courseService.getContent().then((data) => {
            this.index_contents = data;
          });
        } else {
          this.$refs.toast.showToast(result.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },

    oncloseAddIndex() {
      this.isShowAddIndex = !this.isShowAddIndex;
    },
    oncloseAddContent() {
      this.isShowAddContent = !this.isShowAddContent;
    },
  },
};
</script>
