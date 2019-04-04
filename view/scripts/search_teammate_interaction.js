const interaction_data = {
  selected_school: undefined,
  selected_course: undefined,
  selected_project: undefined,
  selected_term: undefined,
  selected_min_rating: 0
};

const html_nodes = {
  // a few important nodes in html
  school_dropdown: document.getElementById('school_drop_down'),
  course_dropdown: document.getElementById('course_drop_down'),
  project_drop_down: document.getElementById('project_drop_down'),
  term_drop_down: document.getElementById('term_drop_down'),
  min_rating_display_label: document.getElementById('min_rating_v'),
  min_rating_input: document.getElementById('min_rating_input'),
  new_data_modal_label: document.getElementById('new_data_modal_label'),
  new_data_modal_body: document.getElementById('new_data_modal_body'),
  new_data_finish: document.getElementById('new_data_finish'),
  add_school_link: document.getElementById('add_school'),
  add_course_link: document.getElementById('add_course'),
  add_project_link: document.getElementById('add_prj')
};

// a few styles for dynamic added elements and add it later
const styles = {

};

function renderSchoolList(){
  // the schools list will come from database afterwards
  _rm_all_child(
    html_nodes.school_dropdown, 
    terminate_condition=(chd) => _terminate_at_class_condition(chd, 'divider')
  );
  li_items_from_schools(schools).forEach((li_itm_schl) => {
    const li_itm = li_itm_schl.element;
    const schl = li_itm_schl.school;
    li_itm.addEventListener('click', (e) => {
      e.preventDefault();
      interaction_data.selected_school = schl;

      html_nodes.school_dropdown.previousElementSibling.firstChild.replaceWith(
        document.createTextNode(schl.acronym + ' '));
      
      renderCourseList();
      if(!!interaction_data.selected_course && schl.same_school(interaction_data.selected_course.school)){
        remove_selected_course();
      }
    });
    html_nodes.school_dropdown.insertBefore(li_itm, html_nodes.school_dropdown.firstChild);

  });
}


function li_items_from_schools(schls){
 return schls.map((schl) => {
    // template for the elements to create
    // <li><a href="#">UofT</a></li>
    const li_itm = document.createElement('li');
    const inner_ref_itm = document.createElement('a');

    inner_ref_itm.setAttribute('href', '#');

    inner_ref_itm.appendChild(document.createTextNode(schl.acronym));

    li_itm.appendChild(inner_ref_itm);

    return {element: li_itm, school: schl};
 });

};

function remove_selected_course(){
  interaction_data.selected_course = undefined;
  html_nodes.course_dropdown.previousElementSibling.firstChild.replaceWith(
    document.createTextNode("Course Code"));
  _on_course_change();
}

function renderCourseList(){
  // the list courses will come from database later
  _rm_all_child(
    html_nodes.course_dropdown, 
    terminate_condition=(chd) => _terminate_at_class_condition(chd, 'divider')
  );

  li_items_from_courses(courses.filter((crs) => {
    // alert(JSON.stringify(crs) + '\n' + JSON.stringify(interaction_data.selected_school));
    return !interaction_data.selected_school || crs.school.same_school(interaction_data.selected_school);
  })).forEach((li_itm_crs) => {
    const li_itm = li_itm_crs.element;
    const crs = li_itm_crs.course;
    li_itm.addEventListener('click', (e) => {
      e.preventDefault();
      interaction_data.selected_course = crs;

      html_nodes.course_dropdown.previousElementSibling.firstChild.replaceWith(
        document.createTextNode(crs.to_text()));
      _on_course_change();
    });
    html_nodes.course_dropdown.insertBefore(li_itm, html_nodes.course_dropdown.firstChild);

  });
}

function li_items_from_courses(crss){
  // <li><a href="#">CSC309</a></li>
  return crss.map((crs) => {
    // template for the elements to create
    // <li><a href="#">UofT</a></li>
    const li_itm = document.createElement('li');
    const inner_ref_itm = document.createElement('a');

    inner_ref_itm.setAttribute('href', '#');

    inner_ref_itm.appendChild(document.createTextNode(crs.to_text()));

    li_itm.appendChild(inner_ref_itm);

    return {element: li_itm, course: crs};
 });
};

function _on_course_change() {
  if(!!interaction_data.selected_project){
    if(!interaction_data.selected_course || 
        !interaction_data.selected_project.is_for_course(
          interaction_data.selected_course, courses
        )
    ){
      _rm_selected_project();
    }
  }
  renderProjectList();
}

function _rm_selected_project(){
  html_nodes.project_drop_down.previousElementSibling.firstChild.replaceWith(
    document.createTextNode('Project Name'));
  interaction_data.selected_project=undefined;
}


function renderProjectList(){
  // projects list will come from database afterwards
  _rm_all_child(
    html_nodes.project_drop_down, 
    terminate_condition=(chd) => _terminate_at_class_condition(chd, 'divider')
  );
  li_items_from_projects(projects, courses).filter((itm_prj) => {
    const prj = itm_prj.project;
    return !interaction_data.selected_course || prj.is_for_course(interaction_data.selected_course);
  }).filter((itm_prj) => {
    const prj = itm_prj.project;
    // alert(prj.term + ',' + interaction_data.selected_term)
    return !interaction_data.selected_term || prj.term == interaction_data.selected_term;
  }).forEach((itm_prj) => {
    const prj = itm_prj.project;
    const itm = itm_prj.element;

    itm.addEventListener('click', (e) => {
      e.preventDefault();
      interaction_data.selected_project = prj;
      html_nodes.project_drop_down.previousElementSibling.firstChild.replaceWith(
        document.createTextNode(prj.short_str()));
    });

    html_nodes.project_drop_down.insertBefore(itm, html_nodes.project_drop_down.firstChild);
  });
}


function li_items_from_projects(prjs, crs_lst){
  // template for the elements to create
  // <li><a href="#">A1 for CSC309 @ UOFT</a></li>
  return prjs.map((prj) => {
    const li_itm = document.createElement('li');
    const inner_ref_itm = document.createElement('a');
    // const prj_crs = prj.course_obj(crs_lst);

    inner_ref_itm.setAttribute('href', '#');

    inner_ref_itm.appendChild(
      document.createTextNode(prj.short_str(crs_lst))
      // document.createTextNode(`${prj.title} for ${prj_crs.code} at ${prj_crs.school.acronym}`)
    );

    li_itm.appendChild(inner_ref_itm);

    return {element: li_itm, project: prj};
  });
}


function renderTermList(){
  _rm_all_child(html_nodes.term_drop_down);
  li_items_from_terms(terms).forEach((li_itm_trm) => {
    const li_itm = li_itm_trm.element;
    const trm = li_itm_trm.term;
    li_itm.addEventListener('click', (e) => {
      e.preventDefault();
      interaction_data.selected_term = trm;
      html_nodes.term_drop_down.previousElementSibling.firstChild.replaceWith(
        document.createTextNode(trm));
      _on_term_change();
    });
    html_nodes.term_drop_down.insertBefore(li_itm, html_nodes.term_drop_down.firstChild);
  });

}

function _on_term_change(){
  if(!!interaction_data.selected_project){
    if(!interaction_data.selected_term || 
      interaction_data.selected_project.term != interaction_data.selected_term){
        _rm_selected_project();
    }
  }
  renderProjectList();
}


function li_items_from_terms(trms){
  // template for the elements to create
  // <li><a href="#">CSC309</a></li>
  return trms.map((trm) => {
    // <li><a href="#">UofT</a></li>
    const li_itm = document.createElement('li');
    const inner_ref_itm = document.createElement('a');

    inner_ref_itm.setAttribute('href', '#');

    inner_ref_itm.appendChild(document.createTextNode(trm));

    li_itm.appendChild(inner_ref_itm);

    return {element: li_itm, term: trm};
 });
};

function pre_show_modal(for_msg=true, for_school=false, for_course=false, for_project=false, msg='', msg_color='black'){
  // before showing the modal for change school, render the necessary elements and set up the
  //  listeners, would be pretty convenient so that they use the same modal
  // will later on send out request to create school/course/project to backend
  _rm_all_child(html_nodes.new_data_modal_body);
  if(for_msg){
    html_nodes.new_data_modal_label.parentElement.hidden=true;
    html_nodes.new_data_finish.parentElement.hidden=true;
    html_nodes.new_data_modal_body.appendChild(document.createTextNode(msg));
    html_nodes.new_data_modal_body.style.color=msg_color;
  }else if(!!modal_select_data_error(for_school, for_course, for_project)){
    pre_show_modal(true, false, false, false, 
      modal_select_data_error(for_school, for_course, for_project), 'red');
  }else{
    html_nodes.new_data_modal_label.parentElement.hidden=false;
    html_nodes.new_data_finish.parentElement.hidden=false;
    html_nodes.new_data_modal_body.style.color='black';
    const on_finish = (vt) => {
      let lst_to_add;
      let new_element;
      if(for_school){
        lst_to_add = schools;
        new_element = new School(vt, vt);
      }else if(for_course){
        lst_to_add = courses;
        new_element = new Course(vt, interaction_data.selected_school);
      }else{
        lst_to_add = projects;
        new_element = new project(interaction_data.selected_course.courseCode, 
          interaction_data.selected_term, 
          vt
        );
      }
      lst_to_add.push(new_element);
      renderSchoolList();
      renderCourseList();
      renderProjectList();
      const modal_element = 
        html_nodes.new_data_finish.parentElement.parentElement.parentElement.parentElement;
      const close_button = html_nodes.new_data_finish.previousElementSibling;
      // close_button.dispatchEvent('click');
      // close_button.dispatchEvent(document.createEvent('click'));
      close_button.click();
    }

    const ipt_bx = document.createElement('input');
    let ipt_lb_txt = 'School Name';
    let ttl_txt = 'Add Your School';
    if(for_course){
      ipt_lb_txt = 'Course Code';
      ttl_txt = 'Add Your Course';
    }
    if(for_project){
      ipt_lb_txt = 'Project Title';
      ttl_txt = 'Add Your Project';
    }
    const ipt_lb = document.createElement('label');
    ipt_lb.appendChild(document.createTextNode(ipt_lb_txt));
    modal_pre_label_contents(for_school, for_course, for_project).forEach((txt) => {
      html_nodes.new_data_modal_body.appendChild(
        document.createTextNode(txt)
      );
      html_nodes.new_data_modal_body.append(document.createElement('br'));
    });
    html_nodes.new_data_modal_body.appendChild(ipt_lb);
    html_nodes.new_data_modal_body.appendChild(ipt_bx);
    // alert(html_nodes.new_data_modal_label.firstChild.nodeName);
    html_nodes.new_data_modal_label.firstChild.replaceWith(
      document.createTextNode(ttl_txt)
    );

    html_nodes.new_data_finish.addEventListener('click', (e) => {
      e.preventDefault();
      on_finish(ipt_bx.value);
    });
  }
}

function modal_select_data_error(for_school, for_course, for_project){
  if(for_school){
    return undefined;
  }else if(for_course){
    if(!!interaction_data.selected_school){
      return undefined;
    }else{
      return 'school not selected';
    }
  }else{
    if(!interaction_data.selected_course){
      return 'course not selected';
    }else if(!interaction_data.selected_term){
      return 'term not selected';
    }else{
      return undefined;
    }
  }
}

function modal_pre_label_contents(for_school, for_course, for_project){
  if(for_school){
    return [];
  }else if(for_course){
    return [`create a course in ${interaction_data.selected_school.acronym}`]
  }else{
    return [`create a project for ${interaction_data.selected_course.to_text()}`]
  }
}


function _terminate_at_class_condition(chd, clsnm){
  const cls_lst = []
    if(!!chd.classList){
      cls_lst.push(...chd.classList);
    }else{
      cls_lst.push(chd.className);
    }
    return cls_lst.includes(clsnm);
}

function _rm_all_child(nd, terminate_condition = (chd) => false){
  while ((!!nd.firstChild)&& (!terminate_condition(nd.firstChild))) {
    nd.firstChild.remove();
  }
};

// initialize
function initialize(){
  renderSchoolList();
  renderCourseList();
  renderTermList();
  renderProjectList();
  html_nodes.min_rating_input.addEventListener('input', (e) => {
    e.preventDefault();
    const rtng = parseFloat(e.target.value);
    interaction_data.selected_min_rating = rtng;
    html_nodes.min_rating_display_label.firstChild.replaceWith(
      document.createTextNode(e.target.value)
    );
  });
  // pre_show_modal(false, true, false, false);
  html_nodes.add_school_link.addEventListener('click', (e) => {
    pre_show_modal(false, true, false, false);
  });
  html_nodes.add_course_link.addEventListener('click', (e) => {
    pre_show_modal(false, false, true, false);
  });
  html_nodes.add_project_link.addEventListener('click', (e) => {
    pre_show_modal(false, false, false, true);
  });
}

initialize();
