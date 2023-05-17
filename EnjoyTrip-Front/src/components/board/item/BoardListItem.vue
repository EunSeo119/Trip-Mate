<template>
  <b-tr>
    <b-td>{{ articleno }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'boardview', params: { articleno: articleno } }">{{ title }}</router-link>
    </b-th>
    <b-td>{{ createDate | dateFormat }}</b-td>
    <b-td>{{ views }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
    noticeId: Number,
    title: String,
    views: Number,
    createDate: String,
  },
  filters: {
    dateFormat(createDate) {
      return moment(new Date(createDate)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
