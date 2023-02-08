import { useCallback, useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { TimesheetHoursWorked } from "../timesheet-hours-worked/timesheet-hours-worked";
import { TimesheetNoteDialog } from "../timesheet-note-dialog/timesheet-note-dialog";

import {
  ITimesheetsPage,
  ITimeEntry,
  ITimesheetNoteForm,
  ITimesheet,
  TypeRow,
} from "../../../constants/interfaces";

import TabbedDisplay from "../tabbed-display/tabbed-display";
import TabPanel from "../tabbed-display/tab-panel";

import {
  initMockTransport,
  initTransport,
  Transporter,
} from "@cupola/transporter";
import { useGlobalAppContext } from "../context/context";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DataGrid,
  GridCellEditCommitParams,
  GridCellParams,
  GridValueGetterParams,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { DateTime } from "luxon";
import { ProjectEntity, TimesheetEntryEntity } from "@cupola/types";
import CupolaThemeProvider from "../../cupola-theme-provider/cupola-theme-provider";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14,
    padding: 10,
  },
}));

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-us", {
    weekday: "long",
  });
};

export const TimesheetsPage = ({
  onChangeTimesheetEntries,
}: ITimesheetsPage) => {
  const state = useGlobalAppContext();
  const [apiTransport] = useState<Transporter>(
    initMockTransport() // If you want to use real-backend, please comment on this line
    // initTransport(() => state.apiHost || "") // TODO: use for real-backend (production)
  );

  const [timesheets, setTimesheets] = useState<ITimesheet[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [selectWeekOf, setSelectWeekOf] = useState<DateTime>(
    DateTime.local().setLocale("en-gb").startOf("week")
  );
  const [openNoteDialog, setOpenNoteDialog] = useState<boolean>(false);

  // set columns
  useEffect(() => {
    const generalTaskWeek: GridColDef[] = days.map((day, indexDay) => ({
      field: day,
      headerName: `${day} (${DateTime.fromISO(selectWeekOf.toString())
        .plus({ days: indexDay })
        .toFormat("MM/dd")})`,
      type: "number",
      editable: true,
      headerAlign: "left",
      align: "left",
      width: 153,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.value.hours || 0}`;
      },
      renderCell: (params: GridRenderCellParams) => {
        return (
          <LightTooltip
            title={params.row[params.field]?.notes}
            arrow
            placement="top-start"
          >
            <Typography>
              {params.row[params.field]?.hours || 0} hours
            </Typography>
          </LightTooltip>
        );
      },
    }));
    setColumns([
      {
        field: "PhaseName",
        headerName: "Project Name",
        width: 130,
        editable: false,
        sortable: false,
      },
      ...generalTaskWeek,
      {
        field: "TotalHours",
        headerName: "Total",
        renderCell: (params: GridRenderCellParams) => {
          return <Typography>{params.value} hours</Typography>;
        },
        sortable: false,
        editable: false,
      },
      {
        field: "addNotes",
        width: 120,
        renderHeader: () => (
          <AddIcon
            onClick={() => setOpenNoteDialog((preState) => !preState)}
            sx={{ color: "#6e6767", cursor: "pointer", marginLeft: "71px" }}
          />
        ),
        hideSortIcons: true,
        hide: true,
        filterable: false,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
      },
    ]);
  }, [selectWeekOf]);

  useEffect(() => {
    // fetch timesheet from api
    const fetchTimesheet = async () => {
      const startDate = DateTime.fromISO(selectWeekOf.toISO()).toFormat(
        "yyyy-MM-dd"
      );
      const endDate = DateTime.fromISO(selectWeekOf.toISO())
        .plus({ days: 6 })
        .toFormat("yyyy-MM-dd");

      // fetch timesheets from API transport
      const { data }: { data: TimesheetEntryEntity[] } =
        await apiTransport.cupola.timesheet.get(
          new Date(startDate),
          new Date(endDate)
        );

      const formatDataForGridData: ITimesheet[] = [];
      const projects: { data: ProjectEntity[] } =
        await apiTransport.cupola.project.getAll(); // fetch all projects from api transport
      // get unique project id in timeEntries
      const projectId = [
        ...new Set(data.map((item: TimesheetEntryEntity) => item.projectId)),
      ];
      let rowID = 1;
      projectId.forEach((id, indexProject) => {
        // get project by id
        const projectName =
          projects.data.find((item) => item.id === id)?.name || "";
        //get time entries by project id
        const timeEntries = data.filter(
          (e: TimesheetEntryEntity) => e.projectId === id
        );
        // get unique phase in timeEntries
        const phases = [
          ...new Set(
            timeEntries.map((item: TimesheetEntryEntity) => item.phase)
          ),
        ];

        const totalHoursByDay: { [index: string]: ITimeEntry } = {};
        // 1. Format to add total hours by project
        days.forEach((day, dayIndex) => {
          const timeEntriesByDay = timeEntries.filter(
            (entry: TimesheetEntryEntity) =>
              DateTime.fromISO(entry.date.toString()).weekdayLong === day
          );
          const reduceHours = timeEntriesByDay
            .map((e: TimesheetEntryEntity) => e.hours + e.minutes / 60) // total hours and minutes
            .reduce((a: number, b: number) => a + b, 0); // total hours by phase
          totalHoursByDay[days[dayIndex]] = {
            date: "",
            hours: reduceHours,
            minutes: 0,
            notes: "",
          };
        });
        formatDataForGridData.push(
          renderRow(
            rowID,
            projectName,
            totalHoursByDay,
            totalHours(totalHoursByDay),
            TypeRow.Project,
            ""
          )
        );
        rowID++;
        //2. Format to add phase row
        phases.forEach((phase) => {
          const phaseByDay: { [index: string]: ITimeEntry } = {};
          const timeEntryByPhase = timeEntries.filter(
            (timeEntry: TimesheetEntryEntity) => timeEntry.phase === phase
          );

          timeEntryByPhase.forEach((item: TimesheetEntryEntity) => {
            phaseByDay[DateTime.fromISO(item.date.toString()).weekdayLong] = {
              date: item.date.toString(),
              notes: item.notes,
              hours: item.hours + item.minutes / 60,
              minutes: 0,
            };
          });
          formatDataForGridData.push(
            renderRow(
              rowID,
              phase as string,
              phaseByDay,
              totalHours(phaseByDay),
              TypeRow.Phase,
              projectName
            )
          );
          rowID++;
        });
      });
      //3. Total Projects work hours
      const totalHoursByProject: { [index: string]: ITimeEntry } = {};
      let totalAllOfProject = 0;
      days.forEach((day, index) => {
        let totalHours = 0;
        formatDataForGridData.forEach((item) => {
          if (item.Type === TypeRow.Project)
            totalHours += Number(
              // total hours by project
              (item[day as keyof ITimesheet] as ITimeEntry).hours
            );
        });
        totalHoursByProject[day] = {
          date: "",
          hours: totalHours,
          minutes: 0,
          notes: "",
        };
        totalAllOfProject += totalHours;
      });
      formatDataForGridData.push(
        renderRow(
          rowID,
          "Total # Hours",
          totalHoursByProject,
          totalAllOfProject,
          TypeRow.Total,
          ""
        )
      );
      setTimesheets(formatDataForGridData);
    };
    fetchTimesheet().catch(console.error);
  }, [selectWeekOf]);

  const handleCellEditCommit = useCallback(
    async ({ id, field, value }: GridCellEditCommitParams) => {
      try {
        if (typeof value === "object") return;
        const newHours: number = value ? Number(value) : 0; // parse hours
        const findRow: ITimesheet | undefined = timesheets.find(
          (e) => e.id === id
        );
        if (findRow) {
          const timeEntryByField = findRow[
            field as keyof ITimesheet
          ] as ITimeEntry;
          // parse double hours from the entry to hours and minutes
          const hoursWorked = Math.trunc(newHours);
          const minutesWorked = 60 * (newHours - hoursWorked);
          // save data to API
          await apiTransport.cupola.timesheet.post(
            new Date(String(timeEntryByField.date)),
            hoursWorked,
            minutesWorked,
            findRow.PhaseOfProject,
            timeEntryByField.notes,
            findRow.PhaseName
          );
          const sumHours = newHours - timeEntryByField.hours; // input hours - prev-hours
          const updateRows = timesheets.map((item) => {
            const entryByDay: ITimeEntry = {
              ...(item[field as keyof ITimesheet] as ITimeEntry),
            };
            // update Total hours, hours by ProjectName
            if (
              item.PhaseName === findRow.PhaseOfProject ||
              item.PhaseName === "Total # Hours"
            )
              return {
                ...item,
                [field]: {
                  ...entryByDay,
                  hours: entryByDay.hours + sumHours,
                },
                TotalHours: item.TotalHours + sumHours,
              };
            // update hours by phase
            return item.id === id
              ? {
                  ...item,
                  [field]: { ...entryByDay, hours: newHours },
                  TotalHours: findRow.TotalHours + sumHours,
                }
              : item;
          });
          setTimesheets(updateRows);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [timesheets]
  );

  const totalHours = (totalHoursByDay: { [index: string]: ITimeEntry }) => {
    return (Object.keys(totalHoursByDay).length &&
      Object.values(totalHoursByDay)
        .map((timeEntry) => Number(timeEntry["hours"]))
        .reduce((a, b) => a + b, 0)) as number;
  };
  const renderRow = (
    id: number,
    PhaseName: string,
    hoursByDay: { [index: string]: ITimeEntry },
    TotalHours: number,
    Type: TypeRow,
    PhaseOfProject: string
  ) => {
    return {
      id,
      PhaseName,
      Monday: hoursByDay["Monday"],
      Tuesday: hoursByDay["Tuesday"],
      Wednesday: hoursByDay["Wednesday"],
      Thursday: hoursByDay["Thursday"],
      Friday: hoursByDay["Friday"],
      Saturday: hoursByDay["Saturday"],
      Sunday: hoursByDay["Sunday"],
      TotalHours,
      Type,
      PhaseOfProject,
    } as ITimesheet;
  };
  // update onChangeData to testing
  useEffect(() => {
    timesheets.length > 1 &&
      onChangeTimesheetEntries(JSON.stringify(timesheets));
  }, [timesheets]);

  //  total of hours for the projects
  const totalHourWorked =
    timesheets.length &&
    timesheets.find((e) => e.Type === TypeRow.Total)?.TotalHours;

  const handleSubmitNote = async ({
    date,
    project,
    phase,
    notes,
  }: ITimesheetNoteForm) => {
    try {
      const dayName = getDayName(date.toString());
      const findTimesheet = timesheets.find(
        (e) => e.PhaseName === phase && e.PhaseOfProject === project
      );
      if (findTimesheet) {
        const entryByDay = findTimesheet[
          dayName as keyof ITimesheet
        ] as ITimeEntry;
        // update notes API
        const { data }: { data: Partial<TimesheetEntryEntity> } =
          await apiTransport.cupola.timesheet.post(
            new Date(String(entryByDay.date)),
            entryByDay.hours,
            entryByDay.minutes,
            project,
            notes,
            phase
          );
        /// update timesheets state from update notes api
        setTimesheets((prevState) => {
          return prevState.map((row) => {
            if (row.PhaseName === phase && row.PhaseOfProject === project) {
              return {
                ...row,
                [dayName]: {
                  date: DateTime.fromJSDate(
                    new Date(String(data.date))
                  ).toFormat("yyyy-MM-dd"),
                  hours: data.hours,
                  minutes: data.minutes,
                  notes: data.notes,
                },
              };
            }
            return row;
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
    setOpenNoteDialog(() => false);
  };
  return (
    <Box style={{ maxWidth: 1440, fontSize: 18, margin: "0 auto" }}>
      <TabbedDisplay
        panelParent="tabs-page"
        tabLabels={[
          "TIMESHEETS",
          "EXPENSES",
          "VACATION / SICK DAYS",
          "CONSULTANTS",
        ]}
        tabColorSelected="orange"
      >
        <TabPanel index={0}>
          <>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                background: "#f5e7d6",
                height: 52,
                paddingLeft: "15px",
                paddingRight: "32px",
              }}
            >
              <CupolaThemeProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Week"
                    value={selectWeekOf}
                    onChange={(value) => {
                      if (value) {
                        const convertDate = new Date(value.toString());
                        setSelectWeekOf(
                          DateTime.fromISO(convertDate.toISOString()).startOf(
                            "week"
                          )
                        );
                      }
                    }}
                    components={{
                      OpenPickerIcon: () => (
                        <DateRangeIcon
                          sx={{
                            color: "#6e6767",
                          }}
                        />
                      ),
                    }}
                    OpenPickerButtonProps={{ style: { marginBottom: "10px" } }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        data-testid={`select-week-text-field`}
                        variant="standard"
                        required={true}
                        margin="normal"
                        InputProps={{
                          ...params.InputProps,
                          disableUnderline: true,
                        }}
                        sx={(theme) => ({
                          label: {
                            color: theme.palette.text.primary,
                            marginTop: 1,
                            marginLeft: "38px",
                          },
                          padding: 0,
                          width: 130,
                          margin: 0,
                        })}
                      />
                    )}
                    InputAdornmentProps={{ position: "start" }}
                    data-testid={"select-week-picker"}
                  />
                </LocalizationProvider>
              </CupolaThemeProvider>
            </Box>
            <Accordion
              defaultExpanded
              sx={{
                boxShadow: 0,
                "&.Mui-expanded": {
                  margin: 0,
                },
                margin: 0,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#6e6767" }} />}
                aria-controls="panel-account-settings-content"
                sx={{
                  background: "#eecdb1e8",
                  "&.Mui-expanded": { minHeight: 52, margin: 0 },
                  height: 52,
                  paddingRight: "32px",
                }}
              >
                <AccessTimeIcon
                  sx={{
                    color: "#6e6767",
                    marginRight: "32px",
                    marginLeft: "-6px",
                  }}
                />
                <Typography>Timesheets</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "0px" }}>
                <TimesheetHoursWorked
                  startDate={DateTime.fromISO(selectWeekOf.toISO()).toFormat(
                    "yyyy-MM-dd"
                  )}
                  endDate={DateTime.fromISO(selectWeekOf.toISO())
                    .plus({ days: 6 })
                    .toFormat("yyyy-MM-dd")}
                  totalHoursWorked={totalHourWorked || 0}
                  hoursAvailable={40}
                />
                <DataGrid
                  rows={timesheets}
                  columns={columns}
                  disableColumnMenu={false}
                  disableVirtualization
                  hideFooter
                  autoHeight
                  onCellEditCommit={handleCellEditCommit}
                  isCellEditable={(params: GridCellParams) =>
                    params.row.Type === TypeRow.Phase
                  }
                  getRowClassName={(params) => {
                    if (
                      params.row.Type === TypeRow.Project ||
                      params.row.Type === TypeRow.Total
                    )
                      return "super-app total-cell";
                    return "";
                  }}
                  componentsProps={{
                    cell: {
                      tabIndex: 0,
                    },
                  }}
                  sx={[
                    {
                      "& .super-app-theme--cell": {
                        backgroundColor: "#fffff",
                      },
                      "& .super-app.total-cell": {
                        backgroundColor: "#f7ece2",
                        marginTop: "1px",
                      },
                    },
                    {
                      "& .MuiDataGrid-columnHeaders": {
                        background: "#f7ece2",
                        outline: "none",
                        fontSize: 16,
                        borderBottom: "1px solid #d3d3d3",
                      },
                    },
                    {
                      "& .MuiDataGrid-columnHeader:focus-within": {
                        outline: "none",
                      },
                    },
                    {
                      "& .MuiDataGrid-cell": {
                        border: "none",
                      },
                    },
                    {
                      "& .MuiDataGrid-row.Mui-selected ": {
                        background: "transparent",
                      },
                    },
                    {
                      "& .MuiDataGrid-row.Mui-selected:hover ": {
                        background: "transparent",
                      },
                    },
                    {
                      "& .MuiDataGrid-columnHeader--moving": {
                        background: "transparent",
                      },
                    },
                    {
                      "& .MuiDataGrid-columnHeaderTitleContainer:focus": {
                        outline: "none",
                      },
                    },
                    {
                      "& .MuiDataGrid-iconSeparator": {
                        display: "none",
                      },
                    },
                  ]}
                />
              </AccordionDetails>
            </Accordion>
            <TimesheetNoteDialog
              startDate={selectWeekOf.toFormat("yyyy-MM-dd")}
              title="Add a Note"
              isOpen={openNoteDialog}
              onSubmitForm={(timeEntry) => handleSubmitNote(timeEntry)}
              onClose={() => setOpenNoteDialog(false)}
            />
          </>
        </TabPanel>
      </TabbedDisplay>
    </Box>
  );
};
