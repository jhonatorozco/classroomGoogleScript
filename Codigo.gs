function doGet() {
    return HtmlService.createTemplateFromFile('index.html').evaluate()
      .setTitle('UdeA - Google Classroom')
      .setFaviconUrl('https://ssl.gstatic.com/classroom/favicon.png')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getCoursesList(){
  var teacherEmail = Session.getActiveUser().getEmail();
  var url = 'https://classroom-udea-api.herokuapp.com/persons/teacher/'
  + teacherEmail
  + '/courses';
  var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;
}

function createCourses(selectedCourses){
  
  for(var i =0 ; i < selectedCourses.length ; i++){
    var selectedCourse = selectedCourses[i];
    var students = selectedCourse.students;
    var ownerEmail = Session.getActiveUser().getEmail();
    var course = {
       name: selectedCourse.course_name + "--" +selectedCourse.course_id,
       owner_id: ownerEmail,
       course_state: "ACTIVE"
     };
   
    var responseCourse = Classroom.Courses.create(course);
    var courseIdClassroom = responseCourse.id;
    
    for(var j =0 ; j < students.length ; j++){    
      var stud = students[j];
      var invitation = {
       "userId": stud.email,
       "courseId": courseIdClassroom,
        "role": "STUDENT"
      };
      var request = Classroom.Invitations.create(invitation);
      
    } 
  }
  
}

function getUserEmail() {
  var email = Session.getActiveUser().getEmail();
  email = Session.getEffectiveUser().getUsername();
  return email;
}


