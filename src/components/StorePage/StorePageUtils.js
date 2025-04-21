import { fetchItems } from "../../utils/fetchItems";

export async function loader() {
  const items = await fetchItems();
  return items;
}
