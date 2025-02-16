<script>
export default {
  name: "AwardCard",
  components: {},
  data() {
    return {};
  },
  methods: {
    goEdit() {
      try {
        this.$router.push({ name: "awards_add", query: { id: this.id } });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
  props: {
    id: String,
    name: String,
    description: String,
    photo_path: String,
  },
};
</script>
<template>
  <div class="hero" @click="goEdit()">
    <div class="wrap-image">
      <img
        class="image"
        :src="`http://213.139.211.149:4000/files/${photo_path}`"
        alt=""
      />
    </div>
    <span class="name">{{ name }}</span>
    <span class="desc">{{ description }}</span>
  </div>
</template>
<style scoped>
.hero {
  cursor: pointer;
  transition: all 500ms ease;
}
.wrap-image {
  border-radius: 8px;
  width: 100%;
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  height: 180px;
  object-fit: contain;
}

.name {
  font-weight: 700;
  font-size: 18px;
  line-height: 24.59px;
}

.desc {
  color: black;
}

.wrap-btns {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 6px 14px;
  border-radius: 38.32px;
  font-weight: 600;
}

.accept {
  background-color: #f0feed;
  color: #259800;
}

.cancel {
  background-color: #feeded;
  color: #dc2626;
}
</style>
