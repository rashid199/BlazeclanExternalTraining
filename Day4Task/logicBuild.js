"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dayFourTask = /*#__PURE__*/function () {
  function dayFourTask() {
    _classCallCheck(this, dayFourTask);

    this.empName = "";
    this.empNo = "";
    this.deptName = "";
    this.salary = "";
    this.designation = "";
    this.deptNo = "";
    this.loc = "";
    this.capacity = "";
    this.empArr = new Map();
    this.deptArr = new Map();
    var deptRec = new Map();
    deptRec.set("DeptNo", "1");
    deptRec.set("DeptName", "DS");
    deptRec.set("Location", "Pune");
    deptRec.set("Capacity", "69");
    this.deptArr.set("1", deptRec);
    var deptRec1 = new Map();
    deptRec1.set("DeptNo", "2");
    deptRec1.set("DeptName", "DA");
    deptRec1.set("Location", "Vegas");
    deptRec1.set("Capacity", "420");
    this.deptArr.set("2", deptRec1);
  }

  _createClass(dayFourTask, [{
    key: "addEmp",
    value: function addEmp(empNo, empName, deptName, designation, salary) {
      this.empNo = empNo;
      this.empName = empName;
      this.deptName = deptName;
      this.designation = designation;
      this.salary = salary;
      var empRec = new Map();
      empRec.set("No", this.empNo);
      empRec.set("Name", this.empName);
      empRec.set("Dept", this.deptName);
      empRec.set("Designation", this.designation);
      empRec.set("Salary", this.salary);
      this.empArr.set(this.empNo, empRec);
    }
  }, {
    key: "delEmp",
    value: function delEmp(k) {
      this.empArr["delete"](k);
      this.getAllEmp();
    }
  }, {
    key: "getAllEmp",
    value: function getAllEmp() {
      this.empArr.forEach(function (v, k) {
        console.log("            Number = ".concat(v.get("No"), "\n            Name = ").concat(v.get("Name"), "\n            Dept = ").concat(v.get("Dept"), "\n            Position = ").concat(v.get("Designation"), "\n            Salary = ").concat(v.get("Salary"), "\n            "));
      });
      console.log("---------------------------------");
    }
  }, {
    key: "updateEmp",
    value: function updateEmp(k, rec) {
      this.empArr.set(k, rec);
      this.getAllEmp();
    }
  }, {
    key: "getAllDept",
    value: function getAllDept() {
      this.deptArr.forEach(function (v, k) {
        console.log("            Number = ".concat(v.get("DeptNo"), "\n            Dept = ").concat(v.get("DeptName"), "\n            Location = ").concat(v.get("Location"), "\n            Capacity = ").concat(v.get("Capacity"), "\n            "));
      });
      console.log("---------------------------------");
    }
  }]);

  return dayFourTask;
}();

var obj = new dayFourTask();
obj.addEmp("1", "Farhan", "DS", "Intern", "69000");
obj.addEmp("2", "Jai", "DS", "Intern", "420");
obj.getAllEmp();
obj.delEmp("1");
obj.getAllDept();
var rec = new Map();
rec.set("No", "1");
rec.set("Name", "JKPedia");
rec.set("Dept", "DA");
rec.set("Designation", "CEO");
rec.set("Salary", "69000");
obj.updateEmp("2", rec);
