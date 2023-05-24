<template>
  <!-- Gallery item -->
  <div>
    <div class="bg-blue rounded shadow-sm child-container2">
      <!-- <img
        src="@/assets/NoImage.png"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      /> -->
      <div :id="plan.planId" style="width: 400px; height: 180px"></div>
      <div class="p-4" style="position: relative">
        <div style="display: flex; align-items: center">
          <h5 style="text-align: left; margin-right: auto">
            <router-link
              :to="{ name: 'shareview', params: { planId: plan.planId } }"
              class="plan-title-link"
            >
              {{ plan.title }}
            </router-link>
          </h5>
          <div style="display: flex; align-items: center">
            <font-awesome-icon
              :icon="['far', 'eye']"
              style="color: #6c757d; margin-right: 5px"
            />
            <p
              class="small text-muted mb-0"
              style="text-align: right; margin-bottom: 0"
            >
              {{ plan.views }}
            </p>
          </div>
        </div>
        <div style="display: flex; align-items: center">
          <div style="display: flex; align-items: center">
            <font-awesome-icon
              :icon="['far', 'user']"
              style="color: #6c757d margin-right: 5px;"
            />
            <p class="small text-muted mb-0" style="text-align: left">
              {{ plan.userId }}
            </p>
          </div>
          <div style="display: flex; align-items: center; margin-left: auto">
            <font-awesome-icon
              :icon="['far', 'calendar']"
              style="color: #6c757d; margin-right: 5px"
            />
            <p
              class="small text-muted mb-0"
              style="text-align: right; margin-bottom: 0"
            >
              {{
                new Date(plan.createDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              }}
            </p>
          </div>
        </div>
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
      staticMap: null,
      markers: [],
    };
  },
  props: {
    plan: Object,
  },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    // 마커 추가하기
    addMarkers() {
      api.get(`/plan/detail/${this.plan.planId}`).then((response) => {
        console.log("여행 위도 경도 불러오기 성공!!!");
        const temp = response.data;
        console.log(temp.planTravels.length);

        const positions = temp.planTravels.map((planTravel) => ({
          lat: planTravel.travelInfo.latitude,
          lng: planTravel.travelInfo.longitude,
        }));

        // 마커를 생성합니다
        this.markers = [];
        positions.forEach((position) => {
          const marker = new kakao.maps.Marker({
            map: this.staticMap, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(position.lat, position.lng), // 마커를 표시할 위치
          });
          this.markers.push(marker);
        });

        const bounds = positions.reduce(
          (bounds, position) =>
            bounds.extend(new kakao.maps.LatLng(position.lat, position.lng)),
          new window.kakao.maps.LatLngBounds()
        );
        this.staticMap.setBounds(bounds);

        // 선 그리는 거 넣어주기
        var planLinePositions = positions.map(
          (position) => new kakao.maps.LatLng(position.lat, position.lng)
        );

        var planLine = new kakao.maps.Polyline({
          path: planLinePositions, // 선을 구성하는 좌표배열입니다
          strokeWeight: 3, // 선의 두께입니다
          strokeColor: "black", // 선의 색깔입니다
          strokeOpacity: 0.7, // 선의 불투명도입니다
          strokeStyle: "solid", // 선의 스타일입니다
        });

        planLine.setMap(this.staticMap);
      });
    },
    replaceByDefault(e) {
      e.target.src = require("@/assets/NoImage.png");
    },
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&autoload=false";
      /* global kakao */
      script.onload = () => kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
      console.log("들어오나요구르트!~!!");
    },
    // 맵 출력하기
    loadMap() {
      var staticMapContainer = document.getElementById(this.plan.planId); // 이미지 지도를 표시할 div
      // var positions = [
      //   { lat: 33.450701, lng: 126.570667 },
      //   { lat: 33.450935, lng: 126.569477 },
      //   { lat: 33.450129, lng: 126.57121 },
      // ];

      // // 마커를 생성합니다
      // this.markers = [];
      // positions.forEach((position) => {
      //   const marker = new kakao.maps.Marker({
      //     position: new kakao.maps.LatLng(position.lat, position.lng), // 마커를 표시할 위치
      //     // title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      //     //   image: markerImage, // 마커의 이미지
      //   });
      //   this.markers.push(marker);
      // });

      // // 4. 지도를 이동시켜주기
      // // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      // const bounds = positions.reduce(
      //   (bounds, position) =>
      //     bounds.extend(new kakao.maps.LatLng(position.lat, position.lng)),
      //   new window.kakao.maps.LatLngBounds()
      // );

      // // this.staticMap.setBounds(bounds);
      // var sw = bounds.getSouthWest();
      // var ne = bounds.getNorthEast();

      var staticMapOption = {
        center: new window.kakao.maps.LatLng(36.355042, 127.29833),
        level: 3,
      };

      // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
      this.staticMap = new window.kakao.maps.Map(
        staticMapContainer,
        staticMapOption
      );

      this.addMarkers();
      console.log("들어오나요222");
    },
  },
};
</script>

<style scoped>
.child-container2 {
  margin-right: 20px;
  margin-bottom: 20px;
  border: solid 2px;
  border-color: #467cc2;
  height: 280px;
}
.img-height {
  max-width: 90%;
  height: 160px;
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
