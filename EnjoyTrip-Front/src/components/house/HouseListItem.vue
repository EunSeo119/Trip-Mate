<template>
  <!-- Gallery item -->
  <div class="bg-blue rounded shadow-sm child-container">
    <img
      :src="house.firstImage"
      class="img-fluid card-img-top img-height mt-3"
      @error="replaceByDefault"
    />	            
    <div class="p-4">
      <h5>{{house.title}}</h5>
      <p class="small text-muted mb-0">{{house.addr1}}</p>
    </div>
  </div>       
  <!-- End -->
</template>

<script>
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    house: Object,
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse"]),
    selectHouse() {
      // console.log("listRow : ", this.house);
      // this.$store.dispatch("getHouse", this.house);
      this.detailHouse(this.house);
    },
    colorChange(flag) {
      this.isColor = flag;
    },
    replaceByDefault(e) {
      e.target.src = require("@/assets/NoImage.png");
    }
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
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
</style>
