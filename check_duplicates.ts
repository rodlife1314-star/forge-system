
import { ENGINES } from "./src/constants";

const names = new Set();
const duplicates = [];

Object.entries(ENGINES).forEach(([engineKey, engine]) => {
  engine.items.forEach((item) => {
    if (names.has(item.name)) {
      duplicates.push({ engineKey, name: item.name, id: item.id });
    }
    names.add(item.name);
  });
});

if (duplicates.length > 0) {
  console.log("Found duplicate names in ENGINES items:");
  console.log(JSON.stringify(duplicates, null, 2));
} else {
  console.log("No duplicate names found in ENGINES items.");
}
