<template lang="pug">
  div.root-wrapper-container
    div.root-container
      template(v-if="$route.meta.public")
        router-view

      template(v-else)
        header.header-container
          app-header
        section.tabs-container
          tabs
        main.content-container
          .container
            router-view(:pageTitle="$route.meta.title")
    .tooltips-container(:class="{'showed' : showed}")
        tooltip(type="error")
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {
    appHeader: () => import("components/header"),
    tabs: () => import("components/tabs"),
    tooltip: () => import("components/tooltip")
  },
  computed: {
    ...mapState("tooltips", {
      showed: state => state.showed
    })
  },
  methods: {
    ...mapActions("tooltips", ["closeTooltip"])
  },
  watch: {
    showed(value) {
      if (value === true) {
        let timeout;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          this.closeTooltip();
        }, 3000);
      }
    }
  }
};
</script>


<style lang="pcss">
@import "normalize.css";
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";

.root-wrapper-container {
  height: 100%;
}

.header-container {
  background: linear-gradient(to right, #3e3e59, #454573);
  padding: 15px 0;
}

.root-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content-container {
  background: url("~images/bg/admin.jpg") center center no-repeat / cover;
}

.admin-wrapper {
  display: flex;

  .maincontent {
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
}

.content-container {
  flex: 1;
  padding-top: 60px;
}

.page-title {
  margin-bottom: 60px;
  font-size: 21px;
  font-weight: bold;
}

.tooltips-container {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 110%) ;
  visibility: hidden;
  transition: 0.3s;

  &.showed {
    transform: translate(-50%, 0%);
    visibility: visible;
  }
}

button {
  background: transparent;
}
</style>

