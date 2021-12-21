exports.ids = [1,2];
exports.modules = {

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(132);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(6).default
module.exports.__inject__ = function (context) {
  add("ecd89008", content, true, context)
};

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ArtworkGL; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(115);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cannon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(116);
/* harmony import */ var cannon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cannon__WEBPACK_IMPORTED_MODULE_1__);

 // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class ArtworkGL {
  constructor(props) {
    this.state = {};
    this.addbox = [];
    this.lastTime = '';
    this.fixedTimeStep = 1.0 / 60.0; // seconds

    this.maxSubSteps = 10;
    this.CONSTANT = {
      initPoint: {
        x: 0,
        y: 0,
        z: 0
      },
      initWeight: 5,
      initMass: 5,
      positionY: 20,
      margin: 20,
      rotate: {
        x: 0,
        y: 0,
        z: 0
      },
      ground_size: 100,
      axis_rotate: 0,
      limit: 2,
      width: 100,
      height: 100,
      color1: '#cccccc'
    };
    this.world = new cannon__WEBPACK_IMPORTED_MODULE_1__["World"]();
    this.scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
    this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](80, window.innerWidth / window.innerHeight);
    this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({
      canvas: props.$canvas
    }); // this.renderer = new THREE.WebGLRenderer()

    this.props = props;
    this.init();
  }

  init() {
    // init World
    this.world.gravity.set(0, -9.82, 0); // m/s²

    this.camera.position.set(0, 0, 100); // generate object

    this.generate(); // light
    // 環境光源

    const ambient = new three__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"](0xffffff, 1);
    this.scene.add(ambient); // 平行光源

    const direction = new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xffffff, 1);
    this.scene.add(direction); // // 点光源
    // const pointLight = new THREE.PointLight(0xffffff, 10, 100, 1.0)
    // pointLight.position.set(7, 0, 0)
    // this.scene.add(pointLight)
    // // 照明を可視化するヘルパー
    // const lightHelper = new THREE.PointLightHelper(pointLight)
    // this.scene.add(lightHelper)
    // controls ------------------------------
    // const controls = new OrbitControls(this.camera, this.props.$canvas)
    // controls.maxDistance = 5000.0
    // renderer
    // const renderer = new THREE.WebGLRenderer()

    this.renderer.setSize(window.innerWidth, window.innerHeight); // add helper
    // const gridHelper = new THREE.GridHelper(1000, 20) // size, step
    // this.scene.add(gridHelper)
    // const axisHelper = new THREE.AxisHelper(1000, 50)
    // this.scene.add(axisHelper)
    // X軸が赤色、Y軸が緑色、Z軸が青色

    this.render();
    requestAnimationFrame(() => this.animate(0));
  }

  Ground(size) {
    // cannon body ----------
    const body = new cannon__WEBPACK_IMPORTED_MODULE_1__["Body"]({
      mass: 0 // mass == 0 makes the body static

    });
    body.addShape(new cannon__WEBPACK_IMPORTED_MODULE_1__["Plane"]()); // cannonではz軸を上向きの軸としてるので、床を設置するとxy面に床が生成される
    // three.jsだとy軸を上向き軸としがちなので、変な感じにならないようにx軸に90度回転させてあげる。

    body.quaternion.setFromAxisAngle(new cannon__WEBPACK_IMPORTED_MODULE_1__["Vec3"](1, 0, 0), -Math.PI / 2); // three mesh ----------

    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](size, size);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
      color: this.CONSTANT.color1,
      side: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"]
    });
    const mesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0;
    return {
      body,
      mesh
    };
  }
  /**
   * 箱作る
   * @return {body, mesh} ThreejsのmeshとCannon.jsのbodyを返す
   */


  Box(props) {
    const {
      point,
      weight,
      mass
    } = props; // cannon body ----------

    const body = new cannon__WEBPACK_IMPORTED_MODULE_1__["Body"]({
      mass,
      // kg
      position: new cannon__WEBPACK_IMPORTED_MODULE_1__["Vec3"](point.x, point.y, point.z),
      // m
      shape: new cannon__WEBPACK_IMPORTED_MODULE_1__["Box"](new cannon__WEBPACK_IMPORTED_MODULE_1__["Vec3"](weight / 2, weight / 2, weight / 2))
    }); // 回転追加してみる
    // body.angularVelocity.set(Math.random(), Math.random(), 0)
    // three mesh ----------

    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"](weight, weight, weight);
    const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshStandardMaterial"]({
      color: 0xaa0000,
      roughness: 0.0
    });
    const mesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
    mesh.position.set(point.x, point.y, point.z);
    return {
      body,
      mesh
    };
  }

  generate() {
    // 床
    const ground = this.Ground(this.CONSTANT.ground_size);
    this.scene.add(ground.mesh);
    this.world.addBody(ground.body);
    const boxPosition = {
      x: 0,
      y: this.CONSTANT.positionY,
      z: 0
    };
    const box = this.state.box = this.Box({
      point: boxPosition,
      weight: this.CONSTANT.initWeight,
      mass: this.CONSTANT.initMass
    });
    this.scene.add(box.mesh);
    this.world.addBody(box.body);
  }

  animate(time) {
    const {
      box
    } = this.state;

    if (this.lastTime !== undefined) {
      const dt = (time - this.lastTime) / 1000;
      this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
    }

    const {
      mesh,
      body
    } = box; // Cannno.js の Three.js へのつなぎこみは
    // copy で body の position, quaternion を mesh に反映させるだけ！

    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion); // makebox

    this.addbox.map(ab => {
      ab.mesh.position.copy(ab.body.position);
      ab.mesh.quaternion.copy(ab.body.quaternion);
      return ab;
    });
    this.lastTime = time;
    this.render(); // this.camera.lookAt(new THREE.Vector3(200, 0, 100))

    requestAnimationFrame(() => this.animate(0));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  } // add methods


  makeBox(getPostion) {
    const mouse = new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
    mouse.x = getPostion.x / window.innerWidth * 2 - 1;
    mouse.y = -(getPostion.y / window.innerHeight) * 2 + 1;
    mouse.y = mouse.y < 0 ? 0.1 : mouse.y;
    const boxPosition = {
      x: mouse.x * this.CONSTANT.ground_size,
      y: mouse.y * this.CONSTANT.ground_size,
      z: 0
    };
    const box = this.Box({
      point: boxPosition,
      weight: this.CONSTANT.initWeight,
      mass: this.CONSTANT.initMass
    });
    this.addbox.push(box);
    this.scene.add(box.mesh);
    this.world.addBody(box.body);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

}

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(126);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(5);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".artwork{position:fixed;top:0;left:0;width:100%;height:100%;background:#eaf2f5}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ArtWork/index.vue?vue&type=template&id=a8168f28&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"artwork"},[_vm._ssrNode("<canvas class=\"artwork__canvas\"></canvas>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/ArtWork/index.vue?vue&type=template&id=a8168f28&

// EXTERNAL MODULE: ./components/ArtWork/js/ArtworkGL.js
var ArtworkGL = __webpack_require__(129);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ArtWork/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var ArtWorkvue_type_script_lang_js_ = ({
  name: 'artwork',

  data() {
    return {
      artworkGL: 0,
      boxStatus: {
        x: 0,
        y: 0
      }
    };
  },

  mounted() {
    if (!this.artworkGL) this.artworkGL = new ArtworkGL["default"]({
      $canvas: this.$refs.canvas
    }); // this.artworkGL.init() 
  },

  methods: {
    makeBox(e) {
      if (this.artworkGL) {
        this.boxStatus.x = e.offsetX;
        this.boxStatus.y = e.offsetY;
        this.artworkGL.makeBox({
          x: this.boxStatus.x,
          y: this.boxStatus.y
        });
      }
    }

  }
});
// CONCATENATED MODULE: ./components/ArtWork/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ArtWorkvue_type_script_lang_js_ = (ArtWorkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// CONCATENATED MODULE: ./components/ArtWork/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(131)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ArtWorkvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "b9337b06"
  
)

/* harmony default export */ var ArtWork = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=art-work.js.map