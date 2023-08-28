<template>
    <div class="w-full px-6 mx-auto mb-10">

        <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl" style="background-image: url('https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-Macbook-3D-moi-nhat.jpg'); background-position-y: 50%">
            <span class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
          </div>
        <div class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
          <div class="flex flex-wrap -mx-3">
            <div class="flex-none w-auto max-w-full px-3">
              
            </div>
            <div class="flex-none w-auto max-w-full px-3 my-auto">
              <div class="h-full">
                <h5 class="mb-1">Quản lý người dùng</h5>
              </div>
            </div>
            <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
              <div class="relative right-0">
                <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl flex-col on-resize h-20" >
                 
               </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="flex items-center justify-between mb-4 m-5">
        <h2 class="text-xl font-bold text-gray-800">Quản lý người dùng</h2>
        <div class="flex">
        <input type="search" id="default-search" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " placeholder="Tìm kiếm theo email ...">
        </div>
    </div>
    <div class=" md:mr-2 mt-5 py-2 px-2">
        <label class="block text-gray-700 font-bold mb-2 ml-2" >Chọn loại chức vị:</label>
        <select id="select" name="select" v-model="roleid" @change="getUserByRole()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name_role }}
                </option>
        </select>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên người dùng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên đăng nhập</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Ngày tạo</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hành động</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(user, index) in users" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            <img class="w-10 h-10 md:w-10 md:h-10  mr-2" :src="user.avatar" alt="Avatar" />
                            {{ user.fullname }}
                        </span>
                    </td>

                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ user.username }}
                        </span>
                    </td>
                    
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ formattedDate(user.createdAt) }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">Coming soon</span>
                    </td>
                </tr>

            </tbody>
        </table>
        <div> <p class="sr-only mt-2">aaa</p></div>

    </div>
  <toast ref="toast"></toast>

</template>

<script>
import dayjs from 'dayjs';
import toast from '../../components/toast/toast.vue';
import userService from '../../plugins/userServices';
import adminService from '../../plugins/adminService'
export default {
    data() {
        return {
            users: [],
            roles:[],
            roleid:1
        }
    },
    components:
    {
        toast
    },
    mounted() {
       this.getUser()
       this.getRole();
       this.getUserByRole()
    },
    methods:
    {
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        getUser() {
           
            userService.renderUser().then((data) => { this.users = data });
        },
        getRole()
        {
            adminService.getRole().then(((data)=>{this.roles = data.filter(item=>item.name_role != 'Admin')}))
        },
        getUserByRole()
        {
            adminService.getUserByRole(this.roleid).then((data) => { this.users = data })
        },
        
    }
}
</script>