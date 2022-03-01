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
    <template v-if="isHasCover && status != -1">
      <div class="uploadBox">
        <upload-cover
          v-for="(item, index) in status"
          :key="index"
          @onlineImgURL="handleOnlineURL(index, $event)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import uploadCover from "./uploadCover.vue";
export default {
  components: {
    uploadCover,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    isHasCover: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      status: "",
      imagesURL: [],
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
  methods: {
    handleOnlineURL(index, URL) {
      console.log(index, URL);
      this.imagesURL[index] = URL;
      this.$store.commit("m_article/setImageCoverURL", this.imagesURL);
    },
  },
};
</script>

<style lang="less">
.uploadBox {
  display: flex;
}
</style>
