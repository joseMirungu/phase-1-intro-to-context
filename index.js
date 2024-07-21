
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return record;
}

function hoursWorkedOnDate(record, soughtDate) {
    let timeIn = record.timeInEvents.find(e => e.date === soughtDate);
    let timeOut = record.timeOutEvents.find(e => e.date === soughtDate);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    return record.timeInEvents.reduce((memo, e) => memo + wagesEarnedOnDate(record, e.date), 0);
}

function calculatePayroll(records) {
    return records.reduce((memo, record) => memo + allWagesFor(record), 0);
}


const employees = [
    ["Gray", "Worm", "Security", 1],
    ["Daenerys", "Targaryen", "CEO", 1000],
    ["Jon", "Snow", "CFO", 1000]
];

let employeeRecords = createEmployeeRecords(employees);

employeeRecords[0] = createTimeInEvent(employeeRecords[0], "2018-01-01 0800");
employeeRecords[0] = createTimeOutEvent(employeeRecords[0], "2018-01-01 1700");

employeeRecords[1] = createTimeInEvent(employeeRecords[1], "2018-01-01 0900");
employeeRecords[1] = createTimeOutEvent(employeeRecords[1], "2018-01-01 1700");

employeeRecords[2] = createTimeInEvent(employeeRecords[2], "2018-01-01 1000");
employeeRecords[2] = createTimeOutEvent(employeeRecords[2], "2018-01-01 1700");

console.log(calculatePayroll(employeeRecords));
