<template>
    <banner/>
    <course />
    <blog filter=""/>
    <footerv/>
</template>

<script>
import banner from '../../components/banners.vue';
import course from '../../components/course.vue';
import footerv from '../../components/footer.vue';
import blog from '../../components/blog.vue';
export default {
 
    data() {
        return {
            
        }
    },
   components:{banner,course,footerv,blog},
    mounted() {
      
    },
    methods: {
       
    }

}

</script>