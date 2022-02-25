export default {
  title: [
    {
      required: true,
      message: "请输入文章标题",
      trigger: "blur",
    },
    {
      min: 5,
      max: 30,
      message: "标题长度在 5 到 30 个字符",
      trigger: "blur",
    },
  ],
  content: [
    {
      validator(rule, value, cb) {
        if (value === "<p></p>") {
          cb(new Error("请输入文章内容"));
        } else {
          cb();
        }
      },
    },
    {
      required: true,
      message: "请输入文章内容",
      trigger: "blur",
    },
  ],
  channel_id: [
    {
      required: true,
      message: "请选择文章频道",
    },
  ],
};
