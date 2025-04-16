// import {stateProcess} from "@/interfaces";

// export const initValidityTime = {
//     day: 0,
//     hours: 0,
//     minutes: 0,
//     secondTime: 0
// };

// export const tableColumns = (arrColumns: string[]) => `
//           --data-table-library_grid-template-columns: ${arrColumns.join(" ")};
//         `;
// const calculateFix = (arrColumns: string[], numberOf: number) => {
//     let calcString = "";
//     for (var i = 0; i < numberOf - 1; i++) {
//         calcString += ` ${arrColumns[i]} +`;
//     }
//     return calcString.slice(0, -2);
// };
// export const formatColumns = (arrColumns: string[], fixColumns: number) => {
//     if (!fixColumns) return;
//     let columnFixed = `&:nth-of-type(1) {
//     z-index:10;
//   left: 0px;
// }`;
//     for (var i = 2; i <= fixColumns; i++) {
//         columnFixed += `&:nth-of-type(${i}) {
//         z-index: 10 ;
//         left: calc(${calculateFix(arrColumns, i)});
//       }`;
//     }
//     return columnFixed;
// };

// export const styleProcessItem = (state: stateProcess) =>
//     ({
//         [stateProcess.NONE]: {
//             w: "w-0",
//             bg: "bg-transparent",
//             text: "text-unit"
//         },
//         [stateProcess.ACTIVE]: {
//             w: "w-1/2",
//             bg: "bg-secondary",
//             text: "text-secondary"
//         },
//         [stateProcess.DONE]: {
//             w: "w-full",
//             bg: "bg-primary",
//             text: "text-primary"
//         },
//         [stateProcess.PENDING]: {
//             w: "w-0",
//             bg: "bg-transparent border border-unit",
//             text: "text-unit"
//         }
//     })[state];
