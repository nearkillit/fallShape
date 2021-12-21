exports.ids = [9,4,5];
exports.modules = {

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(138);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(6).default
module.exports.__inject__ = function (context) {
  add("4301903a", content, true, context)
};

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatterJS; });
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(117);
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);


class MatterJS {
  constructor(props) {
    // 定数
    // 床
    this.floorSize = {
      width: 800,
      height: 500,
      groundHeight: 50,
      wallWidth: 100,
      color: '#000000'
    };
    this.humanSize = {
      height: 100
    };
    this.goalSize = {
      width: 90,
      height: 100
    };
    this.enviroment = {
      density: 0.0005,
      frictionAir: 0.02,
      restitution: 0.8,
      friction: 0.1
    };
    this.haveShape = {
      x: 1100,
      y: 300
    };
    this.startShape = '';
    this.goalShape = '';
    this.Engine = matter_js__WEBPACK_IMPORTED_MODULE_0__["Engine"];
    this.Render = matter_js__WEBPACK_IMPORTED_MODULE_0__["Render"];
    this.World = matter_js__WEBPACK_IMPORTED_MODULE_0__["World"];
    this.Constraint = matter_js__WEBPACK_IMPORTED_MODULE_0__["Constraint"];
    this.Body = matter_js__WEBPACK_IMPORTED_MODULE_0__["Body"];
    this.Bodies = matter_js__WEBPACK_IMPORTED_MODULE_0__["Bodies"];
    this.engine = this.Engine.create();
    this.render = this.Render.create({
      element: props.body,
      engine: this.engine,
      options: {
        width: 1400,
        height: 600,
        wireframes: false,
        background: 'rgba(255, 255, 255, 0.5)'
      }
    });
    this.engine.world.gravity.y = 0.98;
    this.shapes = [];
    this.props = props;
    matter_js__WEBPACK_IMPORTED_MODULE_0__["Events"].on(this.engine, 'collisionStart', event => {
      this.goalCheck(event);
    });
    this.init();
  } // スタート


  init() {
    this.ground();
    this.Engine.run(this.engine);
    this.Render.run(this.render);
  } //
  // ユーザーが持っている図形 -----------------------------------------------------


  hasShape(props) {
    let addShape;

    if (props.name === 'circle') {
      addShape = this.circle({
        x: this.haveShape.x,
        y: this.haveShape.y,
        width: props.width
      });
    } else if (props.name === 'rectangle') {
      addShape = this.rectangle({
        x: this.haveShape.x,
        y: this.haveShape.y,
        width: props.width,
        height: props.height
      });
    } else if (props.name === 'trapezoid') {
      addShape = this.trapezoid({
        x: this.haveShape.x,
        y: this.haveShape.y,
        width: props.width,
        height: props.height,
        slope: props.slope
      });
    }

    const hS = this.Body.create({
      parts: [addShape],
      isStatic: true
    });
    this.World.add(this.engine.world, hS);
  } //  -----------------------------------------------------------------------
  // 初期状態 ----------------------------------------------------------------
  // 床


  ground() {
    const cylinder = this.Body.create({
      parts: [// 下壁
      this.Bodies.rectangle(this.floorSize.width / 2, this.floorSize.height - this.floorSize.groundHeight / 2, this.floorSize.width - this.floorSize.wallWidth * 2, this.floorSize.groundHeight, {
        render: {
          fillStyle: this.floorSize.color
        }
      }), // 左壁
      this.Bodies.rectangle(this.floorSize.wallWidth / 2, (this.floorSize.height + this.humanSize.height) / 2, this.floorSize.wallWidth, this.floorSize.height - this.humanSize.height, {
        render: {
          fillStyle: this.floorSize.color
        }
      }), // 右壁
      this.Bodies.rectangle(this.floorSize.width - this.floorSize.wallWidth / 2, (this.floorSize.height + this.humanSize.height) / 2, this.floorSize.wallWidth, this.floorSize.height - this.humanSize.height, {
        render: {
          fillStyle: this.floorSize.color
        }
      })],
      isStatic: true // 動かない

    });
    this.World.add(this.engine.world, cylinder);
  } // ゴール


  goal() {
    const goal = this.Bodies.rectangle(this.floorSize.width - this.floorSize.wallWidth / 2, this.humanSize.height / 2, this.goalSize.width, this.goalSize.height, {
      render: {
        sprite: {
          texture: '/images/20735.jpg'
        }
      }
    });
    this.goalShape = goal;
    this.World.add(this.engine.world, [goal]);
  } //  --------------------------------------------------------------------------
  // 図形メソッド ----------------------------------------------------------------


  circle(props) {
    // 密度,空気抵抗,反発,摩擦
    const disk = this.Bodies.circle(props.x, props.y, props.width / 2, this.enviroment);
    this.shapes.push(disk);
    this.World.add(this.engine.world, [disk]);
    return disk;
  }

  rectangle(props) {
    const rect = this.Bodies.rectangle(props.x, props.y, props.width, props.height, this.enviroment);
    this.shapes.push(rect);
    this.World.add(this.engine.world, [rect]);
    return rect;
  }

  trapezoid(props) {
    const trape = this.Bodies.trapezoid(props.x, props.y, props.width, props.height, props.slope, this.enviroment);
    this.shapes.push(trape);
    this.World.add(this.engine.world, [trape]);
    return trape;
  }

  polygon(props) {
    const poly = this.Bodies.polygon(props.x, props.y, props.sides, props.width, this.enviroment);
    this.shapes.push(poly);
    this.World.add(this.engine.world, [poly]);
    return poly;
  } //  --------------------------------------------------------------------------
  //  図形のセット ---------------------------------------------------------------


  makeShape(props) {
    const click = {
      x: 0,
      y: this.humanSize.height / 2
    }; // 関係ないところクリックしたら何もさせない

    if (props.x > this.floorSize.width) {
      return;
    }

    if (props.x < this.floorSize.wallWidth + props.width / 2) {
      click.x = this.floorSize.wallWidth + props.width / 2;
    } else if (props.x > this.floorSize.width - this.floorSize.wallWidth - props.width / 2) {
      click.x = this.floorSize.width - this.floorSize.wallWidth - props.width / 2;
    } else {
      click.x = props.x;
    }

    const mS = props;
    mS.x = click.x;
    mS.y = click.y;
    if (props.name === 'trapezoid') this.trapezoid(mS);else if (props.name === 'circle') this.circle(mS);else if (props.name === 'rectangle') this.rectangle(mS);
  }

  readyShape() {
    const start = {
      x: this.floorSize.wallWidth / 2,
      y: 0,
      width: 60
    };
    this.startShape = this.circle(start);
    this.goal();
  }

  start() {
    this.Body.applyForce(this.startShape, {
      x: this.startShape.position.x,
      y: this.startShape.position.y
    }, {
      x: 0.2,
      y: 0
    });
  }

  reset() {
    this.Body.setVelocity(this.startShape, {
      x: 0,
      y: 0
    });
    this.Body.setPosition(this.startShape, {
      x: this.floorSize.wallWidth / 2,
      y: 0
    });
  } //  --------------------------------------------------------------------------
  //  汎用メソッド  --------------------------------------------------------------


  goalCheck(e) {
    const pairs = e.pairs;

    if (pairs.length > 0) {
      pairs.forEach(p => {
        if (p.bodyA === this.startShape && p.bodyB === this.goalShape) {
          alert('ゴール！！');
          _store__WEBPACK_IMPORTED_MODULE_1__["UsersStore"].fetchGoalAt(new Date());
          _store__WEBPACK_IMPORTED_MODULE_1__["UsersStore"].incrementGoal();
          matter_js__WEBPACK_IMPORTED_MODULE_0__["Events"].off(this.engine, 'collisionStart');
        }
      });
    }
  } // 乱数の作成
  // ユーザーID,日時で計算する
  // props: {
  //  id: number
  // }
  // ↓
  // shapeRandom: {
  //  shape_name: trapezoid | circle | rectangle,
  //  shape_width: number(50~200),
  //  shape_height: number(50~200),
  //  shape_slope: number(0.1~2.0)
  // }


  makeShapeStateRandom(id) {
    let randomSum = 0;
    const today = new Date();
    const ShapeState = {
      name: '',
      width: 0,
      height: 0,
      slope: 0
    }; // shape name

    randomSum = id + today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    randomSum = Math.sin(randomSum);
    const shapeNameMath = Math.round((randomSum + 1) * 100) % 3;

    if (shapeNameMath === 0) {
      ShapeState.name = 'circle';
    } else if (shapeNameMath === 1) {
      ShapeState.name = 'trapezoid';
    } else {
      ShapeState.name = 'rectangle';
    } // shape width


    randomSum = id + today.getFullYear() + (today.getMonth() + 1) + today.getDate() * today.getDate();
    randomSum = Math.sin(randomSum);
    ShapeState.width = Math.round(150 + 100 * randomSum); // shape height

    randomSum = id + today.getFullYear() + (today.getMonth() + 1) * (today.getMonth() + 1) + today.getDate();
    randomSum = Math.sin(randomSum);
    ShapeState.height = Math.round(150 + 100 * randomSum); // shpae slope

    randomSum = id + today.getFullYear() * today.getFullYear() + (today.getMonth() + 1) + today.getDate();
    randomSum = Math.sin(randomSum);
    ShapeState.slope = 1 + randomSum;
    return ShapeState;
  } //  --------------------------------------------------------------------------


}

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(128);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(5);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".canvas{height:550px}.haveShape{position:absolute;font-size:24px;top:250px;left:960px;text-align:center}.shapePostion{height:140px;width:200px}.blind{position:absolute;background-color:rgba(0,0,0,.3);height:500px;width:800px}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Matters/index.vue?vue&type=template&id=18b3cda8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"canvas"},[(_vm.userid === 0)?_vm._ssrNode("<span>","</span>",[_c('v-btn',{attrs:{"text":"","disabled":""}},[_vm._v("ログインしてください")])],1):(_vm.goalIs)?_vm._ssrNode("<span>","</span>",[_c('v-btn',{attrs:{"text":"","disabled":_vm.str},on:{"click":_vm.start}},[_vm._v("start")]),_vm._ssrNode(" "),_c('v-btn',{attrs:{"text":""},on:{"click":_vm.reset}},[_vm._v("reset")])],2):(!_vm.goalIs)?_vm._ssrNode("<span>","</span>",[_c('v-btn',{attrs:{"text":"","disabled":""}},[_vm._v("今日はゴールできました")])],1):_vm._e(),_vm._ssrNode(" <span>"+_vm._ssrEscape("あと"+_vm._s(_vm.fallShape)+"個落ちてきます")+"</span> <span>"+_vm._ssrEscape("ゴールした回数 "+_vm._s(_vm.goalNumber)+"回")+"</span> "+((!_vm.put || _vm.userid === 0 || !_vm.putable)?("<div class=\"blind\"></div>"):"<!---->")+" <div></div> "),(_vm.userid !== 0)?_vm._ssrNode("<div class=\"haveShape\">","</div>",[_vm._ssrNode("<p>あなたが今日置ける図形</p> <div class=\"shapePostion\"></div> "),(!_vm.putable)?_c('v-btn',{attrs:{"text":"","disabled":""}},[_vm._v("今日はもう置けません")]):(!_vm.put)?_c('v-btn',{attrs:{"text":""},on:{"click":_vm.putChange}},[_vm._v("置く")]):(_vm.put)?_c('v-btn',{attrs:{"text":""},on:{"click":_vm.putChange}},[_vm._v("置かない")]):_vm._e()],2):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/Matters/index.vue?vue&type=template&id=18b3cda8&

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(42);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// EXTERNAL MODULE: ./components/Matters/js/matterMethod.js
var matterMethod = __webpack_require__(130);

// EXTERNAL MODULE: ./store/index.ts + 1 modules
var store = __webpack_require__(13);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Matters/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Mattersvue_type_script_lang_js_ = ({
  name: 'Matter',

  data() {
    return {
      MatterJS: 0,
      getShapeState: {
        x: 0,
        y: 0,
        name: '',
        width: 0,
        height: 0,
        slope: 0
      },
      put: false,
      randomMathTest: 0,
      fallShape: 0,
      str: false
    };
  },

  computed: {
    userid() {
      return store["UsersStore"].getUsers.id;
    },

    putable() {
      if (store["UsersStore"].getUsers.put_at) {
        return this.dayDiff(store["UsersStore"].getUsers.put_at);
      } else {
        if (store["UsersStore"].getUsers.put_at === null) return true;
        return false;
      }
    },

    goalIs() {
      if (store["UsersStore"].getUsers.goal_at) {
        return this.dayDiff(store["UsersStore"].getUsers.goal_at);
      } else {
        return false;
      }
    },

    goalNumber() {
      return store["UsersStore"].getUsers.goal;
    }

  },

  mounted() {
    if (!this.MatterJS) {
      this.MatterJS = new matterMethod["default"]({
        body: this.$refs.matterCanvas
      });
      this.MatterJS.readyShape();

      if (this.userid !== 0) {
        this.getShapeState = this.MatterJS.makeShapeStateRandom(this.userid);
        this.MatterJS.hasShape(this.getShapeState);
      }

      this.fetchShapes();
    }
  },

  methods: {
    makeShape(e) {
      this.getShapeState.x = e.offsetX;
      this.getShapeState.y = e.offsetY;

      if (this.MatterJS) {
        this.MatterJS.makeShape(this.getShapeState);
        this.putatUpdate();
      }
    },

    start() {
      this.MatterJS && this.MatterJS.start();
      this.str = true;
    },

    reset() {
      this.MatterJS && this.MatterJS.reset();
      this.str = false;
    },

    putChange() {
      this.put = !this.put;
    },

    async putatUpdate() {
      const reqBodyPutAt = {
        id: this.userid,
        put_at: new Date()
      };
      const reqBodyShapes = {
        user_id: this.userid,
        put_x: this.getShapeState.x
      };

      try {
        // userのput_atの更新
        await external_axios_default.a.put(`${"http://localhost:7000"}/`, reqBodyPutAt, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }); // shapesのuseridの追加

        const {
          data
        } = await external_axios_default.a.post(`${"http://localhost:7000"}/shapes`, reqBodyShapes, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        store["ShapesStore"].fetch(data); // put_at だけnew Dateにして、あとは何も変えない

        store["UsersStore"].fetchPutAt(new Date());
      } catch (err) {
        console.log(err);
      }
    },

    // prettier-ignore
    async fetchShapes() {
      try {
        // userのput_atの更新
        const {
          data
        } = await external_axios_default.a.get(`${"http://localhost:7000"}/shapes`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.fallShape = data.length;
        store["ShapesStore"].fetch(data);

        const getShapes = d => {
          return new Promise(resolve => {
            const data = d;
            window.setTimeout(() => {
              const gSS = this.MatterJS.makeShapeStateRandom(data.user_id);
              gSS.x = data.put_x;
              gSS.y = 0;
              this.MatterJS.makeShape(gSS);
              this.fallShape = this.fallShape - 1;
              resolve('ok');
            }, 2000);
          });
        };

        const loop = async () => {
          for await (const d of data) {
            // 関数の実行結果を格納して表示
            await getShapes(d);
          }
        };

        loop();
      } catch (err) {
        console.log(err);
      }
    },

    dayDiff(getDate) {
      const today = new Date();
      const putday = new Date(getDate);
      const diffDate = today.getDate() - putday.getDate();
      const diffMonth = today.getMonth() - putday.getMonth();
      const diffYear = today.getFullYear() - putday.getFullYear();
      if (diffDate === 0 && diffMonth === 0 && diffYear === 0) return false;else return true;
    }

  }
});
// CONCATENATED MODULE: ./components/Matters/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Mattersvue_type_script_lang_js_ = (Mattersvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(24);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js + 3 modules
var VBtn = __webpack_require__(124);

// CONCATENATED MODULE: ./components/Matters/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(137)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Mattersvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "5cd41abb"
  
)

/* harmony default export */ var Matters = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */


installComponents_default()(component, {VBtn: VBtn["a" /* default */]})


/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=c639bb0c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Matters')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=c639bb0c&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(0);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./components/Matters/index.vue + 4 modules
var Matters = __webpack_require__(139);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--12-0!./node_modules/ts-loader??ref--12-1!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=ts&


/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_ts_ = (external_vue_default.a.extend({
  data() {
    return {
      email: '',
      password: ''
    };
  },

  components: {
    Matters: Matters["default"]
  },
  methods: {}
}));
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=ts&
 /* harmony default export */ var pagesvue_type_script_lang_ts_ = (lib_vue_loader_options_pagesvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(10);

// CONCATENATED MODULE: ./pages/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "9a639950"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {Matters: __webpack_require__(139).default})


/***/ })

};;
//# sourceMappingURL=index.js.map