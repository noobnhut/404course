<template>
    <div class="w-full px-6 mx-auto mb-10">

        <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl"
            style="background-image: url('https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-Macbook-3D-moi-nhat.jpg'); background-position-y: 50%">
            <span
                class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
        </div>
        <div
            class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
            <div class="flex flex-wrap -mx-3">
                <div class="flex-none w-auto max-w-full px-3">

                </div>
                <div class="flex-none w-auto max-w-full px-3 my-auto">
                    <div class="h-full">
                        <h5 class="mb-1">Quản lý khóa học</h5>
                    </div>
                </div>
                <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                    <div class="relative right-0">
                        <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl flex-col on-resize h-20">

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between mb-4 m-5">
        <h2 class="text-xl font-bold text-gray-800">Quản lý khóa học</h2>
        <div class="flex">
            <input type="search" id="default-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Tìm kiếm theo tiêu đề...">
        </div>
    </div>
    <div class=" md:mr-2 mt-5 py-2 px-2">
        <label class="block text-gray-700 font-bold mb-2 ml-2">Chọn loại trạng thái:</label>
        <select id="select" name="select" v-model="status" @change="getCourse()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option value="1">Đã duyệt</option>
            <option value="0">Chưa duyệt</option>
        </select>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Người tạo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tiêu đề</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Giới thiệu</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày tạo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hành động</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(course, index) in courses" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{course.user.fullname }}</span>

                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ course.title_course }}
                        </span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ course.description_course }}
                        </span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ formattedDate(course.createdAt) }}</span>
                    </td>
                    <td class="border-t flex">
                        <span
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xóa</span>
                        <span @click="checkCourse(course.id)" v-if="this.status == 0"
                            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Duyệt</span>
                    </td>
                </tr>

            </tbody>

        </table>
        <div>
            <p class="sr-only mt-2">aaa</p>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 grid-cols-2  mb-10">
            <nav aria-label="Page navigation ">
                <ul class="inline-flex -space-x-px">
                    <li>
                        <a
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="revpage">&lt&lt</a>
                    </li>
                    <li>
                        <a
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="nextpage">&gt&gt</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import dayjs from 'dayjs';
import toast from '../../components/toast/toast.vue';
import courseService from '../../plugins/courseService'
export default {
    data() {
        return {
            courses: [],
            status: 0,
            query: 1
        }
    },
    components:
    {
        toast
    },
    mounted() {
        courseService.getCourse(this.query,this.status).then((data) => { this.courses = data.courses.filter(item => item.status == this.status) });
    },
    methods:
    {   
        nextpage()
        {
            this.query ++ 
            courseService.getCourse(this.query,this.status).then((data) => { this.courses = data.courses.filter(item => item.status == this.status) });

        },
        revpage()
        {
            if(this.query == 1 )
            {
                this.query = 1
            }
            else
            {
                this.query--
            }
            courseService.getCourse(this.query).then((data) => { this.courses = data.courses.filter(item => item.status == this.status) });
        },
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        getCourse() {
            alert(this.query)
            courseService.getCourse(this.query,this.status).then((data) => { this.courses = data.courses.filter(item => item.status == this.status) });
        },
        async checkCourse(id) {
            const result = await courseService.check_course(id);
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.status = 1
                this.getCourse()
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        }

    }
}
</script>