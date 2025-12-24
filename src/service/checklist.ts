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

const STORAGE_KEY_CHECKLIST = "daily-checklist";
const STORAGE_KEY_DATE = "today-checklist";

export const getChecklist = () => {
  const dataOnStorage = localStorage.getItem(STORAGE_KEY_CHECKLIST);
  const dateOnStorage = localStorage.getItem(STORAGE_KEY_DATE);
  const today = new Date().toISOString().split("T")[0];

  if (!dataOnStorage) {
    localStorage.setItem(
      STORAGE_KEY_CHECKLIST,
      JSON.stringify(defaultChecklist)
    );
    localStorage.setItem(STORAGE_KEY_DATE, today);
    return defaultChecklist;
  }

  if (dateOnStorage !== today) {
    const updatedIsDone = defaultChecklist.map((item) => ({
      ...item,
      isDone: false,
    }));
    localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(updatedIsDone));
    localStorage.setItem(STORAGE_KEY_DATE, today);

    return updatedIsDone;
  }

  return JSON.parse(dataOnStorage) as Lists[];
};

export const saveLists = (lists: Lists[]) => {
  localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(lists));
};
