<template>
  <div>
    <div class="bg-white dark:bg-gray-800 rounded shadow-lg py-5 px-7">
      <nav class="flex justify-between">
        <div class="flex items-center space-x-3 lg:pr-16 pr-6 cursor-pointer">
          <img class="cursor-pointer dark:bg-white p-1 rounded-full"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg" alt="circle" />
            <router-link to="/home">
          <h2 class="font-normal text-2xl leading-6 text-gray-800 dark:text-white">404Learn</h2></router-link>
        </div>

        <!-- For medium and plus sized devices -->
        <ul class="hidden md:flex flex-auto space-x-2">
          <li v-for="route in routes" :key="route.name"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 cursor-pointer px-3 py-2.5 font-normal text-base leading-3 ">
            <router-link :to="route.path">{{ route.name }}</router-link>
          </li>
          <li v-if="showCreator"
            class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 cursor-pointer px-3 py-2.5 font-normal text-base leading-3 ">
            <router-link to="/creator">Quản lý khóa học</router-link>
          </li>
        </ul>
        <!--center navbar search-->
        <div class="relative w-1/3 hidden md:block " >
          <input type="text" name="search_query" placeholder="Tìm kiếm" minlength="1"
            class="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none cursor-pointer" readonly @click="openSearch"
            >
        </div>

        <div class="flex space-x-5 justify-center items-center pl-2">
          <img
            class="cursor-pointer dark:bg-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg3.svg" alt="bell" />
          <div class="profile-pic ml-2">
            <div class="flex ">
              <button type="button" @click="showaddblog = true"
                class="text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Thêm
                blog</button>

              <img :src="user.avatar" alt="pic 1" class="rounded-full w-10 h-10 object-cover cursor-pointer ml-2"
                @click="opendropdown" />
            </div>
          </div>
        </div>

      </nav>
      <!-- nav mobile -->

      <div class="block md:hidden w-full mt-5" @click="handleNavbar()">
        <div
          class="cursor-pointer px-4 py-3 text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded flex justify-between items-center w-full">
          <div class="flex space-x-2">
            <p id="textClicked" class="font-normal text-sm leading-3 focus:outline-none duration-100 cursor-pointer">Bảng
              chọn</p>
          </div>
          <img id="ArrowSVG" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg4.svg" alt="down arrow"
            class="rotate-180 transform" />
        </div>
        <div class="relative">
          <ul id="list" class=" font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md z-20"
            v-if="hidden">
            <li v-for="route in routes" :key="route.name"
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black">
              <router-link :to="route.path">{{ route.name }}</router-link>
            </li>
            <li
              class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black"
              v-if="showCreator">
              <router-link to="/creator">Quản lý khóa học</router-link>
            </li>
            <li class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black" >
          <input type="text" name="search_query" placeholder="Tìm kiếm" minlength="1"
            class="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none cursor-pointer" readonly @click="openSearch"
            >
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>


  <!--dropdown-->
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto " v-if="showdropdown">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Bảng chọn</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="opendropdown"></i>
      </div>
      <div class="py-4 px-4">

        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
          <li class="py-2 px-1 flex items-center  hover:bg-gray-100">
            <i class=" text-violet-500 uil-chat-bubble-user md:text-xl"></i>
            <a @click="goIn4" class="block  px-4 py-2  ">Thông tin khách
              hàng</a>
          </li>
          <li class="py-2 px-1  flex items-center hover:bg-gray-100">
            <i class=" text-violet-500  uil-keyhole-square md:text-xl"></i>
            <a class="block px-4 py-2  " @click="onShowChange">Thay đổi mật
              khẩu</a>
          </li>
          <li class="py-2 px-1  flex items-center hover:bg-gray-100" @click="outWeb">
            <i class=" text-violet-500 uil-exit md:text-xl"></i>
            <a class="block px-4 py-2  ">Đăng xuất</a>
          </li>
        </ul>

      </div>


    </div>
  </div>

  <!--add blog-->
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto " v-if="showaddblog">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Thêm blog</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="showaddblog = false"></i>
      </div>
      <div class="py-4 px-4">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 ">Chọn thể loại</label>
          <select id="select" name="select" v-model="id_tag"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 mb-2 leading-tight focus:outline-none">
            <option v-for="tag in tags.filter(items => items.status == 1)" :key="tag.id" :value="tag.id"> {{ tag.nametag
            }}
            </option>
          </select>
          <p class="text-red-500 text-sm ml-2" v-if="!id_tag && tagFocused">Danh mục bị trống.</p>
        </div>
        <input class="title border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="title"
          placeholder="Tiêu đề blog" type="text">
        <p class="text-red-500 text-sm ml-2" v-if="!title && titleFocused">Tiêu đề bị trống.</p>
        <input class="title border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="img_blog"
          placeholder="Đường dẫn ảnh" type="text">
        <p class="text-red-500 text-sm ml-2" v-if="!img_blog && imgFocused">Đường dẫn ảnh bị trống.</p>

        <QuillEditor theme="snow" ref="myEditor" v-model="content" />
        <p class="text-red-500 text-sm ml-2" v-if="!content && contentFocused">Nội dung bị trống.</p>

        <!-- buttons -->
        <div class="buttons flex mt-2">
          <div
            class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
            @click="addBlog()">
            Thêm</div>
          <div
            class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
            @click="showaddblog = false">
            Hủy</div>
        </div>


      </div>


    </div>
  </div>

  <!--tim kiem-->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
    v-if="showResults">

    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->

      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Tìm kiếm
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            @click="openSearch">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>

          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <input type="text" name="search_query" placeholder="Nhập từ khóa tìm kiếm" autocomplete="off" minlength="1"
            class="w-full px-4 py-2 text-gray-800 focus:outline-none border" v-model="search"
            v-on:keyup.enter="handleSearch">
          <p v-show="showResults " class="p-2 text-sm text-zinc-400">Kết quả tìm kiếm từ khóa '{{ search }}' ?</p>

          <div class="flex flex-col w-full" v-if="showResults && searchCourses.length > 0">
            <h5 class="m-2 border-b border-gray-300 pb-2 font-bold text-base">Khóa học</h5>
            <div class="cursor-pointer w-full border-gray-100 rounded-t border-b " v-for="course in searchCourses">
              <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
                @click="gotoCourse(course.id)">
                <div class="flex flex-col items-center">
                  <img :src="course.img_course" alt="pic 1"
                    class=" rounded-full w-10 h-10 object-cover cursor-pointer ml-2" />
                </div>
                <div class="w-full items-center flex">
                  <div class="mx-2 -mt-1  text-sm"> {{ course.title_course }}
                  </div>
                </div>

              </div>
            </div>

           
          </div>
          <div class="flex flex-col w-full" v-if="showResults && searchBlogs.length > 0">
              <h5 class="m-2 border-b border-gray-300 pb-2 font-bold text-base">Bài đăng</h5>
              <div class="cursor-pointer w-full border-gray-100 rounded-t border-b " v-for="blog in searchBlogs">
                <div class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
                  @click="gotoblog(blog.id)">
                  <div class="flex flex-col items-center">
                    <img :src="blog.img_blog" alt="pic 1"
                      class=" rounded-full w-10 h-10 object-cover cursor-pointer ml-2" />
                  </div>
                  <div class="w-full items-center flex">
                    <div class="mx-2 -mt-1  text-sm"> {{ blog.title_blog }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>

  <changePass v-if="showChange" @cancel="onShowChange" />
  <toast ref="toast"></toast>
</template>
 
<script>
import userService from '../../plugins/userServices'
import changePass from '../../components/changePass.vue'
import blogService from '../../plugins/blogService'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import toast from '../toast/toast.vue'
export default {
  data() {
    return {
      showdropdown: false, showCreator: false, showChange: false, hidden: false, showaddblog: false, search: '', searchCourses: [], searchBlogs: [],
      user: '', content: '', titleFocused: false, tagFocused: false, imgFocused: false, contentFocused: false, tags: [], showResults: false,
      routes: [
        { path: "/home", name: "Trang chủ" },
        { path: "/home/note", name: "Ghi chú" },
      ]
    }
  },
  components: { toast, changePass, QuillEditor },
  mounted() {
    this.user = userService.getUserToken()
    if (this.user.role == 'Creator') {
      this.showCreator = true
    }
    this.gettag()
  },
  methods:
  {
    opendropdown() {
      this.showdropdown = !this.showdropdown
    },
    handleNavbar() {
      this.hidden = !this.hidden
    },
    onShowChange() {
      this.showChange = !this.showChange
    },
    outWeb() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$refs.toast.showToast('Đăng xuất thành công')
      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 1000)
    },
    async gettag() {
      try {
        const result = await this.$axios.get(
          `tag/get`
        );
        this.tags = result.data;
      } catch (e) {
        console.log(e);
      }
    },
    async addBlog() {
      this.titleFocused = true, this.tagFocused = true, this.imgFocused = true, this.contentFocused = true
      if (this.title && this.id_tag && this.img_blog && this.$refs.myEditor.getText().length > 1) {
        const result = await blogService.addBlog(this.title, this.$refs.myEditor.getHTML(), this.user.id, this.id_tag, this.img_blog)
        if (result.status == 200) {
          this.$refs.toast.showToast(result.data.message)
          window.location.reload()
          this.clearText()
          this.showaddblog = false
        }
        else {
          this.$refs.toast.showToast(result.data.message)
        }
        this.titleFocused = false, this.tagFocused = false, this.imgFocused = false, this.contentFocused = false
      }

    },
    clearText() {
      this.title = ''
      this.content = ''
      this.img_blog = ''
    },
    goIn4() {
      window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/information/${this.user.id}`;
    },
    async handleSearch() {
      this.showResults = true
      this.searchBlogs = []
      this.searchCourses = []
      try {
        const result = await this.$axios.get(`course/search?q=${this.search}`)
        this.searchCourses = result.data

        const getblog = await this.$axios.get(`blog/search?q=${this.search}`)
        this.searchBlogs = getblog.data

       
      } catch (error) {
        console.log(error)
      }
    },
    hideResults() {
      this.showResults = false
    },
    gotoCourse(id) {
      window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/course_detail/${id}`;
    },
    gotoblog(id) {
      window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/blogs/detail/${id}`;

    },
    openSearch()
    {
      this.showResults = !this.showResults
       this.search = ''
    }

  }

}
</script>
