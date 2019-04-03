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
  props: {
    works: Array,
    currentWork: Object
  },
  methods: {
    handleClick(id) { 
      this.$emit('change', id)
    }
  },
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
    currentIndex: Number,
    thumbsWorksArray: Array
  },
  template: "#slider-display"
};

new Vue({
  el: "#works-slider-component",
  data() {
    return {
      works: [],
      currentIndex: 0,
      thumbsWorksArray: []
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
          const lastSlide = this.thumbsWorksArray[this.thumbsWorksArray.length - 1];
          this.thumbsWorksArray.unshift(lastSlide);
          this.thumbsWorksArray.pop();
          break;
        case "prev":
          this.thumbsWorksArray.push(this.thumbsWorksArray[0]);
          this.thumbsWorksArray.shift();
          this.currentIndex--;
          break;
      }
    },
    makeInfititeLoopForCurIndex(value) {
      const worksAmount = this.works.length - 1;

      if (value > worksAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmount;
    },
    handleChange(id) {
      let index;
      let work;
      this.thumbsWorksArray.forEach((item, ndx) => {
        if (ndx !==0 && item.id === id) {
          index = ndx;
          work = item;
        }
      })
      const arr = this.thumbsWorksArray.splice(0, index);
      this.thumbsWorksArray = [...this.thumbsWorksArray, ...arr];
      this.currentIndex = this.works.indexOf(work);
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
    this.thumbsWorksArray = [...works];
    this.thumbsWorksArray = this.thumbsWorksArray.reverse()
  },
  template: "#slider-container"
});
