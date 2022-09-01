if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    inject: ["list"],
    data() {
      return {
        indexs: 0
      };
    },
    onShow() {
      this.list.sortNavdatas();
    },
    methods: {
      changeNowIndex: function() {
        this.list.changeState(this.indexs++);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(' <view>\n		{{list.state.nowIndex}}\n	</view>\r\n	<button  @click="changeNowIndex">changeNowIndex</button> '),
      vue.createElementVNode("view", { class: "leftNav" }, [
        vue.createElementVNode("view", { class: "content" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.list.state.navdatas, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: item.stated,
              index,
              class: vue.normalizeClass("item" + (item.selected ? " seleced" : "") + ($options.list.state.box == 0 && $options.list.state.boxId == index ? " focus" : ""))
            }, [
              vue.createElementVNode("text", { class: "tittle" }, vue.toDisplayString(item.tittle), 1)
            ], 10, ["index"]);
          }), 128))
        ])
      ])
    ], 2112);
  }
  var IndexLeftNav = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-6bbdcc89"], ["__file", "E:/WorkPath/HBuilderProjects/uniappstudyv3/pages/index/IndexLeftNav/IndexLeftNav.vue"]]);
  const _sfc_main$2 = {
    inject: ["list"],
    data() {
      return {
        dynamicList: {},
        keyData: 0,
        nowindexs: 0
      };
    },
    computed: {},
    onShow() {
    },
    methods: {
      tt() {
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "indexContent" }, [
      vue.createElementVNode("view", {
        class: "content",
        style: vue.normalizeStyle("top:" + $options.list.state.rightTop + "rpx")
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.list.state.lists, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            focus: true,
            class: vue.normalizeClass("item" + (index == $options.list.state.boxId && $options.list.state.box == 1 ? " focus" : "")),
            index,
            key: index
          }, [
            vue.createElementVNode("image", {
              class: "pic",
              src: item.url,
              mode: "scaleToFill"
            }, null, 8, ["src"]),
            vue.createElementVNode("view", {
              style: { "text-align": "center" },
              class: "tittle"
            }, [
              vue.createElementVNode("text", null, vue.toDisplayString(item.text), 1)
            ])
          ], 10, ["index"]);
        }), 128))
      ], 4)
    ]);
  }
  var PagesIndexIndexRightContentIndexRightContent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-3b0071ae"], ["__file", "E:/WorkPath/HBuilderProjects/uniappstudyv3/pages/index/IndexRightContent/IndexRightContent.vue"]]);
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  let tempBox = 0;
  let tempBoxId = 0;
  let tempfocusId = "box0_0";
  let tempNav = "box0_0";
  plus.key.addEventListener("keydown", (event) => {
    let keyCode = event.keyCode;
    keyChange(keyCode);
  }, false);
  function keyChange(e) {
    let focus_name = tempfocusId;
    switch (e) {
      case 22:
      case 39:
        move_right(focus_name);
        break;
      case 21:
      case 37:
        move_left(focus_name);
        break;
      case 20:
      case 40:
        move_down(focus_name);
        break;
      case 19:
      case 38:
        move_up(focus_name);
        break;
      case 13:
      case 66:
        move_entity(focus_name);
        break;
    }
  }
  const list = {
    state: vue.reactive({
      focusId: "box1_0",
      boxId: 0,
      box: 1,
      indexNum: 0,
      rightTop: 0,
      navdatas: [
        {
          tittle: "\u6D69\u701A\u6587\u5B66",
          selected: false,
          stated: 0,
          focused: false
        },
        {
          tittle: "\u542F\u8499\u513F\u6B4C",
          selected: true,
          stated: 2,
          focused: false
        },
        {
          tittle: "\u82F1\u6587\u7ECF\u5178",
          selected: false,
          stated: 1,
          focused: false
        }
      ],
      lists: [
        {
          url: "/static/c1.png",
          text: "Grid 1",
          badge: "0",
          type: "primary"
        },
        {
          url: "/static/c2.png",
          text: "Grid 2",
          badge: "1",
          type: "success"
        },
        {
          url: "/static/c3.png",
          text: "Grid 3",
          badge: "99",
          type: "warning"
        },
        {
          url: "/static/c4.png",
          text: "Grid 4",
          badge: "2",
          type: "error"
        },
        {
          url: "/static/c5.png",
          text: "Grid 5"
        },
        {
          url: "/static/c6.png",
          text: "Grid 6"
        },
        {
          url: "/static/c7.png",
          text: "Grid 7"
        },
        {
          url: "/static/c8.png",
          text: "Grid 8"
        },
        {
          url: "/static/c9.png",
          text: "Grid 9"
        }
      ]
    }),
    updateIndexNum: function(value) {
      this.state.indexNum = value;
    },
    changeState: function(values) {
      this.state.nowIndex = values;
    },
    sortNavdatas: function() {
      let temp = this.state.navdatas.sort((a, b) => {
        return a.stated - b.stated;
      });
      formatAppLog("log", "at store/list/index.js:128", temp);
    },
    updateFocusId: function(values) {
      this.state.focusId = values;
    },
    updateBox: function(values) {
      this.state.box = values;
    },
    updateBoxId: function(values) {
      this.state.boxId = values;
    },
    changeboxs: function(focus_name) {
      tempBox = parseInt(focus_name.split("_")[0].match(/\d+/g));
      tempBoxId = parseInt(focus_name.split("_")[1]);
      this.updateBox(tempBox);
      this.updateBoxId(tempBoxId);
    },
    go_position: function(num, mobile, pos) {
      if (mobile == "left" || mobile == "right") {
        tempBoxId = mobile == "right" ? tempBoxId + num : tempBoxId - num;
      } else if (mobile == "up" || mobile == "down") {
        tempBox = mobile == "down" ? tempBox + num : tempBox - num;
        tempBoxId = pos;
      }
      tempfocusId = "box" + tempBox + "_" + tempBoxId;
      this.updateBox(tempBox);
      this.updateBoxId(tempBoxId);
      this.updateFocusId(tempfocusId);
    },
    focusInit: function(values) {
      tempfocusId = values;
      this.changeboxs(values);
      tempNav = "box0_" + this.state.indexNum;
    },
    changeRightTop: function(value) {
      this.state.rightTop = value;
    }
  };
  function move_right(focus_name) {
    list.changeboxs(focus_name);
    if (tempBox == 0) {
      list.go_position(1, "down", 0);
    } else if (tempBox == 1) {
      if (tempBoxId < list.state.lists.length - 1 && (tempBoxId + 1) % 4 != 0) {
        list.go_position(1, "right");
      }
    }
  }
  function move_left(focus_name) {
    list.changeboxs(focus_name);
    if (tempBox == 1) {
      if (tempBoxId > 0 && tempBoxId % 4 != 0) {
        list.go_position(1, "left");
      } else {
        list.go_position(1, "up", 0);
      }
    }
  }
  function move_up(focus_name) {
    list.changeboxs(focus_name);
    if (tempBox == 0 && tempBoxId > 0) {
      list.go_position(1, "left");
    } else if (tempBox == 1) {
      if (tempBoxId > 3) {
        formatAppLog("log", "at store/list/index.js:200", tempBoxId);
        if (tempBoxId == list.state.lists.length - 1) {
          let tempTop = 0;
          tempTop = list.state.rightTop + 750 / 1920 * 420;
          list.changeRightTop(tempTop);
        }
        list.go_position(4, "left");
      }
    }
  }
  function move_down(focus_name) {
    list.changeboxs(focus_name);
    if (tempBox == 0 && tempBoxId < list.state.navdatas.length - 1) {
      list.go_position(1, "right");
    } else if (tempBox == 1) {
      if (tempBoxId < list.state.lists.length - 1) {
        if (tempBoxId + 4 < list.state.lists.length - 1) {
          list.go_position(4, "right");
        } else {
          let tempTop = 0;
          tempTop = list.state.rightTop - 750 / 1920 * 420;
          list.changeRightTop(tempTop);
          list.go_position(0, "down", list.state.lists.length - 1);
        }
      }
    }
  }
  function move_entity(focus_name) {
    list.changeboxs(focus_name);
    if (tempBox == 0) {
      list.state.navdatas[tempNav.split("_")[1]].selected = false;
      list.state.navdatas[tempBoxId].selected = true;
      tempNav = focus_name;
      list.updateIndexNum(tempBoxId);
      formatAppLog("log", "at store/list/index.js:249", list.state.navdatas);
    }
  }
  const _sfc_main$1 = {
    data() {
      return {
        list
      };
    },
    provide: {
      list
    },
    components: {
      IndexLeftNav,
      IndexRightContent: PagesIndexIndexRightContentIndexRightContent
    },
    computed: {},
    onShow() {
      if (list.state.navdatas[0].selected) {
        this.list.focusInit("box1_0");
        list.updateIndexNum(0);
      } else {
        for (let item in list.state.navdatas) {
          if (list.state.navdatas[item].selected) {
            list.updateIndexNum(item);
            this.list.focusInit("box0_" + item);
          }
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_IndexLeftNav = vue.resolveComponent("IndexLeftNav");
    const _component_IndexRightContent = vue.resolveComponent("IndexRightContent");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_IndexLeftNav),
      $data.list.state.indexNum == 0 ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
        vue.createVNode(_component_IndexRightContent)
      ]) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/WorkPath/HBuilderProjects/uniappstudyv3/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/index/IndexRightContent/IndexRightContent", PagesIndexIndexRightContentIndexRightContent);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/WorkPath/HBuilderProjects/uniappstudyv3/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
