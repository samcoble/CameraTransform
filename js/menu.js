// memspc.xyz menu generation.

// this one really helped me understand objects in javascript that's for sure.
// very noob level implementation here though. I just wan't absolute freedom.

/*
  -- check number on getInput function

  -- js so funny man
      - 1*"2" = 2
      - 2+"" = "2"

  -- i can't tell if i'm on the right track.
      - maybe i can design it such that
          [code for tool] (use data)-> [[tool settings obj data]] <-(use data) [menu section generation]

      i'll learn how if I properly create a windowDraggable feature that's automatic per section.
      or use table with string id's to make one update function convert menu code to a settings array.

  log box needs to be reloadable 
  basically make push fn also perform js text load

  -- super key here to put that fn inside the listener assigned to text boxes.
  -- need to start consistently providing undefined checks and skips. Good one here is the apply styles need it's own obj

  -- not needed to pass params or callback. okay because of new params for functions not using secondary params
  -- now add second callback par for check boxes and textinputs and file open?

  -- finish removing old menu
*/

var _this; // ez pointer for params
var _settings = [];
var _setting_ids = [];

var _btn_col1 = `background-color: rgb(28, 28, 28);`;
var _btn_col1_str = `rgb(28, 28, 28)`;

var _btn_col2 = `background-color: rgb(34, 34, 34);`;
var _btn_col2_str = `rgb(34, 34, 34)`;

function applyStyles(element, par)
{

  /*
             ╔╗
            ╔╝╚╗
            ╚╗╔╝    
  ╔═╗╔══╗╔══╗║║
  ║╔╝║╔╗║║╔╗║║║
  ║║ ║╚╝║║╚╝║║╚╗
  ╚╝ ╚══╝╚══╝╚═╝
  */
  if (par.rootStyle && par.rootStyle.trim() !== "")
  {
    const _temp_str = `#${element.id} {${par.rootStyle}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*
  ╔╗
  ║║
  ║╚═╗╔══╗╔╗╔╗╔══╗╔═╗
  ║╔╗║║╔╗║║╚╝║║╔╗║║╔╝
  ║║║║║╚╝║╚╗╔╝║║═╣║║
  ╚╝╚╝╚══╝ ╚╝ ╚══╝╚╝
  */
  if (par.hoverStyles && par.hoverStyles.trim() !== "")
  {
    const _temp_str = `#${element.id}:hover {${par.hoverStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  //input[type="text"]:hover

  /*
      ╔╗       ╔╗
      ║║       ║║
  ╔══╗║║ ╔╗╔══╗║║╔╗
  ║╔═╝║║ ╠╣║╔═╝║╚╝╝
  ║╚═╗║╚╗║║║╚═╗║╔╗╗
  ╚══╝╚═╝╚╝╚══╝╚╝╚╝
  */
  if (par.clickStyles && par.clickStyles.trim() !== "") // I think supposed to be click not checked
  {
    const _temp_str = `#${element.id}:checked {${par.clickStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*
      ╔╗          ╔╗        ╔╗
      ║║          ║║        ║║
  ╔══╗║╚═╗╔══╗╔══╗║║╔╗╔══╗╔═╝║
  ║╔═╝║╔╗║║╔╗║║╔═╝║╚╝╝║╔╗║║╔╗║
  ║╚═╗║║║║║║═╣║╚═╗║╔╗╗║║═╣║╚╝║
  ╚══╝╚╝╚╝╚══╝╚══╝╚╝╚╝╚══╝╚══╝
  */
  if ((par.checkedStyles && par.checkedStyles.trim() !== "") && (element.type === "checkbox"))
  {
    const _temp_str = `#${element.id}:checked {${par.checkedStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*
  ╔╗
  ║║
  ║║ ╔╗
  ║║ ╠╣
  ║╚╗║║
  ╚═╝╚╝
  */
  if (par.liStyles && par.liStyles.trim() !== "")
  {
    const _temp_str = `.${element.id+"_li"} {${par.liStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }    

  /*
      ╔╗
      ║║
  ╔╗╔╗║║
  ║║║║║║
  ║╚╝║║╚╗
  ╚══╝╚═╝
  */
  if (par.myUlStyle && par.myUlStyle.trim() !== "")
  {
    const _temp_str = `.${element.className+"_ul"} {${par.myUlStyle}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }
}

function appendFilter(p, e)
{
  if (document.getElementById(p) != null) {document.getElementById(p).appendChild(e);}
  else {document.body.appendChild(e);}
}

function addDiv(par) // ------------------------ Div
{
  const div = document.createElement("div");
  div.id = par.id;
  div.className = par.cls;

  if (par.text != null)
  {div.innerHTML = par.text;}

  if (typeof par.settings != "undefined")
  {
    _settings.push(par);
    _setting_ids.push(par.id);
  }

  if (typeof par.callback != "undefined")
  {
    div.addEventListener("click", function()
    {
      par.callback(par.params);
    });
  }

  appendFilter(par.prnt, div);
  applyStyles(div, par);
  return div;
}

function addButton(par) // ------------------------ Button
{
  const button = document.createElement("button");
  button.textContent = par.text;
  button.id = par.id;
  button.className = par.cls;

  button.addEventListener("click", function(e)
  {
      e.preventDefault();
      par.callback(par.params);
  });

  applyStyles(button, par);
  appendFilter(par.prnt, button);
  return button;
}

function addCheckbox(par) // ------------------------ Checkbox
{
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = par.id;
  checkbox.checked = par.defaultChecked;
  checkbox.className = par.cls;

  checkbox.addEventListener("change", function ()
  {
    // could add undefined check but may not work
    if (typeof par.callback != "undefined" && par.params != "undefined") {par.callback(par.params);}
    if (typeof par.niladic != "undefined") {par.niladic();}
    // par.callback(par.params);
  });

  appendFilter(par.prnt, checkbox);
  applyStyles(checkbox, par);
  return checkbox;
}

function addTextInput(par) // ------------------------ Text input
{
  const input = document.createElement("input");
  input.type = "text";
  input.id = par.id;
  input.className = par.cls;
  input.value = par.value;

  input.addEventListener("input", function ()
  {
    par.value = input.value;
    if (typeof par.callback != "undefined" && par.params != "undefined") {par.callback(par.params);}
    if (typeof par.niladic != "undefined") {par.niladic();}
  });

  input.addEventListener('keydown', function(event)
  {
    if (event.key === 'Enter' && flag_inText == 1)
    {
      // input.blur();
      event.target.blur(); // maybe this more reliable?
    }
  });

  if (typeof par.hoverShadow != "undefined")
  {
    input.addEventListener('mouseover', function(event)
    {
      event.target.style.boxShadow = par.hoverShadow;
    });
  }

  if (typeof par.shadow != "undefined")
  {
    input.style.boxShadow = par.shadow;
    input.addEventListener('mouseleave', function(event)
    {
      event.target.style.boxShadow = par.shadow;
    });
  }

  appendFilter(par.prnt, input);
  applyStyles(input, par);
  return input;
}

function addFileInput(par) // ------------------------ File input
{
  const fileLabel = document.createElement("label");
  fileLabel.id = par.id;
  fileLabel.className = par.cls;
  fileLabel.innerHTML = par.text;

  // manage file krap
  const fileInput = document.createElement("input");

  fileInput.type = "file";
  fileInput.autocomplete = "off";
  fileInput.accept = ".bin";
  fileInput.style.width = "100%";
  fileInput.style.height = "100%";

  fileInput.addEventListener("change", function ()
  { par.callback(fileInput.files); fileInput.value = ''; });

  fileLabel.appendChild(fileInput);

  appendFilter(par.prnt, fileLabel);
  applyStyles(fileLabel, par);
  return fileLabel;
}

// move to better place eventually

var draggedElement;
var _attr_fi = 'data-folderIndex';
var _attr_t = 'data-type';
var _attr_k = 'data-k';

// should just be taking advantage of opacity here with light and dark overlays instead of color specific

const tree_colors =
[
  "rgba(78, 55, 81, 1)",
  "rgba(63, 46, 110, 1)",
  "rgba(58, 89, 52, 1)",
  "rgba(60, 101, 115, 1)",
  "rgba(94, 66, 55, 1)"
];

const tree_colors_d =
[
  "rgba(55, 39, 57, 1)",
  "rgba(44, 32, 77, 1)",
  "rgba(41, 62, 36, 1)",
  "rgba(42, 71, 80, 1)",
  "rgba(65, 46, 38, 1)"
];

const tree_colors_l =
[
  "rgba(117, 97, 118, 1)",
  "rgba(100, 88, 143, 1)",
  "rgba(101, 121, 87, 1)",
  "rgba(103, 130, 144, 1)",
  "rgba(131, 106, 97, 1)"
];


function updateTree(par) // ------------------------ Update tree
{
  const _t = document.getElementById(par.id);
  document.getElementById(par.id).innerHTML = "";

  // _m = makeTree(tree_allObjects);
  _m = makeTree(par);

  const _e = _m.querySelectorAll('.'+par.id+'_ul_0');

  // append allows event listener creation. innerHTML is like text = text. not same. must query to be able to append
  _e.forEach(function(e) { _t.appendChild(e); });
  folder_selected_objs = Array.from(obj_folders[folder_selected]); // I should make this call an after file load fn instead?
}

// the key here is query selector using direct parent ! lmao. Not good.
function makeTree(par) // output tree in the form of html structure
{
  // for now use length of itself. not entirely synced yet.
  const _r = document.createElement("div");
  _r.id = par.id;
  _r.className = par.id;
  _r.scrollTop = 100;

  // can set these with par any time later
  let _root = getFolders(-1, 0); // return all folders in root, layered array format !!!!
  let _s_radius = 3;
  // bad variable names important
  let _s_fld_li_h = 22;
  let _s_fld_li_ex = 4;

  // loop through tree
  let _s = _root.length;
  for (let i=0; i<_s; i++)
  {
    let _s0 = _root[i].length;
    for (let j=0; j<_s0; j++)
    {
      const _ul = document.createElement("ul");
      _ul.id = par.id+"_ul_"+i+"_"+_root[i][j];
      _ul.className = par.id+"_ul"+" "+par.id+"_ul_"+i;
      _ul.style.listStyleType = 'none';
      _ul.style.textShadow = '0px 0px 3px #111';

      // simple math to generate folder border width
      let _pxl = (_s-i+1)*2+3; // need fix

      let _c; // color constructed
      _c = _pxl+'px solid ' + tree_colors_d[(_root[i][j]+1)%tree_colors_d.length]; // where dark tree col set

      let _obj_count = obj_folders[_root[i][j]].length;
      for (let p=0; p<_obj_count; p++) // there's a lot of ways to do this: real issue is checking every folder now for no rason
      {
        if (obj_folders[_root[i][j]][p] == obj_cyc)
        {
          _c = _pxl+'px solid ' + tree_colors_l[(_root[i][j]+1)%tree_colors_d.length]; // where light tree col set
        }
      }
      _ul.style.borderRight = _c;


      if (i==0)
      {_ul.style.borderRadius = '0px '+_s_radius+'px '+_s_radius+'px 0px';}
      else
      {_ul.style.borderRadius = '0px '+_s_radius+'px 0px 0px';}

      // _n is assigned string name given w/ default if undefined
      let _n = (typeof folder_names[_root[i][j]] == "undefined") ? "Folder" : folder_names[_root[i][j]];

      // place li w/ folder name. use for interaction
      const _li_fld = document.createElement("li");
      _li_fld.className = (par.id+"_li");

      // _li_fld.textContent = _n +": "+ _root[i][j] + " : " + obj_folders[_root[i][j]].length;

      _li_fld.textContent = obj_folders[_root[i][j]].length + " | " + _n; // Enable after tree works correctly or show size in new element
      
      _li_fld.style.backgroundColor = tree_colors[(_root[i][j]+1)%tree_colors.length];
      _li_fld.style.height = (_s_fld_li_h+_s_fld_li_ex)+'px';
      _li_fld.style.paddingTop = _s_fld_li_ex/2+'px';
      _li_fld.style.borderBottom = '0px solid #000'; // remove bottom border for last

      _li_fld.style.cursor = "pointer";
      _li_fld.draggable = true;
      _li_fld.setAttribute(_attr_fi, _root[i][j]);
      _li_fld.setAttribute(_attr_t, 1); // identify type at drop

      // when disabled or empty use radius
      if (obj_folders[_root[i][j]].length == 0 || !folder_toggle[_root[i][j]])
      {
        _li_fld.style.borderRadius = _s_radius+'px 0px 0px '+_s_radius+'px';
      } else {
        _li_fld.style.borderRadius = _s_radius+'px 0px 0px 0px';
      }

      if (folder_selected == _root[i][j] && folder_selected > (folder_cwd-1)) // ????????????????????????????????????
      {
        _li_fld.style.borderLeft = "6px solid rgba(180,180,180,0.5)";
        // _li_fld.style.boxShadow = "inset 6px -3px 14px -7px rgba(255, 255, 255, 0.6)";
      }

      if (folder_selected < folder_cwd && _root[i][j] == folder_cwd)
      {
        _li_fld.style.borderLeft = "6px solid rgba(180,180,180,0.4)";
      }

           /*@?@
           ?@?@?
           @?@*/

      _li_fld.addEventListener('click', function()
      {
        if (folder_selected == _root[i][j])
        {
          folder_toggle[_root[i][j]] = !folder_toggle[_root[i][j]];
          updateTree(par);
        }
        else
        {
          document.getElementById("tree_textIn").value = folder_names[_root[i][j]];
          folder_selected = _root[i][j];
          folder_selected_objs = Array.from(obj_folders[_root[i][j]]);
          updateTree(par);
        }
      });

      _li_fld.addEventListener('dragstart', function(event)
      {
        draggedElement = event.target;
      });

      _li_fld.addEventListener('dragover', function(event)
      {
        event.preventDefault();
        if (draggedElement.getAttribute(_attr_t) == 1) // of type folder
        {
          if (event.target != draggedElement) // not dropping on self
          {
            _li_fld.style.border = '2px dashed #aaa';
          }
        }

        if (draggedElement.getAttribute(_attr_t) == 2) // of type obj 
        {
          if (event.target != draggedElement) // not dropping on self
          {
            _li_fld.style.border = '2px dashed #866';
          }
        }
      });

      // reset on leave
      _li_fld.addEventListener('dragleave', function()
      {
        _li_fld.style.border = '0px solid rgba(0,0,0,0)'; // reset border style
      });

      // handle the drop event
      _li_fld.addEventListener('drop', function(event)
      {
        event.preventDefault();
        _li_fld.style.border = '0px solid rgba(0,0,0,0)'; // reset border style

        if (draggedElement.getAttribute(_attr_t) == 1) // of type folder
        {
          if (event.target != draggedElement) // not dropping on self
          {
            // console.log(event.target.getAttribute(_attr_fi) + " : " + draggedElement.getAttribute(_attr_fi));
            folderSetParent(draggedElement.getAttribute(_attr_fi), event.target.getAttribute(_attr_fi));
            updateTree(par);
            key_map.lmb = false;
          }
        }

        if (draggedElement.getAttribute(_attr_t) == 2 && event.target.getAttribute(_attr_fi) >= folder_cwd) // of type obj
        {
          if (event.target != draggedElement) // not dropping on self
          {
            moveK(draggedElement.getAttribute(_attr_fi), draggedElement.getAttribute(_attr_k), event.target.getAttribute(_attr_fi));
            console.log(event.target.getAttribute(_attr_fi));
            updateTree(par);
          }
        }
      });

      // nvim
      // :set guicursor=n-v-c:block,i-ci-ve:ver25,r-cr:hor20,o:hor50\,a:blinkwait700-blinkoff400-blinkon250-Cursor/lCursor\,sm:block-blinkwait175-blinkoff150-blinkon175

           /*@?@
           ?@?@?
           @?@*/

       _ul.appendChild(_li_fld); // load folder li into folder

      let _s1 = obj_folders[_root[i][j]].length;
      for (let k=0; k<_s1; k++) // load folder k's
      {
        if (!folder_toggle[_root[i][j]] || !folder_toggle[folder_parents[_root[i][j]]] && folder_parents[_root[i][j]] != -1) {continue;}
        // honestly losing track of what is going on but _root[i][j] seems to return folder native ith

        _li_obj = document.createElement("li");

        _li_obj.style.cursor = "default";
        _li_obj.draggable = true;
        _li_obj.setAttribute(_attr_fi, _root[i][j]);
        _li_obj.setAttribute(_attr_t, 2); // identify type at drop
        _li_obj.setAttribute(_attr_k, k); // where in each list of obj's tag exists

        let _obj_id = obj_folders[_root[i][j]][k];
        // _li_obj.id = (par.id+"_li"); // not needed ig
        _li_obj.className = (par.id+"_li");

        // use mem_log for user info
        if (_obj_id <= m_objs.length-1)
        {
          _li_obj.textContent = mem_log[_obj_id][2];
        }

        // apply color for selected obj
        if (_obj_id == obj_cyc) {_li_obj.style.backgroundColor = par.color3;} else
        {
          // Apply styles for alternating list items pasta
          if (k % 2) {_li_obj.style.backgroundColor = par.color1;} else {_li_obj.style.backgroundColor = par.color2;}
        }

        // give last item border radius
        if (k==_s1-1)
        {
          _li_obj.style.borderRadius = '0px 0px 0px '+_s_radius+'px';
          _li_obj.style.borderBottom = '0px solid #000'; // remove bottom border for last
        }

           /*@?@
           ?@?@?
           @?@*/

        // must be above other listeners or else errors sometimes
        _li_obj.addEventListener('dragleave', function(event)
        {
          if (event.target != "undefined")
          {
            event.target.style.border = '0px solid rgba(0,0,0,0)';
          }
        });

        // obj li's need to update themself on drag start
        _li_obj.addEventListener('dragstart', function(event)
        {
          draggedElement = event.target;
        });

        _li_obj.addEventListener('dragover', function(event)
        {
          event.preventDefault();

          if (draggedElement.getAttribute(_attr_t) == 2)
          {
            if (event.target != draggedElement && event.target.getAttribute(_attr_t) != "undefined")
            {
              event.target.style.border = '2px dashed #333';
            }
          }
        });

        _li_obj.addEventListener('drop', function(event)
        {
          event.preventDefault();
          _li_obj.style.border = '0px solid rgba(0,0,0,0)'; // reset border style

          moveKAbove(
           draggedElement.getAttribute(_attr_fi),
           draggedElement.getAttribute(_attr_k),
           event.target.getAttribute(_attr_fi),
           event.target.getAttribute(_attr_k)
          );

          updateTree(par);
          key_map.lmb = false;
        });

        _li_obj.addEventListener("click", function ()
        {
          obj_cyc = _obj_id;
          updateTree(par);
        });
        
        _ul.appendChild(_li_obj); // important ! put li in parent ul folder

           /*@?@
           ?@?@?
           @?@*/

      } // end of folder k's
      

      // If first itor/root push to container directly
      if (i==0)
      {
        _r.appendChild(_ul);
      } else 
      {
        if (!folder_toggle[folder_parents[_root[i][j]]]) // spooky check
        {
          _ul.style.visibility = "hidden";
          _ul.style.height = "0px";
          _ul.style.margin = "0px";
          _ul.style.padding = "0px";
        }

        // place directly in parent without looping
        let _p = _r.querySelector("#"+par.id+"_ul_"+(i-1)+"_"+folder_parents[_root[i][j]]);
        _p.appendChild(_ul);
      }
    }
 }

  return _r;
}

function addTree(par) // ------------------------ Adds the tree ig
{
  let _r = makeTree(par);

  // let _t = document.getElementById(par.prnt);
  // if (_t == null) { document.body.appendChild(_r); }
  // else { _t.appendChild(_r); }

  appendFilter(par.prnt, _r);
  applyStyles(_r, par);
}

function treeTextInUpdate(par)
{
  const _e = document.getElementById(par.id);
  folder_names[folder_selected] = _e.value;
  updateTree(tree_allObjects);
}

function addList(par)
{
  const ul = document.createElement("ul");
  const li_cls = par.id+"_li"; // !!!
  ul.id = par.id;
  ul.className = par.cls;
  ul.style.listStyleType = 'none';

  //console.log(ul.id + " : " + par.id);

  par.items.forEach((item, i) =>
  {
      const li = document.createElement("li");
      li.className = li_cls; // !!!
      li.textContent = String(item);

      // Apply styles for alternating list items
      if (i % 2)
      {li.style.backgroundColor = par.color1;}
      else {li.style.backgroundColor = par.color2;}

      ul.appendChild(li);
  });

  appendFilter(par.prnt, ul);
  applyStyles(ul, par);

  return ul;
}

var list_colors =
{
    c1:_btn_col2_str,
    c2:_btn_col1_str,
    c3:"rgb(77,77,77)",
    c4:"rgb(188,188,188)",
    tc:"rgb(195, 123, 0)"
};

function updateList(_item, _id) // pass data as an obj of items & ul id. li's got with +"_li"
{
    const li_cls = _id+"_li"; // !!!
    const _ul = document.getElementById(_id);
    document.getElementById(_id).innerHTML = "";
    //console.log(_item);
    _item.forEach(function(item, i)
    {
        const li = document.createElement("li");
        li.className = li_cls; // !!!
        li.textContent = String(item);

        li.addEventListener("click", function ()
        {
            //console.log(i);
            //par.callback(par.params);
            obj_cyc = i;

            // not very generic here tho. starting to get too specific.
            // pls fix !! @?@?@?@

            updateList(objListConst(), _id);
        });

        // Apply styles for alternating list items
        if (i % 2) {li.style.backgroundColor = list_colors.c1;}
        else {li.style.backgroundColor = list_colors.c2;}
        if (i==obj_cyc) {li.style.backgroundColor = list_colors.c3;}
        if (i<world_obj_count+1) {li.style.color = list_colors.c4;}
        else {li.style.color = list_colors.tc;}

        _ul.appendChild(li);
    });

}

// bad name fix
function objListConst()
{
  var _l = [];
  // m_objs
  for (var i = 0; i<m_objs.length; i++)
  {
      _l[i] = mem_log[i][2];
  }
  return _l;
}

function hideElementById(elementId)
{
  if (elementId != '')
  {
    element = document.getElementById(elementId);
    if (element) { element.style.display = 'none'; }
  }
}

function unhideElementById(elementId)
{
  if (elementId != '')
  {
    element = document.getElementById(elementId);
    if (element) { element.style.display = 'block'; }
  }
}

function setVisibility(p) // Fix looping of this being called eventually
{
  if (p.hide.length > 0) {p.hide.forEach(function(item) {hideElementById(item);});}
  if (p.show.length > 0) {p.show.forEach(function(item) {unhideElementById(item);});}
}

function getInputById(id) {return document.getElementById(id).value;}
function getCheckedById(id) {return document.getElementById(id).checked;}

function setChecked(id, setbool)
{
  var _cbx = document.getElementById(id);
  _cbx.checked = setbool;
}

function updateTextByPar(id, _v)
{
  const _e = document.getElementById(id);
  if (_e != "undefined") {_e.innerHTML = _v;}
}

function updateValueByPar(id, _v)
{
  const _e = document.getElementById(id);
  if (_e != "undefined") {_e.value = _v;}
}


// move to menu fns ???
function menuLinkObj()
{link_obj(obj_cyc);}


// side note: loadPoints fn if using redirect could generalize/link tree better?
// parallel arrays should be provided an array pointing to what is in parallel
// then a loop could provide data managment


// new better way
function updateSetting(par)
{
  const _cd = document.getElementById(par.stn.id); // callback outer div
  let ins = _cd.querySelectorAll('input');

  ins.forEach(function(e, i)
  {

    switch(typeof par.stn.settings[i])
    {
      case "number":
        let _val = typeof checkNumber(e.value) != false ? parseFloat(e.value) : par.stn.settings[i]; // return previously valid if NaN
        par.stn.settings[i] = _val;
        break;
      case "boolean":
        par.stn.settings[i] = e.checked;
        break;
      case "object": // haxed
        if (e.id == par.id)
        {
          par.stn.settings[i][0] = true;
          e.checked = true;
        } else {
          par.stn.settings[i][0] = false;
          e.checked = false;
        }
        break;
      case "string":
        par.stn.settings[i] = e.value;
        break;
    }
    
    // console.log(i + " : " + par.stn.settings[i][0]);
  });

  // console.log(par.stn.settings);
}

// this work good yuh
let _prevEle = Object;
_prevEle.i = 0; _prevEle.id = 0;

function makeElement(_f, _o)
{
  // if (typeof _o.callback != "undefined")
  if (_o.callback == updateSetting)
  {
    _o.params = {id: _o.id, cls: _o.cls, prnt: _o.prnt, stn: _settings[Math.max(0,_settings.length-1)]};
    if (_prevEle.id == _settings[Math.max(0,_settings.length-1)])
    {
      _prevEle.i++;
      if (_settings[Math.max(0,_settings.length-1)].settings.length > _prevEle.i)
      {_o.value = _settings[Math.max(0,_settings.length-1)].settings[_prevEle.i];}
    } else {
      _prevEle.i = 0;
      if (_settings[Math.max(0,_settings.length-1)].settings.length >= _prevEle.i)
      {_o.value = _settings[Math.max(0,_settings.length-1)].settings[_prevEle.i];}
      _prevEle.id = (_settings[Math.max(0,_settings.length-1)]);
    }
  }
  _f(_o);
}


/*


*/


var justOuter =
`
border: 1px solid rgba(120,120,120, 0.3);
`;
var darkBorder =
`
border: 1px solid rgba(31,31,31,0.3);
`;
var lightSideBorder =
`
border-right: 1px solid rgba(100, 100, 100, 0.1);
border-top: 1px solid rgba(150, 150, 150, 0.2);
border-left: 1px solid rgba(100, 100, 100, 0.1);
border-bottom: 1px solid rgba(100, 100, 100, 0.1);
`;

// var radial_bg = `background: radial-gradient(circle, rgba(17,17,17,1) 0%, rgba(12,12,12,1) 100%);`;

var rootStyle =
`
z-index: 2;
font-size: 12px;
color: #EEE;
box-sizing: border-box;
background-color: rgb(32, 32, 32);
`;

var key_bind_info = 
[
  "Ctrl+F5 Update Game",
  "Q(toggle menu & unlock mouse)",
  "M(measure line or linked obj)",
  "R(switch plane)",
  "F(place point at cursor)",
  "Z(undo last point placed)",
  "E(make object from points)",
  "TAB(select obj by aiming at 3D center)",
  "...",
  "W(move forward), S(move backwards)",
  "A(move left), D(move right)",
  "Space(up), B(down)",
  "Shift(speed up movement & deletion)",
  "[Ctrl or Alt] (unlock mouse so you can Alt+Tab)",
  "...",
  "[MENU CLOSED] LMB(move 3D cursor to aim location)",
  "[MENU CLOSED] RMB(select point in selected object)",
  "...",
  "[MENU OPEN] LMB(select points in grid & obj & placed)",
  "[MENU OPEN] RMB(select object)",
  "[MENU OPEN] Click to select object from list",
  "[MENU OPEN] Scroll(object selection)",
  "...",
  "Scroll+Shift(grid size) 2^n",
  "MMB(rotate camera from menu)",
  "G(send cursor to ground)",
  "C(edit object -> converts to points)",
  "L(link objects -> select in sequence)",
  "I(join objects -> select in sequence) [BUGGY]",
  "Pivot Align enable -> logs selected obj -> use F key to mark 4 points -> V2-V1 & V2-V1 -> aligns first vector to second",
  "...",
  "N(LOCK movement planar)",
  "[PLANAR LOCK] Scroll(vertical movement)",
  "Scroll(expand world from center)",
  "[FREE FLY] Y(teleport)",
  "[PLANAR LOCK] Y(teleport & 180 flip)",
  "...",
  "V(start/finish object movement)",
  "Shift+V(start/finish folder movement)",
  "X(delete selected object)",
  "[GRID] Shift+R(rotate around cursor axis)",
  "[MOVER] Shift+R(rotate around object center)",
  "T(duplicate selected object)",
  "Shift+T(dupe -> move cursor -> end[V] OR cont.)",
  "[GRID] 5(mirror over selected plane & point)",
  "[MOVER] 5(mirror over selected plane & object center)",
  "6(resize object w/ bounding box corners)",
  "7(generate circle at cursor & plane)",
  "H(set cursor to object's encoded 3D center)",
  "/(print object to console)",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym",
  "hey man my name is gym"
];

var _error_info = 
[
  "DID",
  "NOT",
  "LOAD"
];


//////////////////////////////////////////////////////////////////////////////////////

// Must add event listener to detect li clicks/hovers -> compare class/id

// background: linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%);

let _fixthis = menu_q_size[1];
var menu_obj_style =
`
box-sizing: border-box;
position: absolute;
width: 200px;
height: auto;
left: -500px;
top: 0px;
user-select: none;
background: rgba(0,0,0,0);
border-radius: 3px;
`;

var menu_objPreview_style =
`
box-sizing: border-box;
border: 0px rgba(0,0,0,1);
margin: 0px;
width: 200px;
height: 200px;
user-select: none;
background: rgba(0,0,0,0);
border-radius: 3px;
`;

makeElement(addDiv,
{
  id: "menu_obj", cls: "", prnt: "html",
  rootStyle: rootStyle + menu_obj_style
});

makeElement(addDiv,
{
  id: "menu_objPreview", cls: "_none", prnt: "menu_obj",
  rootStyle: rootStyle + menu_objPreview_style + justOuter
});

var listStyle2 =
`
background-color: rgba(0,0,0,0);
width: 96%;
padding: 0px;
margin: 3px;
border: 1px solid rgba(255,255,255,0.1);
max-height: `+_fixthis+`px;
overflow-y: auto;
overflow-x: hidden;
`;

var myLiStyle2 =
 `
box-sizing: border-box;
width: 100%;
height: 20px;
padding: 0px; margin: 0px;
border-bottom: 1px solid rgb(12,12,12);
text-align: center;
line-height: 1.8;
`;

var list_objectSelect =
{
  id: "list_objectSelect", cls: "_list", prnt: "menu_obj",
  color1: list_colors.c1, color2: list_colors.c2,
  rootStyle: rootStyle + listStyle2,
  liStyles: myLiStyle2,
  items: _error_info
};
addList(list_objectSelect);

//////////////////////////////////////////////////////////////////////////////////////

/*
                             ╔╗
                            ╔╝╚╗
                            ╚╗╔╝╔═╗╔══╗╔══╗
                             ║║ ║╔╝║╔╗║║╔╗║
                             ║╚╗║║ ║║═╣║║═╣
                             ╚═╝╚╝ ╚══╝╚══╝
*/

/*
left: 700px;
top: 190px;
position: absolute;
background: linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%);
*/

// var menu_tree_wrap
var menu_tree_style =
`
box-sizing: border-box;
width: 200px;
max-height: `+_fixthis+`px;
user-select: none;
border-radius: 3px;
background: rgba(0, 0, 0, 0);
border: 0px solid rgba(0, 0, 0, 0);
color: #CCC;
overflow-y: auto;
overflow-x: hidden;
`;

var menu_tree_ulStyle =
`
box-sizing: border-box;
float: right;
width: 98%;
padding: 0px 1px 0px 0px;
margin: 5px 0px 0px 0px;
text-align: center;
position: relative;
left: -1%;
`;

var menu_tree_liStyle =
 `
box-sizing: border-box;
width: 100%;
height: 22px;
padding: 0px; margin: 0px;
border-bottom: 1px solid rgb(12,12,12);
text-align: center;
line-height: 2.0;
position: relative;
left: 1px;
`;

// makeElement(addDiv,
// {
//   id: "menu_tree", cls: "", prnt: "html",
//   rootStyle: rootStyle + menu_tree_style
// });

// almost converted but no li style
var tree_allObjects =
{
  id: "tree_allObjects", cls: "_list", prnt: "menu_obj",
  color1: list_colors.c1, color2: list_colors.c2, color3: list_colors.c3,
  rootStyle: rootStyle + menu_tree_style,
  liStyles: menu_tree_liStyle,
  myUlStyle: menu_tree_ulStyle
}; addTree(tree_allObjects);

var tree_btn_l =
`
border-radius: 3px 0px 0px 3px;
`;

var tree_btn_r =
`
border-radius: 0px 3px 3px 0px;
border-left: 0px solid black;
`;

var tree_btn =
`
color: #DDD;
margin: 10px 0px 0px 0px;
width: 15%;
height: 26px;
text-align: center;
border: 1px solid rgba(200, 200, 200, 0.1);
line-height: 2.06;
float: right;
outline: none;
` + _btn_col2;

makeElement(addButton,
{
  text: ` + `,
  id: "tree_btn_addFolder", cls: "tree_btn", prnt: "menu_obj",
  rootStyle: rootStyle + tree_btn + tree_btn_r,
  // hoverStyles: tree_btn_addFolder,
  callback: treeModify,
  params: {func:1}
});

makeElement(addButton,
{
  text: ` - `,
  id: "tree_btn_delFolder", cls: "tree_btn", prnt: "menu_obj",
  rootStyle: rootStyle + tree_btn + tree_btn_l,
  // hoverStyles: tree_btn_addFolder,
  callback: treeModify,
  params: {func:2}
});

var treeTextInStyle =
`
color: #DDD;
margin: 10px 0px 0px 1%;
padding: 4px 0px 0px 10px;
width: 68%;
height: 26px;
outline: none;
border-radius: 3px;
border: 1px solid rgba(200, 200, 200, 0.1);
` + _btn_col2;

makeElement(addTextInput,
{
  id: "tree_textIn", cls: "_textInput", prnt: "menu_obj",
  rootStyle: rootStyle + treeTextInStyle,
  value: "",
  callback: treeTextInUpdate,
  params: {id:"tree_textIn"}
});

/////////////////////////////////////////////////////////////////////////////////////////

makeElement(addDiv,
{
    id: "menu_1", cls: "", prnt: "html",
    rootStyle: rootStyle
});

makeElement(addDiv,
{
  id: "menu_q", cls: "", prnt: "menu_1",
  rootStyle: rootStyle +
  `
  box-sizing: border-box;
  position: absolute;
  width: 400px;
  height: 800px;
  left: 30px;
  top: 190px;
  user-select: none;
  border-radius: 3px;
  background: rgba(0,0,0,0);
  `
});

makeElement(addDiv,
{
  id: "menu_tabs", cls: "", prnt: "menu_q",
  rootStyle: rootStyle +
  `
  width: 100%;
  background: rgba(0,0,0,0);
  box-sizing: border-box;
  margin: 0px 0px 4px 0px;
  padding: 0px;
  `
});

var _btn_hover = `box-shadow: inset 0px 0px 2px 0px rgba(255, 255, 255, 0.6);`;
var _btn_tab =
`
display: inline-block;
line-height: 2.4;
text-align: center;
border-top: 1px solid rgba(222, 222, 222, 0.1);
border-right: 0px solid rgba(222, 222, 222, 0.1);
border-bottom: 0px;
border-left: 1px solid rgb(12,12,12); 
background-color: rgb(38, 38, 39);
outline: none;
padding: 0px;
margin: 0px;
width: 31%;
`;

var _btn_tab0 = `border-left: 1px solid rgba(222, 222, 222, 0.1); margin: 0px 0px 0px 5px; border-radius: 3px 0px 0px 3px;`;
var _btn_tabn = `border-radius: 0px 3px 3px 0px; border-right: 1px solid rgba(222, 222, 222, 0.1);`;

makeElement(addButton,
{
  text: "Tool Settings",
  id: "tab1", cls: "_btn", prnt: "menu_tabs",
  rootStyle: rootStyle + _btn_tab + _btn_tab0,
  hoverStyles: _btn_hover,
  callback: setVisibility,
  params: { hide:["div_keysMenu", "div_spawnMenu"], show:["menu_detail"] },
});

// makeElement(addButton,
// {
//   text: "Objects \u3004",
//   id: "tab3", cls: "_btn", prnt: "menu_tabs",
//   rootStyle: rootStyle + _btn_tab,
//   hoverStyles: _btn_hover,
//   callback: setVisibility,
//   params: { hide:["menu_detail", "div_keysMenu"], show:["div_spawnMenu"] },
// });

makeElement(addButton,
{
  text: "Key Binds \u1CC4",
  id: "tab2", cls: "_btn", prnt: "menu_tabs",
  rootStyle: rootStyle + _btn_tab + _btn_tabn,
  hoverStyles: _btn_hover,
  callback: setVisibility,
  params: { hide:["menu_detail", "div_spawnMenu"], show:["div_keysMenu"] },
});

makeElement(addDiv,
{
  id: "menu_tools", cls: "", prnt: "menu_q",
  rootStyle: rootStyle +
  `
  box-sizing: border-box;
  width: 32%;
  float: right;
  margin: 0px 0px 0px 0px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0);
  border-top: 0px solid rgba(120,120,120, 0.3);
  border-right: 0px solid rgba(120,120,120, 0.3);
  border-bottom: 0px solid rgba(120,120,120, 0.3);
  border-left: 0px solid rgba(120,120,120, 0.1);
  border-radius: 3px;
  z-index: 0;
  `
});

// WIDTH OF ALL HERE
makeElement(addDiv,
{
  id: "q_menu_left", cls: "", prnt: "menu_q",
  rootStyle: rootStyle +
  `
  background: rgba(0,0,0,0);
  width: 272px;
  height: 95%;
  margin: 0px;
  padding-top: 0%;
  `
});


/*
 ╔╗         ╔╗                      ╔╗
╔╝╚╗        ║║                      ║║
╚╗╔╝╔══╗╔══╗║║     ╔══╗╔══╗ ╔══╗╔══╗║║ ╔══╗
 ║║ ║╔╗║║╔╗║║║     ║╔╗║║╔╗║ ║╔╗║║╔╗║║║ ║══╣
 ║╚╗║╚╝║║╚╝║║╚╗    ║╚╝║║╚╝╚╗║║║║║╚═╣║╚╗╠══║
 ╚═╝╚══╝╚══╝╚═╝    ║╔═╝╚═══╝╚╝╚╝╚══╝╚═╝╚══╝
                   ║║
                   ╚╝
#toolpanels
*/

var detail_menu =
`
width: 100%;
height: 100%;
margin: 0px;
padding: 0px;
border: 0px;
background-color: rgba(0, 0, 0, 0);
overflow-y: auto;
z-index: -1;
`;

makeElement(addDiv,
{
  id: "menu_detail", cls: "", prnt: "q_menu_left",
  rootStyle: rootStyle + detail_menu
});

/*
             ╔╗              ╔╗
             ║║             ╔╝╚╗
╔══╗╔╗╔═╗╔══╗║║ ╔══╗    ╔══╗╚╗╔╝╔══╗
║╔═╝╠╣║╔╝║╔═╝║║ ║╔╗║    ║══╣ ║║ ║╔╗║
║╚═╗║║║║ ║╚═╗║╚╗║╚═╣    ╠══║ ║╚╗║║║║
╚══╝╚╝╚╝ ╚══╝╚═╝╚══╝    ╚══╝ ╚═╝╚╝╚╝
#drawsettings
*/

var detail_menu_box =
`
box-sizing: border-box;
float: right;
width: 48.5%;
border-radius: 3px;
z-index: -1;
margin: 0px 0px 3px 3px;
border-bottom: 1px solid rgb(32,32,32);
background-color: rgba(0,0,0,0);
`;

var detail_menu_box_half =
`
box-sizing: border-box;
float: left;
width: 48.5%;
margin: 3px 0 0 1%;
border-radius: 3px;
z-index: -1;
border-bottom: 1px solid rgb(32,32,32);
`;

var _cbxLastRad = `border-radius: 0px 0px 3px 0px;`;
var _detailLastRad = `border-radius: 0px 0px 3px 3px;`;
var _leftBorder = `border-left: 1px solid rgba(12,12,12,1);`;

// For setting half size of full size box
var div_css =
`
display: inline-block;
width: 50%;
margin: 0px 0% 0 0%;
outline: none;
text-align: center;
line-height: 2.4;
height: 26px;
font-size: 11px;
color: #AAA;
text-shadow: #191919 0px 0px 2px;

border-top: 0px rgba(0,0,0,0);
border-left: 0px rgba(0,0,0,0);
border-right: 0px rgba(0,0,0,0);
border-bottom: 1px rgba(12,12,12,1);
`;

// Style for li's inside boxes for boxes of half size
var div_css_half =
`
width: 100%;
margin: 0px 0% 0 0%;
outline: none;
text-align: center;
line-height: 2.4;
height: 25px;
font-size: 11px;
color: #AAA;
text-shadow: #191919 0px 0px 2px;
`;

// Text / Number input box styles
var textIn_css =
`
padding-top: 3px;
color: rgb(140, 140, 235);
box-sizing: border-box;
float: right;
width: 50%;
height: 100%;
text-align: center;
outline: none;
border: 0px solid rgba(0,0,0,0);
`;

// Settings box title bar w/ name
var myTitleStyle =
`
margin: 0px;
width: 100%;
height: 26px;
line-height: 2.1;
background: rgb(38,38,39);
border-radius: 3px 3px 0px 0px;
border-top: 1px solid rgb(62,62,62);
border-bottom: 1px solid rgb(16,16,16);
`;

var textIn_hover = `inset 0px 0px 2px 0px rgba(84, 84, 84, 1)`;
var textIn_leave = `inset 1px 0px 0px 0px rgba(12, 12, 12, 1)`;

/*
 ╔╗         ╔╗     ╔╗       ╔╗  ╔╗
╔╝╚╗        ║║     ║║      ╔╝╚╗╔╝╚╗
╚╗╔╝╔══╗╔══╗║║     ║╚═╗╔╗╔╗╚╗╔╝╚╗╔╝╔══╗╔═╗ ╔══╗
 ║║ ║╔╗║║╔╗║║║     ║╔╗║║║║║ ║║  ║║ ║╔╗║║╔╗╗║══╣
 ║╚╗║╚╝║║╚╝║║╚╗    ║╚╝║║╚╝║ ║╚╗ ║╚╗║╚╝║║║║║╠══║
 ╚═╝╚══╝╚══╝╚═╝    ╚══╝╚══╝ ╚═╝ ╚═╝╚══╝╚╝╚╝╚══╝
#toolbuttons
*/

/*
    Fqking spooky bugs AHHHHHHH
        -- can't apply border here after
                : rootStyle + _btn + _btn_tool_border,
    benzene ring
    \u232C
*/

var _btn_tool0 =
`
margin: 0px;
border-radius: 3px 3px 0px 0px;
border-top: 1px solid #282828;
`;

var _btn_toolf =
`
margin: 0px 0px 3px 0px;
border-radius: 0px 0px 3px 3px;
`;

var _btn_tooln = `margin: 0px 0% 0px 0px;`;

var _btn =
 `
color: #AAA;
text-align: right;
border-bottom: 1px solid rgb(12,12,12);
border-top: 0px solid #FFF;
border-left: 0px solid #FFF;
border-right: 0px solid #FFF;
outline: none;
width: 100%;
height: 26px;
line-height: 2.2;
`;

var _btn_hover_tool =
`
background-color: rgb(38, 38, 39);
box-shadow:inset 0px 0px 0px 1px rgba(255, 255, 255, 0.2);
`;

// background-color: rgb(17, 17, 18);
makeElement(addDiv,
{
  id: "detail_box_circleSettings", cls: "", prnt: "menu_detail",
  settings: [8, 24, 0, 0],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_circletool", cls: "", prnt: "detail_box_circleSettings",
  text: `tools \u25CB`,
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addButton,
{
  text: `Lock Planar \u26C7`,
  id: "tool_moveMode", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tool0 + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: playerChangeMovementMode
});

makeElement(addButton,
{
  text: "Teleport \u27AB",
  id: "tool_curTp", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: teleport_plr
});

makeElement(addButton,
{
  text: "Get Center \u22A1",
  id: "tool_curToCtr", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: setCursorToObjCenter
});

makeElement(addButton,
{
  text: "Measure Line \u27F7",
  id: "tool_measureLine", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: measureLine
});

// makeElement(addButton,
// {
//   text: "Measure Angle \u2221",
//   id: "tool_measureAngle", cls: "_btn", prnt: "detail_box_circleSettings",
//   rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
//   hoverStyles: _btn_hover_tool,
//   callback: measureAngle
// });

makeElement(addButton,
{
  text: "Ground Cursor \u2356",
  id: "tool_curToGrnd", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: returnCursorToGround
});

makeElement(addButton,
{
  text: "Create Circle \u25EF",
  id: "tool_createCircle", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: createCircleAtCursor
});

makeElement(addButton,
{
  text: "Dupe Object \u26FC",
  id: "tool_dupeObj", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1 + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: cloneObjSelected
});

// partition
makeElement(addButton,
{
  text: "Dupe Folder \u20AA",
  id: "tool_dupeFld", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2 + _btn_tool0,
  hoverStyles: _btn_hover_tool,
  callback: dupeFolderObjs
});

makeElement(addButton,
{
  text: "Rotate Folder \u2B6E",
  id: "tool_rotateFolder", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: rotateFolder.run
});

makeElement(addButton,
{
  text: "Move Folder \u2933",
  id: "tool_moveFld", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: translateFolder.toggle
});

makeElement(addButton,
{
  text: "Empty Folder \u2672",
  id: "tool_delFldObjs", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1 + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: deleteFolderObjs
});

makeElement(addButton,
{
  text: "Pivot Align \u15D2",
  id: "tool_pivotAlign", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2 + _btn_tool0,
  hoverStyles: _btn_hover_tool,
  callback: pivotAlign.toggle
});

makeElement(addButton,
{
  text: "Resize Object \u2922",
  id: "tool_resizeObject", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: boundingBox.toggle
});

makeElement(addButton,
{
  text: "Mirror / Plane \u2346",
  id: "tool_mirrorOverPlane", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: mirrorOverPlane
});

makeElement(addButton,
{
  text: "Apply Rotation \u2B6E",
  id: "tool_applyRotation", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: applyRotation
});

makeElement(addButton,
{
  text: "Move Object \u2933",
  id: "tool_moveObj", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: moveObject
});

makeElement(addButton,
{
  text: "Edit Object \u2188",
  id: "tool_editObj", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: editSelectedObject
});

makeElement(addButton,
{
  text: "Finish Object \u07F7",
  id: "tool_finishObj", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2,
  hoverStyles: _btn_hover_tool,
  callback: mem_t_mov
});

makeElement(addButton,
{
  text: "Link Object \u2366",
  id: "tool_objLink", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1 + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: menuLinkObj
});

makeElement(addButton,
{
  text: `Save World \u213B`,
  id: "tool_saveWorld", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2 + _btn_tool0,
  hoverStyles: _btn_hover_tool,
  callback: downloadSaveFile
});

makeElement(addButton,
{
  text: "Delete Object \u2421",
  id: "tool_delObj", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
  hoverStyles: _btn_hover_tool,
  callback: deleteObjectSelected
});

makeElement(addButton,
{
  text: `\u05D0 Clear World \u05D0`,
  id: "tool_clearWorld", cls: "_btn", prnt: "detail_box_circleSettings",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_col2 + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: del_world
});

// makeElement(addButton,
// {
//   text: `Close Menu`,
//   id: "tool_closeMenu", cls: "_btn", prnt: "detail_box_circleSettings",
//   rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
//   hoverStyles: _btn_hover_tool,
//   callback: pointerLockSwap 
// });

// new tool location

makeElement(addDiv,
{
  id: "div_circletool", cls: "", prnt: "detail_box_circleSettings",
  text: `circle settings \u25CB`,
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "circleTool_scale", cls: "", prnt: "detail_box_circleSettings",
  text: `scale`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addTextInput,
{
  id: "textIn_scale", cls: "_textInput", prnt: "circleTool_scale",
  rootStyle: rootStyle + textIn_css + _btn_col1,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "circleTool_divider", cls: "", prnt: "detail_box_circleSettings",
  text: `divider`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addTextInput,
{
  id: "textIn_divider", cls: "_textInput", prnt: "circleTool_divider",
  rootStyle: rootStyle + textIn_css + _btn_col2,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "circleTool_off", cls: "", prnt: "detail_box_circleSettings",
  text: `offset`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addTextInput,
{
  id: "textIn_off", cls: "_textInput", prnt: "circleTool_off",
  rootStyle: rootStyle + textIn_css + _btn_col1,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "circleTool_limit", cls: "", prnt: "detail_box_circleSettings",
  text: `n parts`,
  rootStyle: rootStyle + div_css_half + _btn_col2 + _detailLastRad
});

makeElement(addTextInput,
{
  id: "textIn_limit", cls: "_textInput", prnt: "circleTool_limit",
  rootStyle: rootStyle + textIn_css + _btn_col2,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

/*
makeElement(addDiv,
{
  id: "div_colorSettings_g", cls: "", prnt: "detail_box_colorSettings",
  text: `green`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addTextInput,
{
  id: "textIn_colorSettings_g", cls: "textIn_colorSettings", prnt: "div_colorSettings_g",
  rootStyle: rootStyle + textIn_css + _btn_col2,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting,
  niladic: setBackgroundColor
});
*/

/*
  ╔╗                       ╔╗
  ║║                      ╔╝╚╗
╔═╝║╔═╗╔══╗ ╔╗╔╗╔╗    ╔══╗╚╗╔╝╔═╗
║╔╗║║╔╝╚ ╗║ ║╚╝╚╝║    ║══╣ ║║ ║╔╗╗
║╚╝║║║ ║╚╝╚╗╚╗╔╗╔╝    ╠══║ ║╚╗║║║║
╚══╝╚╝ ╚═══╝ ╚╝╚╝     ╚══╝ ╚═╝╚╝╚╝
#drawsettings
*/


makeElement(addDiv,
{
  id: "detail_box_drawSettings", cls: "", prnt: "menu_detail",
  settings: [true, true, false],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_drawSettings", cls: "", prnt: "detail_box_drawSettings",
  text: 'draw settings \u03BB',
  rootStyle: rootStyle + div_css + myTitleStyle
});


makeElement(addDiv,
{
  id: "div_drawLines", cls: "", prnt: "detail_box_drawSettings",
  text: `lines`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});


// background: rgba(159, 144, 75, 0.8);
// box-shadow: inset 1px -1px 1px 0px rgba(16, 16, 16, 1);

// Check box checked style
var cbx_myStyle_checked =
`
background: rgba(122,122,122, 0.8);
box-shadow: inset 0px 0px 1px 0px rgba(16, 16, 16, 1);
border: 0px;
`;

// Check box hover style
var cbx_myStyle_hover =
`
box-shadow: inset 0px 0px 2px 0px rgba(84, 84, 84, 1);
border: 0px;
`;

// Check box default styles
var cbx_myStyle =
`
float: right;
box-shadow: inset 0px 0px 2px -1px rgba(0, 0, 0, 1);
border: 0px;
cursor: pointer;
appearance: none;
outline: 0;
width: 40px;
height:100%;
color: rgba(1, 1, 1, 0);
margin: 0% 0% 0 0%;
padding: 0px;
` + _btn_col2;

/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    

makeElement(addCheckbox,
{
  id: "cbx_lines", cls: "cbx_drawSettings", prnt: "div_drawLines",
  rootStyle: rootStyle + cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting,
  defaultChecked: true
});


makeElement(addDiv,
{
  id: "div_drawSurfaces", cls: "", prnt: "detail_box_drawSettings",
  text: `surfaces`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addCheckbox,
{
  id: "cbx_surfaces", cls: "cbx_drawSettings", prnt: "div_drawSurfaces",
  rootStyle: rootStyle + cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting,
  defaultChecked: true
});

makeElement(addDiv,
{
  id: "div_drawOpacity", cls: "", prnt: "detail_box_drawSettings",
  text: `opacity`,
  rootStyle: rootStyle + div_css_half + _btn_col1 + _detailLastRad
});

makeElement(addCheckbox,
{
  id: "cbx_opacity", cls: "cbx_drawSettings", prnt: "div_drawOpacity",
  rootStyle: rootStyle + cbx_myStyle + _cbxLastRad,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting,
});

/*
╔╗       ╔╗           ╔╗
║║       ║║          ╔╝╚╗
║║ ╔╗╔═╗ ║║╔╗    ╔══╗╚╗╔╝╔═╗
║║ ╠╣║╔╗╗║╚╝╝    ║══╣ ║║ ║╔╗╗
║╚╗║║║║║║║╔╗╗    ╠══║ ║╚╗║║║║
╚═╝╚╝╚╝╚╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
#linksettings
*/

makeElement(addDiv,
{
  id: "detail_box_linkSettings", cls: "", prnt: "menu_detail",
  settings: [{0:false}, {0:false}, {0:true}], // pass numbers as objects to enable radio
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_linkSettings", cls: "", prnt: "detail_box_linkSettings",
  text: 'link settings \u2366',
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "div_linkLinear", cls: "", prnt: "detail_box_linkSettings",
  text: `linear`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

  /*
    ╔╗╔═╗ 
    ╠╣║╔╗╗
    ║║║║║║
    ╚╝╚╝╚╝
  */    

makeElement(addCheckbox,
{
  id: "cbx_linear", cls: "cbx_linkSettings", prnt: "div_linkLinear",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_linkZigzag", cls: "", prnt: "detail_box_linkSettings",
  text: `zigzag`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addCheckbox,
{
  id: "cbx_zigzag", cls: "cbx_linkSettings", prnt: "div_linkZigzag",
  rootStyle: rootStyle + cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_linkPoly", cls: "", prnt: "detail_box_linkSettings",
  text: `poly`,
  rootStyle: rootStyle + div_css_half + _btn_col1 + _detailLastRad
});

makeElement(addCheckbox,
{
  id: "cbx_poly", cls: "cbx_linkSettings", prnt: "div_linkPoly",
  rootStyle: rootStyle + cbx_myStyle + _cbxLastRad,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: true,
  callback: updateSetting
});

/*
╔╗         ╔╗           ╔╗
║║         ║║          ╔╝╚╗
║║ ╔══╗╔══╗║║╔╗    ╔══╗╚╗╔╝╔═╗
║║ ║╔╗║║╔═╝║╚╝╝    ║══╣ ║║ ║╔╗╗
║╚╗║╚╝║║╚═╗║╔╗╗    ╠══║ ║╚╗║║║║
╚═╝╚══╝╚══╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
#locksettings
*/

makeElement(addDiv,
{
  id: "detail_box_lockSettings", cls: "", prnt: "menu_detail",
  settings: [false, false, false],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_lockSettings", cls: "", prnt: "detail_box_lockSettings",
  text: 'axis lock \u0466',
  rootStyle: rootStyle + div_css + myTitleStyle
});

var div_lockSettings_r =
`
  color: rgb(120,40,40);
  text-shadow: rgb(34, 34, 34) 0px 0px 2px;
`;
    // text-shadow: 0px 0px 7px #000;
var div_lockSettings_g =
`
  color: rgb(40,120,40);
  text-shadow: rgb(34, 34, 34) 0px 0px 2px;
`;
var div_lockSettings_b =
`
  color: rgb(60,60,180);
  text-shadow: rgb(34, 34, 34) 0px 0px 2px;
`;

makeElement(addDiv,
{
  id: "div_lockxSettings", cls: "", prnt: "detail_box_lockSettings",
  text: `X`,
  rootStyle: rootStyle + div_css_half + div_lockSettings_r + _btn_col1
});

/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    

makeElement(addCheckbox,
{
  id: "cbx_lockx", cls: "cbx_lockSettings", prnt: "div_lockxSettings",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_lockySettings", cls: "", prnt: "detail_box_lockSettings",
  text: `Y`,
  rootStyle: rootStyle + div_css_half + div_lockSettings_g + _btn_col2
});

makeElement(addCheckbox,
{
  id: "cbx_locky", cls: "cbx_lockSettings", prnt: "div_lockySettings",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_lockzSettings", cls: "", prnt: "detail_box_lockSettings",
  text: `Z`,
  rootStyle: rootStyle + div_css_half + div_lockSettings_b + _btn_col1 + _detailLastRad
});

makeElement(addCheckbox,
{
  id: "cbx_lockz", cls: "cbx_lockSettings", prnt: "div_lockzSettings",
  rootStyle: rootStyle + cbx_myStyle + _cbxLastRad,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting
});

/*
                ╔╗          ╔╗
               ╔╝╚╗        ╔╝╚╗
╔══╗╔══╗ ╔╗╔═╗ ╚╗╔╝    ╔══╗╚╗╔╝╔═╗ 
║╔╗║╚ ╗║ ╠╣║╔╗╗ ║║     ║══╣ ║║ ║╔╗╗
║╚╝║║╚╝╚╗║║║║║║ ║╚╗    ╠══║ ║╚╗║║║║
║╔═╝╚═══╝╚╝╚╝╚╝ ╚═╝    ╚══╝ ╚═╝╚╝╚╝
║║
╚╝
#paintsettings
*/

makeElement(addDiv,
{
  id: "detail_box_paintSettings", cls: "", prnt: "menu_detail",
  settings: [true, 1, 8],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_paintSettings", cls: "", prnt: "detail_box_paintSettings",
  text: 'paint settings \u06A9',
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "div_paintInf", cls: "", prnt: "detail_box_paintSettings",
  text: `infinite &#8734;`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    

makeElement(addCheckbox,
{
  id: "cbx_paintInf", cls: "cbx_paintSettings", prnt: "div_paintInf",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: true,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_paintSettings_dist", cls: "", prnt: "detail_box_paintSettings",
  text: `dist`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addTextInput,
{
  id: "textIn_paintSettings_dist", cls: "textIn_paintSettings", prnt: "div_paintSettings_dist",
  rootStyle: rootStyle + textIn_css + _btn_col2,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_paintSettings_nodes", cls: "", prnt: "detail_box_paintSettings",
  text: `nodes`,
  rootStyle: rootStyle + div_css_half + _btn_col1 + _detailLastRad
});

makeElement(addTextInput,
{
  id: "textIn_paintSettings_nodes", cls: "textIn_paintSettings", prnt: "div_paintSettings_nodes",
  rootStyle: rootStyle + textIn_css + _btn_col1 + _cbxLastRad,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

/*
           ╔╗         ╔╗
           ║║        ╔╝╚╗
╔══╗╔═╗╔╗╔═╝║    ╔══╗╚╗╔╝╔═╗ 
║╔╗║║╔╝╠╣║╔╗║    ║══╣ ║║ ║╔╗╗
║╚╝║║║ ║║║╚╝║    ╠══║ ║╚╗║║║║
╚═╗║╚╝ ╚╝╚══╝    ╚══╝ ╚═╝╚╝╚╝
╔═╝║
╚══╝
#gridsettings
*/

makeElement(addDiv,
{
  id: "detail_box_gridSettings", cls: "", prnt: "menu_detail",
  settings: [8, true, false, false],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_gridSettings", cls: "", prnt: "detail_box_gridSettings",
  text: 'grid settings \u2637',
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "div_gridSettings_scale", cls: "", prnt: "detail_box_gridSettings",
  text: `scale`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addDiv,
{
  id: "div_gridSettings_mapWalls", cls: "", prnt: "detail_box_gridSettings",
  text: `map walls`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addTextInput,
{
  id: "textIn_gridSettings_scale", cls: "textIn_gridSettings_scale", prnt: "div_gridSettings_scale",
  rootStyle: rootStyle + textIn_css + _btn_col1,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting,
  niladic: updateGrid
});

makeElement(addCheckbox,
{
  id: "cbx_mapWalls", cls: "cbx_gridSettings", prnt: "div_gridSettings_mapWalls",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: true,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_gridSettings_faceCulling", cls: "", prnt: "detail_box_gridSettings",
  text: `depth`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addCheckbox,
{
  id: "cbx_faceCulling", cls: "cbx_gridSettings", prnt: "div_gridSettings_faceCulling",
  rootStyle: rootStyle + cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_gridSettings_drawDepth", cls: "", prnt: "detail_box_gridSettings",
  text: `culling`,
  rootStyle: rootStyle + div_css_half + _btn_col2 + _detailLastRad
});

makeElement(addCheckbox,
{
  id: "cbx_drawDepth", cls: "cbx_gridSettings", prnt: "div_gridSettings_drawDepth",
  rootStyle: rootStyle + cbx_myStyle + _cbxLastRad,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
});

/*
╔╗                  ╔╗                 ╔╗
║║                  ║║                ╔╝╚╗
║╚═╗╔══╗    ╔══╗╔══╗║║ ╔══╗╔═╗    ╔══╗╚╗╔╝╔═╗
║╔╗║║╔╗║    ║╔═╝║╔╗║║║ ║╔╗║║╔╝    ║══╣ ║║ ║╔╗╗
║╚╝║║╚╝║    ║╚═╗║╚╝║║╚╗║╚╝║║║     ╠══║ ║╚╗║║║║
╚══╝╚═╗║    ╚══╝╚══╝╚═╝╚══╝╚╝     ╚══╝ ╚═╝╚╝╚╝
    ╔═╝║
    ╚══╝
#colorsettings
*/

makeElement(addDiv,
{
  id: "detail_box_colorSettings", cls: "", prnt: "menu_detail",
  settings: [18, 18, 18],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_colorSettings", cls: "", prnt: "detail_box_colorSettings",
  text: 'world color [255]',
  rootStyle: rootStyle + div_css_half + myTitleStyle
});

makeElement(addDiv,
{
  id: "div_colorSettings_r", cls: "", prnt: "detail_box_colorSettings",
  text: `red`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    

makeElement(addTextInput,
{
  id: "textIn_colorSettings_r", cls: "textIn_colorSettings", prnt: "div_colorSettings_r",
  rootStyle: rootStyle + textIn_css + _btn_col1,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting,
  niladic: setBackgroundColor
});

makeElement(addDiv,
{
  id: "div_colorSettings_g", cls: "", prnt: "detail_box_colorSettings",
  text: `green`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addTextInput,
{
  id: "textIn_colorSettings_g", cls: "textIn_colorSettings", prnt: "div_colorSettings_g",
  rootStyle: rootStyle + textIn_css + _btn_col2,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting,
  niladic: setBackgroundColor
});

makeElement(addDiv,
{
  id: "div_colorSettings_b", cls: "", prnt: "detail_box_colorSettings",
  text: `blue`,
  rootStyle: rootStyle + div_css_half + _btn_col1 + _detailLastRad
});

makeElement(addTextInput,
{
  id: "textIn_colorSettings_b", cls: "textIn_colorSettings", prnt: "div_colorSettings_b",
  rootStyle: rootStyle + textIn_css + _btn_col1 + _cbxLastRad,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting,
  niladic: setBackgroundColor
});

/*
        ╔╗      ╔╗                    ╔╗
       ╔╝╚╗    ╔╝╚╗                  ╔╝╚╗
╔═╗╔══╗╚╗╔╝╔══╗╚╗╔╝╔╗╔══╗╔═╗     ╔══╗╚╗╔╝╔═╗ 
║╔╝║╔╗║ ║║ ╚ ╗║ ║║ ╠╣║╔╗║║╔╗╗    ║══╣ ║║ ║╔╗╗
║║ ║╚╝║ ║╚╗║╚╝╚╗║╚╗║║║╚╝║║║║║    ╠══║ ║╚╗║║║║
╚╝ ╚══╝ ╚═╝╚═══╝╚═╝╚╝╚══╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
#rotationsettings
*/

makeElement(addDiv,
{
  id: "detail_box_rotationSettings", cls: "", prnt: "menu_detail",
  settings: [45],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_rotationSettings", cls: "", prnt: "detail_box_rotationSettings",
  text: 'rotation \u2B6E',
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "div_rotationSettings_r", cls: "", prnt: "detail_box_rotationSettings",
  text: `deg`,
  rootStyle: rootStyle + div_css_half + _btn_col1 + _detailLastRad
});

/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    

makeElement(addTextInput,
{
  id: "textIn_rotationSettings_r", cls: "textIn_rotationSettings", prnt: "div_rotationSettings_r",
  rootStyle: rootStyle + textIn_css + _btn_col1 + _cbxLastRad,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

/*
                           ╔╗       ╔╗
                          ╔╝╚╗     ╔╝╚╗
  ╔╗╔╗╔══╗╔═╗ ╔╗╔╗    ╔══╗╚╗╔╝╔══╗ ╚╗╔╝╔╗╔╗╔══╗
  ║╚╝║║╔╗║║╔╗╗║║║║    ║══╣ ║║ ╚ ╗║  ║║ ║║║║║══╣
  ║║║║║║═╣║║║║║╚╝║    ╠══║ ║╚╗║╚╝╚╗ ║╚╗║╚╝║╠══║
  ╚╩╩╝╚══╝╚╝╚╝╚══╝    ╚══╝ ╚═╝╚═══╝ ╚═╝╚══╝╚══╝
*/

var menu_status_style =
`
box-sizing: border-box;
position: absolute;
left: 12px;
top: 12px;
width: 400px;
height: 75px;
border-radius: 3px;
border: 1px solid rgb(38,38,38);
color: #DDD;
padding: 10px 10px 0px 10px;
` + _btn_col1;

var menu_status_style_l =
`
width: 70%;
height: 100%;
float: left;
` + _btn_col1;

var menu_status_style_r =
`
width: 30%;
height: 100%;
float: right;
` + _btn_col1;

var _textLeft = `text-align: left;`;
var _textRight = `text-align: right;`;

var menu_status_style_l0 =
`
width: 100%;
height: 23%;
padding: 0px 0px 0px 1px;
margin: 0px 0px 2px 0px;
background: none;
`;

// border: 1px solid rgba(13,13,13,0.5);

var menu_status_style_l2 =
`
display: block;
float: left;
padding: 0px 0px 0px 12px;
width: 36%;
height: 26px;
margin: 5px 0px 0px 0px;
border: 1px solid rgb(44,44,44);
cursor: pointer;
border-radius: 3px 0px 0px 0px;
line-height: 2.2;
background-color: rgb(38,38,39);
`;

var menu_status_style_l3 =
`
display: block;
float: right;
padding: 2px 0px 0px 12px;
width: 64%;
height: 26px;
margin: 5px 0px 0px 0px;
border: 1px solid rgb(40,40,40);
border-left: none;
outline: none;
` + _btn_col1;

var menu_status_style_r2 =
`
padding: 0px 0px 0px 12px;
width: 100%;
height: 26px;
margin: 7px 0px 0px 0px;
border: 1px solid rgb(40,40,40);
border-left: none;
border-radius: 0px 3px 0px 0px;
color: #555;
line-height: 2.2;
` + _btn_col1;

var _textScaleFix =
`
width: 300px;
position: relative;
left: -187px;
`;

var _menu_status_text_col = ` color: #AAA; `;

makeElement(addDiv,
{
  id: "menu_status", cls: "", prnt: "html",
  settings: ["", "memspc_"],
  rootStyle: rootStyle + menu_status_style
});

makeElement(addDiv,
{
  id: "menu_status_l", cls: "", prnt: "menu_status",
  rootStyle: rootStyle + menu_status_style_l
});

makeElement(addDiv,
{
  id: "menu_status_l0", cls: "", prnt: "menu_status_l",
  rootStyle: rootStyle + menu_status_style_l0 + _textLeft + _menu_status_text_col
});

makeElement(addDiv,
{
  id: "menu_status_l1", cls: "", prnt: "menu_status_l",
  rootStyle: rootStyle + menu_status_style_l0 + _textLeft + _menu_status_text_col
});

/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    

// fix this area: can use settingUpdate and niladic -> var fileName -> loadSelect()

makeElement(addFileInput,
{
  id: "menu_status_l2", cls: "", prnt: "menu_status_l",
  text: "Open file",
  rootStyle: rootStyle + menu_status_style_l2 + _menu_status_text_col,
  callback: loadSelect
});

makeElement(addTextInput,
{
  id: "menu_status_l3", cls: "", prnt: "menu_status_l",
  value: "memspc_",
  rootStyle: rootStyle + menu_status_style_l3,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "menu_status_r", cls: "", prnt: "menu_status",
  rootStyle: rootStyle + menu_status_style_r
});

makeElement(addDiv,
{
  id: "menu_status_r0", cls: "", prnt: "menu_status_r",
  rootStyle: rootStyle + menu_status_style_l0 + _textRight + _menu_status_text_col
});

makeElement(addDiv,
{
  id: "menu_status_r1", cls: "", prnt: "menu_status_r",
  rootStyle: rootStyle + menu_status_style_l0 + _textRight + _textScaleFix + _menu_status_text_col
});

makeElement(addDiv,
{
  id: "menu_status_r2", cls: "", prnt: "menu_status_r",
  text: "",
  rootStyle: rootStyle + menu_status_style_r2 + _textLeft
});

// Wpn selector ind

var _leftRadius = `border-radius: 3px 0px 0px 3px;`;
var _rightRadius = `border-radius: 0px 3px 3px 0px;`;
var _borderRight = `border-right: 1px solid rgb(44,44,44);`;

var style_wpn_n =
`
display: inline-block;
vertical-align: top;
height: 40px;
width: 70px;
margin: 0px;
background: rgb(13,13,13);
border-top: 1px solid rgb(44,44,44);
border-left: 1px solid rgb(44,44,44);
border-bottom: 1px solid rgb(44,44,44);
`;

var style_wpn_n_key =
`
color: #555;
position: relative;
left: 5px;
top: 5px;
font-size: 12px;
text-align: center;
width: 0px;
height: 0px;
border: 0px;
margin: 0px;
`;

var style_wpn_n_name =
`
color: #EEE;
display: inline-block;
vertical-align: bottom;
font-size: 12px;
text-align: center;
width: 100%;
height: 0px;
border: 0px;
margin: 0px;
`;


function updateWpnSelect()
{
  const _e = document.getElementById("menu_wpn_select");
  const _q = _e.querySelectorAll("._wpnSlct");
  _q.forEach(function(e, i)
  {
    let _c = (i == wpn_select) ? _btn_col1_str : _btn_col2_str;
    e.style.background = _c;
  });
}

function updateWpnFromMenu(par)
{
  wpn_select = par.i;
  updateWpnSelect();
  pointerLockSwap();
}

makeElement(addDiv,
{
  id: "menu_wpn_select", cls: "", prnt: "html",
  rootStyle:
  `
  position: absolute;
  top: 93%;
  left: 3%;
  height: 40px;
  padding: 0px;
  margin: 0px;
  background: rgba(0,0,0,0);
  border: 0px solid rgb(0,0,0);
  `
});

makeElement(addDiv,
{
  id: "menu_wpn_1", cls: "_wpnSlct", prnt: "menu_wpn_select",
  rootStyle: style_wpn_n + _leftRadius,
  callback: updateWpnFromMenu,
  params: {i: 0}
});

makeElement(addDiv,
{
  id: "menu_wpn_1_key", cls: "", prnt: "menu_wpn_1",
  text: "1",
  rootStyle: style_wpn_n_key
});
makeElement(addDiv,
{
  id: "menu_wpn_1_name", cls: "", prnt: "menu_wpn_1",
  text: "grid",
  rootStyle: style_wpn_n_name
});

// ---

makeElement(addDiv,
{
  id: "menu_wpn_2", cls: "_wpnSlct", prnt: "menu_wpn_select",
  rootStyle: style_wpn_n,
  callback: updateWpnFromMenu,
  params: {i: 1}
});

makeElement(addDiv,
{
  id: "menu_wpn_2_key", cls: "", prnt: "menu_wpn_2",
  text: "2",
  rootStyle: style_wpn_n_key
});

makeElement(addDiv,
{
  id: "menu_wpn_2_name", cls: "", prnt: "menu_wpn_2",
  text: "mover",
  rootStyle: style_wpn_n_name
});

// ---

makeElement(addDiv,
{
  id: "menu_wpn_3", cls: "_wpnSlct", prnt: "menu_wpn_select",
  rootStyle: style_wpn_n,
  callback: updateWpnFromMenu,
  params: {i: 2}
});

makeElement(addDiv,
{
  id: "menu_wpn_3_key", cls: "", prnt: "menu_wpn_3",
  text: "3",
  rootStyle: style_wpn_n_key
});

makeElement(addDiv,
{
  id: "menu_wpn_3_name", cls: "", prnt: "menu_wpn_3",
  text: "paint",
  rootStyle: style_wpn_n_name
});

// ---

makeElement(addDiv,
{
  id: "menu_wpn_4", cls: "_wpnSlct", prnt: "menu_wpn_select",
  rootStyle: style_wpn_n + _borderRight + _rightRadius,
  callback: updateWpnFromMenu,
  params: {i: 3}
});

makeElement(addDiv,
{
  id: "menu_wpn_4_key", cls: "", prnt: "menu_wpn_4",
  text: "4",
  rootStyle: style_wpn_n_key
});

makeElement(addDiv,
{
  id: "menu_wpn_4_name", cls: "", prnt: "menu_wpn_4",
  text: "ray",
  rootStyle: style_wpn_n_name
});

/*
    ╔════╗╔═══╗╔══╗     ╔═══╗
    ║╔╗╔╗║║╔═╗║║╔╗║     ║╔═╗║
    ╚╝║║╚╝║║ ║║║╚╝╚╗    ╚╝╔╝║
      ║║  ║╚═╝║║╔═╗║    ╔═╝╔╝
     ╔╝╚╗ ║╔═╗║║╚═╝║    ║║╚═╗
     ╚══╝ ╚╝ ╚╝╚═══╝    ╚═══╝
     #tab2 #keybinds
*/              

var defaultHidden = `display: none;`;

makeElement(addDiv,
{
  id: "div_keysMenu", cls: "", prnt: "q_menu_left",
  rootStyle: rootStyle + detail_menu + defaultHidden +
  `
  box-sizing: border-box;
  float: left;
  margin: 0% 0px 0px 0%;
  padding: 0px;
  overflow-x: hidden;
  `
});

// width: 385px;
var listStyle =
`
background-color: rgba(0,0,0,0);
padding: 0px;
max-height: 97%;
margin: 0px 1% 0px 1%;
border-radius: 3px;
border: 1px solid rgba(255,255,255,0.1);
overflow-y: auto;
`;

var myLiStyle =
`
box-sizing: border-box;
padding 0px; margin: 0px;
border-bottom: 1px solid rgb(12,12,12);
text-align: center;
line-height: 2.09;
`;

makeElement(addList,
{
  id: "list_keyBindInfo", cls: "_list", prnt: "div_keysMenu",
  color1: list_colors.c1, color2: list_colors.c2,
  rootStyle: rootStyle + listStyle,
  liStyles: myLiStyle,
  items: key_bind_info
});

/*
    ╔════╗╔═══╗╔══╗    ╔═══╗
    ║╔╗╔╗║║╔═╗║║╔╗║    ║╔═╗║
    ╚╝║║╚╝║║ ║║║╚╝╚╗   ╚╝╔╝║
      ║║  ║╚═╝║║╔═╗║   ╔╗╚╗║
     ╔╝╚╗ ║╔═╗║║╚═╝║   ║╚═╝║
     ╚══╝ ╚╝ ╚╝╚═══╝   ╚═══╝
     #tab3 #spawnmenu
*/              

makeElement(addDiv,
{
  id: "div_spawnMenu", cls: "", prnt: "q_menu_left",
  rootStyle: rootStyle + detail_menu + defaultHidden +
  `
  background: rgba(0,0,0,0.05);
  box-sizing: border-box;
  float: left;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
  border-radius: 3px;
  `
});




