<template>
  <b-container class="bv-example-row mt-3">
    <b-row class = "mt-5">
      <b-col>
        <h3>글수정</h3>
      </b-col>
    </b-row>
    <board-input-item type="modify" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem";

export default {
  name: "BoardModify",
  components: {
    BoardInputItem,
  },
};
</script>

<style></style>
