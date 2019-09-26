var rows = 4;

function makeTable() {
  var table = '';

  //Making headers
  table += ('<tr>\
    <th>Name</th>\
    <th>Short Name</th>\
    <th>Weight</th>\
    <th>Grade</th>\
    <th>Percent</th>\
  </tr>');

  //Making other cells
  for(var r = 0; r < rows; r++) {
    table += ('<tr><td>Activity ' + (r + 1) + '</td>\
    <td>A' + (r + 1) + '</td>\
    <td><input type="text" ... class = "weight" id = r /></td>\
    <td>\
      <input type="text" ... class = "numerator" id = ' + r + ' onkeyup = updatePercent(id) />/\
      <br><input type="text" ... class = "denominator" id = ' + r + '  onkeyup = updatePercent(id) />\
    </td>\
    <td><p class = "percent"></p></td>\
    </tr>');
  }
  document.write('<table>' + table + '</table>');
}

function updatePercent(row) {
	var nums = document.getElementsByClassName("numerator");
  var dens = document.getElementsByClassName("denominator");
  var percent = (nums[row].value/dens[row].value)*100;
	var percents = document.getElementsByClassName("percent");
  percents[row].innerHTML = percent + "%";
}

function calcWeighted() {

}

function calcMean() {
  var nums = document.getElementsByClassName("numerator");
  var dens = document.getElementsByClassName("denominator");

  var decimal = 0;
  for (var r = 0; r < rows; r++) {
    decimal += (nums[r].value/dens[r].value)*100;
  }

  decimal /= rows;

  document.getElementById("result").innerHTML = decimal + "/100";
}

function calcWeighted() {
  var nums = document.getElementsByClassName("numerator");
  var dens = document.getElementsByClassName("denominator");
  var weight = document.getElementsByClassName("weight");

  var decimal = 0;
  var weightSum = 0;
  for (var r = 0; r < rows; r++) {
    decimal += (nums[r].value/dens[r].value) * 100 * weight[r].value;
    weightSum += weight[r].value * 1;
    console.log(weight[r].value);
  }

  console.log(decimal);
  console.log(weightSum);
  decimal /= weightSum;

  document.getElementById("result").innerHTML = decimal + "/100";
}
