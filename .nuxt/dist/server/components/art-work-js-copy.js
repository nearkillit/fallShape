exports.ids = [3];
exports.modules = {

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ArtworkGL; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class ArtworkGL {
  constructor(props) {
    this.props = props;
    this.init();
  }

  init() {
    // サイズを指定
    const width = 960;
    const height = 540; // レンダラーを作成

    const renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({
      canvas: this.props.$canvas
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height); // シーンを作成

    const scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"](); // カメラを作成
    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)

    const camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](30, width / height);
    camera.position.set(0, 0, +1000); // 箱を作成

    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"](400, 400, 400);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshNormalMaterial"]();
    const box = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    scene.add(box);
    tick(); // 毎フレーム時に実行されるループイベントです

    function tick() {
      //   box.rotation.y += 0.01;
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    }
  }

}

/***/ })

};;
//# sourceMappingURL=art-work-js-copy.js.map