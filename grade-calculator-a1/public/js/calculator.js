//Variable for number of rows
var rows = 4;

//variable for decimal precision
var dPrecision = 1;

//Creates a table
function makeTable() {
  var table = '';

  //Making headers
  table += ('<table>\
    <tr>\
    <th>Name</th>\
    <th>Short Name</th>\
    <th>Weight</th>\
    <th>Grade</th>\
    <th>Percent</th>\
  </tr>');

  //Making other cells
  for(var r = 0; r < rows; r++) {
    table += ('<tr>\
      <td>\
        Activity '
        + (r + 1) +
      '</td>\
      <td>\
        A'
        + (r + 1) +
      '</td>\
      <td><input type="number" min=0 class = "weight" id = '+ r +'onkeyup = checkWeight(id) step=any /></td>\
      <td>\
        <input type="number" min=0 class = "numerator" id = '+ r +' onkeyup = updatePercent(id) step=any />/\
        <br><input type="number" min=1 class = "denominator" id = '+ r +'  onkeyup = updatePercent(id) step=any />\
      </td>\
      <td><p class = "percent"></p></td>\
    </tr>');
  }

  table += '</table>';

  document.getElementById("table").innerHTML = table;
}

//Updates the percent displayed on input
function updatePercent(row) {
	var nums = document.getElementsByClassName("numerator");

  if (nums[row].value < 0) {
    alert("Invalid numerator input");
    nums[row].value = "";
    return;
  }

  var dens = document.getElementsByClassName("denominator");

  if (dens[row].value == "") {
    return;
  } else if (dens[row].value < 1) {
    alert("Invalid denominator input");
    dens[row].value = "";
    return;
  }

  var percent = (nums[row].value/dens[row].value)*100;
	var percents = document.getElementsByClassName("percent");
  percents[row].innerHTML = setToPrecision(percent) + "%";
}

//Checks to see if the input is appropriate
function checkWeight(row) {
  var weights = document.getElementsByClassName("weight");

  if (weights[row].value < 0) {
    alert("Invalid weight input");
    weights[row].value = "";
    return;
  }
}

//Checks if any of the specified fields are empty
function emptyField(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value == "") {
      return true;
    }
  }
  return false;
}

//Calculates the average and displays it
function calcMean() {
  var nums = document.getElementsByClassName("numerator");
  if (emptyField(nums)) {
    alert("Empty numerator field");
    return;
  }

  var dens = document.getElementsByClassName("denominator");
  if (emptyField(dens)) {
    alert("Empty denominator field");
    return;
  }

  var decimal = 0;
  for (var r = 0; r < rows; r++) {
    decimal += (nums[r].value/dens[r].value)*100;
  }

  decimal /= rows;

  document.getElementById("result").innerHTML = setToPrecision(decimal) + "/100";
}

//Calculates the weighted average and displays it
function calcWeighted() {
  var nums = document.getElementsByClassName("numerator");
  if (emptyField(nums)) {
    alert("Empty numerator field");
    return;
  }

  var dens = document.getElementsByClassName("denominator");
  if (emptyField(dens)) {
    alert("Empty denominator field");
    return;
  }

  var weight = document.getElementsByClassName("weight");
  if (emptyField(weight)) {
    alert("Empty weight field");
    return;
  }

  var decimal = 0;
  var weightSum = 0;
  for (var r = 0; r < rows; r++) {
    decimal += (nums[r].value/dens[r].value) * 100 * weight[r].value;
    weightSum += weight[r].value * 1;
  }

  decimal /= weightSum;

  document.getElementById("result").innerHTML = setToPrecision(decimal) + "/100";
}

//Makes a new table with all the old values
function refreshTable() {
  var tempNums = document.getElementsByClassName("numerator");
  var tempNumVals = [];
  for (var i = 0; i < tempNums.length; i++) {
    tempNumVals.push(parseFloat(tempNums[i].value));
  }

  var tempDens = document.getElementsByClassName("denominator");
  var tempDenVals = [];
  for (var i = 0; i < tempDens.length; i++) {
    tempDenVals.push(parseFloat(tempDens[i].value));
  }

  var tempWeights = document.getElementsByClassName("weight");
  var tempWeightVals = [];
  for (var i = 0; i < tempWeights.length; i++) {
    tempWeightVals.push(parseFloat(tempWeights[i].value));
  }

  var tempPercents = document.getElementsByClassName("percent");
  var tempPercentVals = [];
  for (var i = 0; i < tempPercents.length; i++) {
    tempPercentVals.push(tempPercents[i].innerHTML);
  }

  var tempResult = document.getElementById("result").innerHTML;

  makeTable();

  var nums = document.getElementsByClassName("numerator");

  length = Math.min(nums.length, tempNumVals.length);

  for (var i = 0; i < length; i++) {
    nums[i].value = tempNumVals[i];
  }

  var dens = document.getElementsByClassName("denominator");
  for (var i = 0; i < length; i++) {
    dens[i].value = tempNumVals[i];
  }

  var weights = document.getElementsByClassName("weight");
  for (var i = 0; i < length; i++) {
    weights[i].value = tempWeightVals[i];
  }

  var percents = document.getElementsByClassName("percent");
  for (var i = 0; i < length; i++) {
    percents[i].innerHTML = tempPercentVals[i];
  }

  document.getElementById("result").innerHTML = tempResult;
}

//Adds new row to table and resets all fields
function addRow() {
  rows++;
  refreshTable();
}

//Adds new row to table and resets all fields
function deleteRow() {
  if (rows > 0) {
    rows--;
  }

  refreshTable();
}

//Sets dPrecision to the same value as in the text input
function setPrecision() {
  if (checkPrecision()) {
      dPrecision = document.getElementById("precision").value;
  }
}

//Checks to see if the input is appropriate
function checkPrecision() {
  var precision = document.getElementById("precision");

  if (precision.value < 0 || precision.value > 14) {
    alert("Invalid precision input");
    precision.value = "";
    return false;
  } else if (Math.round(parseFloat(precision.value)) != parseFloat(precision.value)) {
    alert("Please insert a whole number");
    precision.value = "";
    return false;
  }
  return true;
}

//Sets all percents to minimum amount of decimal places to have same value with decimal places >= within dPrecision
function setPercentsToPrecision(arr) {
  for (var i = 0; i < arr.length; i++) {
    length = arr[i].innerHTML.length;
    arr[i].innerHTML = setToPrecision(arr[i].innerHTML.substring(0,length-1));
    if (arr[i].innerHTML != "") {
      arr[i].innerHTML += "%";
    }
  }
}

//Sets value to minimum amount of decimal places to have same value with decimal places >= within dPrecision
function setToPrecision(num) {
  if (num != "") {
    tempPrecision = dPrecision;
    num = parseFloat(num).toFixed(dPrecision);
    while (tempPrecision >= 0 && parseFloat(num) == (parseFloat(num).toFixed(tempPrecision))) {
      num = parseFloat(num).toFixed(tempPrecision);
      tempPrecision--;
    }
    return num;
  } else {
    return "";
  }
}

//Updates all numbers to fit inside precision
function updatePrecision() {
  var percents = document.getElementsByClassName("percent");
  setPercentsToPrecision(percents);
  var result = document.getElementById("result");
  result.innerHTML = setToPrecision(result.innerHTML);
}
