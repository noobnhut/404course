<template>
    <div class="shadow-md mt-2">
        <div v-for="user in followusers">
            <div class="max-w-xl w-full ml-6 overflow-hidden mt-6 " >
                <!-- Header -->
                <div class="flex items-center px-4 py-2">
                    <img class="w-12 h-12 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <div class="flex-grow">
                        <h3 @click="goIn4( user.id)" class="text-gray-900 font-medium cursor-pointer">{{
                            user.fullname }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>
import userService from '../plugins/userServices';
export default {
    data() {
        return {
            user: '',
            followusers: '',
            users: [],
            posts: []
        }
    },
    components: {  },
    mounted() {
        this.user = userService.getUserToken();
       this.getFollow()
    },
    methods:
    {
        goIn4( id) {
            window.location.href = `http://localhost:5173/home/information/${id}`;
        },
        async getFollow()
        {
            try {
                const result = await this.$axios.get(`follow/getbyme?id=${this.user.id}`)
                this.followusers = result.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>