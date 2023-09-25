export const DATA_EXPLAIN = [
  {
    title: "Còn trống",
    type: 1,
  },
  {
    title: "Kín lịch",
    type: 2,
  },
]
export enum STATUS_DOCTER {
  AVAILABLE = 0,
  FULL = 1,
}
export const DATA_TIME = [
  {
    title: "Buổi sáng",
    data: [
      {
        time: "10:00 - 10:15",
        from: "10:00",
        startHour: 10,
        startMin: 0,
        status: STATUS_DOCTER.AVAILABLE,
        id: 0,
      },
      {
        time: "10:15 - 10:30",
        from: "10:15",
        startHour: 10,
        startMin: 15,
        status: STATUS_DOCTER.AVAILABLE,
        id: 1,
      },
      {
        time: "10:30 - 10:45",
        from: "10:30",
        startHour: 10,
        startMin: 30,
        status: STATUS_DOCTER.AVAILABLE,
        id: 2,
      },
      {
        time: "10:45 - 11:00",
        status: STATUS_DOCTER.AVAILABLE,
        from: "10:45",
        startHour: 10,
        startMin: 45,
        id: 3,
      },
      {
        time: "11:45 - 12:00",
        status: STATUS_DOCTER.AVAILABLE,
        from: "11:45",
        startHour: 11,
        startMin: 45,
        id: 4,
      },
    ],
  },
  {
    title: "Buổi chiều",
    data: [
      {
        time: "13:00 - 13:15",
        from: "13:00",
        startHour: 13,
        startMin: 0,
        status: STATUS_DOCTER.AVAILABLE,
        id: 5,
      },
      {
        time: "13:30 - 13:45",
        from: "13:30",
        startHour: 13,
        startMin: 30,
        status: STATUS_DOCTER.AVAILABLE,
        id: 6,
      },
      {
        time: "13:45 - 14:00",
        from: "13:45",
        startHour: 13,
        startMin: 45,
        status: STATUS_DOCTER.AVAILABLE,
        id: 7,
      },
      {
        time: "14:00 - 14:15",
        from: "14:00",
        startHour: 14,
        startMin: 0,
        status: STATUS_DOCTER.AVAILABLE,
        id: 8,
      },
    ],
  },
  {
    title: "Buổi tối",
    data: [
      {
        time: "18:00 - 18:15",
        from: "18:00",
        startHour: 18,
        startMin: 0,
        status: STATUS_DOCTER.AVAILABLE,
        id: 9,
      },
      {
        time: "18:15 - 18:30",
        from: "18:15",
        startHour: 18,
        startMin: 15,
        status: STATUS_DOCTER.AVAILABLE,
        id: 10,
      },
    ],
  },
]
