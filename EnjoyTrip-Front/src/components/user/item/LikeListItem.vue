<template>
  <!-- Gallery item -->
  <div>
    <div class="bg-blue rounded shadow-sm child-container">
      <img
        :src="like.firstImage"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      />
      <div class="p-4" style="position: relative;">
        <font-awesome-icon 
        :icon= "['far', 'trash-can']"
        class="trash-icon"
        @click="toggleTrash"
      />
        <h5 style = "text-align: left;">{{like.title}}</h5>
        <p class="small text-muted mb-0" style = "text-align: left;">{{like.addr1}}</p>
      </div>
    </div>
  </div>
  <!-- End -->
</template>

<script>
import { mapActions } from "vuex";
import store from "@/store";
import { modifyLike } from "@/api/travel";

const memberStore = "memberStore";

export default {
  name: "LikeListItem",
  data() {
    return {
      isHeartFilled: false,
      heartIcon: ['far', 'trash-can'],
      fillHeartIcon: {color: '#de1717'},
    };
  },
  props: {
    like: Object,
  },

  methods: {
    ...mapActions(memberStore, ["deleteLikeById"]),
    replaceByDefault(e) {
      e.target.src = require("@/assets/NoImage.png");
    },
    toggleTrash() {
      let params = {
        "travelInfoId": this.like.travelInfoId,
        "like" : 1,
        "userId": store.getters["memberStore/checkUserInfo"].userId,
      };
      this.deleteLikeById(this.like.travelInfoId);
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
  },
};
</script>

<style scoped>
.child-container{
  margin-right: 20px;
  margin-bottom: 20px;
  border: solid 2px;
  border-color: #c2d6f0;
  height: 380px;
}
.img-height{
  max-width: 90%;
  height: 180px;
  object-fit: cover;
  border-radius: 5%; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.trash-icon {
  position: absolute;
  top: 27px;
  right: 18px;
  cursor: pointer;
  color: #de1717;
}
</style>
