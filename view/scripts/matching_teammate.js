const dynamic_data = {
  current_usr: users[0],
  matching_users: []
};

const html_components = {
  matching_usr_lst: document.getElementById('matching_usr_lst')
};

const matching_li_buttons = ['fa-user-circle', 'fa-handshake', 'fa-th-list'];
const matching_btn_hover_over = 'fa-check'
{/* <i class="fas fa-check"></i> */ }

function filter_users(max_usrs = 10) {
  return users.filter((usr) => !usr.same_user(dynamic_data.current_usr)).sort(
    (u1, u2) => {
      const curr_usr = dynamic_data.current_usr;
      const u1_same_course = curr_usr.same_course_num(u1);
      const u2_same_course = curr_usr.same_course_num(u2);
      const u1_same_prj = curr_usr.same_project_num(u1);
      const u2_same_prj = curr_usr.same_project_num(u2);
      if (u1_same_prj < u2_same_prj) {
        return -1;
      } else if (u1_same_course < u2_same_course) {
        return -1;
      } else {
        return u1.rating - u2.rating;
      }
      // might be another criteria for sorting so just leave it here for now
      // if(u1.looking_for_same(curr_usr) < u2.looking_for_same(curr_usr)){
      //   return 1;
      // }else if(u1.looking_for_same(current_usr) > u2.looking_for_same(curr_usr)){
      //   return -1;
      // }else{
      //   return u2.rating - u1.rating;
      // }
    }).slice(0, max_usrs);
};

function matching_list_item_from_user(usr) {
  // template for the html element to add
  // <li class="list-group-item">
  //     <strong style="margin-left: 10%">Jerry @ UofT</strong>

  //     <button class="btn btn-primary" style="margin-left:25%; border-radius: 30%">
  //       <i class="fas fa-user-circle"></i>
  //     </button>
  //     <button class="btn btn-primary" style="margin-left:1%; border-radius: 30%">
  //       <i class="fas fa-handshake"></i>
  //     </button>
  //     <button class="btn btn-primary" style="margin-left:1%; border-radius: 30%">
  //       <i class="fas fa-th-list fa-sm"></i>
  //     </button>

  //   </li>
  const li_itm = document.createElement('li');
  li_itm.classList.add('list-group-item');

  const person_label = document.createElement('strong');
  // person_label.setAttribute('marginLeft', '10%');
  // person_label.setAttribute('marginRight', '24%');
  person_label.style.marginLeft = '10%';
  person_label.style.marginRight = '24%';
  person_label.appendChild(document.createTextNode(usr.short_string()));

  const bttns = matching_li_buttons.map((icn) => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    // btn.setAttribute('marginLeft', '1%');
    // btn.setAttribute('borderRadius', '30%');
    btn.style.marginLeft = '1%';
    btn.style.borderRadius = '30%';
    btn.style.cssFloat = 'right';
    const icn_itm = document.createElement('i');
    icn_itm.classList.add('fas');
    icn_itm.classList.add(icn);
    // icn_itm.classList.add('fa-sm');
    btn.appendChild(icn_itm);
    return btn;
  });

  li_itm.appendChild(person_label);
  bttns.forEach((btn_itm) => li_itm.appendChild(btn_itm));
  li_itm.appendChild(document.createElement('br'));
  li_itm.appendChild(document.createElement('br'));
  li_itm.style.marginTop = '5%';
  return { element: li_itm, user: usr };
};

function renderMatchingUserList() {
  // the list of users will come from backend afterwards
  while (!!html_components.matching_usr_lst.firstChild) {
    html_components.matching_usr_lst.firstChild.remove();
  }

  dynamic_data.matching_users
    .map((ur) => matching_list_item_from_user(ur))
    .reverse()
    .forEach((itm_usr) => {
      const the_itm = itm_usr.element;
      const the_usr = itm_usr.user;
      const see_profile_btn = the_itm.querySelector(`.${matching_li_buttons[0]}`).parentElement;
      const teamup_btn = the_itm.querySelector(`.${matching_li_buttons[1]}`).parentElement;
      const shortlst_btn = the_itm.querySelector(`.${matching_li_buttons[2]}`).parentElement;
      shortlst_btn.hidden = true;

      see_profile_btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'public_profile.html';
      });

      teamup_btn.addEventListener('click', (e) => {
        e.preventDefault();
        // alert('invited');
        window.alert('sucessfully invited');
      })

      teamup_btn.addEventListener('mouseover', () => {
        // teamup_btn.style.backgroundColor='green';
        teamup_btn.querySelector('i').classList.replace(matching_li_buttons[1], matching_btn_hover_over);
      });
      teamup_btn.addEventListener('mouseout', () => {
        // teamup_btn.style.backgroundColor='blue';
        teamup_btn.querySelector('i').classList.replace(matching_btn_hover_over, matching_li_buttons[1]);
      });
      html_components.matching_usr_lst.appendChild(the_itm);
    });
};

function initialize() {
  dynamic_data.matching_users = filter_users();
  // console.log(JSON.stringify(dynamic_data))
  renderMatchingUserList();
};

initialize();