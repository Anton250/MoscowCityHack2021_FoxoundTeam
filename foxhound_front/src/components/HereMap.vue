<template>
  <div id="map" class="mt-0">
    <div
      id="mapContainer"
      style="height: 600px; width: 100%"
      ref="hereMap"
    ></div>
  </div>
</template>

<script>
const H = window.H;
export default {
  name: "HereMap",
  props: {
    center: Object,
  },
  data() {
    return {
      platform: null,
      apikey: "78bhiTliLYkKcCMilhXup8uJVRnoWcMvJaVJbFNOWrA",
      map: null,
      ui: null,
      heatmap: new H.data.heatmap.Provider({
        colors: new H.data.heatmap.Colors(
          {
            0: "#0d0b86",
            0.2: "#4d03a0",
            0.3: "#7c07a6",
            0.4: "#a82396",
            0.5: "#cb4779",
            0.6: "#e56b5c",
            0.7: "#f89540",
            0.8: "#fdc52a",
            1: "#f0f922",
          },
          true
        ),
        opacity: 1,
      }),
    };
  },
  watch: {
    items() {
      this.addItems();
    },
    newLine() {
      if (this.$store.state.lineObj) {
        this.map.removeObject(this.$store.state.lineObj);
        this.$store.commit("setLineObj", null);
      }
      if (this.newLine.points.length >= 2) {
        var lineString = new H.geo.LineString();
        for (let point of this.newLine.points) {
          lineString.pushPoint({ lat: point.lat, lng: point.lng });
        }
        this.$store.commit(
          "setLineObj",
          this.map.addObject(
            new H.map.Polyline(lineString, { style: this.newLine.style })
          )
        );
      }
    },
    heatMapData() {
      this.createHeatMap(this.heatMapData);
    },
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap();
    this.addItems();
  },
  computed: {
    newLine() {
      return {
        points: this.$store.state.linePoints,
        style: this.$store.state.lineStyle,
      };
    },
    items() {
      if (!this.$store.state.showObjects) return [];
      let items = [...this.$store.state.items];
      return items.sort((a, b) => {
        if (a.size >= b.size) {
          return -1;
        } else {
          return 1;
        }
      });
    },
    heatMapData() {
      if (!this.$store.state.showHeatMap) return [];
      return this.$store.state.heatMapData;
    },
  },
  methods: {
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 13,
        center: this.center,
      });

      addEventListener("resize", () => map.getViewPort().resize());
      var t = this;
      map.addEventListener("tap", function (evt) {
        if (!t.$store.state.redactorMode) return;
        var coord = map.screenToGeo(
          evt.currentPointer.viewportX,
          evt.currentPointer.viewportY
        );
        if (t.$store.state.circleDraw) {
          // Open edit modal:
          var q = {
            ...t.$route.query,
            lat: coord.lat,
            lng: coord.lng,
            modalType: "editPointModal",
          };
          t.$router.push({ name: t.$route.name, query: q });
        } else if (t.$store.state.lineDraw) {
          let points = [...t.$store.state.linePoints];
          points.push({ lat: coord.lat, lng: coord.lng });
          t.$store.commit("setLinePoints", points);
        }
      });

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      this.ui = H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map

      this.map = map;
      map.addLayer(new H.map.layer.TileLayer(this.heatmap));
    },
    createHeatMap(data) {
      this.heatmap.clear();
      this.heatmap.addData(data, true);
    },
    addItems() {
      this.map.removeObjects(this.map.getObjects());
      let t = this;
      for (let [index, item] of this.items.entries()) {
        if (item.type == "circle") {
          var circle = new H.map.Circle(
            { lat: item.lat, lng: item.lng },
            item.size,
            { style: item.style }
          );
          // Add the circle to the map:
          circle.setData({ index: index, data: item.data });
          circle.addEventListener(
            "tap",
            function (evt) {
              if (t.$store.state.redactorMode && !t.$store.state.deleteMode)
                return;
              else if (t.$store.state.redactorMode) {
                t.$bvModal
                  .msgBoxConfirm("Удалить элемент?", {
                    title: "Внимание",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "danger",
                    okTitle: "Да",
                    cancelTitle: "Нет",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true,
                  })
                  .then((value) => {
                    if (value) {
                      t.$store.commit("removeItem", evt.target.getData().index);
                    }
                  });
                return;
              }
              var bubble = new H.ui.InfoBubble(
                t.map.screenToGeo(
                  evt.currentPointer.viewportX,
                  evt.currentPointer.viewportY
                ),
                {
                  content: evt.target.getData().data,
                }
              );
              t.ui.addBubble(bubble);
            },
            false
          );
          this.map.addObject(circle);
        } else if (item.type == "line") {
          var lineString = new H.geo.LineString();
          for (let point of item.points) {
            lineString.pushPoint({ lat: point.lat, lng: point.lng });
          }
          let polyline = new H.map.Polyline(lineString, { style: item.style });
          polyline.setData({ index: index });
          polyline.addEventListener(
            "tap",
            function (evt) {
              if (t.$store.state.redactorMode && t.$store.state.deleteMode) {
                t.$bvModal
                  .msgBoxConfirm("Удалить элемент?", {
                    title: "Внимание",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "danger",
                    okTitle: "Да",
                    cancelTitle: "Нет",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true,
                  })
                  .then((value) => {
                    if (value) {
                      t.$store.commit("removeItem", evt.target.getData().index);
                    }
                  });
                return;
              }
            },
            false
          );
          this.map.addObject(polyline);
        }
      }
    },
  },
};
</script>

<style scoped>
#map {
  text-align: center;
  background-color: #ccc;
}
</style>