<template>
  <div class="min-h-screen py-20 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200">
    <div class="container mx-auto">

      <div class="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 drop-shadow-2xl">
          <img src="https://wallpaperaccess.com/full/314785.jpg" alt="" class="w-full h-full object-cover">
        </div>

        <div class="w-full lg:w-1/2 py-16 px-12">
          <h2 class="text-3xl mb-4">Đăng nhập</h2>
          <p class="mb-4">
            Chào mừng bạn đến với nơi chia sẽ tài liệu của chúng tôi !
          </p>

          <!--bắt đầu itemlogin
          + v-model: itemlogin đại diện cho itemlogin người dùng
          + @focus => checkitemloginError cho phép bật tắc check lỗi input itemlogin
          + 2 if là 1 cái check rỗng và else if check định dạng itemlogin 
          -->
          <div class="mt-5">
            <input type="text" placeholder="Email, username"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="itemlogin" />
            <p class="text-red-500 text-sm ml-1" v-if="!itemlogin && itemFocused">Nội dung bị trống.</p>
          </div>
          <!--kết thúc email-->

          <!--bắt đầu password
          + v-model : password đại diện cho mật khẩu người dùng.
          + @focus -> checkpasswordError cho phép bật tắt check lỗi password
          + 4 if là check rỗng, check độ dài tối thiểu 8 kí tự , check kí tự đặc biệt, check chữ cái hoa
          -->
          <div class="mt-5">
            <input type="password" placeholder="Mật khẩu"
              class="px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none w-full"
              v-model="password" />
          </div>
          <p class="text-red-500 text-sm ml-1" v-if="!password && passwordFocused">Mật khẩu bị trống.</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="password.length <= 7 && passwordFocused">Mật khẩu có tối thiểu 8
            kí tự</p>
          <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword(password) && passwordFocused">Mật khẩu chứa kí tự
            đặc biệt " ~ / ) [ * ^ $ .... "</p>
          <!-- <p class="text-red-500 text-sm ml-1" v-else-if="!validPassword2(password) && passwordFocused">Mật khẩu có tối
            thiểu 1 chữ cái hoa</p> -->
          <!--kết thúc password -->

          <div class="mt-5">
            <!--button login-->
            <button class="w-full block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6" @click="login">Đăng nhập</button>
          </div>

          <!--chuyển qua đăng kí-->
          <p class="mt-8">
            Bạn chưa có tài khoản ?
            <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-semibold">
              Đăng ký tài khoản
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!--component toast thông báo !!!-->
  <toast ref="toast"></toast>
</template>

<script>
import toast from '../components/toast/toast.vue'
import userServices from '../plugins/userServices';
export default {
  data() {
    return {
      itemlogin: '',
      password: '',
      passwordFocused: false,
      itemFocused: false,
      user: ''
    }
  },
  components: { toast },
  mounted() {
    this.user = userServices.getUserToken()
    if (this.user !== null) {
      if (this.user.role == 'Admin') {
        window.location.href = `${import.meta.env.VITE_API_BASE_FE}/admin`;

      }
      else {
        window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home`;

      }
    }else{return ''}

  },
  methods: {
    validPassword(password) {
      const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      return re.test(password);
    },
    validPassword2(password) {
      const re = /[A-Z]/;
      return re.test(password);
    },
    async login() {
      this.itemFocused = true
      this.passwordFocused = true
      if (this.validPassword(this.password)) {
        try {
          const login = await this.$axios.post(`auth/login`, {
            itemlogin: this.itemlogin,
            password: this.password,
          });

          if (login.status == 202) {
            this.$refs.toast.showToast(login.data.message)

          }
          else if (login.status == 200) {
            console.log('đăng nhập thành công')
            // Lưu thông tin người dùng vào localStorage hoặc sessionStorage
            localStorage.setItem('user', JSON.stringify(login.data));
            localStorage.setItem('token', login.data.token);
            // Chuyển hướng đến trang chính của ứng dụng
            this.$refs.toast.showToast('Đăng nhập thành công')
            setTimeout(() => {
              if (login.data.role === 'Admin') {
                window.location.href = `${import.meta.env.VITE_API_BASE_FE}/admin`;
              }
              else {
                window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home`;
              }
            }, 1000)
            this.itemFocused = false
            this.passwordFocused = false
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          console.log('đăng nhập thất bại')
        }
      }

    }
  }
}
</script>