import {SQUIDINK_ENDPOINT} from "constants/api";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

// project menu items functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function clickActionDemo() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/clickServlet/D', {
        method: "POST",
        body: localStorage.getItem("user")
    }).then(() => {
        let str = window.location.href.split('/');
        if (str[str.length - 1] == "manageproject") {
            localStorage.setItem("profileFilePath", "/SQUID3_demo_file.squid");
            window.location.reload();
        } else {
            window.location.href = "/squidink/manageproject"
        }
    })
}

async function clickManageProject() {
    window.location.href = "/squidink/manageproject"
}

// reports menu items functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function clickActionGen() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/reportsServlet', {
        method: "POST",
        body: localStorage.getItem("user")
    })
}


async function clickActionRefMat() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":RefMat"
    })
}

async function clickActionUnknown() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":Unknown"
    })
}

async function clickActionProjectAudit() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":ProjectAudit"
    })
}

async function clickActionTaskAudit() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":TaskAudit"
    })
}

async function clickActionPerScan() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":PerScan"
    })
}
async function clickActionClose() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/close', {
        method: "POST",
        body: localStorage.getItem("user")
    }).then(window.location.href="/squidink")
}

async function clickActionSave() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/save/s', {
        method: "POST",
        body: localStorage.getItem("user")
            + ":" + localStorage.getItem("profileFilePath")
    })

}
async function clickManageSpots() {
    window.location.href = "/squidink/managespots"
}
// about menu items functions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function clickShowAbout() {
        window.location.href = "/squidink/showabout"
}


// place holder functions ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export function testFunction() {
    console.log("This is a test function")
}
export const dropdownState = [
    //State-Index
    //State 0, Fresh-Page, Unopened File
    [
        0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1
    ],
    //State 1, Opened Demo File
    [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1
    ]
]
export const dropdownOptions = [
    [
        {
            title: 'Manage Project',
            onclick: clickManageProject,
            id: 1
        },
        {
            title: 'New Squid GEOCHRON Project',
            onclick: testFunction,
            id: 2
        },
        //{
        //    title: 'New SQUID RATIO Project BETA',
        //    onclick: testFunction,
        //    id: 3
        //},
        {
            title: 'Open Squid Project',
            onclick: testFunction,
            id: 3
        },
        //{
        //    title: 'Open Recent Squid Project',
        //    onclick: testFunction,
        //    id: 5
        //},
        {
            title: 'Open Demonstration Squid Project',
            onclick: clickActionDemo,
            id: 4
        },
        {
            title: 'Save Squid Project',
            onclick: clickActionSave,
            id: 5
        },
        {
            title: 'Save Squid Project as ...',
            onclick: testFunction,
            id: 6
        },
        {
        title: 'Close Squid Project',
        onclick: clickActionClose,
        id: 7
        },
    ],
    [
        {
            title: 'Manage Sample Names',
            onclick: testFunction,
            id: 8
        },
        {
            title: 'Manage Spots & Reference Materials',
            onclick: clickManageSpots,
            id: 9
        },
        {
            title: 'Audit Raw Data',
            onclick: testFunction,
            id: 10
        },
        {
            title: 'Save Project Data as Prawn Data File',
            onclick: testFunction,
            id: 11
        },
        {
            title: 'Replace Project Data with data from another Prawn File...',
            onclick: testFunction,
            id: 12
        }
    ],
    [
        {
            title: 'View Current Task',
            onclick: testFunction,
            id: 13
        },
        {
            title: 'New Task from...',
            onclick: testFunction,
            id: 14
        },
        {
            title: 'Browse, Load, or Edit Task Files',
            onclick: testFunction,
            id: 15
        }
    ],
    [

        {
            title: 'Map Isotopes from Data to Task',
            onclick: testFunction,
            id: 16
        }

    ],
    [

        {
            title: 'Manage Expressions',
            onclick: testFunction,
            id: 17
        },
        {
            title: 'Load Expression from Library',
            onclick: testFunction,
            id: 18
        },
        {
            title: 'Load Expression from xml File',
            onclick: testFunction,
            id: 19
        },
        {
            title: 'Load Recent Expression from xml File',
            onclick: testFunction,
            id: 20
        },
        {
            title: 'Import Custom Expressions from Folder',
            onclick: testFunction,
            id: 21
        },
        {
            title: 'Export Custom Expressions to Folder',
            onclick: testFunction,
            id: 22
        }

    ],
    [

        {
            title: 'Unknowns: 204 Count Corrections & Assign Common Lead Ratios',
            onclick: testFunction,
            id: 23
        }

    ],
    [

        {
            title: 'Reference Materials',
            onclick: testFunction,
            id: 24
        },
        {
            title: 'Unknowns',
            onclick: testFunction,
            id: 25
        }

    ],
    [

        {
            title: 'Custom Report Builder',
            onclick: testFunction,
            id: 26
        },
        {
            title: 'Reference Materials',
            onclick: clickActionRefMat,
            id: 27
        },
        {
            title: 'Unknowns',
            onclick: clickActionUnknown,
            id: 28
        },
        {
            title: 'Project Audit',
            onclick: clickActionProjectAudit,
            id: 29
        },
        {
            title: 'Task Audit',
            onclick: clickActionTaskAudit,
            id: 30
        },
        {
            title: 'Generate All Reports',
            onclick: clickActionGen,
            id: 31
        },
        {
            title: 'PerScan Reports Bundle',
            onclick: clickActionPerScan,
            id: 32
        },

    ],
    [
        {
            title: 'Archiving',
            onclick: testFunction,
            id: 33
        }
    ],
    [
        {
            title: 'Reference Material Models',
            onclick: testFunction,
            id: 34
        },
        {
            title: 'Common Pb Models',
            onclick: testFunction,
            id: 35
        },
        {
            title: 'Physical Constants Models',
            onclick: testFunction,
            id: 36
        }
    ],
    [
        {
            title: 'About SquidInk',
            onclick: clickShowAbout,
            id: 37
        },
        {
            title: 'How to Cite Squid3',
            onclick: testFunction,
            id: 38
        },
        {
            title: 'Squid3 Github Repository',
            onclick: testFunction,
            id: 39
        },
        {
            title: 'CIRDLES.org',
            onclick: testFunction,
            id: 40
        },
        {
            title: 'Topsoil Github Repository',
            onclick: testFunction,
            id: 41
        },
        {
            title: 'Enjoy!',
            onclick: testFunction,
            id: 42
        }
    ]
];
