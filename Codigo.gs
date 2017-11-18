function doGet() {
    return HtmlService.createTemplateFromFile('index.html').evaluate()
      .setTitle('Google Clssroom')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function getCoursesList(){
  var jsonCursos = {
    "name": "Gustavo Andres Marín",
    "cursos":[
        {
            "codigoMateria": "2508545",
            "nombreMateria": "COMUNICACIONES Y LABORATORIO I",
            "grupo": "1"
        },
        {
            "codigoMateria": "2508646",
            "nombreMateria": "COMUNICACIONES Y LABORATORIO II",
            "grupo": "1"
        },
        {
           "codigoMateria": "2508647",
            "nombreMateria": "SEMINARIO VOZ IP",
            "grupo": "1"
        }
    ]
  };
  return jsonCursos.cursos;
}

function createCourses(selectedCourses){
 var jsonEstudiantes = {
    "estudiantes":[
        {
            "email": "yoiner.gomez@udea.edu.co"
        },
        {
            "email": "frank.castrillon@udea.edu.co"
        },
        {
            "email": "jhonatana.orozco@udea.edu.co"
        }
    ] 
 };
  
 var students = jsonEstudiantes.estudiantes;
  
  for(var i =0 ; i < selectedCourses.length ; i++){
    var selectedCourse = selectedCourses[i];
    var ownerEmail = Session.getActiveUser().getEmail();
    var course = {
       name: selectedCourse.nombreMateria + selectedCourse.codigoMateria,
       owner_id: ownerEmail,
       course_state: "ACTIVE"
     };
   
    var responseCourse = Classroom.Courses.create(course);
    var courseId = responseCourse.id;
    console.log(responseCourse);
    
    for(var j =0 ; j < students.length ; j++){    
      var stud = students[j];
      var invitation = {
       "userId": stud.email,
       "courseId": courseId,
        "role": "STUDENT"
      };
      var request = Classroom.Invitations.create(invitation);
      console.log(request);
    
    
      
    }
    
  }
 
}

function listCourses() {
  

  
  /*
  // Inicio de creación de curso en google classroom
  var optionalArgs = {
    pageSize: 10
  };
  
  var hoy = new Date(); 
  var formato = Utilities.formatDate(hoy,Session.getScriptTimeZone(), "dd/MM HH:mm:ss");
  var email = Session.getActiveUser().getEmail();
  Logger.log(email);
  var course = {
    name: "test_API_"+formato,
    section: "Period 2",
    description_heading: "Welcome to 10th Grade Biology",
    description: "We'll be learning about about the structure of living creatures "
    + "from a combination of textbooks, guest lectures, and lab work. Expect "
    + "to be excited!",
    room: "301",
    owner_id: email,
    course_state: "PROVISIONED"
  };
  var resonse2 = Classroom.Courses.create(course);
  // Fin de creación de curso en google classroom
  */
  var hoy = new Date(); 
  var groupArgs = {
    email: 'fisica_mecanica_'+hoy.getTime()+ '@udea.edu.co'
  }
  
  var responseGroup= AdminDirectory.Groups.insert(groupArgs);
  Logger.log(responseGroup);
  var memberArgs = {
    email: responseGroup.email
  }
  var responseMember= AdminDirectory.Members.insert(memberArgs, 'ingenieria.classroom.groups@udea.edu.co');
  Logger.log(responseMember);
  /*
  var optionalArgs = {
    customer: 'my_customer',
    domain: 'udea.edu.co',
    maxResults: 10
  };
  var response =  AdminDirectory.Groups.insert(resource);
  Logger.log(response)
 */
}

function getCourses(){
  var jsonCursos = {
    "name": "Gustavo Andres Marín",
    "cursos":[
        {
            "codigoMateria": "2508545",
            "nombreMateria": "COMUNICACIONES Y LABORATORIO I",
            "grupo": "1"
        },{
            "codigoMateria": "2508646",
            "nombreMateria": "COMUNICACIONES Y LABORATORIO II",
            "grupo": "1"
        }
    ]
  };
  return jsonCursos;
}

/*
  Buscar grupos creados
  https://admin.google.com/AdminHome#GroupList:
  
  Nota: Todas acciones quedan monitoreadas y el admin del dominio puede consultarlas 
  */

