<template>
  <!-- Gallery item -->
  <div class="bg-blue rounded shadow-sm child-container">
    <div @click="clickModal">
      <img
        :src="travel.firstImage"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      />
      <div class="p-4" style="position: relative">
        <font-awesome-icon
          :icon="heartIcon"
          :style="fillHeartIcon"
          class="heart-icon"
          @mouseenter="fillHeart"
          @mouseleave="unfillHeart"
          @click="toggleHeart"
        />
        <h5 style="text-align: left">{{ travel.title }}</h5>
        <p class="small text-muted mb-0" style="text-align: left">{{ travel.addr1 }}</p>
      </div>
      
    </div>
    <modal-window2
        v-if="isSelected === true"
        :travel ="travel"
        @close="closeModeal"
    ></modal-window2>
  </div>
  <!-- End -->
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import store from "@/store";
import { modifyLike } from "@/api/travel";
// import { apiInstance } from "@/api/index.js";
import ModalWindow2 from "@/components/travel/ModalWindow2.vue";

const travelStore = "travelStore";
// const api = apiInstance();

export default {
  name: "TravelListItem",
  components: {
    ModalWindow2
  },
  data() {
    return {
      imageUrl: "path/to/image.jpg",
      isHeartFilled: false,
      heartIcon: ["far", "heart"],
      fillHeartIcon: { color: "#de1717" },
      isSelected: false,
    };
  },
  props: {
    travel: Object,
  },
  // created() {
  //   api.get(`/travel/detail/${this.travel.travelInfoId}`).then((response) => {
  //     // let msg = "여행모달 성공!!!";
  //     console.log(response.data);
  //     // alert(msg);
  //   });
  // },
  methods: {
    ...mapActions(travelStore, ["detailTravel", "likeTravel"]),
    ...mapMutations(travelStore, ["CLEAR_DETAIL_TRAVEL"]),
    
    replaceByDefault(e) {
      e.target.src = require("@/assets/NoImage.png");
    },
    fillHeart() {
      if (!this.isHeartFilled) {
        this.heartIcon = ["fas", "heart"];
      }
    },
    unfillHeart() {
      if (!this.isHeartFilled) {
        this.heartIcon = ["far", "heart"];
      }
    },
    toggleHeart() {
      this.isHeartFilled = !this.isHeartFilled;
      this.heartIcon = this.isHeartFilled ? ["fas", "heart"] : ["far", "heart"];
      let params = {
        travelInfoId: this.travel.travelInfoId,
        like: 1,
        userId: store.getters["memberStore/checkUserInfo"].userId,
      };
      modifyLike(
        params,
        ({ data }) => {
          let msg = "좋아요 수정 처리시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "좋아요 수정이 완료되었습니다.";
          }
          console.log(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    clickModal(){
      this.isSelected = true;
      this.detailTravel(this.travel.travelInfoId);
    },
    closeModeal(){
      this.isSelected = false;
      this.CLEAR_DETAIL_TRAVEL();
    }
  },
};
</script>

<style scoped>
.child-container {
  margin-right: 20px;
  margin-bottom: 20px;
  border: solid 2px;
  border-color: #c2d6f0;
}
.img-height {
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
