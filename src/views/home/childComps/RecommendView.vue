<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }

    }
  }

}
</script>

<style>
  .recommend {
    display: flex;
    width: 100%;
    font-size: 13px;
    margin-top: 10px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;

  }
  .recommend-item {
    flex: 1;
    text-align: center;
  
  }
  
  .recommend-item img{
    width: 85%;
    margin-bottom: 5px;
 
  } 


</style>