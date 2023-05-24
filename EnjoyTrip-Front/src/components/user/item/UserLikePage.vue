<template>
    <div>
      <div class="my-row">
        <div class="my-col">
            <div class="my-jumbotron">
              <h2>Likes</h2>
              <p>좋아요 누른 관광지</p>
              <hr class="my-4" />
              
              <div class = "like-main">
                <like-list-item
                  v-for="like in likes" 
                  :key="like.travelInfoId"
                  :like="like"
                />  
              </div>
            </div>
          
        </div>
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
    ...mapState(memberStore, ["likes"]),
  },
  methods: {
  },
};
</script>

<style>
.like-main{
  overflow-y: auto; /* 세로 스크롤을 표시하도록 설정 */
  max-height: 380px; /* 스크롤 가능한 최대 높이를 지정 (원하는 값으로 조정) */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
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