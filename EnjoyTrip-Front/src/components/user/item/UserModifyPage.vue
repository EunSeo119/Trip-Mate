<template>
<div class="my-row">
  <div class="my-col">
    <div class="my-jumbotron">
      <h2>My Page</h2>
      <p>내 정보 확인페이지입니다.</p>
      <hr class="my-4" />
      <div class="my-container mt-2">
        <div class="my-row">
          <div class="my-col">
            <label for="name">이름</label>
          </div>
          <div class="my-col">
            <span id="name">{{ userInfo.name }}</span>
          </div>
        </div>
        <div class="my-row">
          <div class="my-col">
            <label for="userId">아이디</label>
          </div>
          <div class="my-col">
            <span id="userId">{{ userInfo.userId }}</span>
          </div>
        </div>
        <div class="my-row">
          <div class="my-col">
            <label for="email">이메일</label>
          </div>
          <div class="my-col">
            <input v-model="userInfo.email" class="my-input"/>
          </div>
        </div>
        <div class="my-row">
          <div class="my-col">
            <label for="selectedSido">거주지역</label>
          </div>
          <div class="my-col">
            <select v-model="userInfo.sidoCode" class="my-input">
                <option v-for="sido in sidos" :value="sido.value" :key="sido.value">{{ sido.text }}</option>
            </select>
          </div>
        </div>
        <div class="my-row">
          <div class="my-col">
            <label for="userId">기존 비밀번호</label>
          </div>
          <div class="my-col">
            <input type ="password" v-model="userInfo.password" class="my-input"/>
          </div>
        </div>
        <div class="my-row">
          <div class="my-col">
            <label for="userId">새로운 비밀번호</label>
          </div>
          <div class="my-col">
            <input type ="password" v-model="newpassword" class="my-input"/>
          </div>
        </div>
        <div class="my-row">
          <div class="my-col">
            <label for="userId">새로운 비밀번호2</label>
          </div>
          <div class="my-col">
            <input type ="password" v-model="newpassword2" class="my-input"/>
          </div>
        </div>
        <div v-if="newpassword !== newpassword2" class="error-message">두 개의 비밀번호가 일치하지 않습니다.</div>
      </div>
      <hr class="my-4" />
      <button type="button" class="btn custom-btn mr-1" @mouseover="changeButtonColor" @mouseout="resetButtonColor" @click = "modifyUser">
        정보수정
      </button>
      <button type="button" class="btn custom-btn" @mouseover="changeButtonColor" @mouseout="resetButtonColor">
        회원탈퇴
      </button>
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";


const memberStore = "memberStore";

export default {
  name: "UserModifyPage",
  data(){
    return{
      sidos: [{ value: '1', text: '서울' },
        { value: '2', text: '인천' },
        { value: '3', text: '대전' },
        { value: '4', text: '대구' },
        { value: '5', text: '광주' },
        { value: '6', text: '부산' },
        { value: '7', text: '울산' },
        { value: '8', text: '세종특별자치시' },
        { value: '31', text: '경기도' },
        { value: '32', text: '강원도' },
        { value: '33', text: '충청북도' },
        { value: '34', text: '충청남도' },
        { value: '35', text: '경상북도' },
        { value: '36', text: '경상남도' },
        { value: '37', text: '전라북도' },
        { value: '38', text: '전라남도' },
        { value: '39', text: '제주도' }],
        newpassword: "",
        newpassword2: "",
    }
  },
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    selectedSidoText() {
      const sido = this.sidos.find(item => item.value == this.userInfo.sidoCode);
      return sido ? sido.text : "선택하세요";
    },
  },
  methods: {
    ...mapActions(memberStore, ["updateUser"]),
    changeButtonColor(event) {
      event.target.style.backgroundColor = '#467cc2';
      event.target.style.color = '#fff';
    },
    resetButtonColor(event) {
      event.target.style.backgroundColor = '#fff';
      event.target.style.color = '#000';
    },
    modifyUser(){
        this.updateUser(this.userInfo);
    }
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
  margin-top: 5px;
}

.my-col {
  flex: 1;
}

.my-jumbotron {
  padding: 30px;
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