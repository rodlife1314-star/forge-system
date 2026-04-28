
import { ENGINES } from "./src/constants";

const ids = new Set();
const duplicates = [];

Object.entries(ENGINES).forEach(([engineKey, engine]) => {
  engine.items.forEach((item) => {
    if (ids.has(item.id)) {
      duplicates.push({ engineKey, name: item.name, id: item.id });
    }
    ids.add(item.id);
  });
});

if (duplicates.length > 0) {
  console.log("Found duplicate IDs in ENGINES items:");
  console.log(JSON.stringify(duplicates, null, 2));
} else {
  console.log("No duplicate IDs found in ENGINES items.");
}
