export const useRange = (data) => {
  let rangeStart = null;
  let rangeEnd = null;

  const ranges = data.reduce((acc, title, index) => {
    if (rangeStart === null) {
      rangeStart = title;
      rangeEnd = title;
    } else if (title.id === rangeEnd.id + 1) {
      rangeEnd = title;
    } else {
      if (rangeStart === rangeEnd) {
        acc.push(rangeStart.title);
      } else {
        acc.push(`${rangeStart.title}-${rangeEnd.title}`);
      }
      rangeStart = title;
      rangeEnd = title;
    }

    if (index === data.length - 1) {
      if (rangeStart === rangeEnd) {
        acc.push(rangeStart.title);
      } else {
        acc.push(`${rangeStart.title}-${rangeEnd.title}`);
      }
    }

    return acc;
  }, []);

  const range = ranges.join(',');

  return range;
};
