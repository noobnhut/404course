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
                        <h5 class="mb-1">Quản lý phân quyền</h5>
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

    <div class="flex items-center justify-between m-5">
        <h2 class="text-xl font-bold text-gray-800">Quản lý phân quyền</h2>
        <div class="flex">
            <input type="search" id="default-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Tìm kiếm theo tiêu đề...">
        </div>
    </div>
    <!--tab view role-->
    <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap">
            <li class="mr-2 cursor-pointer ">
                <a @click="isRoleBtn"
                    :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'role' }]"
                    class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Vai
                    trò</a>
            </li>
            <li class="mr-2 cursor-pointer ">
                <a @click="isUserRoleBtn"
                    :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'roleuser' }]"
                    class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Danh
                    sách vai trò</a>
            </li>
        </ul>
    </div>
    <div class="m-2" v-if="showRole">
        <button @click="onclose()"
            class="shadow inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-5 h-5" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Thêm
        </button>
    </div>
    <!-- role view-->
    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer" v-if="showRole">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped ">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên chức vụ</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hành động</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(role, index) in roles" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ role.name_role }}
                        </span>
                    </td>
                    <td class="border-t flex">
                        <span
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            @click="deleteRole(role.id)">Xóa</span>
                        <span
                            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            @click="sendRole(role); showURole()">Cập
                            nhập</span>
                    </td>
                </tr>

            </tbody>

        </table>


    </div>
    <!--user role view-->
    <!--bộ lọc-->
    <div class=" md:mr-2 mt-5 py-2 px-2" v-if="showUserRole">
        <select id="select" name="select" v-model="roleid" @change="getUserRole()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name_role }}
            </option>
        </select>
    </div>
    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer" v-if="showUserRole">

        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped ">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên vai trò</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Họ tên người dùng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hành động</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(roleuser, index) in userRoles" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ roleuser.role.name_role }}
                        </span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ roleuser.user.fullname }}
                        </span>
                    </td>
                    <td class="border-t flex">
                        <span
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            @click="deleteUR(roleuser.id)">Xóa</span>
                        <span
                            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            @click="onshowUserRole(); sendUR(roleuser)">Cập
                            nhập</span>
                    </td>
                </tr>

            </tbody>

        </table>


    </div>

    <!--chi muc-->
    <div class="grid sm:grid-cols-3 gap-4 grid-cols-2  mb-10 mt-5">
        <nav aria-label="Page navigation ">
            <ul class="inline-flex -space-x-px">
                <li>
                    <a
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">&lt&lt</a>
                </li>
                <li>
                    <a href="#"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                    <a
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">&gt&gt</a>
                </li>
            </ul>
        </nav>
    </div>

    <!--modal add role-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-if="isShowAdd">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onclose"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Thêm phân quyền</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onclose"></i>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên phân quyền</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                        v-model="rolename" required>
                    <p class="text-red-500 text-sm ml-2" v-if="!rolename && nameFocused">Phân quyền đang bị trống.</p>

                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="addrole">Thêm</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onclose()">Đóng</button>
            </div>
        </div>
    </div>

    <!--modal sửa role-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowUpdateRole">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="showURole"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập phân quyền</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="showURole"></i>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên phân quyền</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                        v-model="rolename" required>
                    <p class="text-red-500 text-sm ml-2" v-if="!rolename && nameFocused">Phân quyền đang bị trống.</p>

                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateRole">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="showURole()">Đóng</button>
            </div>
        </div>
    </div>

    <!--model sửa user role-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowUpdateURole">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="onshowUserRole"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập phân quyền</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="onshowUserRole"></i>
            </div>

            <div class="px-4">
                <div>
                    <label for="" class="m-2 text-base">Tên người dùng</label>
                    <select id="select" name="select" v-model="userid"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option disabled v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.fullname }}
                        </option>
                    </select>
                    <p class="text-red-500 text-sm ml-2" v-if="!userid && useridFocused">Vui lòng chọn 1 user.</p>

                </div>
                <div>
                    <label for="" class="m-2 text-base">Loại phân quyền</label>
                    <select id="select" name="select" v-model="roleid"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.name_role }}
                        </option>
                    </select>
                    <p class="text-red-500 text-sm ml-2" v-if="!roleid && roleidFocused">Vui lòng chọn 1 role.</p>

                </div>

            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateUserRole()">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="onshowUserRole">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import dayjs from 'dayjs';
import toast from '../../components/toast/toast.vue';
import adminService from '../../plugins/adminService'
import userServices from '../../plugins/userServices';
export default {
    data() {
        return {
            roles: [], userRoles: [], users: [],
            page: 1, activeTab: 'role',
            showRole: true, showUserRole: false, isShowUpdateRole: false,
            isShowAdd: false, isShowUpdateURole: false, nameFocused: false,
            useridFocused: false, roleidFocused: false,
            roleid: '', rolename: '', userid: '', urid: ''
        }
    },
    components:
    {
        toast
    },
    mounted() {
        this.getRole()
        userServices.renderUser().then((data) => { this.users = data })
    },
    methods:
    {
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        isRoleBtn() {
            this.activeTab = 'role'
            this.showRole = true
            this.showUserRole = false
        },
        isUserRoleBtn() {
            this.getUserRole()
            this.activeTab = 'roleuser'
            this.showRole = false
            this.showUserRole = true
        },
        showURole() {
            this.isShowUpdateRole = !this.isShowUpdateRole
        },
        sendRole(role) {
            this.roleid = role.id
            this.rolename = role.name_role
        },
        onshowUserRole() {
            this.isShowUpdateURole = !this.isShowUpdateURole
        },
        sendUR(ur) {
            this.roleid = ur.id_role
            this.userid = ur.id_user
            this.urid = ur.id
        },
        getRole() {
            adminService.getRole().then((data) => { this.roles = data });
        },
        onclose() {
            this.isShowAdd = !this.isShowAdd
        },
        getUserRole() {
            if (this.roleid == '') {
                adminService.getUserRole(this.page).then((data) => { this.userRoles = data })
            } else {

                adminService.getUserRole(this.page).then((data) => { this.userRoles = data.filter(item => item.id_role == this.roleid) })
            }
        },
        async deleteRole(id) {
            const result = await adminService.deleteRole(id);
            if (result.status == 200) {
                this.getRole()
                this.$refs.toast.showToast(result.data.message)
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },
        async updateRole() {
            this.nameFocused = true
            if (this.rolename) {
                const result = await adminService.updateRole(this.roleid, this.rolename);
                if (result.status == 200) {
                    this.getRole()
                    this.$refs.toast.showToast(result.data.message)
                    this.showURole()
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
                this.nameFocused = false
            }

        },
        async addrole() {
            this.nameFocused = true
            if (this.rolename) {
                const result = await adminService.addRole(this.rolename);
                if (result.status == 200) {
                    this.getRole()
                    this.$refs.toast.showToast(result.data.message)
                    this.onclose()
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
                this.nameFocused = false
            }

        },
        async updateUserRole() {
            this.useridFocused = true
            this.roleidFocused = true
            if (this.userid && this.roleid) {
                const result = await adminService.updateUR(this.roleid, this.userid, this.urid);
                if (result.status == 200) {
                    this.showUserRole = true
                    adminService.getUserRole(this.page).then((data) => { this.userRoles = data })
                    this.$refs.toast.showToast(result.data.message)
                    this.onshowUserRole()
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
                this.useridFocused = false
                this.roleidFocused = false
            }

        },
        async deleteUR(id) {
            const result = await adminService.deleteUR(id);
            if (result.status == 200) {
                adminService.getUserRole(this.page).then((data) => { this.userRoles = data })
                this.$refs.toast.showToast(result.data.message)
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        }

    }
}
</script>