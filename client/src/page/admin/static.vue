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
                        <h5 class="mb-1">Các biểu đồ thống kê</h5>
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

    <div class="flex items-center justify-between mb-4 ml-2">
        <h2 class="text-xl font-bold text-gray-800">Các biểu đồ thống kê</h2>
    </div>

    <!--tuong tac comment course-->
    <div class="flex items-center justify-between m-4">
        <h2 class="text-base font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Bảng 1: Điểm tương tác khóa học</h2>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tiêu đề khóa học:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Điểm:</th>

                </tr>
            </thead>
            <tbody>

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(course, index) in course_1" :key="index">

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ course.course.title_course }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ course.point }}</span>

                    </td>

                </tr>

            </tbody>
        </table>
        <div>
            <p class="sr-only mt-2">aaa</p>
        </div>
    </div>

     <!--đki course-->
     <div class="flex items-center justify-between m-4">
        <h2 class="text-base font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Bảng 2: Thống kê đăng ký khóa học</h2>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tiêu đề khóa học:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Điểm:</th>

                </tr>
            </thead>
            <tbody>

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(course, index) in course_2" :key="index">

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ course.course.title_course }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ course.subcribed }}</span>

                    </td>

                </tr>

            </tbody>
        </table>
        <div>
            <p class="sr-only mt-2">aaa</p>
        </div>
    </div>

     <!--diem tuong tac blog-->
     <div class="flex items-center justify-between m-4">
        <h2 class="text-base font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Bảng 3: Điểm tương tác blog</h2>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tiêu đề blog:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Điểm:</th>

                </tr>
            </thead>
            <tbody>

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(blog, index) in blog_1" :key="index">

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ blog.title_blog }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ blog.like_count + blog.comment_count + blog.save_count }}</span>

                    </td>

                </tr>

            </tbody>
        </table>
        <div>
            <p class="sr-only mt-2">aaa</p>
        </div>
    </div>


<!--diem tuong tac blog-->
<div class="flex items-center justify-between m-4">
        <h2 class="text-base font-bold text-gray-800 border-b-2 border-gray-300 pb-2">Bảng 4: Tổng số blog của user</h2>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên người đăng:</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Số bài đăng</th>

                </tr>
            </thead>
            <tbody>

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(blog, index) in blog_2" :key="index">

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ blog.user.fullname }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ blog.point }}</span>

                    </td>

                </tr>

            </tbody>
        </table>
        <div>
            <p class="sr-only mt-2">aaa</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            course_1: [],
            course_2:[],
            blog_1:[],
            blog_2:[]
        }
    },
    mounted() {
        this.getCourse_1()
        this.getCourse_2()
        this.getBlog_1()
        this.getBlog_2()
    },
    components: {},
    methods: {
        async getCourse_1() {
            try {
                const result = await this.$axios.get('chart/coursepoint');
                this.course_1 = result.data

            } catch (error) {
                console.log(error)
            }
        },
        async getCourse_2() {
            try {
                const result = await this.$axios.get('chart/chartCourseBySave');
                this.course_2 = result.data

            } catch (error) {
                console.log(error)
            }
        },
        async getBlog_1() {
            try {
                const result = await this.$axios.get('chart/chartBlog');
                this.blog_1 = result.data

            } catch (error) {
                console.log(error)
            }
        },
        async getBlog_2() {
            try {
                const result = await this.$axios.get('chart/chartBlogByUser');
                this.blog_2 = result.data

            } catch (error) {
                console.log(error)
            }
        }
        
    }
}

</script>