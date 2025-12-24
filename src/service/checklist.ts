interface Lists {
  id: number;
  name: string;
  isDone: boolean;
}

const defaultChecklist: Lists[] = [];

const STORAGE_KEY_CHECKLIST = "daily-checklist";
const STORAGE_KEY_DATE = "today-checklist";

export const getChecklist = (): Lists[] => {
  try {
    const checklistOnStorage = localStorage.getItem(STORAGE_KEY_CHECKLIST);
    const dateOnStorage = localStorage.getItem(STORAGE_KEY_DATE);
    const today = new Date().toISOString().split("T")[0];

    if (checklistOnStorage === null) {
      localStorage.setItem(
        STORAGE_KEY_CHECKLIST,
        JSON.stringify(defaultChecklist)
      );
      localStorage.setItem(STORAGE_KEY_DATE, today);

      return defaultChecklist;
    }

    const currentChecklists = JSON.parse(checklistOnStorage) as Lists[];

    if (dateOnStorage !== today) {
      const resetChecklists = currentChecklists.map((item) => ({
        ...item,
        isDone: false,
      }));
      localStorage.setItem(
        STORAGE_KEY_CHECKLIST,
        JSON.stringify(resetChecklists)
      );
      localStorage.setItem(STORAGE_KEY_DATE, today);

      return resetChecklists;
    }

    return currentChecklists;
  } catch (error) {
    console.error("Error loading checklist: ", error);
    return [];
  }
};

export const addChecklist = (name: string): Lists[] => {
  const allChecklists = getChecklist();

  const newChecklist: Lists = {
    id: Date.now(),
    name,
    isDone: false,
  };

  const checklists = [...allChecklists, newChecklist];
  saveLists(checklists);
  return checklists;
};

export const deleteChecklist = (id: number): Lists[] => {
  const allChecklists = getChecklist();
  const filteredChecklist = allChecklists.filter((item) => item.id !== id);

  localStorage.setItem(
    STORAGE_KEY_CHECKLIST,
    JSON.stringify(filteredChecklist)
  );
  saveLists(filteredChecklist);
  return filteredChecklist;
};

export const saveLists = (lists: Lists[]) => {
  localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(lists));
};
