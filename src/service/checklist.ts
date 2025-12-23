interface Lists {
  id: number;
  name: string;
  isDone: boolean;
}

const defaultChecklist: Lists[] = [
  { id: 0, name: "Morning Vitamins", isDone: false },
  { id: 1, name: "Brekkie", isDone: false },
  { id: 2, name: "Lunch", isDone: false },
  { id: 3, name: "Afternoon Vitamins", isDone: false },
  { id: 4, name: "Zaitun", isDone: false },
  { id: 5, name: "Night Vitamins", isDone: false },
];

const STORAGE_KEY = "daily-checklist";

export const getChecklist = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultChecklist));
    return defaultChecklist;
  }

  return JSON.parse(data) as Lists[];
};

export const saveLists = (lists: Lists[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};
