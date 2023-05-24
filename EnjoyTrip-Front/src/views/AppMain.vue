<template>
  <section>
    <router-link v-if="slideIndex === 0" :to="{ name: 'planview' }">
      <a
        class="btn btn-outline-light mainpage-btn"
        style = "padding: 0 300x;"
        >Plannig a Trip</a
      >
    </router-link>
    <router-link v-else-if="slideIndex === 1" :to="{ name: 'boardlist' }">
      <a
        class="btn btn-outline-dark mainpage-btn2"
        style = "padding: 0 300x;"
        >View Announcement</a
      >
    </router-link>
    <div class="background mainpage-img" style="padding: 0% 1%">
      <div class="slider my-5">
        <div class="slide">
          <img class="img-fluid" :src="slideImages[slideIndex]" alt="Slide Image" />
        </div>
      </div>
      <div class="controls">
        <button class="prev-btn" @click="clickPrevSlide">&#8249;</button>
        <button class="next-btn" @click="clickNextSlide">&#8250;</button>
      </div>
    </div>

    <div class = "popular-plan">인기 여행일정</div>
    <div>다른 여행자들의 일정을 참고하여 나만의 여행 계획을 세우세요.</div>
    <b-container>
      <div class = "plan-list">
        <plan-list-item
          v-for="plan in plans"
          :key="plan.planId"
          :plan="plan"
        />
      </div>
    </b-container>

  </section>
</template>

<script>
import PlanListItem from "@/components/share/ShareListItem.vue"
import { listPlanTop6 } from "@/api/share";

export default {
  name: "AppMain",
  data() {
    return {
      plans: [],
      slideIndex: 0,
      slideImages: [require("@/assets/mainpage1.png"), require("@/assets/mainpage2.png")]
    }
  },
  props: {
    msg: String,
  },
  components:{
    PlanListItem
  },
  created(){
    listPlanTop6(
      ({ data }) => {
        this.plans = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  mounted() {
    setInterval(this.nextSlide, 5000);
  },
  methods: {
    nextSlide() {
      this.slideIndex++;
      if (this.slideIndex >= this.slideImages.length) {
        this.slideIndex = 0;
      }
    },
    clickPrevSlide() {
      this.slideIndex--;
      if (this.slideIndex < 0) {
        this.slideIndex = this.slideImages.length - 1;
      }
    },
    clickNextSlide() {
      this.slideIndex++;
      if (this.slideIndex >= this.slideImages.length) {
        this.slideIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
.mainpage-img{
  position: relative;
}
.mainpage-btn{
  position: absolute;
  top: 25%;
  left: 61%;
  transform: translate(-50%, -50%);
  z-index: 1;

  padding: 0.5rem 120px;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.mainpage-btn2{
  position: absolute;
  top: 25%;
  left: 61%;
  transform: translate(-50%, -50%);
  z-index: 1;

  padding: 0.5rem 100px;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
.popular-plan{
  color: #363636;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  text-align: center;
}
.plan-list{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 50px 24px;
}
.slider {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.slide {
  width: 100%;
  height: 100%;
}

.img-fluid {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.controls {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.prev-btn,
.next-btn {
  background-color: transparent;
  border: none;
  font-size: 100px;
  padding: 10px;
}

.prev-btn {
  position: absolute;
  left: -900px;
  top: -100px;
}

.next-btn {
  position: absolute;
  right: 0;
  right: -900px;
  top: -100px;
}
</style>