<template>
  <!-- Gallery item -->
  <div>
<div class="bg-blue rounded shadow-sm child-container">
      <img
        :src="like.firstImage"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      />  
      
      <h5 style = "text-align: left;">{{like.title}}</h5>
      <p class="small text-muted mb-0" style = "text-align: left;">{{like.addr1}}</p>
  </div>

  </div>
  
  <!-- End -->
</template>

<script>

export default {
  name: "LikeListItem",
  data() {
    return {
    
    };
  },
  props: {
    like: Object,
  },

  methods: {
  },
};
</script>

<style scoped>
.child-container{
  margin-right: 20px;
  margin-bottom: 20px;
  border: solid 2px;
  border-color: #c2d6f0;
}
.img-height{
  max-width: 90%;
  height: 180px;
  object-fit: cover;
  border-radius: 5%; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.heart-icon {
  position: absolute;
  top: 27px;
  right: 18px;
  cursor: pointer;
}
</style>
