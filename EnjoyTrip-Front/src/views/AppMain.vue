<template>
  <section>
    <!-- 관광지 드롭다운메뉴 시작-->
    <div class="background" style="padding: 1%">
      <div class="list-container">
        <header class="bg-dark py-5">
          <div class="container px-5">
            <div class="row gx-5 align-items-center justify-content-center">
              <div class="col-lg-8 col-xl-7 col-xxl-6">
                <div class="my-5 text-center text-xl-start">
                  <h1 class="display-5 fw-bolder text-white mb-2">
                    Enjoy Trip으로
                  </h1>
                  <h1 class="display-5 fw-bolder text-white mb-2">
                    여행을 시작해보세요!
                  </h1>
                  <p class="lead fw-normal text-white-50 mb-4">
                    지역별 다양한 여행지를 확인해보고, 나만의 여행지를 만들어
                    여행 계획을 세워보세요
                  </p>
                  <div
                    class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start"
                  >
                    <!-- <a class="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a> -->
                    <a
                      class="btn btn-outline-light btn-lg px-4"
                      href="${root}/attraction?action=searchtrip"
                      >Go Search</a
                    >
                  </div>
                </div>
              </div>
              <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                <img
                  class="img-fluid rounded-3 my-5"
                  src="@/assets/airplane.jpg"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
    <!-- 관광지 드롭다운메뉴 끝-->
  </section>
</template>

<script>
export default {
  name: "AppMain",
  props: {
    msg: String,
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
</style>
