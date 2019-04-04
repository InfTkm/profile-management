let projectCount = 0;

// file that stores the public data for phase 1 (example instances)
class School{
  constructor(nm, acrynm){
    // can add things later if needed
    this.name = nm;
    this.acronym = acrynm;

    this.same_school = function(other_schl){
      return this.name == other_schl.name;
    };
  }
}

class Course{
  constructor(code, school){
    // add attribute if needed later
    this.courseCode = code;
    this.school = school;

    this.to_text = function(){
      return this.courseCode + "\t@" + this.school.acronym;
    };

    this.same_course = function(other_course){
      return this.courseCode == other_course.courseCode && this.school.same_school(other_course.school);
    }
  }
}

class project{
  constructor(courseCode, term, title){
    this.id = projectCount;
    this.course = courseCode;
    this.term = term;
    this.title = title;
    this.members = [];
    this.finished = 0;
    projectCount++;

    this.course_obj=function(course_lst = courses){
      return course_lst.find((crs) => crs.courseCode == this.course);
    };
    
    this.same_project=function(other_proj, course_lst = courses){
      return this.course_obj(course_lst).same_course(other_proj.course_obj(course_lst)) 
              && this.term == other_proj.term 
              && this.title == other_proj.title;
    };

    this.is_for_course=function(crs, crs_lst = courses){
      return crs.same_course(this.course_obj(crs_lst));
    };

    this.short_str = function(crs_lst){
      const prj = this;
      const prj_crs = this.course_obj(crs_lst);
      return `${prj.title} for ${prj_crs.courseCode} at ${prj_crs.school.acronym}`;
    }
  }
}

class User{
  constructor(name, email, schl){
    this.name = name;
    this.email = email;
    this.school = schl;
    this.rating = 5;
    this.rating_list = [];
    this.courses_looking_for = [];
    this.projects =[];
    this.insert_course = function(crs, trm, min_rtng){
      this.courses_looking_for.push({
        course: crs,
        term: trm,
        min_rating: min_rtng
      });
    }
    this.insertProject = function(projectId){
      this.projects.push(projectId)
    }
    this.same_course_num = function(other_usr){
      return this.courses_looking_for.map((u1_crs_trm) => {
        return other_usr.courses_looking_for.map((u2_crs_trm) => {
          if(u2_crs_trm.course.same_course(u1_crs_trm.course) 
            && u2_crs_trm.term == u1_crs_trm.term 
            && other_usr.rating >= u1_crs_trm.min_rating){
              return 1;
              
          }else{
            return 0;
          }
        }).reduce((a1, a2) => a1+a2, 0);
      }).reduce((a1, a2) => a1+a2, 0);
    };

    this.same_project_num = function(other_usr){
      const this_projs = this.projects.map((pid) => _find_proj(pid));
      const other_projs = other_usr.projects.map((pid) => _find_proj(pid));
      return this_projs.map((u1_prj) =>{
        return other_projs.map((u2_prj) => {
          if(u1_prj.same_project(u2_prj)){
            return 1;
          }else{
            return 0;
          }
        }).reduce((u1, u2) => u1+u2, 0);
      }).reduce((u1, u2) => u1+u2, 0);
    }

    this.same_user = function(other_usr){
      return this.email == other_usr.email && this.school.same_school(other_usr.school);
    };

    this.short_string = function(){
      return `${this.name} @ ${this.school.acronym}`;
    }
  }
}

// all the hardcoded data below will come from backends later
const UOFT = new School('Unviersity of Toronto', 'UofT');
const RYERSON = new School('Ryerson University', 'Ryerson');

const CSC309 =  new Course('CSC309', UOFT);
const CSC207 = new Course('CSC207', UOFT);
const CSC236 = new Course('CSC236', UOFT); 

const FALL='Fall';
const SPRING = 'Spring';
const SUMMER='Summer';
const YEAR='Year';

const JERRY = new User('Jerry', 'an_email_address@utoronto.ca', UOFT);
const MIKAEL = new User('Rex', 'another_email_address@utoronto.ca', UOFT);
const MARK = new User('Mark', 'very_important_email_address@instructor.com', UOFT);

JERRY.insert_course(CSC309, FALL, 3);
JERRY.insert_course(CSC207, FALL, 3);
JERRY.insert_course(CSC236, FALL, 3);
MIKAEL.insert_course(CSC207, FALL, 3);
MIKAEL.rating=4;

const A1_207 = new project('CSC207', FALL, 'A1')
JERRY.insertProject(A1_207.id)

const courses = [CSC309, CSC207, CSC236];
const schools = [UOFT, RYERSON];
const users = [JERRY, MIKAEL, MARK];

const terms=[
  FALL, SPRING, SUMMER, YEAR
];

const projects = [A1_207]

function _find_proj(proj_id, proj_lst = projects){
  return proj_lst.find((prj) => prj.id == proj_id);
}

// JERRY.looking_for_same(MIKAEL);
// JERRY.looking_for_same(MARK);

// module.exports = {
//   courses, schools, Course, School
// }