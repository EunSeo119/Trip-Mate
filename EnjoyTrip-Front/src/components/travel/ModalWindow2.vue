<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-content-container" style="max-width: 500px">
        <h2>{{ travel.title }}</h2>
        <p>{{ travel.addr1 }}</p>
        <img :src="travel.firstImage" class="travel-image" alt="여행지 이미지" />
        <div class="description-container mt-3">
          <p>{{ travelDetail.overview }}</p>
        </div>
      </div>
      <div class="close-button" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const travelStore = "travelStore";

export default {
  props: {
    travel: Object,
  },
  computed: {
    ...mapState(travelStore, ["travelDetail"]),
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 500px;
  max-height: 80vh; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 생성 */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
}

.modal-content-container {
  margin-bottom: 30px;
}

.modal-content-container p {
  margin-bottom: 10px;
}

.description-container {
  max-height: 200px; /* 내용이 넘칠 경우 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤 생성 */
}
.travel-image{
  width: 400px;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}
</style>
