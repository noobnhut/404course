<template>
    <div class="px-2 py-2">
        <swiper :pagination="true" :modules="modules" class="mySwiper" :autoplay="{ delay: 1000 }">
        <swiper-slide v-for="banner in banners">
        <div class=" py-8 px-6 xl:px-0 flex  flex-col ">
            <div class="flex justify-between bg-gray-50  items-stretch flex-row  ">
                
                <div class="flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    <p class="transform flex flex-shrink-0 -rotate-90 text-2xl font-semibold tracking-wide leading-normal text-white ">404Learn</p>
                </div>
                <div class="flex justify-center items-start flex-col xl:w-2/5 md:w-5/12 xl:px-7 px-6 md:px-0 md:py-0 py-5 ">
                    <div>
                        <p class="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800 ">{{ banner.title_banner }}</p>
                    </div>
                    <div class="xl:mt-4 mt-2">
                        <p class="text-base xl:text-xl leading-7 text-gray-600  pr-4">{{ banner.title_banner }}</p>
                    </div>
                </div>
                <div class="hidden md:block h-44 md:h-60 xl:h-72">
                    <img class="hidden h-full xl:block " :src="banner.img_url" alt="pexels-dmitry-zvolskiy-2082090-1" />
                    <img class="xl:hidden h-full " :src="banner.img_url" alt="pexels-dmitry-zvolskiy-2082090-1-1" />
                    
                </div>
            </div>
            <div class="md:hidden mt-6 w-full">
                <img :src="banner.img_url" alt="pexels-dmitry-zvolskiy-2082090-1" class="w-full" />
            </div>
        </div>
        </swiper-slide>
    </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/swiper-bundle.min.css";
import { Pagination } from 'swiper';
export default {
    data() {
        return {
            banners: []
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
    mounted() {
        this.getbanner()
    },
    methods: {
        async getbanner() {
            try {
                const result = await this.$axios.get(
                    `banner/get`
                );
                this.banners = result.data;
            } catch (e) {
                console.log(e);
            }
        },
    }

}

</script>