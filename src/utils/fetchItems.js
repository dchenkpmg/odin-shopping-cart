export const fetchItems = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=9");
    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};
