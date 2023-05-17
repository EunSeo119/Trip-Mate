<template>
  <!-- Gallery item -->
  <div class="bg-blue rounded shadow-sm child-container">
      <img
        :src="travel.firstImage"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      />     
    <div class="p-4" style="position: relative;">
      <font-awesome-icon 
        :icon="heartIcon"
        :style="fillHeartIcon"
        class="heart-icon"
        @mouseenter="fillHeart"
        @mouseleave="unfillHeart"
        @click="toggleHeart"
      />
      <h5 style = "text-align: left;">{{travel.title}}</h5>
      <p class="small text-muted mb-0" style = "text-align: left;">{{travel.addr1}}</p>
    </div>
  </div>       
  <!-- End -->
</template>

<script>
import { mapActions } from "vuex";

const travelStore = "travelStore";

export default {
  name: "TravelListItem",
  data() {
    return {
      imageUrl: 'path/to/image.jpg',
      isHeartFilled: false,
      heartIcon: ['far', 'heart'],
      fillHeartIcon: {color: '#de1717'},
    };
  },
  props: {
    travel: Object,
  },
  methods: {
    ...mapActions(travelStore, ["detailTravel", "likeTravel"]),
    selectTravel() {
      this.detailTravel(this.travel);
    },
    replaceByDefault(e) {
      e.target.src = require("@/assets/NoImage.png");
    },
    fillHeart() {
      if (!this.isHeartFilled) {
        this.heartIcon = ['fas', 'heart'];
      }
    },
    unfillHeart() {
      if (!this.isHeartFilled) {
        this.heartIcon = ['far', 'heart'];
      }
    },
    toggleHeart() {
      this.isHeartFilled = !this.isHeartFilled;
      this.heartIcon = this.isHeartFilled ? ['fas', 'heart'] : ['far', 'heart'];
      // this.likeTravel(this.travel.travelInfoId);
    },
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
