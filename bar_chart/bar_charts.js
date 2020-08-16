function drawBarChart(data, options, element) {
  element = $("div#barchart");
  let barLab = $("div#labelsPos");
  let barLabels = options.barLabels;
  console.log(barLabels)
  let chartHeight = parseInt(options.height);
  element.css("height", chartHeight);
  let h1 = Math.max(...data) * 1.1;
  let ticks = $("ul#ticks");
  let ticksHeight = parseInt(chartHeight / 15);
  ticks.html("<ul></ul>");
  for (let i = ticksHeight - 1; i > 0; i--) {
    if (i % 5 == 0) {
      ticks.append((String((i / (chartHeight / (500 / 33)) * Math.max(...data) * 1.1).toFixed(1)) + "__"));
    } else {
      ticks.append(makeTicks("___"));
    }
  };
  $("div.container").css("height", chartHeight);
  $("div.y-axis").css("height", chartHeight);
  let barMargin = options.barMargin;
  element.html("");
  barLab.html("");
  element.css("color", options.dataColor);
  let titleHead = $("h1.title_head");
  if (options.barChartTitle != "") {
    titleHead.text(options.barChartTitle);
  }
  let titleFontSize = options.titleFontSize + "px";
  titleHead.css({ "font-size": titleFontSize, "color": options.titleColor });
  $("h3#x_axis").text(options.x_axis_label);
  $("h3#y_axis").text(options.y_axis_label);
  let colors = options.colors;
  let arr = [];
  for (let i = 0; i < data.length; i++) {
    let h = String((data[i] / h1 * chartHeight)) + "px";
    let bar = document.createElement('div');
    let barLabel = document.createElement('div');
    barLabel.className = "barLabel";
    barLabel.style.marginRight = barMargin;
    barLabel.style.alignItems = "flex-end";
    bar.style.height = h;
    bar.style.marginRight = barMargin;
    bar.style.alignItems = options.dataPosition;
    bar.className = "bar";
    bar.innerHTML = "<h6>" + data[i] + "</h6>";
    if (barLabels.length != 1) {
      barLabel.innerHTML = barLabels[i];
    } else {
      barLabel.text = "label";
    }
    if (colors.length < 2) {
      let barcolor = randColor()
      bar.style.backgroundColor = barcolor
      barLabel.style.backgroundColor = barcolor;
    } else {
      let barcolor = barColor(colors);
      bar.style.backgroundColor = barcolor;
      barLabel.style.backgroundColor = barcolor;
    }
    arr.push(element.append(bar));
    arr.push(barLab.append(barLabel));
  }
  return arr;
};

const usedColors = [];
const randColor = () => {
  let newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  while (usedColors.indexOf(newColor) != -1 || newColor.length != 7) {
    newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  usedColors.push(newColor);
  return newColor;
};
console.log(usedColors)

let counter = 0;
const barColor = (colors) => {
  if (counter !== colors.length) {
    let newColor = colors[counter];
    counter++;
    return newColor;
  } else {
    counter = 0;
    newColor = colors[counter];
    counter++;
    return newColor;
  }
}

function makeTicks(str) {
  let li = document.createElement('li');
  li.textContent = str;
  return li;
}

function makeRandArr(num) {
  let arr1 = [];
  let i = 0;
  while (i < num) {
    randNum = Math.ceil(Math.random() * 10);
    arr1.push(randNum)
    i++;
  }
  return arr1;
}

$(function () {
  $("h1").fadeIn(3000);
  let data = makeRandArr(10);
  let options = { barLabels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], height: '500', width: '50%', barMargin: '2px', colors: [] };
  drawBarChart(data, options);
  $("div.bar, div.barLabel").slideDown(3000, function () {
    $(this).animate({ width: "50%" }, 6000);
  });
  $("button#btn1").click(function () {
    let data = $("input#array").val().split(",");
    let chartHeight = $("input#chartHeight").val();
    let barMargin = $("input#barMargin").val();
    let colors = $("input#colors").val().split(",");
    colors = colors.map(i => i.trim());
    let x_axis_label = $("input#x_axis").val();
    let y_axis_label = $("input#y_axis").val();
    let dataColor = $("input#dataColor").val();
    let barChartTitle = $("input#barChartTitle").val();
    let dataPosition = $("input[name=dataPosition]:checked").val();
    let titleColor = $("input#titleColor").val();
    let titleFontSize = $("input#titleFontSize").val();
    let barLabels = $("input#labels").val().split(",");
    barLabels = barLabels.map(lb => lb.trim());
    console.log(barLabels);
    let options = {
      barLabels: barLabels,
      height: chartHeight,
      width: '50%',
      barMargin: barMargin,
      colors: colors,
      x_axis_label: x_axis_label,
      y_axis_label: y_axis_label,
      dataColor: dataColor,
      barChartTitle: barChartTitle,
      dataPosition: dataPosition,
      titleColor: titleColor,
      titleFontSize: titleFontSize
    };
    drawBarChart(data, options);
    $("div.bar, div.barLabel").slideDown(1000, function () {
      $(this).animate({ width: "50%" }, 6000);
    })
  })
});

$(function () {
  $("input#dynamicTitleChange").keyup(function () {
    $("h1.title_head").text($(this).val());
  });
});
