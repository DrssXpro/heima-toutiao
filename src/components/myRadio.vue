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
  watch: {
    status(newValue) {
      this.$store.commit("setRadioStatus", newValue);
    },
  },
  created() {
    this.status = this.labels[0];
    this.$store.commit("setRadioStatus", this.labels[0]);
  },
};
</script>

<style></style>
