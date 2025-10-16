// All students data

const students = [
    { name: "Alice", grade: 85 },
    { name: "Bob", grade: 90 },
    { name: "Charlie", grade: 78 },
    { name: "David", grade: 92 },
    { name: "Eve", grade: 68 },
    { name: "Frank", grade: 45 },
    { name: "Grace", grade: 25 },
    { name: "Heidi", grade: 80 },
    { name: "Ivan", grade: 39 },
    { name: "Judy", grade: 11 }
];



// Calculating average grade of all students

function CalculateAverageGrade(students) {

    let totalmarks = 0;
    for (let i = 0; i < students.length; i++) {
        totalmarks += students[i].grade;
    }
    return totalmarks / students.length;
}


// Calculating Highest score

function CalculateHighestScore(students) {
    let highest = students[0];
    for (let i = 1; i < students.length; i++) {
        if (students[i].grade > highest.grade) {
            highest = students[i];
        }
       
    }
    return highest;
}    


// Calculating Lowest score
function CalculateLowestScore(students) {
    let lowest = students[0];
    for (let i = 1; i < students.length; i++) {
        if (students[i].grade < lowest.grade) {
            lowest = students[i];
        }
    }
    return lowest;
}




// Calculating Grade Distribution

function gradeDistribution(students) {

    const grade = { A: 0, B: 0, C: 0, D: 0, F: 0 };

    for (let i = 0; i < students.length; i++) {
      const score = students[i].grade;


        if (score >= 90) {
            grade.A++;

        }
        else if (score >= 80) {
            grade.B++;

        }
        else if (score >= 70) {
            grade.C++;
        }
        else if (score >= 60) {
            grade.D++;
        }
        else {
            grade.F++;
        }
        
    }
    return grade;
}


// Students need to retake

function studentsNeedToTakeRetake(students) {
  let retake = [];
  for(let i = 0; i < students.length; i++){
    if(students[i].grade < 60){
      retake.push(students[i].name)
    }
  }
  return retake;

}



function anaylzeGrades(students) {
  const avg = CalculateAverageGrade(students)
  const highest = CalculateHighestScore(students)
  const lowest = CalculateLowestScore(students)
  const gradedistribution = gradeDistribution(students)
  const Retake = studentsNeedToTakeRetake(students)


console.log("Average Grade of all students:", CalculateAverageGrade(students), );
console.log(`Highest Score among all students:: ${highest.name} (${highest.grade})`);
console.log(`Lowest Score among all students:: ${lowest.name} (${lowest.grade})`);
console.log("Grade Distribution",gradedistribution);
console.log("List of students who need to take retake:", Retake);
}

anaylzeGrades(students)
