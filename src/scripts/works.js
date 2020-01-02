import Vue from "vue";

const btns = {
  template: "#slider-btns",
  methods: {
    slide(direction) {
      switch (direction) {
        case "next":
          break;
        case "prev":
          break;
      }
    }
  }
};

const thumbs = {
  template: "#slider-thumbs",
  data() {
    return {
      translate: 0,
      thumbHeight: 0,
      thumbsHeight: 0,
    }
  },
  props: {
    works: Array,
    currentWork: Object,
    currentIndex: Number
  },
  watch: {
    currentIndex(newValue, oldValue) {
      this.thumbHeight = this.$refs.thumb[0].offsetHeight;
      this.thumbsHeight = this.$refs.thumbs.offsetHeight;
      const newThumbsHeight = this.thumbHeight * (this.works.length - newValue);
      const thumbsInList = Math.round(this.thumbsHeight / this.thumbHeight);
      if (newThumbsHeight > this.thumbsHeight) {
        this.translate = -this.thumbHeight * (this.works.length - newValue - thumbsInList);
      } else if (newValue = (this.works.length - 1)) {
        this.translate = 0; 
      }
    }
  }
};

const tags = {
  template: "#slider-tags",
  props: {
    tags: Array
  }
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: {
    currentWork: Object
  },
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(',')
    }
  }
};

const display = {
  components: { btns, thumbs },
  props: {
    works: Array,
    currentWork: Object,
    currentIndex: Number
  },
  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.reverse();
    }
  },
  template: "#slider-display"
};

new Vue({
  el: "#works-slider-component",
  data() {
    return {
      works: [],
      currentIndex: 0
    };
  },
  components: {
    display,
    info
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  methods: {
    makeArrWithRequiredImages(dataArray) {
      return dataArray.map((item, i) => {
        const requredPic = require(`../images/content/${item.photo}`);
        item.photo = requredPic;

        return item;
      });
    },
    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
      }
    },
    makeInfititeLoopForCurIndex(value) {
      const worksAmount = this.works.length - 1;

      if (value > worksAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmount;
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfititeLoopForCurIndex(value);
    }
  },
  created() {
    const data = require("../data/works.json");
    const works = this.makeArrWithRequiredImages(data);

    this.works = works;
    this.currentIndex = this.works.length - 1;
  },
  template: "#slider-container"
});
