<template>
  <div class="laboratories_page">
    <div class="laboratories_page_wrapper">
      <canvas class="rainbow-pixel-canvas"></canvas>
      <div id="drag-1" class="draggable">
        <p>Датчики тепла</p>
      </div>
      <div id="drag-2" class="draggable">
        <p>Датчики світла</p>
      </div>
      <div id="drag-2" class="draggable">
        <p>стенд 1</p>
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";

export default {
  name: "OneLaboratory",
  data: () => ({}),
  methods: {
    initDraw() {
      var pixelSize = 2;

      interact(".rainbow-pixel-canvas")
        .draggable({
          max: Infinity,
          maxPerElement: Infinity,
          origin: "self",
          modifiers: [
            interact.modifiers.snap({
              // snap to the corners of a grid
              targets: [interact.snappers.grid({ x: pixelSize, y: pixelSize })]
            })
          ],
          listeners: {
            // draw colored squares on move
            move: function(event) {
              var context = event.target.getContext("2d");
              // calculate the angle of the drag direction
              var dragAngle = (180 * Math.atan2(event.dx, event.dy)) / Math.PI;

              // set color based on drag angle and speed
              context.fillStyle = "rgba(90, 0, 0, 1)";
              // "hsl(" +
              // dragAngle +
              // ", 86%, " +
              // (30 + Math.min(event.speed / 1000, 1) * 50) +
              // "%)";

              // draw squares
              context.fillRect(
                event.pageX - pixelSize / 2,
                event.pageY - pixelSize / 2,
                pixelSize,
                pixelSize
              );
            }
          }
        })
        // clear the canvas on doubletap
        .on("doubletap", function(event) {
          var context = event.target.getContext("2d");

          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          resizeCanvases();
        });

      function resizeCanvases() {
        [].forEach.call(
          document.querySelectorAll(".rainbow-pixel-canvas"),
          function(canvas) {
            delete canvas.width;
            delete canvas.height;

            var rect = canvas.getBoundingClientRect();

            canvas.width = rect.width;
            canvas.height = rect.height;
          }
        );
      }

      resizeCanvases();

      // interact.js can also add DOM event listeners
      interact(window).on("resize", resizeCanvases);
    },
    initDrag() {
      // target elements with the "draggable" class
      interact(".draggable").draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true
          })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,

          // call this function on every dragend event
          end(event) {
            // var textEl = event.target.querySelector("p");
            // textEl &&
            //   (textEl.textContent =
            //     "moved a distance of " +
            //     Math.sqrt(
            //       (Math.pow(event.pageX - event.x0, 2) +
            //         Math.pow(event.pageY - event.y0, 2)) |
            //         0
            //     ).toFixed(2) +
            //     "px");
          }
        }
      });

      function dragMoveListener(event) {
        var target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px, " + y + "px)";

        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      }

      // this function is used later in the resizing and gesture demos
      window.dragMoveListener = dragMoveListener;
    }
  },
  mounted() {
    this.initDrag();
    this.initDraw();
  }
};
</script>

<style lang="scss" scoped>
.laboratories_page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.laboratories_page_wrapper {
  position: relative;
  height: 80vh;
  width: 90vw;
  border: 2px dotted black;
  canvas {
    padding: 0 !important;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
.draggable{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 20px;
  margin: 10%;
  background-color: #29e;
  color: white;
  border-radius: 0.75em;
  padding: 4%;
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  p {
    text-align: center;
  }
}
</style>