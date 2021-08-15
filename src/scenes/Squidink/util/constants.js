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
        0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1
    ],
    //State 1, Opened Demo File
    [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1
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
        {
            title: 'New SQUID RATIO Project BETA',
            onclick: testFunction,
            id: 3
        },
        {
            title: 'Open Squid Project',
            onclick: testFunction,
            id: 4
        },
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
            onclick: clickActionSave,
            id: 7
        },
        {
            title: 'Save Squid Project as ...',
            onclick: testFunction,
            id: 8
        }
    ],
    [
        {
            title: 'Manage Sample Names',
            onclick: testFunction,
            id: 9
        },
        {
            title: 'Manage Spots & Reference Materials',
            onclick: clickManageSpots,
            id: 10
        },
        {
            title: 'Audit Raw Data',
            onclick: testFunction,
            id: 11
        },
        {
            title: 'Save Project Data as Prawn Data File',
            onclick: testFunction,
            id: 12
        },
        {
            title: 'Replace Project Data with data from another Prawn File...',
            onclick: testFunction,
            id: 13
        }
    ],
    [
        {
            title: 'View Current Task',
            onclick: testFunction,
            id: 14
        },
        {
            title: 'New Task from...',
            onclick: testFunction,
            id: 15
        },
        {
            title: 'Browse, Load, or Edit Task Files',
            onclick: testFunction,
            id: 16
        }
    ],
    [

        {
            title: 'Map Isotopes from Data to Task',
            onclick: testFunction,
            id: 17
        }

    ],
    [

        {
            title: 'Manage Expressions',
            onclick: testFunction,
            id: 18
        },
        {
            title: 'Load Expression from Library',
            onclick: testFunction,
            id: 19
        },
        {
            title: 'Load Expression from xml File',
            onclick: testFunction,
            id: 20
        },
        {
            title: 'Load Recent Expression from xml File',
            onclick: testFunction,
            id: 21
        },
        {
            title: 'Import Custom Expressions from Folder',
            onclick: testFunction,
            id: 22
        },
        {
            title: 'Export Custom Expressions to Folder',
            onclick: testFunction,
            id: 23
        }

    ],
    [

        {
            title: 'Unknowns: 204 Count Corrections & Assign Common Lead Ratios',
            onclick: testFunction,
            id: 24
        }

    ],
    [

        {
            title: 'Reference Materials',
            onclick: testFunction,
            id: 25
        },
        {
            title: 'Unknowns',
            onclick: testFunction,
            id: 26
        }

    ],
    [

        {
            title: 'Custom Report Builder',
            onclick: testFunction,
            id: 27
        },
        {
            title: 'Reference Materials',
            onclick: clickActionRefMat,
            id: 28
        },
        {
            title: 'Unknowns',
            onclick: clickActionUnknown,
            id: 29
        },
        {
            title: 'Project Audit',
            onclick: clickActionProjectAudit,
            id: 30
        },
        {
            title: 'Task Audit',
            onclick: clickActionTaskAudit,
            id: 31
        },
        {
            title: 'Generate All Reports',
            onclick: clickActionGen,
            id: 32
        },
        {
            title: 'PerScan Reports Bundle',
            onclick: clickActionPerScan,
            id: 33
        },

    ],
    [
        {
            title: 'Archiving',
            onclick: testFunction,
            id: 34
        }
    ],
    [
        {
            title: 'Reference Material Models',
            onclick: testFunction,
            id: 35
        },
        {
            title: 'Common Pb Models',
            onclick: testFunction,
            id: 36
        },
        {
            title: 'Physical Constants Models',
            onclick: testFunction,
            id: 37
        }
    ],
    [
        {
            title: 'About SquidInk',
            onclick: clickShowAbout,
            id: 38
        },
        {
            title: 'How to Cite Squid3',
            onclick: testFunction,
            id: 39
        },
        {
            title: 'Squid3 Github Repository',
            onclick: testFunction,
            id: 40
        },
        {
            title: 'CIRDLES.org',
            onclick: testFunction,
            id: 41
        },
        {
            title: 'Topsoil Github Repository',
            onclick: testFunction,
            id: 42
        },
        {
            title: 'Enjoy!',
            onclick: testFunction,
            id: 43
        }
    ]


];
/*
<div className={cx('grid-container-spots')}>
    <div className={cx('filter-spots-label')}>
        <h6 style={{display: "inline"}}>Filter Spots by Sample name:</h6>
        <FormControl style={{padding: "0 0 0 40px"}}>
            <Select
                labelId="filterSpotsSelector-label"
                id="filterSpotsSelector"
                name="filterSpotsSelector"
                value={this.state.filterSpotsSelector}
                onChange={this.handleChange}
            >
                <MenuItem value={"All Samples"}>All Samples</MenuItem>
                <MenuItem value={"PropValHere1"}>Dynamically</MenuItem>
                <MenuItem value={"PropValHere2"}>Generated</MenuItem>
                <MenuItem value={"PropValHere3"}>Options Here</MenuItem>
            </Select>
        </FormControl>
        <p style={{padding: "0 0 0 40px", display: "inline", fontSize: "smaller"}}>{"115/115"} shown</p>

    </div>
    <div className={cx('table-left-custom')}>
        <div style={{overflowY: "scroll", maxHeight: "30em"}}>
            <table style={{width: "100%"}}>
                <tr>
                    <th>
                        Spot Name
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Time
                    </th>
                    <th>
                        Peaks
                    </th>
                    <th>
                        Scans
                    </th>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        10:58:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>
                <tr>
                    <td>
                        Temora-1.1
                    </td>
                    <td>
                        2021-03-09
                    </td>
                    <td>
                        12:21:56
                    </td>
                    <td>
                        11
                    </td>
                    <td>
                        6
                    </td>
                </tr>

            </table>
        </div>

    </div>
    <div className={cx('edit-spot-name-hint')} style={{display: 'inline'}}>
        <p style={{fontSize: "smaller"}}>Hint: To remove a spot or split session, right mouse-click on spot for menu.</p>
    </div>
    <div className={cx('edit-spot-name-label')}>
        <h6 style={{display: "inline", paddingRight: "5%"}}> Edit Spot Name: </h6>
        <TextField defaultValue={this.state.spotName} style={{paddingRight: "5%"}}/>
        <Button variant="contained" color="primary">Save Name</Button>
    </div>
    <div className={cx('rm-spots-label')}>
        <h5 style={{fontSize: "17px"}}>Isotopic Reference Material (RM) Spots</h5>
    </div>
    <div className={cx('rm-spots-label-selected')}>
        <h6 style={{color: "#000000"}}>
            <b>{"COUNT "}</b>
            RM Spots selected using filter
            <b>{" FILTER"}</b>
        </h6>
    </div>
    <div style={{overflowY: "scroll", maxHeight: "12em"}}className={cx('rm-spots-table')}>
        <table style={{width: "100%"}}>
            <tr>
                <th>
                    Ref Mat Name
                </th>
                <th>
                    Date
                </th>
                <th>
                    Time
                </th>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>
            <tr>
                <td>
                    Temora-1.1
                </td>
                <td>
                    2011-10-19
                </td>
                <td>
                    02:43:18
                </td>
            </tr>
            <tr>
                <td>
                    Temora-2.1
                </td>
                <td>
                    2012-01-23
                </td>
                <td>
                    07:12:54
                </td>
            </tr>

        </table>
    </div>
    <div className={cx('rm-spots-hint')}>
        <p style={{fontSize: "x-small", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
        <Button variant="contained" color="primary">Copy Filtered Spots to RM Spots.</Button>
    </div>
    <div className={cx('crm-spots-label')}>
        <h5 style={{fontSize: "17px"}}>Concentration Reference Material (CRM) Spots:</h5>
    </div>
    <div className={cx('crm-spots-label-selected')}>
        <b>{"COUNT "}</b>
        CRM Spots selected using filter
        <b>{" FILTER"}</b>
    </div>
    <div className={cx('crm-spots-table')}>
        <div style={{overflowY: "scroll", maxHeight: "12em", zIndex: "2"}}>
            <table>
                <tr>
                    <th>
                        Ref Mat Name
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Time
                    </th>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>
                <tr>
                    <td>
                        6266-1.1
                    </td>
                    <td>
                        2012-02-08
                    </td>
                    <td>
                        9:18:18
                    </td>
                </tr>


            </table>
        </div>
    </div>
    <div className={cx('crm-spots-hint')}>
        <p style={{fontSize: "x-small", display: "inline"}}>Hint: To clear the list, right mouse-click on it anywhere for menu.</p>
        <Button variant="contained" color="primary">Copy Filtered Spots to CRM Spots.</Button>
    </div>
    <div className={cx('isotopic-rm-label')}>
        <h6>Select Isotopic RM Model:</h6>
        <FormControl style={{width: "90%"}}>
            <Select
                labelId="isotopic-RM-label"
                id="isotopicRM"
                name="isotopicRM"
                value={this.state.isotopicRM}
                onChange={this.handleChange}
            >
                <MenuItem value={"Model1"}>Model1</MenuItem>
                <MenuItem value={"Model2"}>Model2</MenuItem>
                <MenuItem value={"Model3"}>Model3</MenuItem>
                <MenuItem value={"Model4"}>Model4</MenuItem>
            </Select>
        </FormControl>
    </div>
</div>
*/