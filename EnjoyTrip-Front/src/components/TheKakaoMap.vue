<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  components: {},
  data() {
    return {
      map: null,
      positions: [],
      markers: [],
      planMarkers: [],
      planPositions: [],
      planLine: null,
      distanceOverlay: null,
    };
  },
  props: {
    travels: [],
    planTravels: [],
  },
  watch: {
    travels() {
      console.log("여행지", this.travels);
      this.positions = [];
      this.travels.forEach((travel) => {
        let obj = {};
        obj.title = travel.title;
        obj.latlng = new kakao.maps.LatLng(travel.latitude, travel.longitude);
        console.log(obj);

        this.positions.push(obj);
      });
      if (0 < this.travels.length) {
        this.loadMaker();
      }
    },

    planTravels() {
      console.log("여행계획의 정보정보!!!!");
      console.log(this.planTravels);
      this.planPositions = [];
      this.planTravels.forEach((travel) => {
        let obj = {};
        obj.title = travel.title;
        obj.latlng = new kakao.maps.LatLng(travel.lat, travel.lng);
        this.planPositions.push(obj);
      });
      this.loadPlanMarker();
    },
  },
  created() {
    console.log("여행계획의 정보정보!!!!");
    console.log(this.planTravels);
    this.planPositions = [];
    this.planTravels.forEach((travel) => {
      let obj = {};
      obj.title = travel.title;
      obj.latlng = new kakao.maps.LatLng(travel.lat, travel.lng);
      this.planPositions.push(obj);
    });
    this.loadPlanMarker();
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
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&autoload=false";
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");
      var options = null;
      console.log("이이이잉거거거걱");
      // console.log(this.planTravels[0].lat);
      if (this.planTravels.length === 0) {
        options = {
          center: new window.kakao.maps.LatLng(36.355042, 127.29833),
          level: 3,
        };
      } else {
        options = {
          center: new window.kakao.maps.LatLng(
            this.planTravels[0].lat,
            this.planTravels[0].lng
          ),
          level: 3,
        };
      }

      this.map = new window.kakao.maps.Map(container, options);
      //   this.loadMaker();
    },
    // 지정한 위치에 마커 불러오기
    loadMaker() {
      // 현재 표시되어있는 marker들이 있다면 marker에 등록된 map을 없애준다.
      console.log("1111");
      this.deleteMarker();
      console.log("2222");
      // 마커 이미지를 생성합니다
      //   const imgSrc = require("@/assets/map/markerStar.png");
      // 마커 이미지의 이미지 크기 입니다
      //   const imgSize = new kakao.maps.Size(24, 35);
      //   const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 마커를 생성합니다
      this.markers = [];
      this.positions.forEach((position) => {
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: position.latlng, // 마커를 표시할 위치
          title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          //   image: markerImage, // 마커의 이미지
        });
        this.markers.push(marker);
      });
      console.log("마커수 ::: " + this.markers.length);

      // 4. 지도를 이동시켜주기
      // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      const bounds = this.positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new window.kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
    },
    deleteMarker() {
      console.log("마커 싹 지우자!!!", this.markers.length);
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          console.log(item);

          item.setMap(null);
        });
      }
    },
    loadPlanMarker() {
      this.deletePlanMarker();

      // 선 지우는거 넣어주기
      if (this.planLine != null) {
        this.planLine.setMap(null);
      }

      if (this.planPositions.length < 1) {
        return;
      }

      // 마커 이미지를 생성합니다
      const imgSrc = require("@/assets/heartMarker.png");
      // 마커 이미지의 이미지 크기 입니다
      const imgSize = new kakao.maps.Size(45, 50);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

      // 마커를 생성합니다
      this.planMarkers = [];
      this.planPositions.forEach((position) => {
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: position.latlng, // 마커를 표시할 위치
          title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커의 이미지
          zIndex: 2,
        });
        this.planMarkers.push(marker);
      });

      if (this.planMarkers.length < 2) {
        this.distanceOverlay.setMap(null);
        this.distanceOverlay = null;
        return;
      }

      // 선 그리는 거 넣어주기
      var planLinePositions = [];

      this.planPositions.forEach((position) => {
        planLinePositions.push(position.latlng);
      });

      this.planLine = new kakao.maps.Polyline({
        path: planLinePositions, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 3, // 선의 두께 입니다
        strokeColor: "black", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      this.planLine.setMap(this.map);

      // 오버레이(거리 정보) 표시
      var path = this.planLine.getPath();

      var distance = Math.round(this.planLine.getLength());
      var content = this.getTimeHTML(distance);

      this.showDistnace(content, path[path.length - 1]);
    },
    deletePlanMarker() {
      if (this.planMarkers.length > 0) {
        this.planMarkers.forEach((item) => {
          console.log(item);

          item.setMap(null);
        });
      }
    },
    hoverMarker(name) {
      this.markers.forEach((marker) => {
        // console.log("이름1" + name);
        // console.log("이름2" + marker.getTitle());
        if (marker.getTitle() == name) {
          // 마커 이미지를 생성합니다
          const imgSrc = require("@/assets/starMarker.png");
          // 마커 이미지의 이미지 크기 입니다
          const imgSize = new kakao.maps.Size(45, 50);
          const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);

          marker.setImage(markerImage);
          marker.setZIndex(1);
          // 마커 위치로 지도 중심 이동시키기
          this.map.panTo(marker.getPosition());
        }
      });
    },
    clickPlan(lat, lng) {
      var moveLatLon = new kakao.maps.LatLng(lat, lng);
      this.map.panTo(moveLatLon);
    },
    hoverOutMarker(name) {
      this.markers.forEach((marker) => {
        console.log("이름1" + name);
        console.log("이름2" + marker.getTitle());
        if (marker.getTitle() == name) {
          marker.setImage(null);
          // marker.setZIndex(1);
        }
      });
    },
    getTimeHTML(distance) {
      var resultDistance;
      var unit;
      if (distance >= 1000) {
        resultDistance = Math.round((distance / 1000) * 10) / 10;
        unit = "km";
      } else {
        resultDistance = distance;
        unit = "m";
      }

      // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
      var walkkTime = (distance / 67) | 0;
      var walkHour = "",
        walkMin = "";

      // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
      if (walkkTime > 60) {
        walkHour =
          '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
      }
      walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

      // 자동차 평균 시속은 80km/h 이고 이것을 기준으로 자전거의 분속은 1330m/min입니다
      var carTime = (distance / 1330) | 0;
      var carHour = "",
        carMin = "";

      // 계산한 자동차 시간이 60분 보다 크면 시간으로 표출합니다
      if (carTime > 60) {
        carHour =
          '<span class="number">' + Math.floor(carTime / 60) + "</span>시간 ";
      }
      carMin = '<span class="number">' + (carTime % 60) + "</span>분";

      // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
      var content = '<ul class="dotOverlay distanceInfo">';
      content += "    <li>";
      content +=
        '        <span class="label">총거리</span><span class="number">' +
        resultDistance +
        "</span>" +
        unit;
      content += "    </li>";
      content += "    <li>";
      content += '        <span class="label">도보</span>' + walkHour + walkMin;
      content += "    </li>";
      content += "    <li>";
      content += '        <span class="label">자동차</span>' + carHour + carMin;
      content += "    </li>";
      content += "</ul>";

      return content;
    },
    showDistnace(content, finalTravel) {
      if (this.distanceOverlay) {
        // 커스텀오버레이가 생성된 상태이면

        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        this.distanceOverlay.setPosition(finalTravel);
        this.distanceOverlay.setContent(content);
      } else {
        // 커스텀 오버레이가 생성되지 않은 상태이면

        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        this.distanceOverlay = new kakao.maps.CustomOverlay({
          map: this.map, // 커스텀오버레이를 표시할 지도입니다
          content: content, // 커스텀오버레이에 표시할 내용입니다
          position: finalTravel, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
      }
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 700px;
}

.dotOverlay {
  position: relative;
  bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;
  font-size: 12px;
  padding: 5px;
  background: #fff;
}
.dotOverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.number {
  font-weight: bold;
  color: #ee6152;
}
.dotOverlay:after {
  content: "";
  position: absolute;
  margin-left: -6px;
  left: 50%;
  bottom: -8px;
  width: 11px;
  height: 8px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png");
}
.distanceInfo {
  position: relative;
  top: 5px;
  left: 5px;
  list-style: none;
  margin: 0;
}
.distanceInfo .label {
  display: inline-block;
  width: 50px;
}
.distanceInfo:after {
  content: none;
}
</style>
