let calculateSalary = function (salary) {
let percent = 0.35;
  if (calculateSalary >= 100000) {
    percent=0.45;}
let salaryWhite = Math.round(salary * percent);
return salaryWhite;
};
