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
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 0,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.FULL,
        id: 1,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.FULL,
        id: 2,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 3,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 4,
      },
    ],
  },
  {
    title: "Buổi chiều",
    data: [
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 5,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 6,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 7,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 8,
      },
    ],
  },
  {
    title: "Buổi tối",
    data: [
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 9,
      },
      {
        time: "8:00 - 10:00",
        status: STATUS_DOCTER.AVAILABLE,
        id: 10,
      },
    ],
  },
]
