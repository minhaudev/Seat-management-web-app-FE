const arr = [
    "56px",
    "56px",
    "15%",
    "6%",
    "7%",
    "8%",
    "11%",
    "6%",
    "8%",
    "6%",
    "88px",
    "88px",
    "88px",
    "88px",
    "88px",
    "88px",
    "8%",
    "8%",
    "8%",
    "100px",
    "100px"
];
const tableColumns = `
          --data-table-library_grid-template-columns: ${arr.join(" ")};
        `;
const calculateFix = (numberOf) => {
    let calcString = "";
    for (var i = 0; i < numberOf - 1; i++) {
        calcString += ` ${arr[i]} +`;
    }
    return calcString.slice(0, -2);
};
const formatColumns = () => {
    let columnFixed = `&:nth-of-type(1) {
  left: 0px;
}`;
    for (var i = 2; i < 11; i++) {
        columnFixed += `&:nth-of-type(${i}) {
        left: calc(${calculateFix(i)});
      }`;
    }
    return columnFixed;
};
const formatHeader = () => {
    let columnFixed = `th:nth-of-type(1) {
left: 0px;
}`;
    for (var i = 2; i < 2; i++) {
        columnFixed += `th:nth-of-type(${i}) {
      left: calc(${calculateFix(i)});
    }`;
    }
    return columnFixed;
};
console.log(formatHeader());
