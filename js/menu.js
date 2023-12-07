// memspc.xyz menu generation.

// this one really helped me understand objects in javascript that's for sure.
// very noob level implementation here though. I just wan't absolute freedom.
/*
                    -- i can't tell if i'm on the right track.
                        : maybe i can design it such that
                        :
                        :      [code for tool] (use data)-> [[tool settings obj data]] <-(use data) [menu section generation]

                        i'll learn how if I properly create a windowDraggable feature that's automatic per section.
*/


function applyStyles(element, rootStyle, hoverStyles, clickStyles, checkedStyles, liStyle)
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

}

function addDiv(par)
{
    const div = document.createElement("div");
    // stuff
    div.id = par.id;
    div.className = par.cls;

    if (par.text != null)
    {
        div.innerHTML = par.text;
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

    // Event listener for the "input" event
    input.addEventListener("input", function ()
    {
        par.value = input.value;
        par.callback(par.params);
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
    //console.log(par.liStyles);
    return ul;
}

// function fileInputCallback(files)
// {
//     console.log(files);
// }

// function textInputCallback(par)
// {
//     if (par != null) {console.log(`Text input changed! Parameter: ${par.text}`);}
// }

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

function menuLinkObj()
{link_obj(obj_cyc, stn_link_tool);}

function gridSettingsUpdate(par)
{grid_.scale_f = getInputById(par.id);}

function circleSettingsUpdate() // bad needs system
{
    stn_cir_tool.scale = checkNumber(getInputById("textIn_scale")) != false ? parseFloat(getInputById("textIn_scale")) : stn_cir_tool.scale;
    stn_cir_tool.divider = checkNumber(getInputById("textIn_divider")) != false ? parseFloat(getInputById("textIn_divider")) : stn_cir_tool.divider;
    stn_cir_tool.off = checkNumber(getInputById("textIn_off")) != false ? parseFloat(getInputById("textIn_off")) : stn_cir_tool.off;
}

function drawSettingsUpdate(par)
{
    var cbxs = document.querySelectorAll("."+par.class);
    cbxs.forEach(function(e, i)
    {
        stn_draw[i] = getCheckedById(e.id); // set happens here !!! :)
        if (e.id === par.id)
        {
            //console.log(e.id);
            //console.log(document.getElementById( e.id ).checked);
            //console.log(getCheckedById( e.id ));
        }
    });

    if (!stn_draw[2])
    {
        rgbas_tri_f = rgbas_tri;
    } else {
        rgbas_tri_f = rgbas_tri_opacity;
    }
    

}

function linkSettingsUpdate(par)
{
    var cbxs = document.querySelectorAll("."+par.class);
    cbxs.forEach(function(e, i)
    {
        //console.log(e.id);
        setChecked(e.id, true);
        if (e.id !== par.id)
        {
            setChecked(e.id, false);
           // console.log(e.id + " : " + par.id);
        } else {
            stn_link_tool = i;
            //console.log(i);
        }
    });
}

//var stn_test = {};

function lockSettingsUpdate(par)
{
    var cbxs = document.querySelectorAll("."+par.class);
    cbxs.forEach(function(e, i)
    {
        stn_trns[i] = getCheckedById(e.id); // set happens here !!! :)
        // maybe this obj creation can happen in the constructor
        // uncertain if bidirectional
        // seriously crazy amount of work compared to arrays lol
        //stn_test[e.id] = getCheckedById(e.id); // set happens here !!! :)
        if (e.id === par.id)
        {
            //console.log(e.id);
            //console.log(getCheckedById( e.id ));
        }
    });
}


function paintSettingsUpdate() // bad needs system
{
    stn_paint[0] = checkNumber(document.getElementById("textIn_paintSettings_dist").value) != false ? parseFloat(document.getElementById("textIn_paintSettings_dist").value) : stn_paint[0];
    stn_paint[1] = checkNumber(document.getElementById("textIn_paintSettings_nodes").value) != false ? parseFloat(document.getElementById("textIn_paintSettings_nodes").value) : stn_paint[1];
    stn_paint[2] = document.getElementById("cbx_paintInf").checked;
}

var world_color = {};

function colorSettingsUpdate(par) // bad needs system
{
    var inputs = document.querySelectorAll("."+par.class);
    inputs.forEach(function(e, i)
    {
        world_color[i] = getInputById(e.id); // set happens here !!! :)
        if (e.id === par.id)
        {
            //console.log(e.id);
            //console.log(getCheckedById( e.id ));
        }
    });

    setBackgroundColor(world_color);
}


/*


*/


//      log box needs to be reloadable 
//      basically make push fn also perform js text load
//          -- super key here to put that fn inside the listener assigned to text boxes.
//          -- need to start consistently providing undefined checks and skips. Good one here is the apply styles need it's own obj
//      
//      

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
    "W(move forward), S(move backwards)",
    "A(move left), D(move right)",
    "Space(up), B(down)",
    "Shift(speed up movement & deletion)",
    "Q(toggle menu & unlock mouse)",
    "[Ctrl or Alt] (unlock mouse so you can Alt+Tab)",
    "...",
    "[IN GAME] LMB(move 3D cursor to aim location)",
    "[IN MENU] LMB(select object by center)",
    "[IN GAME] TAB(select by aiming at 3D center)",
    "[IN MENU] TAB(select by hovering over 3D center)",
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
    "Arrows(object selection)",
    "[IN MENU] Scroll(object selection)",
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
            height: 65%;
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



            // var _btn_tool_border
            // `

            // `;

            var _btn_tool0 =
            `
            margin: 5px 0% 0 3%;
            `;

            var _btn_tooln =
            `
            margin: 2px 0% 0 3%;
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
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detail_circleSettings);

                var div_css =
                `
                color: rgb(255, 123, 0);
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
                        value: stn_cir_tool.scale,
                        callback: circleSettingsUpdate
                    }; addTextInput(textInput_scale);

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
                            value: stn_cir_tool.divider,
                            callback: circleSettingsUpdate
                        }; addTextInput(textInput_divider);

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
                                value: stn_cir_tool.off,
                                callback: circleSettingsUpdate
                            }; addTextInput(textInput_off);

            /*
              ╔╗                       ╔╗
              ║║                      ╔╝╚╗
            ╔═╝║╔═╗╔══╗ ╔╗╔╗╔╗    ╔══╗╚╗╔╝╔═╗
            ║╔╗║║╔╝╚ ╗║ ║╚╝╚╝║    ║══╣ ║║ ║╔╗╗
            ║╚╝║║║ ║╚╝╚╗╚╗╔╗╔╝    ╠══║ ║╚╗║║║║
            ╚══╝╚╝ ╚═══╝ ╚╝╚╝     ╚══╝ ╚═╝╚╝╚╝
            #drawsettings
            */

            var div_detailMenuBox2 =
            {
                id: "detail_box_drawSettings", cls: "", prnt: "menu_detail",
                rootStyle: rootStyle + detail_menu_box + lightSideBorder
            }; addDiv(div_detailMenuBox2);

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
                            callback: drawSettingsUpdate,
                            defaultChecked: true
                        };
                        cbx_lines.params = {id: cbx_lines.id, class: cbx_lines.cls};
                        addCheckbox(cbx_lines);

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
                            callback: drawSettingsUpdate,
                            defaultChecked: true
                        };
                        cbx_surfaces.params = {id: cbx_surfaces.id, class: cbx_surfaces.cls}
                        addCheckbox(cbx_surfaces);

                var div_opacity =
                {
                    id: "div_drawOpacity", cls: "", prnt: "detail_box_drawSettings",
                    text: `opacity`,
                    rootStyle: rootStyle + div_css + darkBorder
                }; addDiv(div_opacity);

                        var cbx_surfaces =
                        {
                            id: "cbx_opacity", cls: "cbx_drawSettings", prnt: "div_drawOpacity",
                            rootStyle: rootStyle+cbx_myStyle,
                            hoverStyles: cbx_myStyle_hover,
                            checkedStyles: cbx_myStyle_checked,
                            callback: drawSettingsUpdate
                        };
                        cbx_surfaces.params = {id: cbx_surfaces.id, class: cbx_surfaces.cls};
                        addCheckbox(cbx_surfaces);

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
                            callback: linkSettingsUpdate
                        };
                        cbx_linear.params = {id: cbx_linear.id, class: cbx_linear.cls}
                        addCheckbox(cbx_linear);

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
                            callback: linkSettingsUpdate
                        };
                        cbx_zigzag.params = {id: cbx_zigzag.id, class: cbx_zigzag.cls}
                        addCheckbox(cbx_zigzag);

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
                            callback: linkSettingsUpdate
                        };
                        cbx_poly.params = {id: cbx_poly.id, class: cbx_poly.cls}
                        addCheckbox(cbx_poly);



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
                            callback: lockSettingsUpdate
                        };
                        cbx_lockx.params = {id: cbx_lockx.id, class: cbx_lockx.cls}
                        addCheckbox(cbx_lockx);


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
                            callback: lockSettingsUpdate
                        };
                        cbx_lockySettings.params = {id: cbx_lockySettings.id, class: cbx_lockySettings.cls}
                        addCheckbox(cbx_lockySettings);

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
                            callback: lockSettingsUpdate
                        };
                        cbx_lockzSettings.params = {id: cbx_lockzSettings.id, class: cbx_lockzSettings.cls}
                        addCheckbox(cbx_lockzSettings);


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
                            callback: paintSettingsUpdate
                        };
                        //cbx_paintInf.params = {id: cbx_paintInf.id, class: cbx_paintInf.cls}
                        addCheckbox(cbx_paintInf);

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
                                value: stn_paint[0],
                                callback: paintSettingsUpdate
                            }; addTextInput(textIn_paintSettings_dist);


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
                                value: stn_paint[1],
                                callback: paintSettingsUpdate
                            }; addTextInput(textIn_paintSettings_nodes);


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
                                value: grid_.scale_f,
                                callback: gridSettingsUpdate
                            };
                            textIn_gridSettings_scale.params = { id:textIn_gridSettings_scale.id };
                            addTextInput(textIn_gridSettings_scale);



            /*

            #colorsettings
            */
            var div_detailMenuBox7 =
            {
                id: "detail_box_colorSettings", cls: "", prnt: "menu_detail",
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
                                value: _bg_default[0],
                                callback: colorSettingsUpdate
                            };
                            textIn_colorSettings_r.params = {id: textIn_colorSettings_r.id, class: textIn_colorSettings_r.cls}
                            addTextInput(textIn_colorSettings_r);

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
                                value: _bg_default[1],
                                callback: colorSettingsUpdate
                            };
                            textIn_colorSettings_g.params = {id: textIn_colorSettings_g.id, class: textIn_colorSettings_g.cls}
                            addTextInput(textIn_colorSettings_g);


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
                                value: _bg_default[2],
                                callback: colorSettingsUpdate
                            };
                            textIn_colorSettings_b.params = {id: textIn_colorSettings_b.id, class: textIn_colorSettings_b.cls}
                            addTextInput(textIn_colorSettings_b);

                            // automate this part
                            world_color = {0:"20", 1:"20", 2:"20"};



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
                color1: "rgb(13,13,13)", color2: "rgb(17,17,17)",
                rootStyle: rootStyle + listStyle,
                liStyles: myLiStyle,
                items: key_bind_info
            };
            addList(list_keyBindInfo);




// Example usage code for future use


// var chkBx =
//  `
// left: 500px;
// top: 500px;
// background-color: rgb(99, 99, 99);
// `;
// var checkboxParams =
// {
//     id: "myCheckbox", cls: "_checkbox", prnt: "menu_detail",
//     rootStyle: rootStyle+chkBx,
//     callback: textInputCallback, // Pass the function reference
//     params: { text: "Custom Parameter" }, // Pass the parameter as an object
// };
// addCheckbox(checkboxParams);

// var txtIn =
//  `
// left: 600px;
// top: 600px;
// background-color: rgb(120, 120, 120);
// `;
// var textInputParams =
// {
//     id: "myTextInput", cls: "_textInput", prnt: "menu_detail",
//     rootStyle: rootStyle+txtIn,
//     callback: textInputCallback, // Pass the function reference
//     params: { text: "Custom Parameter" }, // Pass the parameter as an object
// };
// addTextInput(textInputParams);

// var listStyle =
//  `
// left: 100px;
// top: 100px;
// padding: 0px;
// width: 300px;
// height: 20px;
// `;
// var listParams =
// {
//     id: "myList", cls: "_list", prnt: "menu_detail",
//     color1: "#666", color2: "#444",
//     rootStyle: rootStyle + listStyle,
//     items: ["Item 1", "Item 2", "Item 3"], // Add your array of items here
// };
// addList(listParams);

// var fileBtn =
//  `
// left: 100px;
// top: 100px;
// background-color: rgb(55, 55, 55);
// `;
// var fileInputParams =
// {
//     id: "myFileInput", cls: "_filein", prnt: "menu_detail",
//     rootStyle: fileBtn,
//     callback: fileInputCallback, // Pass the function reference
// };
// addFileInput(fileInputParams);









