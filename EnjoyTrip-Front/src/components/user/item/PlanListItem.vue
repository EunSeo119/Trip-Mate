<template>
  <!-- Gallery item -->
  <div>
    <div class="bg-blue rounded shadow-sm child-container">
      <!-- <img
        :src="like.firstImage"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      /> -->
      <div class="p-4" style="position: relative">
        <h5 style="text-align: left">{{ plan.title }}</h5>
        <p class="small text-muted mb-0" style="text-align: left">
          {{ plan.description }}
        </p>
        <font-awesome-icon
          :icon="['far', 'trash-can']"
          class="trash-icon"
          @click="toggleTrash"
        />
      </div>
    </div>
  </div>
  <!-- End -->
</template>

<script>
import { apiInstance } from "@/api/index.js";

const api = apiInstance();
export default {
  name: "PlanListItem",
  data() {
    return {
      isHeartFilled: false,
      heartIcon: ["far", "trash-can"],
      fillHeartIcon: { color: "#de1717" },
    };
  },
  props: {
    plan: Object,
  },

  methods: {
    // ...mapActions(memberStore, ["deleteLikeById"]),
    // replaceByDefault(e) {
    //   e.target.src = require("@/assets/NoImage.png");
    // },
    toggleTrash() {
      api.delete(`/plan/delete/${this.plan.planId}`).then((response) => {
        let msg = "여행계획 삭제 성공!!!";
        console.log(response.data);
        alert(msg);
      });
    },
  },
};
</script>

<style scoped>
.child-container {
  margin-right: 20px;
  margin-bottom: 20px;
  border: solid 2px;
  border-color: #c2d6f0;
  height: 230px;
}
.img-height {
  max-width: 90%;
  height: 180px;
  object-fit: cover;
  border-radius: 5%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.trash-icon {
  /* position: absolute; */
  top: 27px;
  right: 18px;
  cursor: pointer;
  color: #de1717;
}
</style>
