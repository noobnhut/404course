<template>

<div class="max-w-md w-full space-y-8">
              <div class="text-center">
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                  Chào mừng bạn đến với chúng tôi
                </h2>
                <p class="mt-2 text-sm text-gray-500">Đăng ký vào 404Learn</p>
              </div>
             
              <div class="flex items-center justify-center space-x-2">
                <span class="h-px w-16 bg-gray-200"></span>
                <span class="text-gray-300 font-normal">Tận hưởng mọi thứ</span>
                <span class="h-px w-16 bg-gray-200"></span>
              </div>
              <div class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true">
                <div class="relative">
                  <div class="absolute right-3 mt-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
                  <input
                    class=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="email" placeholder="mail@gmail.com"  v-model="email" >
                </div>
                <div class="mt-8 content-center">
                  <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                   Tên đăng nhập
                  </label>
                  <input
                    class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text" placeholder="404learning" v-model="username">
                </div>
                <div class="mt-8 content-center">
                  <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                   Họ và tên
                  </label>
                  <input
                    class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text" placeholder="Nguyễn Văn A" v-model="fullname">
                </div>
                <div class="mt-8 content-center">
                  <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Mật khẩu
                  </label>
                  <input
                    class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password" placeholder="*****" v-model="password">
                </div>
                <div class="flex items-center justify-between">
                 
                  <div class="text-sm">
                    <a href="#" class="text-indigo-400 hover:text-blue-500">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div>
                  <button @click="register"
                    class="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Đăng ký
                  </button>
                </div>
                <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                  <span>Đã có tài khoản, đăng nhập</span>
                  <router-link to="/" 
                    class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Đăng nhập</router-link>
                </p>
              </div>
            </div>
      <toast ref="toast"></toast>
    </template>

  
  
  <script>
  import '../../assets/login.css'
  import toast from '../../components/toast/toast.vue';
  export default {
    data() {
      return {
        email: '',
        password: '',
        username: '',
        fullname:''
      }
    },
    components:{toast},
    methods: {   
      async register() {
        try {
          const register = await this.$axios.post(`auth/register`,
          {
            email:this.email,username:this.username,password:this.password,fullname:this.fullname
          });
          if(register.status == 202)
          {
            this.$refs.toast.showToast(register.data.message)
          }
          
  
          if (register.status === 200) {
            this.$refs.toast.showToast('Đăng ký thành công')
          
            setTimeout(() => {
              window.location.href = `${import.meta.env.VITE_API_BASE_FE}/register/updateimg/${register.data.user.id}`;
            }, 1000)
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          console.log('đăng nhập thất bại')
        }
      }
    }
  }
  </script>