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

*/

var _this; // ez pointer for params
var _settings = [];

function applyStyles(element, rootStyle, hoverStyles, clickStyles, checkedStyles, liStyle, myUlStyle)
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
    if (rootStyle && rootStyle.trim() !== "")
    {
        const _temp_str = `#${element.id} {${rootStyle}}`;
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
    if (hoverStyles && hoverStyles.trim() !== "")
    {
        const _temp_str = `#${element.id}:hover {${hoverStyles}}`;
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
    if (clickStyles && clickStyles.trim() !== "")
    {
        const _temp_str = `#${element.id}:checked {${checkedStyles}}`;
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
    if ((checkedStyles && checkedStyles.trim() !== "") && (element.type === "checkbox"))
    {
        const _temp_str = `#${element.id}:checked {${checkedStyles}}`;
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
    if (liStyle && liStyle.trim() !== "")
    {
        const _temp_str = `.${element.id+"_li"} {${liStyle}}`;
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
    if (myUlStyle && myUlStyle.trim() !== "")
    {
        const _temp_str = `.${element.className+"_ul"} {${myUlStyle}}`;
        const styleElement = document.createElement('style');
        styleElement.textContent = _temp_str;
        document.head.appendChild(styleElement);
    }      

}

function addDiv(par)
{
  const div = document.createElement("div");
  div.id = par.id;
  div.className = par.cls;

  if (par.text != null)
  {
      div.innerHTML = par.text;
  }

  if (typeof par.settings != "undefined")
  {
    _settings.push(par);
  }

  var _t = document.getElementById(par.prnt);

  if (_t == null)
  {document.body.appendChild(div);}
  else {_t.appendChild(div);}

  applyStyles(div, par.rootStyle, par.hoverStyles, par.clickStyles, par.checkedStyles);
  return div;
}

function addButton(par)
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

    if (document.getElementById(par.prnt) == null)
    {document.body.appendChild(button);
    } else {document.getElementById(par.prnt).appendChild(button);}

    applyStyles(button, par.rootStyle, par.hoverStyles, par.clickStyles);
    return button;
}

function addCheckbox(par)
{
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = par.id;
    checkbox.checked = par.defaultChecked === true; // Set default checked value
    checkbox.className = par.cls;

    checkbox.addEventListener("change", function ()
    { par.callback(par.params); });

    var _t = document.getElementById(par.prnt);
    if (_t == null)
    {document.body.appendChild(checkbox);}
    else {_t.appendChild(checkbox);}

    applyStyles(checkbox, par.rootStyle, par.hoverStyles, par.clickStyles, par.checkedStyles);
    return checkbox;
}

function addTextInput(par)
{
    const input = document.createElement("input");
    input.type = "text";
    input.id = par.id;
    input.className = par.cls;
    input.value = par.value;

    input.addEventListener("input", function ()
    {
      par.value = input.value;
      par.callback(par.params);
      flag_inText = 1;
    });

    input.addEventListener('click', function()
    {
      flag_inText = 1;
    });

    input.addEventListener('blur', function()
    {
      flag_inText = 0;
    });

    input.addEventListener('keydown', function(event)
    {
      if (event.key === 'Enter' && flag_inText == 1)
      {
        input.blur();
      }
    });

    var _t = document.getElementById(par.prnt);
    if (_t == null)
    {document.body.appendChild(input);}
    else {_t.appendChild(input);}

    applyStyles(input, par.rootStyle, par.hoverStyles, par.clickStyles, par.checkedStyles, par.liStyles);
    return input;
}

function addFileInput(par)
{
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = par.id;
    fileInput.className = par.cls;

    fileInput.addEventListener("change", function ()
    { par.callback(fileInput.files); });

    var _t = document.getElementById(par.prnt);
    if (_t == null)
    {document.body.appendChild(fileInput);}
    else {_t.appendChild(fileInput);}

    applyStyles(fileInput, par.rootStyle, par.hoverStyles, par.clickStyles);
    return fileInput;
}

// need to make new addTree function. parse my arbitrary data
// construct by looping through trees.
// not sure how data aligns
// also need to move tree out of folders and only place inside when making save file

// replacing entire works for lists so far but maybe not the best long term not sure
// deletion updates and aligns but may also provide the data's delta for any updates...?
// move to better place eventually

var draggedElement;
var _attr_fi = 'data-folderIndex';
var _attr_t = 'data-type';
var _attr_k = 'data-k';

const tree_colors_a = 1.0;
const tree_colors = [
  "rgba(77, 48, 37, "+tree_colors_a+")",
  "rgba(40, 41, 102, "+tree_colors_a+")",
  "rgba(46, 66, 39, "+tree_colors_a+")",
  "rgba(81, 54, 74, "+tree_colors_a+")",
  "rgba(42, 75, 92, "+tree_colors_a+")"
];

const tree_colors_d = [
  "rgba(53, 34, 26, 1)",
  "rgba(33, 33, 74, 1)",
  "rgba(38, 53, 33, 1)",
  "rgba(62, 42, 57, 1)",
  "rgba(36, 63, 77, 1)"
];

function updateTree(par)
{
  const _t = document.getElementById(par.id);
  document.getElementById(par.id).innerHTML = "";


  // should use par?
  // _m = makeTree(tree_allObjects);
  _m = makeTree(par);

  // console.log(_m);
  // tree_allObjects_ul_0
  const _e = _m.querySelectorAll('.'+par.id+'_ul_0');

  // console.log(_e);
  _e.forEach(function(e)
  {
    // console.log(e);
    _t.appendChild(e);
  });

  // K so far this works 100
  // i realized append allows event listener creation
  // innerHTML is like text = text. not same.
  // must query to be able to append
}

// the key here is query selector using direct parent ! lmao
function makeTree(par) // output my tree in form of total html structure
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
      _ul.style.textShadow = '0px 0px 2px #222';

      // simple math to generate folder border width
      let _pxl = (_s-i+1)*2+3;
      let _c = _pxl+'px solid ' + tree_colors_d[(_root[i][j]+1)%tree_colors_d.length];
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

      _li_fld.style.cursor = "grab";
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

           /*@?@
           ?@?@?
           @?@*/

      _li_fld.addEventListener('click', function(event)
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
          }
        }

        if (draggedElement.getAttribute(_attr_t) == 2) // of type obj
        {
          if (event.target != draggedElement) // not dropping on self
          {
            moveK(draggedElement.getAttribute(_attr_fi), draggedElement.getAttribute(_attr_k), event.target.getAttribute(_attr_fi));
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

        _li_obj.style.cursor = "grab";
        _li_obj.draggable = true;
        _li_obj.setAttribute(_attr_fi, _root[i][j]);
        _li_obj.setAttribute(_attr_t, 2); // identify type at drop
        _li_obj.setAttribute(_attr_k, k); // where in each list of obj's tag exists

        let _obj_id = obj_folders[_root[i][j]][k];
        // _li_obj.id = (par.id+"_li"); // not needed ig
        _li_obj.className = (par.id+"_li");

        // use mem_log for user info
        // console.log(_obj_id);
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

function addTree(par)
{
  let _r = makeTree(par);
  let _t = document.getElementById(par.prnt);
  if (_t == null) { document.body.appendChild(_r); }
  else { _t.appendChild(_r); }
  applyStyles(_r, par.rootStyle, par.hoverStyles, par.clickStyles, par.checkedStyles, par.liStyles, par.myUlStyle);
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


    var _t = document.getElementById(par.prnt);
    if (_t == null) { document.body.appendChild(ul); }
    else { _t.appendChild(ul); }
    applyStyles(ul, par.rootStyle, par.hoverStyles, par.clickStyles, par.checkedStyles, par.liStyles);

    return ul;
}

var list_colors =
{
    c1:"rgb(13,13,13)",
    c2:"rgb(17,17,17)",
    c3:"rgb(33,33,33)",
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
            // pls fix !! @?@?@?@
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
    element = document.getElementById(elementId);
    if (element) { element.style.display = 'none'; }
}

function unhideElementById(elementId)
{
    element = document.getElementById(elementId);
    if (element) { element.style.display = 'block'; }
}

function setVisibility(p) // Fix looping of this being called eventually
{
    if (p.hide != "") {hideElementById(p.hide);}
    if (p.show != "") {unhideElementById(p.show);}
}

function getInputById(id)
{return document.getElementById(id).value;}

function getCheckedById(id)
{return document.getElementById(id).checked;}

function setChecked(id, setbool)
{
    var _cbx = document.getElementById(id);
    _cbx.checked = setbool;
}

// move to menu fns ???
function menuLinkObj()
{link_obj(obj_cyc, stn_link_tool);}


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
        let _s = par.stn.settings.length;
        if (e.id == par.id)
        {
          par.stn.settings[i][0] = true;
          e.checked = true;
        } else {
          par.stn.settings[i][0] = false;
          e.checked = false;
        }
        break;

      // add text in later
    }
    
    // console.log(i + " : " + par.stn.settings[i][0]);
  });

  // console.log(par.stn.settings);
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
//background: radial-gradient(circle, rgba(18,18,18,1) 0%, rgba(12,12,12,1) 100%);
var radial_bg =
`
background: radial-gradient(circle, rgba(17,17,17,1) 0%, rgba(12,12,12,1) 100%);
`;

var rootStyle =
 `
z-index: 2;
font-size: 12px;
box-sizing: border-box;
color: rgb(195, 123, 0);
background-color: rgb(17, 17, 18);

`;

var key_bind_info = 
[
    "Ctrl+F5 Update Game",
    "Q(toggle menu & unlock mouse)",
    "R(switch plane)",
    "...",
    "W(move forward), S(move backwards)",
    "A(move left), D(move right)",
    "Space(up), B(down)",
    "Shift(speed up movement & deletion)",
    "[Ctrl or Alt] (unlock mouse so you can Alt+Tab)",
    "...",
    "[IN GAME] LMB(move 3D cursor to aim location)",
    "[IN GAME] TAB(select obj by aiming at 3D center)",
    "[IN MENU] LMB(select points in grid & obj & placed)",
    "[IN MENU] RMB(select object)",
    "[IN MENU] TAB(select by hovering over 3D center)",
    "[IN MENU] Click to select object from list",
    "[IN MENU] Scroll(object selection)",
    "Scroll+Shift(grid size) 2^n",
    "RMB(move cursor to near point in selected object)",
    "MMB(show point indices & rotate camera from menu)",
    "G(send cursor to ground)",
    "F(place point at cursor)",
    "Z(undo last point placed)",
    "E(make object from points)",
    "C(edit object -> converts to points)",
    "L(link objects -> select in sequence)",
    "I(join objects -> select in sequence) [BUGGY]",
    "...",
    "N(LOCK movement planar)",
    "[PLANAR LOCK] Scroll(vertical movement)",
    "Scroll(expand world from center)",
    "[FREE FLY] Y(teleport)",
    "[PLANAR LOCK] Y(teleport & 180 flip)",
    "...",
    "V(move object -> select in sequence)",
    "X(delete selected object)",
    "[GRID] Shift+R(rotate around cursor axis)",
    "[MOVE] Shift+R(rotate around object center)",
    "T(duplicate selected object)",
    "Shift+T(dupe -> move cursor -> end[V] OR cont.)",
    "[GRID] 5(mirror over selected plane & point)",
    "[MOVE] 5(mirror over selected plane & object center)",
    "6(scale by dist -> select in sequence)",
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

    let _fixthis = 730-208;
    var menu_obj_style =
    `
    box-sizing: border-box;
    position: absolute;
    width: 200px;
    height: auto;
    left: 600px;
    top: 190px;
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

    var menu_obj =
    {
        id: "menu_obj", cls: "", prnt: "html",
        rootStyle: rootStyle + menu_obj_style
    }; addDiv(menu_obj);

            var menu_objPreview =
            {
                id: "menu_objPreview", cls: "_none", prnt: "menu_obj",
                rootStyle: rootStyle + menu_objPreview_style + justOuter
            }; addDiv(menu_objPreview);

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

            //overflow-y: auto;
    
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
color: #DDD;
overflow-y: auto;
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

var menu_tree =
{
    id: "menu_tree", cls: "", prnt: "html",
    rootStyle: rootStyle + menu_tree_style
}; //addDiv(menu_tree);

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

    // color: rgb(195, 123, 0);
    var tree_btn =
    `
    color: #DDD;
    background-color: rgb(17, 17, 18);
    margin: 10px 0px 0px 0px;
    width: 15%;
    height: 26px;
    text-align: center;
    border: 1px solid rgba(200, 200, 200, 0.1);
    line-height: 2.06;
    float: right;
    outline: none;
    `;

    var tree_btn_addFolder =
    {
        text: ` + `,
        id: "tree_btn_addFolder", cls: "tree_btn", prnt: "menu_obj",
        rootStyle: rootStyle + tree_btn + tree_btn_r,
        // hoverStyles: tree_btn_addFolder,
        callback: treeModify,
        params: {func:1}
    }; addButton(tree_btn_addFolder);

    var tree_btn_delFolder=
    {
        text: ` - `,
        id: "tree_btn_delFolder", cls: "tree_btn", prnt: "menu_obj",
        rootStyle: rootStyle + tree_btn + tree_btn_l,
        // hoverStyles: tree_btn_addFolder,
        callback: treeModify,
        params: {func:2}
    }; addButton(tree_btn_delFolder);

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
    `;

    var tree_textIn =
    {
        id: "tree_textIn", cls: "_textInput", prnt: "menu_obj",
        rootStyle: rootStyle + treeTextInStyle,
        // hoverStyles: textIn_hover,
        value: "",
        callback: treeTextInUpdate
    };
    tree_textIn.params = {id: tree_textIn.id, class: tree_textIn.cls};
    addTextInput(tree_textIn);

/////////////////////////////////////////////////////////////////////////////////////////

var div_root =
{
    id: "menu_1", cls: "", prnt: "html",
    rootStyle: rootStyle
}; addDiv(div_root);


    var q_menu_holder =
    `
    box-sizing: border-box;
    position: absolute;
    width: 610px;
    height: 730px;
    left: 30px;
    top: 190px;
    user-select: none;
    background: linear-gradient(0deg, rgba(18,18,18,1) 0%, rgba(14,14,14,1) 100%);
    border-radius: 3px;
    `;
    var div_q_menu =
    {
        id: "menu_q", cls: "", prnt: "menu_1",
        rootStyle: rootStyle + q_menu_holder + justOuter
    }; addDiv(div_q_menu);

        var tabs_menu =
        `
        box-sizing: border-box;
        float: top;
        height: 7%;
        margin: 0; padding: 0;
        z-index: -1;
        `;
        var div_q_tabs =
        {
            id: "menu_tabs", cls: "", prnt: "menu_q",
            rootStyle: rootStyle + tabs_menu
        }; addDiv(div_q_tabs);

            var _btn_hover_tool =
            `
            background-color: rgb(27, 27, 33);
            box-shadow:inset 0px 0px 0px 1px rgba(255, 255, 255, 0.2);
            `;

            var _btn_hover =
            `
            background-color: rgb(27, 27, 33);
            `;

            var _btn_tab =
            `
            line-height: 2.4;
            background-color: rgb(27, 27, 30);
            text-align: center;
            border-top: 1px solid rgba(222, 222, 222, 0.1);
            border-bottom: 0px;
            border-right: 1px solid rgba(222, 222, 222, 0.1);
            border-left: 1px solid rgba(222, 222, 222, 0.1);
            outline: none;
            width: 23%;
            height: 66%;
            padding: 0;
            border-radius: 2px;
            `;

            var _btn_tab0 = 
            `
            margin: 3% 0% 0% 1%;
            `;
            var _btn_tabn = 
            `
            margin: 3% 0% 0% 0.5%;
            `;
            var btn_open_tab1 =
            {
                text: "Tool Settings",
                id: "tab1", cls: "_btn", prnt: "menu_tabs",
                rootStyle: rootStyle + _btn_tab + _btn_tab0,
                hoverStyles: _btn_hover,
                callback: setVisibility,
                params: { hide:"div_keysMenu", show:"menu_detail" }, // Update me later
            }; addButton(btn_open_tab1);

            var btn_open_tab2 =
            {
                text: "Key Binds \u1CC4",
                id: "tab2", cls: "_btn", prnt: "menu_tabs",
                rootStyle: rootStyle + _btn_tab + _btn_tabn,
                hoverStyles: _btn_hover,
                callback: setVisibility,
                params: { hide:"menu_detail", show:"div_keysMenu" }, // Update me later
            }; addButton(btn_open_tab2);

        var tool_menu =
        `
        box-sizing: border-box;
        float: right;
        width: 29.25%;

        margin-left: 0%;
        margin-right: 1%;
        padding-top: 3%;
        height: 92%;
        background-color: rgb(12, 12, 12);
        border-top: 1px solid rgba(120,120,120, 0.3);
        border-right: 1px solid rgba(120,120,120, 0.3);
        border-bottom: 1px solid rgba(120,120,120, 0.3);
        border-left: 1px solid rgba(120,120,120, 0.1);
        z-index: -1;
        `;
        var div_toolMenu =
        {
            id: "menu_tools", cls: "", prnt: "menu_q",
            rootStyle: rootStyle + tool_menu
        }; addDiv(div_toolMenu); // help

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
            margin: 5px 0% 0 3%;
            `;

            var _btn_tooln =
            `
            margin: 2px 0% 0 3%;
            `;

            var _btn_tooln_wspc =
            `
            margin: 12px 0% 0 3%;
            `;

            var _btn =
             `
            color: rgb(195, 123, 0);
            background-color: rgb(27, 27, 30);
            text-align: right;
            border: 1px solid rgba(200, 200, 200, 0.1);
            outline: none;
            width: 94%;
            height: 26px;
            line-height: 2.06;
            border-radius: 0px 2px 2px 2px;
            `;

            var btn_tool_moveMode =
            {
                text: `Lock Player Planar \u26C7`,
                id: "tool_moveMode", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tool0,
                hoverStyles: _btn_hover_tool,
                callback: playerChangeMovementMode
            }; addButton(btn_tool_moveMode);

            var btn_tool_curToCtr =
            {
                text: "Get Object Center \u22A1",
                id: "tool_curToCtr", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: setCursorToObjCenter
            }; addButton(btn_tool_curToCtr);

            var btn_tool_curToGrnd =
            {
                text: "Cursor to Ground \u2356",
                id: "tool_curToGrnd", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: returnCursorToGround
            }; addButton(btn_tool_curToGrnd);

            var btn_tool_createCircle =
            {
                text: "Create Circle \u25EF",
                id: "tool_createCircle", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: createCircleAtCursor
            }; addButton(btn_tool_createCircle);

            var btn_tool_mirrorOverPlane =
            {
                text: "Mirror over Plane \u2346",
                id: "tool_mirrorOverPlane", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: mirrorOverPlane
            }; addButton(btn_tool_mirrorOverPlane);

            var btn_tool_applyRotation =
            {
                text: "Apply Rotation \u2B6E",
                id: "tool_applyRotation", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: applyRotation
            }; addButton(btn_tool_applyRotation);

            var btn_tool_moveObj =
            {
                text: "Move Object \u2933",
                id: "tool_moveObj", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: moveObject
            }; addButton(btn_tool_moveObj);

            var btn_tool_dupeObj =
            {
                text: "Duplicate Object \u26FC",
                id: "tool_dupeObj", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: cloneObjSelected
            }; addButton(btn_tool_dupeObj);

            var btn_tool_editObj =
            {
                text: "Edit Object \u2188",
                id: "tool_editObj", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: editSelectedObject
            }; addButton(btn_tool_editObj);

            var btn_tool_finishObj =
            {
                text: "Finish Object \u07F7",
                id: "tool_finishObj", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: mem_t_mov
            }; addButton(btn_tool_finishObj);

            var btn_tool_objLink =
            {
                text: "Link Object \u2366",
                id: "tool_objLink", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: menuLinkObj
            }; addButton(btn_tool_objLink);

            var btn_tool_delObj =
            {
                text: "\u2421 Delete Object \u2421",
                id: "tool_delObj", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: deleteObjectSelected
            }; addButton(btn_tool_delObj);

            var btn_tool_clearWorld =
            {
                text: `\u05D0 Clear World \u05D0`,
                id: "tool_clearWorld", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: del_world
            }; addButton(btn_tool_clearWorld);

            var btn_tool_closeMenu =
            {
                text: `Close Menu`,
                id: "tool_closeMenu", cls: "_btn", prnt: "menu_tools",
                rootStyle: rootStyle + _btn + _btn_tooln,
                hoverStyles: _btn_hover_tool,
                callback: pointerLockSwap 
            }; addButton(btn_tool_closeMenu);


        /*
         ╔╗         ╔╗                      ╔╗
        ╔╝╚╗        ║║                      ║║
        ╚╗╔╝╔══╗╔══╗║║     ╔══╗╔══╗ ╔═╗ ╔══╗║║ ╔══╗
         ║║ ║╔╗║║╔╗║║║     ║╔╗║╚ ╗║ ║╔╗╗║╔╗║║║ ║══╣
         ║╚╗║╚╝║║╚╝║║╚╗    ║╚╝║║╚╝╚╗║║║║║║═╣║╚╗╠══║
         ╚═╝╚══╝╚══╝╚═╝    ║╔═╝╚═══╝╚╝╚╝╚══╝╚═╝╚══╝
                           ║║
                           ╚╝
        #toolpanels
        overflow-y: auto;
        */
        var detail_menu =
         `
        box-sizing: border-box;
        float: left;
        width: 68%;
        margin: 0 0% 0 1%;
        padding-top: 3%;
        height: 92%;
        background-color: rgb(12, 12, 12);
        z-index: -1;
        border-top: 1px solid rgba(120,120,120, 0.3);
        border-right: 1px solid rgba(120,120,120, 0.1);
        border-bottom: 1px solid rgba(120,120,120, 0.3);
        border-left: 1px solid rgba(120,120,120, 0.3);
        `;
        var div_detailMenu =
        {
            id: "menu_detail", cls: "", prnt: "menu_q",
            rootStyle: rootStyle + detail_menu
        }; addDiv(div_detailMenu);



            /*
                         ╔╗              ╔╗
                         ║║             ╔╝╚╗
            ╔══╗╔╗╔═╗╔══╗║║ ╔══╗    ╔══╗╚╗╔╝╔═╗
            ║╔═╝╠╣║╔╝║╔═╝║║ ║╔╗║    ║══╣ ║║ ║╔╗╗
            ║╚═╗║║║║ ║╚═╗║╚╗║║═╣    ╠══║ ║╚╗║║║║
            ╚══╝╚╝╚╝ ╚══╝╚═╝╚══╝    ╚══╝ ╚═╝╚╝╚╝
            #drawsettings
            */


            var detail_menu_box =
             `
            box-sizing: border-box;
            float: left;
            width: 48.5%;
            margin: 5px 0 0 1%;
            height: 24%;
            background-color: rgb(17, 17, 18);
            z-index: -1;
            `;
            var div_detail_circleSettings =
            {
                id: "detail_box_circleSettings", cls: "", prnt: "menu_detail",
                settings: [8, 24, 0],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detail_circleSettings);

                var div_css =
                `
                color: rgb(195, 123, 0);
                background-color: rgb(27, 27, 30);
                text-align: center;
                //border: 1px rgba(222, 222, 222, 0.3);
                outline: none;
                margin: 7px 0% 0 5%;
                width: 90%;
                line-height: 2.4;
                height: 30px;
                `;
                var textIn_css =
                `
                    color: rgb(230, 230, 230);
                    box-sizing: border-box;
                    float: right;
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    outline: none;
                    background: rgb(60 60 60 / 50%);
                    border: 1px solid rgba(31,31,31,0.3);
                `;
                var myTitleStyle =
                `
                    margin: 0px 0px 6% 0px;
                    width: 100%;
                    height: 24px;
                    line-height: 2;
                `;


                var textIn_hover
                `
                    background-color: #FFF;
                    box-shadow:inset 0px 0px 0px 1px rgba(88, 88, 88, 0.6);
                `;

                var div_label =
                {
                    id: "div_circletool", cls: "", prnt: "detail_box_circleSettings",
                    text: `circle settings \u25CB`,
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_label);


                var circleTool_scale =
                {
                    id: "circleTool_scale", cls: "", prnt: "detail_box_circleSettings",
                    text: `scale`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(circleTool_scale);


                    var textInput_scale =
                    {
                        id: "textIn_scale", cls: "_textInput", prnt: "circleTool_scale",
                        rootStyle: rootStyle + textIn_css,
                        hoverStyles: textIn_hover,
                        value: _settings[_settings.length-1].settings[0],
                        callback: updateSetting
                    }; _this = textInput_scale;
                    _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                    addTextInput(_this);

                var div_divider =
                {
                    id: "circleTool_divider", cls: "", prnt: "detail_box_circleSettings",
                    text: `divider`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_divider);

                    // No use of class here.
                    var textInput_divider =
                    {
                        id: "textIn_divider", cls: "_textInput", prnt: "circleTool_divider",
                        rootStyle: rootStyle + textIn_css,
                        hoverStyles: textIn_hover,
                        value: _settings[_settings.length-1].settings[1],
                        callback: updateSetting
                    }; _this = textInput_divider;
                    _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                    addTextInput(_this);

                var div_off =
                {
                    id: "circleTool_off", cls: "", prnt: "detail_box_circleSettings",
                    text: `offset`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_off);

                    var textInput_off =
                    {
                        id: "textIn_off", cls: "_textInput", prnt: "circleTool_off",
                        rootStyle: rootStyle + textIn_css,
                        value: _settings[_settings.length-1].settings[2],
                        callback: updateSetting
                    }; _this = textInput_off;
                    _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                    addTextInput(_this);

            /*
              ╔╗                       ╔╗
              ║║                      ╔╝╚╗
            ╔═╝║╔═╗╔══╗ ╔╗╔╗╔╗    ╔══╗╚╗╔╝╔═╗
            ║╔╗║║╔╝╚ ╗║ ║╚╝╚╝║    ║══╣ ║║ ║╔╗╗
            ║╚╝║║║ ║╚╝╚╗╚╗╔╗╔╝    ╠══║ ║╚╗║║║║
            ╚══╝╚╝ ╚═══╝ ╚╝╚╝     ╚══╝ ╚═╝╚╝╚╝
            #drawsettings
            */


            var div_detail_drawSettings =
            {
                id: "detail_box_drawSettings", cls: "", prnt: "menu_detail",
                settings: [true, true, false],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detail_drawSettings);

                var div_drawSettings =
                {
                    id: "div_drawSettings", cls: "", prnt: "detail_box_drawSettings",
                    text: 'draw settings \u03BB',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_drawSettings);


                var div_lines =
                {
                    id: "div_drawLines", cls: "", prnt: "detail_box_drawSettings",
                    text: `lines`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_lines);


                  var cbx_myStyle_checked =
                  `
                      background: rgba(159, 144, 75, 0.8);
                      box-shadow:inset 0px 0px 0px 1px rgba(255, 255, 255, 0.3);
                      border: 0px;
                  `;

                  var cbx_myStyle_hover =
                  `
                      box-shadow:inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
                      border: 0px;
                  `;
                  /*
                  box-shadow:inset 0px 0px 0px 1px rgba(70, 70, 70, 0.1);
                  */
                  var cbx_myStyle =
                   `
                      border: 0px;
                      float: right;
                      box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.0);
                      border-right: 1px solid rgba(120,120,120,0.1);
                      cursor: pointer;
                      appearance: none;
                      outline: 0;
                      background: rgb(60 60 60 / 50%);
                      width: 40px;
                      height:100%;
                      color: rgba(1, 1, 1, 0);
                      margin: 0% 0% 0 0%;
                      padding: 0px;
                  `;
                  var cbx_lines =
                  {
                      id: "cbx_lines", cls: "cbx_drawSettings", prnt: "div_drawLines",
                      rootStyle: rootStyle + cbx_myStyle,
                      hoverStyles: cbx_myStyle_hover,
                      checkedStyles: cbx_myStyle_checked,
                      callback: updateSetting,
                      defaultChecked: true
                  }; _this = cbx_lines;
                  _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                  addCheckbox(_this);

                var div_surfaces =
                {
                    id: "div_drawSurfaces", cls: "", prnt: "detail_box_drawSettings",
                    text: `surfaces`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_surfaces);

                  var cbx_surfaces =
                  {
                      id: "cbx_surfaces", cls: "cbx_drawSettings", prnt: "div_drawSurfaces",
                      rootStyle: rootStyle + cbx_myStyle,
                      hoverStyles: cbx_myStyle_hover,
                      checkedStyles: cbx_myStyle_checked,
                      callback: updateSetting,
                      defaultChecked: true
                  }; _this = cbx_surfaces;
                  _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                  addCheckbox(_this);

                var div_opacity =
                {
                    id: "div_drawOpacity", cls: "", prnt: "detail_box_drawSettings",
                    text: `opacity`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_opacity);

                  var cbx_opacity =
                  {
                      id: "cbx_opacity", cls: "cbx_drawSettings", prnt: "div_drawOpacity",
                      rootStyle: rootStyle+cbx_myStyle,
                      hoverStyles: cbx_myStyle_hover,
                      checkedStyles: cbx_myStyle_checked,
                      callback: updateSetting,
                  }; _this = cbx_opacity;
                  _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                  addCheckbox(_this);

            /*
            ╔╗       ╔╗           ╔╗
            ║║       ║║          ╔╝╚╗
            ║║ ╔╗╔═╗ ║║╔╗    ╔══╗╚╗╔╝╔═╗
            ║║ ╠╣║╔╗╗║╚╝╝    ║══╣ ║║ ║╔╗╗
            ║╚╗║║║║║║║╔╗╗    ╠══║ ║╚╗║║║║
            ╚═╝╚╝╚╝╚╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
            #linksettings
            */
            var div_detailMenuBox3 =
            {
                id: "detail_box_linkSettings", cls: "", prnt: "menu_detail",
                settings: [{0:false}, {0:true}, {0:false}], // pass numbers as objects to enable radio
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox3);

                var div_linkSettings =
                {
                    id: "div_linkSettings", cls: "", prnt: "detail_box_linkSettings",
                    text: 'link settings \u2366',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_linkSettings);

                var div_linear =
                {
                    id: "div_linkLinear", cls: "", prnt: "detail_box_linkSettings",
                    text: `linear`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_linear);

                        var cbx_linear =
                        {
                            id: "cbx_linear", cls: "cbx_linkSettings", prnt: "div_linkLinear",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            callback: updateSetting
                        }; _this = cbx_linear;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);

                var div_zigzag =
                {
                    id: "div_linkZigzag", cls: "", prnt: "detail_box_linkSettings",
                    text: `zigzag`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_zigzag);

                        var cbx_zigzag =
                        {
                            id: "cbx_zigzag", cls: "cbx_linkSettings", prnt: "div_linkZigzag",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            defaultChecked: true,
                            callback: updateSetting
                        }; _this = cbx_zigzag;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);

                var div_poly =
                {
                    id: "div_linkPoly", cls: "", prnt: "detail_box_linkSettings",
                    text: `poly`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_poly);

                        var cbx_poly =
                        {
                            id: "cbx_poly", cls: "cbx_linkSettings", prnt: "div_linkPoly",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            callback: updateSetting
                        }; _this = cbx_poly;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);



            /*
            ╔╗         ╔╗           ╔╗
            ║║         ║║          ╔╝╚╗
            ║║ ╔══╗╔══╗║║╔╗    ╔══╗╚╗╔╝╔═╗
            ║║ ║╔╗║║╔═╝║╚╝╝    ║══╣ ║║ ║╔╗╗
            ║╚╗║╚╝║║╚═╗║╔╗╗    ╠══║ ║╚╗║║║║
            ╚═╝╚══╝╚══╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
            #locksettings
            */
            var div_detailMenuBox4 =
            {
                id: "detail_box_lockSettings", cls: "", prnt: "menu_detail",
                settings: [false, false, false],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox4);

                var div_lockSettings =
                {
                    id: "div_lockSettings", cls: "", prnt: "detail_box_lockSettings",
                    text: 'lock settings \u0466',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_lockSettings);

                var div_lockSettings_r =
                `
                    color: rgb(140,40,40);
                    text-shadow: 0px 0px 7px #000;
                `;
                var div_lockSettings_g =
                `
                    color: rgb(40,140,40);
                    text-shadow: 0px 0px 7px #000;
                `;
                var div_lockSettings_b =
                `
                    color: rgb(40,40,140);
                    text-shadow: 0px 0px 7px #000;
                `;

                var div_lockxSettings =
                {
                    id: "div_lockxSettings", cls: "", prnt: "detail_box_lockSettings",
                    text: `X`,
                    rootStyle: rootStyle + div_css + darkBorder + div_lockSettings_r
                }; addDiv(div_lockxSettings);

                        var cbx_lockx =
                        {
                            id: "cbx_lockx", cls: "cbx_lockSettings", prnt: "div_lockxSettings",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            callback: updateSetting
                        }; _this = cbx_lockx;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);


                var div_lockySettings =
                {
                    id: "div_lockySettings", cls: "", prnt: "detail_box_lockSettings",
                    text: `Y`,
                    rootStyle: rootStyle + div_css + darkBorder + div_lockSettings_g
                }; addDiv(div_lockySettings);

                        var cbx_lockySettings =
                        {
                            id: "cbx_locky", cls: "cbx_lockSettings", prnt: "div_lockySettings",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            callback: updateSetting
                        }; _this = cbx_lockySettings;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);

                var div_lockzSettings =
                {
                    id: "div_lockzSettings", cls: "", prnt: "detail_box_lockSettings",
                    text: `Z`,
                    rootStyle: rootStyle + div_css + darkBorder + div_lockSettings_b
                }; addDiv(div_lockzSettings);

                        var cbx_lockzSettings =
                        {
                            id: "cbx_lockz", cls: "cbx_lockSettings", prnt: "div_lockzSettings",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            callback: updateSetting
                        }; _this = cbx_lockzSettings;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);


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
            var div_detailMenuBox5 =
            {
                id: "detail_box_paintSettings", cls: "", prnt: "menu_detail",
                settings: [true, 1, 8],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox5);

                var div_paintSettings =
                {
                    id: "div_paintSettings", cls: "", prnt: "detail_box_paintSettings",
                    text: 'paint settings \u06A9',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_paintSettings);

                var div_paintInf =
                {
                    id: "div_paintInf", cls: "", prnt: "detail_box_paintSettings",
                    text: `infinite &#8734;`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_paintInf);

                        var cbx_paintInf =
                        {
                            id: "cbx_paintInf", cls: "cbx_paintSettings", prnt: "div_paintInf",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            defaultChecked: true,
                            callback: updateSetting
                        }; _this = cbx_paintInf;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addCheckbox(_this);

                        var div_paintSettings_dist =
                        {
                            id: "div_paintSettings_dist", cls: "", prnt: "detail_box_paintSettings",
                            text: `dist`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_paintSettings_dist);

                            var textIn_paintSettings_dist =
                            {
                                id: "textIn_paintSettings_dist", cls: "textIn_paintSettings", prnt: "div_paintSettings_dist",
                                rootStyle: rootStyle + textIn_css,
                                value: 1,
                                callback: updateSetting
                            }; _this = textIn_paintSettings_dist;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addTextInput(_this);


                        var div_paintSettings_nodes =
                        {
                            id: "div_paintSettings_nodes", cls: "", prnt: "detail_box_paintSettings",
                            text: `nodes`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_paintSettings_nodes);

                            var textIn_paintSettings_nodes =
                            {
                                id: "textIn_paintSettings_nodes", cls: "textIn_paintSettings", prnt: "div_paintSettings_nodes",
                                rootStyle: rootStyle + textIn_css,
                                value: 8,
                                callback: updateSetting
                            }; _this = textIn_paintSettings_nodes;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addTextInput(_this);


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
            var div_detailMenuBox6 =
            {
                id: "detail_box_gridSettings", cls: "", prnt: "menu_detail",
                settings: [8],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox6);

                var div_gridSettings =
                {
                    id: "div_gridSettings", cls: "", prnt: "detail_box_gridSettings",
                    text: 'grid settings \u2637',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_gridSettings);

                        var div_gridSettings_scale =
                        {
                            id: "div_gridSettings_scale", cls: "", prnt: "detail_box_gridSettings",
                            text: `scale`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_gridSettings_scale);

                            var textIn_gridSettings_scale =
                            {
                                id: "textIn_gridSettings_scale", cls: "textIn_gridSettings_scale", prnt: "div_gridSettings_scale",
                                rootStyle: rootStyle + textIn_css,
                                value: 8,
                                callback: updateSetting
                            }; _this = textIn_gridSettings_scale;
                        _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                        addTextInput(_this);



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

            var div_detailMenuBox7 =
            {
                id: "detail_box_colorSettings", cls: "", prnt: "menu_detail",
                settings: [15, 15, 15],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox7);

                var div_colorSettings =
                {
                    id: "div_colorSettings", cls: "", prnt: "detail_box_colorSettings",
                    text: 'color settings (0:255)',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_colorSettings);

                        var div_colorSettings_r =
                        {
                            id: "div_colorSettings_r", cls: "", prnt: "detail_box_colorSettings",
                            text: `red`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_colorSettings_r);

                            var textIn_colorSettings_r =
                            {
                                id: "textIn_colorSettings_r", cls: "textIn_colorSettings", prnt: "div_colorSettings_r",
                                rootStyle: rootStyle + textIn_css,
                                value: 15,
                                callback: updateSetting
                            }; _this = textIn_colorSettings_r;
                            _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                            addTextInput(_this);


                        var div_colorSettings_g =
                        {
                            id: "div_colorSettings_g", cls: "", prnt: "detail_box_colorSettings",
                            text: `green`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_colorSettings_g);

                            var textIn_colorSettings_g =
                            {
                                id: "textIn_colorSettings_g", cls: "textIn_colorSettings", prnt: "div_colorSettings_g",
                                rootStyle: rootStyle + textIn_css,
                                value: 15,
                                callback: updateSetting
                            }; _this = textIn_colorSettings_g;
                            _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                            addTextInput(_this);


                        var div_colorSettings_b =
                        {
                            id: "div_colorSettings_b", cls: "", prnt: "detail_box_colorSettings",
                            text: `blue`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_colorSettings_b);

                            var textIn_colorSettings_b =
                            {
                                id: "textIn_colorSettings_b", cls: "textIn_colorSettings", prnt: "div_colorSettings_b",
                                rootStyle: rootStyle + textIn_css,
                                value: 15,
                                callback: updateSetting 
                            }; _this = textIn_colorSettings_b;
                            _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                            addTextInput(_this);


                            // automate this part
                            // world_color = ["20", "20", "20"];

            /*
                    ╔╗      ╔╗                    ╔╗
                   ╔╝╚╗    ╔╝╚╗                  ╔╝╚╗
            ╔═╗╔══╗╚╗╔╝╔══╗╚╗╔╝╔╗╔══╗╔═╗     ╔══╗╚╗╔╝╔═╗ 
            ║╔╝║╔╗║ ║║ ╚ ╗║ ║║ ╠╣║╔╗║║╔╗╗    ║══╣ ║║ ║╔╗╗
            ║║ ║╚╝║ ║╚╗║╚╝╚╗║╚╗║║║╚╝║║║║║    ╠══║ ║╚╗║║║║
            ╚╝ ╚══╝ ╚═╝╚═══╝╚═╝╚╝╚══╝╚╝╚╝    ╚══╝ ╚═╝╚╝╚╝
            #rotationsettings
            */
                            
            var div_detailMenuBox8 =
            {
                id: "detail_box_rotationSettings", cls: "", prnt: "menu_detail",
                settings: [45],
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox8);

                var div_rotationSettings =
                {
                    id: "div_rotationSettings", cls: "", prnt: "detail_box_rotationSettings",
                    text: 'rotation settings \u2B6E',
                    rootStyle: rootStyle + div_css + darkBorder + myTitleStyle
                }; addDiv(div_rotationSettings);

                        var div_rotationSettings_r =
                        {
                            id: "div_rotationSettings_r", cls: "", prnt: "detail_box_rotationSettings",
                            text: `deg`,
                            rootStyle: rootStyle + div_css + darkBorder
                        }; addDiv(div_rotationSettings_r);

                            var textIn_rotationSettings_r =
                            {
                                id: "textIn_rotationSettings_r", cls: "textIn_rotationSettings", prnt: "div_rotationSettings_r",
                                rootStyle: rootStyle + textIn_css,
                                value: 45,
                                callback: updateSetting
                            }; _this = textIn_rotationSettings_r;
                            _this.params = {id: _this.id, cls: _this.cls, prnt: _this.prnt, stn: _settings[_settings.length-1]};
                            addTextInput(_this);

/*
    ╔════╗╔═══╗╔══╗     ╔═══╗
    ║╔╗╔╗║║╔═╗║║╔╗║     ║╔═╗║
    ╚╝║║╚╝║║ ║║║╚╝╚╗    ╚╝╔╝║
      ║║  ║╚═╝║║╔═╗║    ╔═╝╔╝
     ╔╝╚╗ ║╔═╗║║╚═╝║    ║║╚═╗
     ╚══╝ ╚╝ ╚╝╚═══╝    ╚═══╝
     #tab2 #keybinds
*/              

        var defaultHidden =
        `
            display: none;
        `;
        var bind_menu =
        `
            box-sizing: border-box;
            float: left;
            margin: 0% 0px 0px 1%;
            padding: 0px;
        `;

        var div_keysMenu =
        {
            id: "div_keysMenu", cls: "", prnt: "menu_q",
            rootStyle: rootStyle + detail_menu + defaultHidden + bind_menu
        }; addDiv(div_keysMenu);


            var listStyle =
             `
            background-color: rgba(0,0,0,0);
            width: 96%;
            padding: 0px;

            max-height: 97%;
            margin: 2% 0px 0px 2%;

            border: 1px solid rgba(255,255,255,0.1);

            overflow-y: auto;
            `;
            //box-shadow:inset 0px 0px 0px 1px rgba(255, 255, 255, 0.9);
            var myLiStyle =
             `
            box-sizing: border-box;
            width: 100%;
            height: 25px;
            padding 0px; margin: 0px;
            border-bottom: 1px solid rgb(12,12,12);
            text-align: center;
            line-height: 2.09;
            `;

            var list_keyBindInfo =
            {
                id: "list_keyBindInfo", cls: "_list", prnt: "div_keysMenu",
                color1: list_colors.c1, color2: list_colors.c2,
                rootStyle: rootStyle + listStyle,
                liStyles: myLiStyle,
                items: key_bind_info
            };
            addList(list_keyBindInfo);







