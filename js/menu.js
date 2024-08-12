// memspc.xyz menu generation.

/*
  js so funny man
      - 1*"2" = 2
      - 2+"" = "2"

  i can't tell if i'm on the right track.
      - maybe i can design it such that
          [code for tool] (use data)-> [[tool settings obj data]] <-(use data) [menu section generation]

  LINE : 1547
  here i need to bind this with the standard functions and have options for iStyle and fStyle to go with modStyle
  that works directly through the parent container and remove prnt from packed elements so the parent is set 
  
  also need to consider making the functionRunList auto generate the menu
  using checkbox buttons as toggle does not entirely fix the problem so this should help
*/


var _btn_col1 = `background-color: rgb(28, 28, 28);`,
    _btn_col1_str = `rgb(28, 28, 28)`,
    _btn_col2 = `background-color: rgb(34, 34, 34);`,
    _btn_col2_str = `rgb(34, 34, 34)`,
    _btn_col = [`background-color: rgb(28, 28, 28);`, `background-color: rgb(34, 34, 34);`];

// should just use opacity here with light and dark overlays instead of color specific

const tree_colors =
[
  "rgba(78, 55, 81, 1)",
  "rgba(63, 46, 110, 1)",
  "rgba(58, 89, 52, 1)",
  "rgba(60, 101, 115, 1)",
  "rgba(94, 66, 55, 1)"
],    tree_colors_d =
[
  "rgba(55, 39, 57, 1)",
  "rgba(44, 32, 77, 1)",
  "rgba(41, 62, 36, 1)",
  "rgba(42, 71, 80, 1)",
  "rgba(65, 46, 38, 1)"
],    tree_colors_l =
[
  "rgba(117, 97, 118, 1)",
  "rgba(100, 88, 143, 1)",
  "rgba(101, 121, 87, 1)",
  "rgba(103, 130, 144, 1)",
  "rgba(131, 106, 97, 1)"
];

var _settings = [],
    _setting_ids = [],
    eset_tools = [],
    _attr_fi = 'data-folderIndex',
    _attr_t = 'data-type',
    _attr_k = 'data-k',
    draggedElement;

var _this; // ez pointer for param

/*_______________________________________________________________________________________________________________________*/


function applyStyles(element, par)
{

  /*         ╔╗
            ╔╝╚╗
            ╚╗╔╝    
  ╔═╗╔══╗╔══╗║║
  ║╔╝║╔╗║║╔╗║║║
  ║║ ║╚╝║║╚╝║║╚╗
  ╚╝ ╚══╝╚══╝╚═╝ */
  if (par.rootStyle && par.rootStyle.trim() !== "")
  {
    const _temp_str = `#${element.id} {${par.rootStyle}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*╔╗
    ║║
    ║╚═╗╔══╗╔╗╔╗╔══╗╔═╗
    ║╔╗║║╔╗║║╚╝║║╔╗║║╔╝
    ║║║║║╚╝║╚╗╔╝║║═╣║║
    ╚╝╚╝╚══╝ ╚╝ ╚══╝╚╝ */
  if (par.hoverStyles && par.hoverStyles.trim() !== "")
  {
    const _temp_str = `#${element.id}:hover {${par.hoverStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*    ╔╗       ╔╗
        ║║       ║║
    ╔══╗║║ ╔╗╔══╗║║╔╗
    ║╔═╝║║ ╠╣║╔═╝║╚╝╝
    ║╚═╗║╚╗║║║╚═╗║╔╗╗
    ╚══╝╚═╝╚╝╚══╝╚╝╚╝ */
  if (par.clickStyles && par.clickStyles.trim() !== "")
  {
    const _temp_str = `#${element.id}:click {${par.clickStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*  ╔╗          ╔╗        ╔╗
      ║║          ║║        ║║
  ╔══╗║╚═╗╔══╗╔══╗║║╔╗╔══╗╔═╝║
  ║╔═╝║╔╗║║╔╗║║╔═╝║╚╝╝║╔╗║║╔╗║
  ║╚═╗║║║║║║═╣║╚═╗║╔╗╗║║═╣║╚╝║
  ╚══╝╚╝╚╝╚══╝╚══╝╚╝╚╝╚══╝╚══╝ */
  if ((par.checkedStyles && par.checkedStyles.trim() !== "") && (element.type === "checkbox"))
  {
    const _temp_str = `#${element.id}:checked {${par.checkedStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }

  /*╔╗
    ║║
    ║║ ╔╗
    ║║ ╠╣
    ║╚╗║║
    ╚═╝╚╝ */
  if (par.liStyles && par.liStyles.trim() !== "")
  {
    const _temp_str = `.${element.id+"_li"} {${par.liStyles}}`;
    const styleElement = document.createElement('style');
    styleElement.textContent = _temp_str;
    document.head.appendChild(styleElement);
  }    

   /* ╔╗
      ║║
  ╔╗╔╗║║
  ║║║║║║
  ║╚╝║║╚╗
  ╚══╝╚═╝ */
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

/*  ╔╗
    ║║
  ╔═╝║╔╗╔╗╔╗
  ║╔╗║╠╣║╚╝║
  ║╚╝║║║╚╗╔╝
  ╚══╝╚╝ ╚╝ */

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
    { par.callback(par.params); });
  }

  if (typeof par.niladic != "undefined")
  {
    div.addEventListener("click", function()
    { par.niladic(); });
  }
  appendFilter(par.prnt, div);
  applyStyles(div, par);
  return div;
}

/*    ╔╗   ╔╗
      ║║  ╔╝╚╗
   ╔╗ ║╚═╗╚╗╔╝╔══╗
  ╔╝╚╗║╔╗║ ║║ ║╔╗║
  ╚╗╔╝║╚╝║ ║╚╗║║║║
   ╚╝ ╚══╝ ╚═╝╚╝╚╝ */

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

/*        ╔╗
          ║║
   ╔╗ ╔══╗║╚═╗╔╗╔╗
  ╔╝╚╗║╔═╝║╔╗║╚╬╬╝
  ╚╗╔╝║╚═╗║╚╝║╔╬╬╗
   ╚╝ ╚══╝╚══╝╚╝╚╝ */

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

/*     ╔╗      ╔╗
      ╔╝╚╗    ╔╝╚╗
   ╔╗ ╚╗╔╝╔╗╔╗╚╗╔╝    ╔╗╔══╗ 
  ╔╝╚╗ ║║ ╚╬╬╝ ║║     ╠╣║╔╗║
  ╚╗╔╝ ║╚╗╔╬╬╗ ║╚╗    ║║║║║║
   ╚╝  ╚═╝╚╝╚╝ ╚═╝    ╚╝╚╝╚╝ */

function addTextInput(par) // ------------------------ Text input
{
  const input = document.createElement("input");
  input.type = "text";
  input.id = par.id;
  input.className = par.cls;
  input.value = par.value;

  function _kode()
  {
    par.value = input.value;
    if (typeof par.callback != "undefined" && par.params != "undefined") {par.callback(par.params);}
    if (typeof par.niladic != "undefined") {par.niladic();}
  }

  input.addEventListener("input", function () {_kode();});
  input.addEventListener("click", function () {_kode();});

  input.addEventListener('keydown', function(event)
  {
    if (event.key === 'Enter' && flag_inText == 1)
    { event.target.blur(); } // maybe this more reliable? input.blur();
  });

  if (typeof par.hoverShadow != "undefined")
  {
    input.addEventListener('mouseover', function(event)
    { event.target.style.boxShadow = par.hoverShadow; });
  }

  if (typeof par.shadow != "undefined")
  {
    input.style.boxShadow = par.shadow;
    input.addEventListener('mouseleave', function(event)
    { event.target.style.boxShadow = par.shadow; });
  }

  appendFilter(par.prnt, input);
  applyStyles(input, par);
  return input;
}

/*     ╔═╗  ╔╗
       ║╔╝  ║║
   ╔╗ ╔╝╚╗╔╗║║ ╔══╗
  ╔╝╚╗╚╗╔╝╠╣║║ ║╔╗║
  ╚╗╔╝ ║║ ║║║╚╗║║═╣
   ╚╝  ╚╝ ╚╝╚═╝╚══╝ */

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

/* ╔╗                 ╔═╗
  ╔╝╚╗                ║╔╝
  ╚╗╔╝╔═╗╔══╗╔══╗    ╔╝╚╗╔══╗╔══╗
   ║║ ║╔╝║╔╗║║╔╗║    ╚╗╔╝║╔╗║║══╣
   ║╚╗║║ ║║═╣║║═╣     ║║ ║║║║╠══║
   ╚═╝╚╝ ╚══╝╚══╝     ╚╝ ╚╝╚╝╚══╝ */

function updateTree(par) // ------------------------ Update tree
{
  const _t = document.getElementById(par.id);
  document.getElementById(par.id).innerHTML = "";

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

      _li_fld.textContent = obj_folders[_root[i][j]].length + " | " + _n; // enable after tree works correctly or show size in new element
      
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
            // console.log(event.target.getAttribute(_attr_fi));
            updateTree(par);
            key_map.lmb = false;
          }
        }
      });

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
          _li_obj.textContent = mem_log[_obj_id][2]==1 ? 1 : mem_log[_obj_id][2] - mem_encode[0];
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


/*     ╔╗ ╔╗      ╔═╗
       ║║ ║║      ║╔╝
  ╔══╗ ║║ ║║     ╔╝╚╗╔══╗╔══╗
  ║╔╗║ ║║ ║║     ╚╗╔╝║╔╗║║══╣
  ║╚╝╚╗║╚╗║╚╗     ║║ ║║║║╠══║
  ╚═══╝╚═╝╚═╝     ╚╝ ╚╝╚╝╚══╝ */

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

function updateValueById(id, _v)
{
  const _e = document.getElementById(id);
  if (_e != "undefined") {_e.value = _v;}
}


// move to menu fns ???
function menuLinkObj() {link_obj(obj_cyc);}


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


/*_______________________________________________________________________________________________________________________*/


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
  "Shift(slow mouse using paint when menu closed)",
  "...",
  "W(move forward), S(move backwards)",
  "A(move left), D(move right)",
  "Space(up), B(down)",
  "Shift(sprint & fast deletion)",
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
  "H(set cursor to object center)",
  "G(send cursor to ground)",
  "C(edit object -> converts to points)",
  "L(link objects -> select in sequence)",
  "I(join objects -> select in sequence) [BUGGY]",
  "Pick Surface -> left click on any surface triangle",
  "Pivot Align enable -> logs selected obj -> use F key to mark two arrows (4 points) -> F key to apply -> aligns first vector to second",
  "Surface Normal works the same as Pivot Align. the tool creates a normal vector and sets grid plane to surface",
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
  "/(print object to console)",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice",
  "he's so nice he gave me rice"
];

var _error_info = 
[
  "DID",
  "NOT",
  "LOAD"
];


// background: linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%);

// let _fixthis = menu_q_size[1] - 100;
var menu_obj_style =
`
box-sizing: border-box;
position: absolute;
width: 200px;
right: 1%;
top: -1000px;
user-select: none;
background: rgba(0,0,0,0);
border-radius: 3px;
`;
// top: calc(50% - 180px);

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
  rootStyle: rootStyle + menu_objPreview_style + justOuter,
  niladic: findbyctr_obj
});

var listStyle2 =
`
background-color: rgba(0,0,0,0);
width: 96%;
padding: 0px;
margin: 3px;
border: 1px solid rgba(255,255,255,0.1);
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

var menu_tree_style =
`
box-sizing: border-box;
width: 200px;
user-select: none;
border-radius: 3px;
background: rgba(0, 0, 0, 0);
border: 0px solid rgba(0, 0, 0, 0);
color: #CCC;
overflow-y: auto;
overflow-x: hidden;
scrollbar-width: none;
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
  width: 273px;
  height: 578px;
  left: 30px;
  user-select: none;
  border-radius: 3px;
  background: rgba(0,0,0,0);
  overflow: none;
  `
});

  // top: 190px;
  // top: 239px;
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
width: 49%;
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
  params: { hide:["div_keysMenu", "div_spawnMenu"], show:["menu_detail", "menu_detail_right"] },
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
  params: { hide:["menu_detail","menu_detail_right", "div_spawnMenu"], show:["div_keysMenu"] },
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
  width: 273px;
  height: 100%;
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
float: left;
width: 50%; height: inherit;
margin: 0px;
padding: 0px;
border: 0px;
background-color: rgba(0, 0, 0, 0);
z-index: -1;
overflow-y: hidden;
overflow-x: hidden;
border-radius: 3px;
scrollbar-width: none;
`;

makeElement(addDiv,
{
  id: "menu_detail", cls: "", prnt: "q_menu_left",
  rootStyle: rootStyle + detail_menu + 'overflow-y: visible;'
});

// var detail_menu_right =
// `
// float: left;
// width: 50%; height: inherit;
// margin: 0px;
// padding: 0px;
// border: 0px;
// background-color: rgba(0, 0, 0, 0);
// overflow-y: hidden;
// z-index: -1;
// border-radius: 3px;
// `;

makeElement(addDiv,
{
  id: "menu_detail_right", cls: "", prnt: "q_menu_left",
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
width: 97%;
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
width: 97%;
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
`;

// border-top: 1px solid #282828;
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
`;

if (isMobile)
{
  _btn = _btn + `
    text-align: center;
    height: 100px;
    line-height: 2.2;
    font-size: 19px;
  `;
} else {
  _btn = _btn + `
    text-align: right;
    height: 26px;
    line-height: 2.2;
    font-size: 11.5px;
  `;
}

var _btn_hover_tool =
`
background-color: rgb(38, 38, 39);
box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.2);
`;

// document.getElementById(par.id).innerHTML = "";
// const _e = _m.querySelectorAll('.'+par.id+'_ul_0');
// _e.forEach(function(e) { _t.appendChild(e); });

function deleteElements(ar)
{
  let _l = ar.length;
  for (var i=0; i<_l; i++)
  { 
    _this = document.getElementById(ar[i][1].id);
    if (_this != undefined) {_this.remove();}
  }
}

function makeElements(ar, _mod)
{
  deleteElements(ar);
  let _l = ar.length;
  for (var i=0; i<_l; i++)
  {
    if (_mod != undefined) { ar[i][1].rootStyle = ar[i][1].rootStyle + _mod[i%2]; }
    makeElement(ar[i][0], ar[i][1]);
  }
}

function packElement(ar_ptr, _callb, _par, _mod)
{
  let _ar = [_callb, _par];
  ar_ptr.push(_ar);
}

// slapped it in there total nightmare
// function setScrollingElements(_eset, _h)
// {
//   // _h = 18;
//   let _si = _eset.length;
//   if (_h > _si) {_h = _si;}
//   let _rem = _si-_h;
//   let _off_top = Math.abs(Math.round(_rem*menu_scroll_c/100)); 
//   let _off_bot = Math.abs(_off_top + _h);
//   if (_off_bot < _si) {_off_bot += 1;}
//
//   for (var i=0; i<_si; i++)
//   {
//     if (i>=_off_top && i<_off_bot)
//     {
//       document.getElementById(_eset[i][1].id).style.display = 'block';
//     } else {
//       document.getElementById(_eset[i][1].id).style.display = 'none';
//     }
//   }
// }

makeElement(addDiv,
{
  id: 'detail_box_toolList', cls: '', prnt: 'menu_detail_right',
  rootStyle: rootStyle + detail_menu_box + 
  `
    height: inherit;
    overflow: hidden;
    border-bottom: 0px solid #FFF;
  `
});

// makeElement(addDiv,
// {
//   id: 'div_toolListBin', cls: '', prnt: 'detail_box_toolList',
//   text: 'tools',
//   rootStyle: rootStyle + div_css + myTitleStyle
// });

makeElement(addDiv,
{
  id: 'div_toolListHeader', cls: '', prnt: 'detail_box_toolList',
  rootStyle: rootStyle + div_css + myTitleStyle +
  `
    height: inherit;
    background: none;
    overflow-y: scroll;
    scrollbar-width: none;
    border-bottom: none;
  `
});

if (isMobile)
{
  packElement(eset_tools, addButton,
  {
    text: 'F Key',
    id: 'tool_emKeyF', cls: '_btn', prnt: 'div_toolListHeader',
    rootStyle: rootStyle + _btn + _btn_tooln,
    hoverStyles: _btn_hover_tool,
    callback: emulateKey.start,
    params: { key: 'f' }
  });

  packElement(eset_tools, addButton,
  {
    text: 'R Key',
    id: 'tool_emKeyR', cls: '_btn', prnt: 'div_toolListHeader',
    rootStyle: rootStyle + _btn + _btn_tooln,
    hoverStyles: _btn_hover_tool,
    callback: emulateKey.start,
    params: { key: 'r' }
  });

  packElement(eset_tools, addButton,
  {
    text: 'Z Key',
    id: 'tool_emKeyZ', cls: '_btn', prnt: 'div_toolListHeader',
    rootStyle: rootStyle + _btn + _btn_tooln,
    hoverStyles: _btn_hover_tool,
    callback: emulateKey.start,
    params: { key: 'z' }
  });

  packElement(eset_tools, addButton,
  {
    text: "Finish Object \u07F7",
    id: "tool_finishObj", cls: "_btn", prnt: "div_toolListHeader",
    rootStyle: rootStyle + _btn + _btn_tooln,
    hoverStyles: _btn_hover_tool,
    callback: mem_t_mov
  });

  menu_q_scale[1] = 74;
}

packElement(eset_tools, addButton,
{
  text: 'Lock Planar \u26C7',
  id: 'tool_moveMode', cls: '_btn', prnt: 'div_toolListHeader',
  rootStyle: rootStyle + _btn,
  hoverStyles: _btn_hover_tool,
  callback: playerChangeMovementMode
});

packElement(eset_tools, addButton,
{
  text: 'Teleport \u27AB',
  id: 'tool_curTp', cls: '_btn', prnt: 'div_toolListHeader',
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: teleport_plr
});

packElement(eset_tools, addButton,
{
  text: 'Get Center \u22A1',
  id: 'tool_curToCtr', cls: '_btn', prnt: 'div_toolListHeader',
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: setCursorToObjCenter
});

packElement(eset_tools, addButton,
{
  text: "Measure Line \u27F7",
  id: "tool_measureLine", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: measureLine
});

// makeElement(addButton,
// {
//   text: "Measure Angle \u2221",
//   id: "tool_measureAngle", cls: "_btn", prnt: "div_toolListHeader",
//   rootStyle: rootStyle + _btn + _btn_tooln,
//   hoverStyles: _btn_hover_tool,
//   callback: measureAngle
// });

packElement(eset_tools, addButton,
{
  text: "Ground Cursor \u2356",
  id: "tool_curToGrnd", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: returnCursorToGround
});

packElement(eset_tools, addButton,
{
  text: "Create Circle \u25EF",
  id: "tool_createCircle", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: createCircleAtCursor
});

packElement(eset_tools, addButton,
{
  text: "Dupe Object \u26FC",
  id: "tool_dupeObj", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: cloneObjSelected
});

// partition
packElement(eset_tools, addButton,
{
  text: "Dupe Folder \u20AA",
  id: "tool_dupeFld", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_tool0,
  hoverStyles: _btn_hover_tool,
  callback: dupeFolderObjs
});

packElement(eset_tools, addButton,
{
  text: "Rotate Folder \u2B6E",
  id: "tool_rotateFolder", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: rotateFolder.run
});

packElement(eset_tools, addButton,
{
  text: "Move Folder \u2933",
  id: "tool_moveFld", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: translateFolder.toggle
});

packElement(eset_tools, addButton,
{
  text: "Empty Folder \u2672",
  id: "tool_delFldObjs", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: deleteFolderObjs
});

packElement(eset_tools, addButton,
{
  text: "Pivot Align \u15D2",
  id: "tool_pivotAlign", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_tool0,
  hoverStyles: _btn_hover_tool,
  callback: pivotAlign.toggle
});

packElement(eset_tools, addButton,
{
  text: "Pick Surface \u25B2",
  id: "tool_pickSurface", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: getSurface.toggle
});

packElement(eset_tools, addButton,
{
  text: "Resize Object \u2922",
  id: "tool_resizeObject", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: boundingBox.toggle
});

packElement(eset_tools, addButton,
{
  text: "Surface Normal \u21A5",
  id: "tool_surfaceNormal", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: surfaceNormal.toggle
});

packElement(eset_tools, addButton,
{
  text: "Apply Rotation \u2B6E",
  id: "tool_applyRotation", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: applyRotation
});

packElement(eset_tools, addButton,
{
  text: "Mirror / Plane \u2346",
  id: "tool_mirrorOverPlane", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: mirrorOverPlane
});

packElement(eset_tools, addButton,
{
  text: "Move Object \u2933",
  id: "tool_moveObj", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: moveObject
});

packElement(eset_tools, addButton,
{
  text: "Edit Object \u2188",
  id: "tool_editObj", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: editSelectedObject
});

packElement(eset_tools, addButton,
{
  text: "Finish Object \u07F7",
  id: "tool_finishObj", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: mem_t_mov
});

packElement(eset_tools, addButton,
{
  text: "Link Object \u2366",
  id: "tool_objLink", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: menuLinkObj
});

packElement(eset_tools, addButton,
{
  text: "Unlink Object \u2366",
  id: "tool_objUnlink", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: unlink_obj
});

packElement(eset_tools, addButton,
{
  text: "Fullscreen \u2B94",
  id: "tool_tryFullscreen", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: requestFullscreen
});

packElement(eset_tools, addButton,
{
  text: "Reset Grid \u2637",
  id: "tool_resetGrid", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_tool0,
  hoverStyles: _btn_hover_tool,
  callback: resetGrid
});

packElement(eset_tools, addButton,
{
  text: `Save World \u213B`,
  id: "tool_saveWorld", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: downloadSaveFile
});

packElement(eset_tools, addButton,
{
  text: "Delete Object \u2421",
  id: "tool_delObj", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln,
  hoverStyles: _btn_hover_tool,
  callback: deleteObjectSelected
});

packElement(eset_tools, addButton,
{
  text: `\u05D0 Clear World \u05D0`,
  id: "tool_clearWorld", cls: "_btn", prnt: "div_toolListHeader",
  rootStyle: rootStyle + _btn + _btn_tooln + _btn_toolf,
  hoverStyles: _btn_hover_tool,
  callback: del_world
});

makeElements(eset_tools, _btn_col);

// setScrollingElements(eset_tools, 14);
// problem now is this part isn't refreshed anyway

// makeElement(addButton,
// {
//   text: `Close Menu`,
//   id: "tool_closeMenu", cls: "_btn", prnt: "detail_box_circleSettings",
//   rootStyle: rootStyle + _btn + _btn_tooln + _btn_col1,
//   hoverStyles: _btn_hover_tool,
//   callback: pointerLockSwap 
// });

// new tool location

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

/*         ╔╗         ╔╗
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
  settings: [8, false],
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
  id: "div_gridSettings_unlock", cls: "", prnt: "detail_box_gridSettings",
  text: `unlock`,
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
  id: "cbx_unlock", cls: "cbx_gridSettings", prnt: "div_gridSettings_unlock",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
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
#generalsettings
*/

makeElement(addDiv,
{
  id: "detail_box_generalSettings", cls: "", prnt: "menu_detail",
  settings: [false, false],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_generalSettings", cls: "", prnt: "detail_box_generalSettings",
  text: 'general',
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "div_generalSettings_sound", cls: "", prnt: "detail_box_generalSettings",
  text: `sound`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addCheckbox,
{
  id: "cbx_soundEnable", cls: "cbx_generalSettings", prnt: "div_generalSettings_sound",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_generalSettings_mapWalls", cls: "", prnt: "detail_box_generalSettings",
  text: `map walls`,
  rootStyle: rootStyle + div_css_half + _btn_col2 + _detailLastRad
});

makeElement(addCheckbox,
{
  id: "cbx_mapWalls", cls: "cbx_generalSettings", prnt: "div_generalSettings_mapWalls",
  rootStyle: rootStyle + cbx_myStyle + _cbxLastRad,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
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

makeElement(addTextInput,
{
  id: "textIn_rotationSettings_r", cls: "textIn_rotationSettings", prnt: "div_rotationSettings_r",
  rootStyle: rootStyle + textIn_css + _btn_col1 + _cbxLastRad,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

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
  settings: [true, true, false, false, false, false],
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
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addCheckbox,
{
  id: "cbx_opacity", cls: "cbx_drawSettings", prnt: "div_drawOpacity",
  rootStyle: rootStyle + cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  callback: updateSetting,
  defaultChecked: false,
  niladic: updateColorMaps
});

makeElement(addDiv,
{
  id: "div_gridSettings_faceCulling", cls: "", prnt: "detail_box_drawSettings",
  text: `depth`,
  rootStyle: rootStyle + div_css_half + _btn_col2
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
  id: "div_gridSettings_drawDepth", cls: "", prnt: "detail_box_drawSettings",
  text: `culling`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addCheckbox,
{
  id: "cbx_drawDepth", cls: "cbx_gridSettings", prnt: "div_gridSettings_drawDepth",
  rootStyle: rootStyle + cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_gridSettings_sortTris", cls: "", prnt: "detail_box_drawSettings",
  text: `auto sort`,
  rootStyle: rootStyle + div_css_half + _btn_col2 + _detailLastRad
});

makeElement(addCheckbox,
{
  id: "cbx_sortTris", cls: "cbx_gridSettings", prnt: "div_gridSettings_sortTris",
  rootStyle: rootStyle + cbx_myStyle + _cbxLastRad,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
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
  settings: [{0:false}, {0:false}], // pass numbers as objects to enable radio
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
  id: "div_linkPoly", cls: "", prnt: "detail_box_linkSettings",
  text: `poly`,
  rootStyle: rootStyle + div_css_half + _btn_col2 + _detailLastRad
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

// makeElement(addDiv,
// {
//   id: "div_linkZigzag", cls: "", prnt: "detail_box_linkSettings",
//   text: `zigzag`,
//   rootStyle: rootStyle + div_css_half + _btn_col2
// });
//
// makeElement(addCheckbox,
// {
//   id: "cbx_zigzag", cls: "cbx_linkSettings", prnt: "div_linkZigzag",
//   rootStyle: rootStyle + cbx_myStyle,
//   hoverStyles: cbx_myStyle_hover,
//   checkedStyles: cbx_myStyle_checked,
//   callback: updateSetting
// });

/*
╔╗         ╔╗           ╔╗
║║         ║║          ╔╝╚╗
║║ ╔══╗╔══╗║║╔╗    ╔══╗╚╗╔╝╔═╗
║║ ║╔╗║║╔═╝║╚╝╝    ║══╣ ║║ ║╔╗╗
║╚╗║╚╝║║╚═╗║╔╗╗    ╠══║ ║╚╗║║║║
╚═╝╚══╝╚══╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
#locksettings
*/

/*
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

*/
/*
  ╔╗╔═╗ 
  ╠╣║╔╗╗
  ║║║║║║
  ╚╝╚╝╚╝
*/    
/*
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

*/

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
  settings: [true, false, 0.1, 8],
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
  id: "div_paintSmooth", cls: "", prnt: "detail_box_paintSettings",
  text: `smoothing`,
  rootStyle: rootStyle + div_css_half + _btn_col2
});

makeElement(addCheckbox,
{
  id: "cbx_paintSmooth", cls: "cbx_paintSettings", prnt: "div_paintSmooth",
  rootStyle: rootStyle+cbx_myStyle,
  hoverStyles: cbx_myStyle_hover,
  checkedStyles: cbx_myStyle_checked,
  defaultChecked: false,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_paintSettings_dist", cls: "", prnt: "detail_box_paintSettings",
  text: `dist`,
  rootStyle: rootStyle + div_css_half + _btn_col1
});

makeElement(addTextInput,
{
  id: "textIn_paintSettings_dist", cls: "textIn_paintSettings", prnt: "div_paintSettings_dist",
  rootStyle: rootStyle + textIn_css + _btn_col1,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

makeElement(addDiv,
{
  id: "div_paintSettings_nodes", cls: "", prnt: "detail_box_paintSettings",
  text: `nodes`,
  rootStyle: rootStyle + div_css_half + _btn_col2 + _detailLastRad
});

makeElement(addTextInput,
{
  id: "textIn_paintSettings_nodes", cls: "textIn_paintSettings", prnt: "div_paintSettings_nodes",
  rootStyle: rootStyle + textIn_css + _btn_col2 + _cbxLastRad,
  hoverShadow: textIn_hover, shadow: textIn_leave,
  callback: updateSetting
});

// circle settings

makeElement(addDiv,
{
  id: 'detail_box_circleSettings', cls: '', prnt: 'menu_detail',
  settings: [8, 32, 0, 0],
  rootStyle: rootStyle + detail_menu_box
});

makeElement(addDiv,
{
  id: "div_circleToolHeader", cls: "", prnt: "detail_box_circleSettings",
  text: `circle settings \u25CB`,
  rootStyle: rootStyle + div_css + myTitleStyle
});

makeElement(addDiv,
{
  id: "circleTool_scale", cls: "", prnt: "detail_box_circleSettings",
  text: `diameter`,
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


// make mouse dpi


/*
                           ╔╗       ╔╗
                          ╔╝╚╗     ╔╝╚╗
  ╔╗╔╗╔══╗╔═╗ ╔╗╔╗    ╔══╗╚╗╔╝╔══╗ ╚╗╔╝╔╗╔╗╔══╗
  ║╚╝║║╔╗║║╔╗╗║║║║    ║══╣ ║║ ╚ ╗║  ║║ ║║║║║══╣
  ║║║║║║═╣║║║║║╚╝║    ╠══║ ║╚╗║╚╝╚╗ ║╚╗║╚╝║╠══║
  ╚╩╩╝╚══╝╚╝╚╝╚══╝    ╚══╝ ╚═╝╚═══╝ ╚═╝╚══╝╚══╝
*/

const menu_stats_wrap =
`
position: absolute;
left: 1.5%; top: 2%;
width: 400px; height: 50px;
border-radius: 3px;
overflow: hidden;
`;

const menu_stats_s0 = `width: calc(63% / 3 - 7%); height: 50%;`;
const menu_stats_s1 = `width: calc(59% / 3); height: 50%;`;
const menu_stats_s2 = `width: calc(63% / 3 + 3%); height: 50%;`;
const menu_stats_s3 = `width: 42%; height: 50%;`;
const menu_stats_f0 = `width: 46%; height: 50%; background: rgb(37,37,37); outline: none; border: none; position: relative; top: -3px;`;
const menu_stats_f1 = `width: 26%; height: 50%; background: rgb(37,37,37); outline: none; border: none; position: relative; top: -3px;`;

// border-top: 1px solid rgb(44,44,44);
const menu_stats_box =
`
border-top: 1px solid #222;
overflow: hidden;
font-size: 10px;
display: inline-block;
line-height: 2.5;
background: rgb(28,28,28);
box-shadow: inset 1px 0px 1px 0px rgba(12, 12, 12, 0.6);
text-align: center;
color: #9f9f9f;
padding-top: 1px;
`;

// border-top: 1px solid rgb(44,44,44);
const menu_stats_file =
`
position: relative; top: -3px;
color: #AAA;
display: inline-block;
font-size: 11px;
text-align: center;
width: 28%; height: 50%;
margin: 0px; padding: 0px;
cursor: pointer;
line-height: 2.4;
background-color: rgb(38,38,39);
`;

// background: #000;
makeElement(addDiv,
{
  id: "menu_stats_wrap", cls: "", prnt: "html",
  rootStyle: rootStyle + menu_stats_wrap
});

makeElement(addDiv,
{
  id: "menu_stats_0", cls: "", prnt: "menu_stats_wrap",
  rootStyle: rootStyle + menu_stats_box + menu_stats_s0 +
  `box-shadow: none;`
});

makeElement(addDiv,
{
  id: "menu_stats_1", cls: "", prnt: "menu_stats_wrap",
  rootStyle: rootStyle + menu_stats_box + menu_stats_s1
});

makeElement(addDiv, // FPS
{
  id: "menu_stats_2", cls: "", prnt: "menu_stats_wrap",
  rootStyle: rootStyle + menu_stats_box + menu_stats_s2
});

makeElement(addDiv,
{
  id: "menu_stats_3", cls: "", prnt: "menu_stats_wrap",
  rootStyle: rootStyle + menu_stats_box + menu_stats_s3
});

makeElement(addFileInput,
{
  id: "menu_stats_file", cls: "", prnt: "menu_stats_wrap",
  text: "Open file",
  rootStyle: rootStyle + menu_stats_file,
  callback: loadSelect
});

makeElement(addTextInput,
{
  id: "menu_stats_4", cls: "", prnt: "menu_stats_wrap",
  value: '',
  rootStyle: rootStyle + menu_stats_box + menu_stats_f0,
  callback: updateSetting
});

makeElement(addTextInput,
{
  id: "menu_stats_5", cls: "", prnt: "menu_stats_wrap",
  value: '',
  rootStyle: rootStyle + menu_stats_box + menu_stats_f1,
  callback: updateSetting
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
cursor: pointer;
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
  width: 100%;
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
scrollbar-width: none;
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
  scrollbar-width: none;
  `
});


makeElement(addDiv,
{
  id: "menu_logBox", cls: "", prnt: "html",
  rootStyle:
  `
  position: absolute;
  top: calc(2%);
  right: calc(1%);
  height: 70px;
  width: 300px;
  padding: 10px 10px 10px 20px;
  margin: 0px;
  border: 1px solid rgba(5,5,5, 0.15);
  border-radius: 3px;
  color: #777;
  font-size: 11px;
  font-family: Monospace;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  background: rgba(14,14,14, 0.1);
  `
});


  // mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.60));
  // background: linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
  // background: rgba(14,14,14, 0.1);

  // background: rgba(22,22,22, 0.7);
  // border: 1px solid rgba(34,34,34, 0.7);


const style_miniBar_n =
`
display: inline-block;
vertical-align: top;
height: 28px;
width: 30px;
margin: 0px;
background: rgb(13,13,13);
border-top: 1px solid rgb(44,44,44);
border-left: 1px solid rgb(44,44,44);
border-bottom: 1px solid rgb(44,44,44);
cursor: pointer;
`;

const style_miniBar_n_key =
`
color: #555;
position: relative;
left: 5px;
top: 5px;
font-size: 9px;
text-align: center;
width: 0px;
height: 0px;
border: 0px;
margin: 0px;
`;

const style_miniBar_n_name =
`
color: #AAA;
display: inline-block;
vertical-align: bottom;
line-height: 0.45;
font-size: 12px;
text-align: center;
width: 100%;
height: 0px;
border: 0px;
margin: 0px;
`;

// recycled my own pasta bad
function updateMiniBar()
{
  const _e = document.getElementById("miniBar_select");
  const _q = _e.querySelectorAll("._miniBar");

  _q.forEach(function(e, i)
  {
    // use ith of ar
    const _c = (miniBar_stn[i]) ? _btn_col1_str : _btn_col2_str;
    e.style.background = _c;
  });
}

function updateMiniBarFromMenu(par)
{
  miniBar_stn[par.i] = !miniBar_stn[par.i];
  updateMiniBar();
}

  // left: calc(50% - 45px);
makeElement(addDiv,
{
  id: "miniBar_select", cls: "", prnt: "html",
  rootStyle:
  `
  position: absolute;
  top: calc(93% + 12px);
  left: calc(3% + 330px);
  height: 40px;
  padding: 0px;
  margin: 0px;
  background: rgba(0,0,0,0);
  border: 0px solid rgb(0,0,0);
  `
});

makeElement(addDiv,
{
  id: "menu_miniBar_1", cls: "_miniBar", prnt: "miniBar_select",
  rootStyle: style_miniBar_n + _leftRadius,
  callback: updateMiniBarFromMenu,
  params: {i: 0}
});

makeElement(addDiv,
{
  id: "menu_miniBar_1_key", cls: "", prnt: "menu_miniBar_1",
  text: "1",
  rootStyle: style_miniBar_n_key
});

makeElement(addDiv,
{
  id: "menu_miniBar_1_name", cls: "", prnt: "menu_miniBar_1",
  text: "X",
  rootStyle: style_miniBar_n_name
});

// ---

makeElement(addDiv,
{
  id: "menu_miniBar_2", cls: "_miniBar", prnt: "miniBar_select",
  rootStyle: style_miniBar_n,
  callback: updateMiniBarFromMenu,
  params: {i: 1}
});

makeElement(addDiv,
{
  id: "menu_miniBar_2_key", cls: "", prnt: "menu_miniBar_2",
  text: "2",
  rootStyle: style_miniBar_n_key
});

makeElement(addDiv,
{
  id: "menu_miniBar_2_name", cls: "", prnt: "menu_miniBar_2",
  text: "Y",
  rootStyle: style_miniBar_n_name
});

// ---

makeElement(addDiv,
{
  id: "menu_miniBar_3", cls: "_miniBar", prnt: "miniBar_select",
  rootStyle: style_miniBar_n + _borderRight + _rightRadius,
  callback: updateMiniBarFromMenu,
  params: {i: 2}
});

makeElement(addDiv,
{
  id: "menu_miniBar_3_key", cls: "", prnt: "menu_miniBar_3",
  text: "3",
  rootStyle: style_miniBar_n_key
});

makeElement(addDiv,
{
  id: "menu_miniBar_3_name", cls: "", prnt: "menu_miniBar_3",
  text: "Z",
  rootStyle: style_miniBar_n_name
});

// ---

// makeElement(addDiv,
// {
//   id: "menu_miniBar_4", cls: "_miniBar", prnt: "miniBar_select",
//   rootStyle: style_miniBar_n + _borderRight + _rightRadius,
//   callback: updateMiniBarFromMenu,
//   params: {i: 3}
// });
//
// makeElement(addDiv,
// {
//   id: "menu_miniBar_4_key", cls: "", prnt: "menu_miniBar_4",
//   text: "4",
//   rootStyle: style_miniBar_n_key
// });
//
// makeElement(addDiv,
// {
//   id: "menu_miniBar_4_name", cls: "", prnt: "menu_miniBar_4",
//   text: "ray",
//   rootStyle: style_miniBar_n_name
// });
