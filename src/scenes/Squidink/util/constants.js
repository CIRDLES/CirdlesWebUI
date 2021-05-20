import {SQUIDINK_ENDPOINT} from "constants/api";
async function clickActionGen() {
    const data = await fetch( SQUIDINK_ENDPOINT + '/reportsServlet', {
        method: "POST",
        body: localStorage.getItem("user")
    })
}
async function clickActionDemo() {
    const data = await fetch( SQUIDINK_ENDPOINT + '/clickServlet/D', {
        method: "POST",
        body: localStorage.getItem("user")
    })
}
async function clickActionRefMat() {
    const data = await fetch(SQUIDINK_ENDPOINT+ '/individ', {
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
    const data = await fetch(SQUIDINK_ENDPOINT + '/squid_servlet/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":ProjectAudit"
    })
}
async function clickActionTaskAudit() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/squid_servlet/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":TaskAudit"
    })
}
async function clickActionPerScan() {
    const data = await fetch(SQUIDINK_ENDPOINT + '/squid_servlet/individ', {
        method: "POST",
        body: localStorage.getItem("user") + ":PerScan"
    })
}

export function testFunction() {
    console.log("This is a test function")
}

export const dropdownOptions = [
    [
        {
            title: 'Manage Project',
            onclick: testFunction,
            id: 1
        },
        {
            title: 'New Squid GEOCHRON Project',
            onclick: testFunction,
            id: 2
        },
        {
            title: 'New SQUID RATIO Project BETA' ,
            onclick: testFunction,
            id: 3
        },
        {
            title: 'Open Squid Project',
            onclick: 4,
            id: 4
        },,
        {
            title: 'Open Recent Squid Project',
            onclick: testFunction,
            id: 5
        },
        {
            title: 'Open Demonstration Squid Project',
            onclick: clickActionDemo,
            id: 6
        },
        {
            title: 'Save Squid Project',
            onclick: testFunction,
            id: 7
        },
        {
            title: 'Save Squid Project as ...',
            onclick: testFunction,
            id: 8
        },
        {
            title: 'Close Squid Project',
            onclick: testFunction,
            id: 9
        },
        {
            title: 'Quit Squid',
            onclick: testFunction,
            id: 10
        },
    ],
    [
        {
            title: 'Data',
            onclick: testFunction,
            id: 11
        },
        {
            title: 'Data',
            onclick: testFunction,
            id: 12
        },
        {
            title: 'Data',
            onclick: testFunction,
            id: 13
        }
    ],
    [
        {
            title: 'Task',
            onclick: testFunction,
            id: 14
        }
    ],
    [

        {
            title: 'Isotopes',
            onclick: testFunction,
            id: 15
        }

    ],
    [

        {
            title: 'Expressions',
            onclick: testFunction,
            id: 16
        }

    ],
    [

        {
            title: 'Common PB',
            onclick: testFunction,
            id: 17
        }

    ],
    [

        {
            title: 'Interpretations',
            onclick: testFunction,
            id: 18
        }

    ],
    [

        {
            title: 'Custom Report Builder',
            onclick: testFunction,
            id: 19
        },
        {
            title: 'Reference Materials',
            onclick: clickActionRefMat,
            id: 20
        },
        {
            title: 'Unknowns',
            onclick: clickActionUnknown,
            id: 21
        },
        {
            title: 'Project Audit',
            onclick: clickActionProjectAudit,
            id: 22
        },
        {
            title: 'Task Audit',
            onclick: clickActionTaskAudit,
            id: 23
        },
        {
            title: 'Generate All Reports',
            onclick: clickActionGen,
            id: 24
        },
        {
            title: 'PerScan Reports Bundle',
            onclick: clickActionPerScan,
            id: 25
        },

    ],
    [
        {
            title: 'Archiving',
            onclick: testFunction,
            id: 26
        }
    ],
    [
        {
            title: 'Parameters',
            onclick: testFunction,
            id: 27
        }
    ],
    [
        {
            title: 'About Squid3',
            onclick: testFunction,
            id: 28
        },
        {
            title: 'How to Cite Squid3',
            onclick: testFunction,
            id: 29
        },
        {
            title: 'Squid3 Github Repository',
            onclick: testFunction,
            id: 30
        },
        {
            title: 'CIRDLES.org',
            onclick: testFunction,
            id: 31
        },
        {
            title: 'Topsoil Github Repository',
            onclick: testFunction,
            id: 32
        },
        {
            title: 'Enjoy!',
            onclick: testFunction,
            id: 33
        }
    ]


];