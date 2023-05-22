<template>
    <div>
        <div class="my-row">
        <div class="my-col">
            <div class="my-jumbotron">
            <h2>Likes</h2>
            <p>좋아요 누른 관광지</p>
            <hr class="my-4" />
            </div>
        </div>
        </div>
        <div class = "grid-main">
            <like-list-item
            v-for="item in itemList" 
            :key="item.id"
            />  
        </div>
    </div>
</template>
<script>
import LikeListItem from "@/components/user/item/LikeListItem.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLikePage",
  components: {
    LikeListItem,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
  },
};
</script>

<style>
.custom-btn{
  border: solid 2px #467cc2;
}
.my-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-col {
  flex: 1;
}

.my-jumbotron {
  padding: 70px;
  height: 546px;
}

.my-container {
  margin-top: 20px;
}

.my-4 {
  margin: 40px 0;
}

.my-1 {
  margin: 10px 0;
}
.my-input {
  width: 80%;
  height: 30px;
  padding-left: 10px;
  border: 1px solid #eaeaea;
}
</style>