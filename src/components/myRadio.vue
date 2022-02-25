<template>
  <div class="my-radio">
    <el-radio-group v-model="status" size="small">
      <el-radio
        v-for="(item, index) in items"
        :key="index"
        :label="labels[index]"
        >{{ item }}</el-radio
      >
    </el-radio-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      status: "",
    };
  },
  computed: {
    ...mapState("m_article", ["radioStatus"]),
  },
  watch: {
    status(newValue) {
      this.$emit("radioStatusChange", newValue);
    },
    radioStatus(newValue) {
      this.status = newValue;
    },
  },
  created() {
    this.status = this.labels[0];
  },
};
</script>

<style></style>
