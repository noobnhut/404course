<template>
    <body class="">
        <main class="container">
            <section>
                <!--khóa học-->
                <div class="mt-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8 ">
                    <!-- chi tiet -->
                    <div v-for="course in courses">
                        <div class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-3xl  transition duration-300 ease-in-out "
                            v-bind:style="{ 'background-image': 'url(' + course.course.img_course + ')' }">
                            <div
                                class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                            </div>
                            <div class="relative w-full h-full flex flex-col justify-center items-center">
                                <h3 class="text-center">
                                    <a class="text-white text-2xl font-bold text-center">
                                        {{ course.course.title_course }}
                                    </a>
                                </h3>
                              
                                    <button type="button" @click="gotoCourse(course.course.id)"
                                        class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Xem
                                        khóa học</button>

                                    <div class="">
                                        <span
                                            v-if="saves.some(item => item.id_course === course.course.id && item.id_user === user.id)">
                                            <!-- Sử dụng v-for để lặp lại các sản phẩm trong danh sách thích -->
                                            <span
                                                v-for="save in saves.filter(item => item.id_course === course.course.id && item.id_user === user.id)">
                                                <button type="button" @click="savecourse(course.course.id)"
                                                   
                                                    class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">
                                                {{ save.id ? 'Đã lưu' : 'Lưu' }}
                                                </button>
                                            </span>
                                        </span>
                                        <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                                        <span v-else>
                                            <button type="button" @click="savecourse(course.course.id)"
                                                class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Lưu</button>
                                        </span>
                                    </div>
                               
                            </div>
                        </div>
                    </div>

                </div>

                <!--chi muc-->
                <div class="grid sm:grid-cols-3 gap-4 grid-cols-2 mb-10 mt-10" v-if="indexs>1">
            <nav aria-label="Page navigation ">
                <ul class="inline-flex -space-x-px">
                    <li>
                        <a
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 ">&lt&lt</a>
                    </li>
                    
                   <div v-for="n in indexs">
                    <li>
                        <a 
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 " @click="changePage(n)">{{ n }}</a>
                    </li>
                </div>

                    <li>
                        <a
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-{}00 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 ">&gt&gt</a>
                    </li>
                </ul>
            </nav>
        </div>
            </section>
        </main>

    </body>
    <toast ref="toast"/>
</template>

<script>
import userService from '../plugins/userServices';
import courseService from '../plugins/courseService';
import toast from './toast/toast.vue';
export default {
    data() {
        return {
            user: '',
            courses: [], saves: [],
            page: 1,
            status: 1,
            id_course: '',
            indexs:''
        }
    },

    components: {toast},
    mounted() {
        this.user = userService.getUserToken()
        this.getcourse()
        this.getSave()
    },
    methods: {
        gotoCourse(id) {
            window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/course_detail/${id}`;
        },
        getcourse(){
            courseService.getCourseSave(this.page, this.status,this.user.id).then((data) => {        
                    this.courses = data.courses 
                    this.indexs = data.totalPages
        });
        },
        async getSave() {
            try {
                const result = await this.$axios.get(`course/save/get`)
                this.saves = result.data
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        },
        async savecourse(id)
        {
            try {
                const result = await this.$axios.post(`course/save/handle`,
                {
                    'id_user':this.user.id,
                    'id_course':id
                });
                
                if(result.status == 200)
                {
                    this.$refs.toast.showToast(result.data.message)
                    this.getSave()
                    this.getcourse()
                }
                else
                {
                    this.$refs.toast.showToast(result.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        changePage(n)
        {
            
            this.query = n
            this.getcourse()
        }
    }
}

</script>