<template>
<div class="bg-white">
<button @click="openmodal()"  type="button" class="text-black bg-blue-700">Open</button>

</div>
<div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShow">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="openmodal"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Xóa danh mục</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="openmodal"></i>
            </div>    
            <div class="px-4">
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Bạn có muốn xóa danh mục: <span class="font-bold ">{{ data }}</span> </label>
                    
                </div>
            </div>
            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4">Xóa</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="openmodal()">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data:'',
            showText:false,
            isShow:false
        }
    },
    methods:{
        openmodal()
        {
            this.isShow = !this.isShow
        }
    }
    }
</script>