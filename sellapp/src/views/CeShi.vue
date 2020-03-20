<template>
    <div > 
        <div v-for="(itme,index) in arr" :key="index">
           <div>{{itme}}</div>
        </div>
        <button @click="change">点击</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                arr:[2,3,4,5]
            }
        },
        methods:{
            change(){
               this.arr.splice(0,0,'9')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>