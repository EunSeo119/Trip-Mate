<template>
  <!-- Gallery item -->
  <div>
     <div class="bg-blue rounded shadow-sm child-container2">
      <img
        src="@/assets/NoImage.png"
        class="img-fluid card-img-top img-height mt-3"
        @error="replaceByDefault"
      />
      <div class="p-4" style="position: relative;">
        <div style="display: flex; align-items: center;">
          <h5 style = "text-align: left; margin-right: auto;">{{plan.title}}</h5>
          <div style="display: flex; align-items: center;">
            <font-awesome-icon :icon="['far', 'eye']" style="color: #6c757d; margin-right: 5px;" />
            <p class="small text-muted mb-0" style = "text-align: right; margin-bottom: 0;">{{plan.views}}</p>
          </div>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="display: flex; align-items: center;">
            <font-awesome-icon :icon="['far', 'user']" style="color: #6c757d margin-right: 5px;" />
            <p class="small text-muted mb-0" style = "text-align: left;">{{plan.userId}}</p>
          </div>
          <div style="display: flex; align-items: center; margin-left: auto;">
            <font-awesome-icon :icon="['far', 'calendar']" style="color: #6c757d; margin-right: 5px;" />
            <p class="small text-muted mb-0" style = "text-align: right; margin-bottom: 0;">
              {{  new Date(plan.createDate).toLocaleDateString("en-US", {
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


export default {
  name: "PlanListItem",
  props: {
    plan: Object,
  },
  methods:{
    replaceByDefault(e) {
      e.target.src = require("@/assets/NoImage.png");
    },
  }
};
</script>

<style scoped>
.child-container2{
  margin-right: 20px;
  margin-bottom: 20px;
  border: solid 2px;
  border-color: #467cc2;
  height: 280px;
}
.img-height{
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
