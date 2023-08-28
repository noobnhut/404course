<template>
    <section :style="backgroundStyle" class=" min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full ">
        <div class="container w-full   lg:bg-transparent  flex justify-between py-5 lg:px-0 lg:pt-[50px]">
        </div>
        <div class="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
            <div class="col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-44">
                <!--navbar left-->
                <div
                    class=" mt-2 w-full mb-6 lg:mb-0 mx-auto relative bg-gray-800 bg-opacity-50  backdrop-blur-md text-center  px-6 rounded-[20px]  md:mt-[220px] lg:mt-0 ">
                    <img alt="avatar" :src="avatar"
                        class="w-[240px] md:block absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-full -mt-[140px] hidden"
                        loading="lazy" style="color: transparent;">

                    <div class="pt-[100px] pb-8">
                        <div class="" v-if="this.$route.params.id != user.id">
                            <span v-if="follows.some(item => item.to_user == this.$route.params.id)">
                        <span v-for="followuser in follows.filter(item => item.to_user == this.$route.params.id)">
                            <button @click="followUser()"
                                class=" inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l  px-8 py-3 text-lg text-white rounded-[35px] mt-6">
                                Đang theo dõi</button>
                        </span>
                    </span>

                    <span v-else>
                        <button @click="followUser()"
                            class=" inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l  px-8 py-3 text-lg text-white rounded-[35px] mt-6">
                            Theo dõi</button>
                    </span>
                        </div>
                        <h1 class="mt-6 mb-1 text-5xl font-semibold text-white">{{ username }}</h1>
                        <h3 class="mb-4 text-white inline-block  px-5 py-1.5 rounded-lg  ">
                            {{ role }}</h3>
                        <div class="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
                            <div class="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]"><span
                                    class="flex-shrink-0 socialbtn bg-gray-800 bg-opacity-50  backdrop-blur-md dark:bg-black text-[#E93B81] shadow-md"><svg
                                        stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512"
                                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z">
                                        </path>
                                    </svg></span>
                                <div class="text-left ml-2.5">
                                    <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Họ và tên: </p>
                                    <p class=" break-all"><a class="hover:text-[#FA5252] duration-300 transition "
                                            href="tel:+1234567890">{{
                                                fullname }}</a></p>
                                </div>
                            </div>
                            <div class="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]"><span
                                    class="flex-shrink-0 socialbtn bg-gray-800 bg-opacity-50  backdrop-blur-md dark:bg-black text-[#6AB5B9]  shadow-md"><svg
                                        stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512"
                                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z">
                                        </path>
                                    </svg></span>
                                <div class="text-left ml-2.5">
                                    <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Vị trí: </p>
                                    <p class="dark:text-white break-all">Việt Nam</p>
                                </div>
                            </div>
                            <div class="flex py-2.5 border-b border-[#E3E3E3] dark:border-[#3D3A3A]"><span
                                    class="flex-shrink-0 socialbtn bg-gray-800 bg-opacity-50  backdrop-blur-md dark:bg-black text-[#FD7590] shadow-md"><svg
                                        stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
                                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M176 216h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16zm-16 80c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16zm96 121.13c-16.42 0-32.84-5.06-46.86-15.19L0 250.86V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V250.86L302.86 401.94c-14.02 10.12-30.44 15.19-46.86 15.19zm237.61-254.18c-8.85-6.94-17.24-13.47-29.61-22.81V96c0-26.51-21.49-48-48-48h-77.55c-3.04-2.2-5.87-4.26-9.04-6.56C312.6 29.17 279.2-.35 256 0c-23.2-.35-56.59 29.17-73.41 41.44-3.17 2.3-6 4.36-9.04 6.56H96c-26.51 0-48 21.49-48 48v44.14c-12.37 9.33-20.76 15.87-29.61 22.81A47.995 47.995 0 0 0 0 200.72v10.65l96 69.35V96h320v184.72l96-69.35v-10.65c0-14.74-6.78-28.67-18.39-37.77z">
                                        </path>
                                    </svg></span>
                                <div class="text-left ml-2.5">
                                    <p class="text-xs text-[#44566C] dark:text-[#A6A6A6]">Email</p>
                                    <p class="dark:text-white break-all"> <a
                                            class="hover:text-[#FA5252] duration-300 transition"
                                            href="mailto:ibthemes21@gmail.com">{{ email }}</a></p>
                                </div>
                            </div>

                        </div>
                        <a @click="updateInfo = true"
                            class="inline-flex items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l  px-8 py-3 text-lg text-white rounded-[35px] mt-6">Cập
                            nhập thông tin</a>
                    </div>
                </div>

            </div>
            <!--centerview-->
            <div class="col-span-12 lg:col-span-8 ">
                <!--header top treo lo lửng-->
                <header
                    class="lg:w-[526px] h-[144px] hidden lg:block p-[30px]  mb-10 rounded-[16px] bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md dark:bg-[#111111] ">
                    <nav class="hidden lg:block">
                        <ul class="flex ">
                            <!--trang chu hien thị các bài blog của cá nhân-->
                            <a @click="openHome()"
                                :class="active == 'home' ? ' lg:bg-gradient-to-r from-[#FA5252] to-[#DD2476]' : ''"
                                class="w-full h-20 rounded-[10px]  cursor-pointer  font-poppins  bg-[#F3F6F6]  font-medium mx-2.5  text-xtiny text-gray-lite dark:text-[#A6A6A6]    justify-center flex flex-col items-center   transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r  lg:text-white lg:dark:text-white"><span
                                    class="text-xl mb-1"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                        viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z">
                                        </path>
                                    </svg></span>Trang chủ</a>

                            <!--khoa học-->
                            <a @click="openCourse()" v-if="this.$route.params.id == user.id"
                                :class="active == 'course' ? ' lg:bg-gradient-to-r from-[#FA5252] to-[#DD2476]' : ''"
                                class="w-full h-20 rounded-[10px]  cursor-pointer  font-poppins  bg-[#F3F6F6]  font-medium mx-2.5  text-xtiny text-gray-lite dark:text-[#A6A6A6]    justify-center flex flex-col items-center   transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] "><span
                                    class="text-xl mb-1"><svg stroke="currentColor" fill="none" stroke-width="0"
                                        viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H7C6.44771 7 6 6.55228 6 6Z"
                                            fill="currentColor"></path>
                                        <path
                                            d="M6 10C6 9.44771 6.44772 9 7 9H17C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11H7C6.44771 11 6 10.5523 6 10Z"
                                            fill="currentColor"></path>
                                        <path
                                            d="M7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44771 15 7 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H7Z"
                                            fill="currentColor"></path>
                                        <path
                                            d="M6 18C6 17.4477 6.44772 17 7 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H7C6.44772 19 6 18.5523 6 18Z"
                                            fill="currentColor"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M2 4C2 2.34315 3.34315 1 5 1H19C20.6569 1 22 2.34315 22 4V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V4ZM5 3H19C19.5523 3 20 3.44771 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44771 3 5 3Z"
                                            fill="currentColor"></path>
                                    </svg></span>Khóa học</a>

                            <!--user follow-->
                            <a @click="openFollow()" v-if="this.$route.params.id == user.id"
                                :class="active == 'follow' ? ' lg:bg-gradient-to-r from-[#FA5252] to-[#DD2476]' : ''"
                                class="w-full h-20 rounded-[10px]  cursor-pointer  font-poppins  bg-[#F3F6F6]  font-medium mx-2.5  text-xtiny text-gray-lite dark:text-[#A6A6A6]    justify-center flex flex-col items-center   transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] "><span
                                    class="text-xl mb-1"><svg stroke="currentColor" fill="currentColor" stroke-width="0"
                                        viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M162.4 196c4.8-4.9 6.2-5.1 36.4-5.1 27.2 0 28.1.1 32.1 2.1 5.8 2.9 8.3 7 8.3 13.6 0 5.9-2.4 10-7.6 13.4-2.8 1.8-4.5 1.9-31.1 2.1-16.4.1-29.5-.2-31.5-.8-10.3-2.9-14.1-17.7-6.6-25.3zm61.4 94.5c-53.9 0-55.8.2-60.2 4.1-3.5 3.1-5.7 9.4-5.1 13.9.7 4.7 4.8 10.1 9.2 12 2.2 1 14.1 1.7 56.3 1.2l47.9-.6 9.2-1.5c9-5.1 10.5-17.4 3.1-24.4-5.3-4.7-5-4.7-60.4-4.7zm223.4 130.1c-3.5 28.4-23 50.4-51.1 57.5-7.2 1.8-9.7 1.9-172.9 1.8-157.8 0-165.9-.1-172-1.8-8.4-2.2-15.6-5.5-22.3-10-5.6-3.8-13.9-11.8-17-16.4-3.8-5.6-8.2-15.3-10-22C.1 423 0 420.3 0 256.3 0 93.2 0 89.7 1.8 82.6 8.1 57.9 27.7 39 53 33.4c7.3-1.6 332.1-1.9 340-.3 21.2 4.3 37.9 17.1 47.6 36.4 7.7 15.3 7-1.5 7.3 180.6.2 115.8 0 164.5-.7 170.5zm-85.4-185.2c-1.1-5-4.2-9.6-7.7-11.5-1.1-.6-8-1.3-15.5-1.7-12.4-.6-13.8-.8-17.8-3.1-6.2-3.6-7.9-7.6-8-18.3 0-20.4-8.5-39.4-25.3-56.5-12-12.2-25.3-20.5-40.6-25.1-3.6-1.1-11.8-1.5-39.2-1.8-42.9-.5-52.5.4-67.1 6.2-27 10.7-46.3 33.4-53.4 62.4-1.3 5.4-1.6 14.2-1.9 64.3-.4 62.8 0 72.1 4 84.5 9.7 30.7 37.1 53.4 64.6 58.4 9.2 1.7 122.2 2.1 133.7.5 20.1-2.7 35.9-10.8 50.7-25.9 10.7-10.9 17.4-22.8 21.8-38.5 3.2-10.9 2.9-88.4 1.7-93.9z">
                                        </path>
                                    </svg></span>Theo dõi</a>
                        </ul>
                    </nav>
                </header>
                <!--nội dung-->
                <div class="lg:rounded-2xl bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md">
                    <div>
                        <!--view home-->
                        <div class="pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14">
                            <div class="home" v-if="showhome">
                                <h2 class="after-effect after:left-52 border-b-2 border-gray-300 pb-2 text-white">Bài đăng
                                </h2>
                                <div class="lg:grid grid-cols-12 md:gap-10  items-center ">
                                    <div class="col-span-12 space-y-2.5">
                                        <div class="">
                                            <blog :filter="id" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--view course-->
                            <div class="course" v-if="showcourse && this.$route.params.id == user.id">
                                <h2 class="after-effect after:left-52 border-b-2 border-gray-300 pb-2 text-white">Khóa học
                                    đã đăng ký</h2>
                                <div class="lg:grid grid-cols-12 md:gap-10  items-center ">
                                    <div class="col-span-12 space-y-2.5">
                                        <div class="">
                                            <courseSave />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--view follow-->
                            <div class="follow" v-if="showfollow && this.$route.params.id == user.id">
                                <h2 class="after-effect after:left-52 border-b-2 border-gray-300 pb-2 text-white">Theo dõi</h2>
                                <div class="lg:grid grid-cols-12 md:gap-10  items-center ">
                                    <div class="col-span-12 space-y-2.5">
                                        <div class="">
                                            <follow />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </section>

    <!--update infor-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto " v-if="updateInfo">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div
            class=" bg-gray-800 bg-opacity-50  backdrop-blur-md w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập ảnh</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="updateInfo = false"></i>
            </div>

            <div class="py-4 px-4">
                <!--bắt đầu img-->
                <div class=" w-full">
                    <div class="mt-8 mb-2 content-center">
                        <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                            Họ và tên
                        </label>
                        <input
                            class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="text" placeholder="Nguyễn Văn A" v-model="fullname">
                    </div>
                    <label for="dropzone-file" v-if="showimg"
                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                                </path>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Nhấn để tải
                                    ảnh hoặc video lên</span> </p>
                            <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" accept=".png, .jpeg, .gif, .jpg"
                            @change="onFileSelected" />
                    </label>

                    <img class="max-w-sm w-full mx-auto h-32 md:h-64 mt-1" :src="imageUrl" alt="" v-if="!showimg">
                </div>
                <!--kết thúc img-->

            </div>

            <div class="modal-footer py-3 px-4 ">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateUser()">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="updateInfo = false">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast" />
</template>

<script>
import '../../assets/information.css'
import userServices from '../../plugins/userServices';
import toast from '../../components/toast/toast.vue';
import blog from '../../components/blog.vue';
import courseSave from '../../components/courseSave.vue'
import follow from '../../components/follow.vue';
export default {

    data() {
        return {
            user: '',
            username: '', fullname: '', email: '', avatar: '', role: '', id: '',
            updateInfo: false, showimg: true, active: 'home', currentImgIndex: 0, follows: [],
            showhome: true, showcourse: false, showfollow: false,
            imgs: [`${import.meta.env.VITE_API_BASE_FE}/src/assets/1.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/2.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/3.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/4.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/5.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/6.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/7.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/8.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/9.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/10.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/11.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/12.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/13.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/14.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/15.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/16.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/17.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/18.jpg`,
            `${import.meta.env.VITE_API_BASE_FE}/src/assets/19.jpg`, `${import.meta.env.VITE_API_BASE_FE}/src/assets/20.jpg`,
            ]
        }
    },
    components: { toast, blog, courseSave ,follow},
    computed: {
        backgroundStyle() {
            return {
                backgroundImage: `url(${this.imgs[this.currentImgIndex]})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            };
        },
    },
    created() {
        this.currentImgIndex = Math.floor(Math.random() * this.imgs.length);
    },
    mounted() {
        this.user = userServices.getUserToken()
        this.getFollow()
        this.id = this.user.id
        this.username = this.user.username
        this.fullname = this.user.fullname
        this.email = this.user.email
        this.avatar = this.user.avatar
        this.role = this.user.role      
    },
    methods: {
        onFileSelected(event) {
            this.avatar = event.target.files[0]
            this.imageUrl = URL.createObjectURL(this.avatar);
            this.showimg = false
        },
        async updateUser() {
            const formData = new FormData();
            formData.append('avatar', this.avatar);
            formData.append('fullname', this.fullname)
            try {
                const response = await this.$axios.put(`user/updateInfo/${this.user.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status == 200) {
                    this.user.avatar = response.data.exists.avatar
                    this.user.fullname = response.data.exists.fullname
                    localStorage.setItem('user', JSON.stringify(this.user))
                    setTimeout(() => {
                        this.updateInfo = false
                        location.reload()
                    }, 2000)

                }
            } catch (error) {
                console.error(error);
            }

        },
        openHome() {
            this.active = 'home'
            this.showhome = true
            this.showfollow = false
            this.showcourse = false
        },
        openCourse() {
            this.active = 'course'
            this.showcourse = true
            this.showhome = false
            this.showfollow = false
        },
        openFollow() {
            this.active = 'follow'
            this.showfollow = true
            this.showcourse = false
            this.showhome = false
        },
        async getFollow() {
            try {
                const result = await this.$axios.get(`follow/get?id=${this.user.id}`)
                this.follows = result.data
            } catch (error) {
                console.log(error)
            }
        },
        async followUser()
        { 
            try {
                const result = await this.$axios.post('follow/handle',
                    {
                        from_user: this.user.id,
                        to_user: this.$route.params.id
                    })
                this.getFollow()
            } catch (error) {
                console.log(error)
            }

        }
    }

}

</script>