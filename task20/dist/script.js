"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
$(function () {
  var $form = $("#todo-form");
  var $input = $("#todo-input");
  var $list = $("#todo-list");
  var tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    render();
  }
  $form.on("submit", function (e) {
    e.preventDefault();
    var text = $input.val().trim();
    if (!text) return;
    var task = {
      id: Date.now(),
      text: text,
      done: false
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
    $form[0].reset();
  });
  $list.on("click", function (e) {
    var $li = $(e.target).closest("li");
    if (!$li.length) return;
    var id = Number($li.data("id"));
    if ($(e.target).is("input[type=checkbox]")) {
      tasks = tasks.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          done: e.target.checked
        }) : t;
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      render();
    }
    if ($(e.target).hasClass("btn-danger")) {
      tasks = tasks.filter(function (t) {
        return t.id !== id;
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      render();
    }
  });
  $list.on("click", ".task-text", function () {
    var id = $(this).data("task-id");
    var task = tasks.find(function (t) {
      return t.id === id;
    });
    if (task) {
      $("#taskModalBody").text(task.text);
      var modal = new bootstrap.Modal(document.getElementById("taskModal"));
      modal.show();
    }
  });
  window.addEventListener("storage", function () {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    render();
  });
  function render() {
    $list.empty();
    tasks.forEach(function (task) {
      var $li = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center").attr("data-id", task.id);
      var $left = $("<div>").addClass("d-flex align-items-center gap-2");
      var $checkbox = $("<input>").attr("type", "checkbox").prop("checked", task.done);
      var $text = $("<span>").addClass("task-text").css("cursor", "pointer").data("task-id", task.id).text(task.text);
      if (task.done) {
        $text.css("text-decoration", "line-through");
      }
      $left.append($checkbox, $text);
      var $deleteBtn = $("<button>").addClass("btn btn-sm btn-danger").text("Delete");
      $li.append($left, $deleteBtn);
      $list.append($li);
    });
  }
});
